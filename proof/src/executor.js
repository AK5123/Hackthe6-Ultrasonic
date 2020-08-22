import Util from './utility';
import Sonic from '../sonic';


export default class Analyzer {
    constructor(p5, config) {
        this.p5 = p5;
        this.config = config;
        this.notify = null; //??
        this.killSwitch = false;
        this.receiveFstop = null;
        this.sendFstop = null;
        this.heartbeat = null;
        this.volumeOn = true;
        this.lastRandom = 900;
        // Decoded String
        this.payload = "";
        this.iterator = 0;
        // Sound generated is recorded as Buffer
        this.queue = Util.queue();
        this.songBuffer = null;
        this.alertBuffer = null;
        this.freqRanges = null;
        this.masterCache = {};
        this.lastForceSchedule = null;
    }

    init(notify) {
        this.notify = notify;

        // encoding setup - record and store buffer
        this.sonic = new Sonic(this.config);
        // decode setup
        this.freqRanges = this.getFreqRanges();
        this.audioContext = new window.AudioContext;
        this.p5.getAudioContext().resume();
        // this.alertBuffer = await Util.loadSound(this.audioContext, "/assets/snapnotify.mp3");
    
        // p5 
        this.mic = new p5.AudioIn();
        console.log("[INFO] Mic: ", this.mic);
        this.fft = new p5.FFT();
        this.fft.setInput(this.mic);
        this.started = true;

        this.p5.loop();
    }


    setup() {
        let cnv = this.p5.createCanvas(1200, 600);
        this.p5.noLoop();
    }

    send(sample) {
        const audioBuffer = this.sonic.send(sample);
        audioBuffer.startRendering();
        audioBuffer.oncomplete = (e) => {
            this.songBuffer = e.renderedBuffer;
            this.song = this.audioContext.createBufferSource();
            this.song.buffer = this.songBuffer;
            this.song.loop = false;
            this.song.connect(this.audioContext.destination);
            this.song.start();
        }  
    }

   receive() {
    this.mic.start(() => {
        console.log("started")
    });
   }

   stop() {
       this.mic.stop();
   }
   
    draw() {
        if (this.started) {

            const {
                freqMin,
                freqMax,
                freqError,
                threshold,
                alphabet,
                data
            } = this.config;

            // SETUP FFT lGRAPH
            this.p5.background(0);
            this.p5.noStroke();
            this.p5.fill(240, 150, 150);

            var spectrum = [];
            if (true) {
                spectrum = this.fft.analyze();
            }

            //CRITICAL
            //DRAW PEAKS
            for (let i = 0; i < spectrum.length; i++) {
                let x = this.p5.map(i, 0, spectrum.length, 0, this.p5.width);
                let h = -this.p5.height + this.p5.map(spectrum[i], 0, 255, this.p5.height, 0);
                this.p5.rect(x, this.p5.height, this.p5.width / spectrum.length, h)
            }
            this.p5.endShape();

            // DECODE---------------
            let testEnergyArr = this.freqRanges.map((x) => {
                return this.fft.getEnergy(x[0], x[1])
            });

            //FIND MAX FREQ AND ITS INDEX
            let startIndex = Util.frequencyToIndex(this.p5.sampleRate(), freqMin, spectrum.length) - 10;
            let maxx = this.p5.max(spectrum.slice(startIndex))
            let index = spectrum.indexOf(maxx)


            //DECODE CHAR PROCESS
            if (maxx > threshold) {

                let f = Util.indexToFreq(this.p5.sampleRate(), index, spectrum);

                if (freqMin - f < freqError && f <= freqMax) {

                    let decodedChar = this.sonic.freqToChar(f);
                    console.log(decodedChar)

                    let energy = testEnergyArr[alphabet.indexOf(decodedChar)]

                    if (true) {
                        if (decodedChar in this.masterCache) {
                            this.masterCache[decodedChar]['energy'] = Math.max(energy, this.masterCache[decodedChar]['energy'])
                            this.masterCache[decodedChar]['count'] += 1
                        } else {
                            this.masterCache[decodedChar] = {}
                            this.masterCache[decodedChar]['energy'] = energy
                            this.masterCache[decodedChar]['count'] = 1
                        }

                        if (this.masterCache[decodedChar]['count'] >= 2) {


                            // Monitors for payload
                            if (decodedChar == "^") {
                                this.payload = "^";
                            } else if (decodedChar == "$" || this.payload.length == 0 || this.payload.slice(-1) != decodedChar) {
                                this.payload += decodedChar;
                                if (decodedChar == "$") {
                                    this.notify(this.payload);
                                    this.payload = ""
                                    this.masterCache = {};
                                }
                            }

                        }
                    }
                }
            }
            // DECODE---------------
        }
    }


    getFreqRanges() {
        const {
            freqMin,
            freqMax,
            alphabet,
            freqError
        } = this.config
        const RANGE = freqMax - freqMin;
        const INTERVAL = (RANGE / alphabet.length);
        const FREQRANGES = [];
        for (let i = 0; i < alphabet.length; i++) {
            let tempArr = [];
            if (i == 0) {
                tempArr.push(freqMin - freqError);
                tempArr.push(freqMin + (Math.round((INTERVAL * 10) / 2) / 10));
                FREQRANGES.push(tempArr);
            } else if (i == 1) {
                tempArr.push(FREQRANGES[i - 1][1])
                tempArr.push(tempArr[0] + INTERVAL);
                FREQRANGES.push(tempArr);
            } else {
                tempArr.push(FREQRANGES[i - 1][1]);
                tempArr.push(tempArr[0] + INTERVAL);
                FREQRANGES.push(tempArr);
            }
        }
        return FREQRANGES;
    }



   

            


}

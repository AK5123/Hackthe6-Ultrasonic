import Analyzer from './src/executor.js';



function bootstrap(p) {

    let config = {
        alphabet: '^ABC123$',
        data: 'A',
        charDuration: 0.1,
        rampDuration: 0.04,
        freqMin: 18500,
        freqMax: 19000,
        freqError: 50,
        threshold: 0,
        energyFilter: 115,
    }


    
    // console.log("bolt",bolt)
    let analyzer = new Analyzer(p, config);



    function cb(params, energy, success, activate) {
        if (params[0] === "^" && params[params.length-1] === "$"){
            console.log("[INFO] RECORDED", params, energy, success);
        }
     
    
    }



    p.setup = () => {
        analyzer.setup();
    }

    p.touchStarted = () => {
        p.getAudioContext().resume();
    }

    p.draw = () => {
        analyzer.draw();
    }

    document.querySelector("#activate").onclick = () => {
        analyzer.init(cb)
    }

    document.querySelector("#send").onclick = () => {
        analyzer.send(document.querySelector("#data").value)
    }

    document.querySelector("#receive").onclick = () => {
        analyzer.receive()
    }

}


new p5(bootstrap);

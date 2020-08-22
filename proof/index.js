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

        console.log("[INFO] RECORDED", params, energy, success);
     
    
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

    //analyzer.init()

    // send events
    // receive
    //analyzer init
}


new p5(bootstrap);

import Analyzer from './src/executor.js';



function bootstrap(p) {

    let config = {
        alphabet: '^ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_$',
        data: 'A',
        charDuration: 0.3,
        rampDuration: 0.12,
        freqMin: 17500,
        freqMax: 19500,
        freqError: 50,
        threshold: 0,
        energyFilter: 115,
    }


    
    // console.log("bolt",bolt)
    let analyzer = new Analyzer(p, config);



    function cb(params, energy, success, activate) {
        if (params[0] === "^" && params[params.length-1] === "$"){
            params = params.slice(1,params.length-1)
            params = params.split("").filter((e) => e != "_")
            document.querySelector("h2").innerHTML ="Result: "+params.join("")
            console.log("[INFO] RECORDED", params.join(""), energy, success);
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
        let payload = document.querySelector("#data").value.toUpperCase().replace(/\s/g, '')
        let tpay = ""
        payload.split("").forEach(ele => {
            if(tpay.slice(-1) === ele){
                tpay += "_"
            }
            tpay += ele;
        })
        console.log(tpay)
        analyzer.send(tpay)
    }

    document.querySelector("#receive").onclick = () => {
        analyzer.receive()
    }

}


new p5(bootstrap);

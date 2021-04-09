/* CSCI 3230U - Multi-threading */

window.onload = function() {
    let btnStart = document.getElementById('btnStart');
    btnStart.onclick = function() {
        let factorWorker = new Worker('factorWorker.js');
        let values = [19683, 13104, 25872, 1452, 29403];
        factorWorker.postMessage(values);
        factorWorker.onmessage = function(e) {
            let factors = e.data;
            console.log(factors);
        };
        console.log('Started threads.');
    };
};

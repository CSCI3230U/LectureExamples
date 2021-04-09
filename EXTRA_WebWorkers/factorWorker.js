/* CSCI 3230U - Multi-threading */

onmessage = function(e) {
    let numbers = e.data;
    let delayInMilliseconds = 3000; // wait 3 seconds to exaggerate computation
    setTimeout(function() {
        let factors = {};
        for (let i = 0; i < numbers.length; i++) {
            // find the factors of numbers[i], and add them to factors
            let numFactors = [];
            for (let k = numbers[i] - 1; k > 1; k--) {
                if ((numbers[i] % k) == 0) {
                    numFactors.push(k);
                }
            }
            factors[numbers[i]] = numFactors;
        }
        postMessage(factors);
    }, delayInMilliseconds);
};

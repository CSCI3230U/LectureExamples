window.onload = function() {
    // var - global scope
    // let - local scope (to the construct where it is declared, preferred)
    let sayHiButton = document.getElementById('sayHi');
    sayHiButton.onclick = function() {
        var nameField = document.getElementById('name');
        let name = nameField.value;
        // console.log('Hello, ' + name);
        let output = document.getElementById('output');
        output.innerHTML = `<p>Hello, ${name}</p>`;

        let ageField = document.getElementById('age');
        // let age = parseInt(ageField.value);
        let age = ageField.value;
        console.log(age);

        if (age < 18) {
            console.log('You cannot vote, come back later!');
        } else {
            console.log('Step right up and vote!');
        }
    };

    console.log('fibonacci(10): ' + fibonacci(10));
    testAsync();

    // local storage - store relative to the domain
    window.localStorage.setItem('preferredStore', 'Oshawa');
    console.log('Preferred store: ' + window.localStorage.getItem('preferredStore'));
    window.localStorage.removeItem('preferredStore');

    // session storage - store relative to the user's session
    window.sessionStorage.setItem('username', 'ssmith');
    console.log('username: ' + window.sessionStorage.getItem('username'));
    window.sessionStorage.removeItem('username');

};

function isPrime(number) {
    for (let div = 2; div < number; div++) {
        if ((number % div) == 0) {
            return false;
        }
    }
    return true;
}

function fibonacci(n) {
    if ((n == 0) || (n == 1)) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function wait(howLong = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, howLong);
    });
}

async function testAsync() {
    let promise = wait(5000);
    console.log(promise);
    console.log('wait() has ended');
}
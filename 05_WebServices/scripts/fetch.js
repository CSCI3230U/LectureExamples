window.onload = function() {
    // plain text
    let button = document.getElementById('plainTextButton');
    button.onclick = function() {
        fetch('test_data.txt')
        .then((response) => response.text())
        .then(function(content) {
            let plainTextDiv = document.getElementById('plainTextDiv');
            plainTextDiv.innerText = content;
        }); 
    };

    // comma-separated values
    button = document.getElementById('csvButton');
    button.onclick = function() {
        fetch('test_data.csv')
        .then((response) => response.text())
        .then(function(content) {
            let firstNameField = document.getElementById('csvFirstName');
            let lastNameField = document.getElementById('csvLastName');
            
            let rows = content.split('\n');
            let person = rows[1].split(',');
            firstNameField.setAttribute('value', person[0]);
            lastNameField.setAttribute('value', person[1]);
        });
    };

    // javascript object notation (JSON)
    button = document.getElementById('jsonButton');
    button.onclick = function() {
        fetch('test_data.json')
        .then((response) => response.json())
        .then(function(person) {
            let firstNameField = document.getElementById('jsonFirstName');
            let lastNameField = document.getElementById('jsonLastName');
            firstNameField.setAttribute('value', person.firstName);
            lastNameField.setAttribute('value', person.lastName);
        });
    };

    button = document.getElementById('xmlButton');
    button.onclick = function() {
        fetch('test_data.xml')
        .then((response) => response.text())
        .then(function(rawXML) {
            const parser = new window.DOMParser();
            const xmlDocument = parser.parseFromString(rawXML, 'text/xml');

            let firstNameField = document.getElementById('xmlFirstName');
            let lastNameField = document.getElementById('xmlLastName');

            let people = xmlDocument.getElementsByTagName('person');
            firstNameField.setAttribute('value', people[1].getAttribute('firstName'));
            lastNameField.setAttribute('value', people[1].getAttribute('lastName'));
        });
    };
};
import { Circle, Rectangle } from './shapes.js'; 

class Student {
    // instance variables
    sidNum = ''; // pretend that this is private
    firstName;   // use # to make private (newer browsers)
    lastName;
    grades = [];

    constructor(sid) {
        this.sidNum = sid;
    }

    // properties
    get gpa() {
        let sum = 0.0;
        for (let i = 0; i < this.grades.length; i++) {
            sum += this.grades[i];
        }
        return sum / this.grades.length;
    }

    get sid() { return this.sidNum; }
    set sid(newValue) { this.sidNum = newValue; }

    // methods
    addGrade(newGrade) {
        this.grades.push(newGrade);
    }

    toString() {
        return `Student (${this.sid}, ${this.firstName} ${this.lastName})`;
    }
}

window.onload = function() {
    const jane = new Student('100000001');
    jane.firstName = 'Jane';
    jane.lastName = 'Sinclair';
    jane.addGrade(3.0);
    jane.addGrade(4.0);
    jane.addGrade(3.5);
    jane.addGrade(3.2);

    log('Stuff about Jane:'); 
    log(jane.gpa);
    log(jane.toString());

    // test out inheritance
    let circle1 = new Circle(2.0);
    log(circle1.toString());
    log(`The area of the circle is ${circle1.area}.`);

    let rectangle1 = new Rectangle(3.0, 4.0);
    log(rectangle1.toString());
    log(`The area of the rectangle is ${rectangle1.area}.`);
}

function log(contentText) {
    let output = document.getElementById('output');
    // output.innerHTML += `<div>${content}</div>`;
    let contentNode = document.createTextNode(contentText);
    let contentDiv = document.createElement('div');
    contentDiv.appendChild(contentNode);
    output.appendChild(contentDiv);
}
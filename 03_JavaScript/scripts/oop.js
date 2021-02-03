class Student {
    // instance variables
    sidNum = ''; // pretend that this is private
    firstName;
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

const jane = new Student('100000001');
jane.firstName = 'Jane';
jane.lastName = 'Sinclair';
jane.addGrade(3.0);
jane.addGrade(4.0);
jane.addGrade(3.5);
jane.addGrade(3.2);
console.log(jane.gpa);
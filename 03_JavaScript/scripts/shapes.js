class Shape {
    constructor(name) {
        this.name = name;
    }

    toString() {
        return this.name;
    }
}

export class Circle extends Shape {
    constructor(radius) {
        super('Circle');
        this.radius = radius;
    }

    get area() {
        return 3.1415926 * this.radius * this.radius;
    }
}

export class Rectangle extends Shape {
    constructor(length, width) {
        super('Rectangle');
        this.length = length;
        this.width  = width;
    }

    get area() {
        return this.length * this.width;
    }
}

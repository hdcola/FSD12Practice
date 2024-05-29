// Write a function called squareNumber that will take one argument (a number), square that number, and output to the console.The result of squaring the number 3 is 9.

function squareNumber(number) {
    const squared = number * number;
    console.log(squared);
  }

//   Write a function called halfNumber that will take one argument (a number), divide it by 2, and output to the console.

function halfNumber(num){
    const halfNum = num / 2;
    console.log(halfNum);
}

// Write a function called percentOf that will take two numbers, figure out what percent the first number represents of the second number, and output to the console.

function percentOf(a,b){
    if(b === 0){
        console.log("what's wrong with you, the denominator can;t be zeroooooo!")
        return;
    }
    const per = (a/b)*100;
    console.log(`${per}`);
}

// Write a function called areaOfCircle that will take one argument (the radius), calculate the area based on that, and output to the console.

function areaOfCircle(radius){
    const pi = Math.PI;
    return pi*Math.pow(radius,2);
}

const radius = 5;
const area = areaOfCircle(radius);
console.log(`${area}`)

// Write a function that will take one argument (a number) and perform the following operations, using the functions you wrote earlier. Note there is no direct output from this function.

function allTheStuff(num){
    const a = halfNumber(num);
    const b = squareNumber(a);
    const c = areaOfCircle(b);
    const d = percentOf(c,b);
}
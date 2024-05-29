
/*
1.
Write a function called squareNumber that will take one argument (a number), square that number, and output to the console.
The result of squaring the number 3 is 9.
*/

function squareNumber(num) {
    const square = num * num;
    console.log(`The result of squaring the number ${num} is ${square}`);
    return square;
}

squareNumber(3);
squareNumber(5);
squareNumber(7);

/*
2.
Write a function called halfNumber that will take one argument (a number), divide it by 2, and output to the console.
*/

function halfNumber(num) {
    const half = num / 2;
    console.log(`The result of half the number ${num} is ${half}`);
    return half;
}

halfNumber(2);
halfNumber(4);
halfNumber(6);

/*
3.
Write a function called percentOf that will take two numbers, figure out what percent the first number represents of the second number, and output to the console.
*/

function percentOf(num1, num2) {
    if (num1 === 0) {
        console.log("The num2 cannot be zero.");
        return 0;
    }

    const percent = (num1 / num2) * 100;
    console.log(`${num1} is ${percent.toFixed(2)}% of ${num2}.`);
    return percent;
}

percentOf(50, 200);   
percentOf(23, 50);
percentOf(5, 0);  

/*
4.
Write a function called areaOfCircle that will take one argument (the radius), calculate the area based on that, and output to the console.
The area for a circle with radius 2 is 12.566370614359172.
*/

function areaOfCircle(radius) {
    const area = Math.PI * Math.pow(radius, 2);
    console.log(`The area for a circle with radius ${radius} is ${area}.`);
    return area;
}

areaOfCircle(2); 
areaOfCircle(12);
areaOfCircle(99); 

/*
5.
Write a function that will take one argument (a number) and perform the following operations, using the functions you wrote earlier. Note there is no direct output from this function.
a. Take half of the number and store the result.
b. Square the result of (a) and store that result.
c. Calculate the area of a circle with the result of (b) as the radius.
d. Calculate what percentage that area (c) is of the squared result (b).
*/

function performOperations(num) {
    const half = halfNumber(num);
    const square = squareNumber(half);
    const area = areaOfCircle(square);
    const percentage = percentOf(area, square);

    console.log(`Half of ${num} is ${half}`);
    console.log(`${half} squared is ${square}`);
    console.log(`The area of a circle with radius ${square} is ${area}`);
    console.log(`The area ${area} is ${percentage}% of the squared result ${square}`);
}

performOperations(8);
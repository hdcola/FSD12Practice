/**
 * Calculates the square of a given number.
 *
 * @param {number} num - The number to be squared.
 * @returns {number} The square of the given number.
 */
function squareNumber(num) {
  return num * num;
}

let num = 3;
let result = squareNumber(num);
console.log("The result of squaring the number " + num + " is " + result + ".");

/**
 * Calculates the half of a given number.
 *
 * @param {number} num - The number to be halved.
 * @returns {number} The half of the given number.
 */
function halfNumber(num) {
  return num / 2;
}

num = 5;
result = halfNumber(num);
console.log("Half of " + num + " is " + result + ".");

/**
 * Calculates the percent of two numbers.
 *
 * @param {number} num1 - The first number.
 * @param {number} num2 - The second number.
 * @returns {number} The percent of the first number in relation to the second number.
 */
function percentOf(num1, num2) {
  return (num1 / num2) * 100;
}

let num1 = 2;
let num2 = 4;
result = percentOf(num1, num2);
console.log(num1 + " is " + result + "% of " + num2 + ".");

/**
 * Calculates the area of a circle given its radius.
 *
 * @param {number} radius - The radius of the circle.
 * @returns {number} The area of the circle.
 */
function areaOfCircle(radius) {
  return Math.PI * squareNumber(radius);
}

let radius = 2;
result = areaOfCircle(radius);
console.log(
  "The area of a circle with radius " + radius + " is " + result + "."
);

/**
 * Calls all the functions and returns the result.
 *
 * @param {number} num - The number to be used in the calculations.
 * @returns {number} The result of all the calculations.
 */
function allTheStuff(num) {
  let half = halfNumber(num);
  let squared = squareNumber(half);
  let area = areaOfCircle(squared);
  let result = percentOf(area, squared);
  return result;
}

num = 5;
result = allTheStuff(num);
console.log("The final result is " + result + ".");

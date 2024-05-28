// Create a function named rainbow(), and perfrom the following within

// All console.log() statement should be executed by a function named output()
// function output(str){ console.log(str) }

// 1. Create an array named colors that contains five different names of colors
// 1. Colors should be red, blue, yellow, orange, purple
// 1. Access the first color in the array and print it to the console
// 1. Access the third color in the array and print it to the console
// 1. Write one line of code that changes the value of the last color in the list to "green".
// 1. Create a new variable called fourthColor and set it equal to the fourth color in the list  and print it to the console.
// 1. Add the color pink to the end of the list.
// 1. Add the color white to the beginning of the list.
// 1. Print the length of the array to the console
// 1. Remove the last color from the end of list and print it to the console.
// 1. Print to the console on a single line every color's value and every color's index in this format:
// 3, purple or 0, blue or 4, yellow

function rainbow() {
  let colors = ["red", "blue", "yellow", "orange", "purple"];
  output(colors[0]);
  output(colors[2]);
  colors[4] = "green";
  let fourthColor = colors[3];
  output(fourthColor);
  colors.push("pink");
  colors.unshift("white");
  output(colors.length);
  output(colors.pop());
  let colorsString = "";
  for (let i = 0; i < colors.length; i++) {
    colorsString += i + ", " + colors[i] + " or ";
  }
  output(colorsString.slice(0, -4));
}

function output(str) {
  console.log(str);
}

rainbow();

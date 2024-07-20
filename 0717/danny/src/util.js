const printArray = (arr, level = 0) => {
  const indent = "  ".repeat(level);
  if (Array.isArray(arr)) {
    console.log(indent + "[");
    arr.forEach((item) => {
      if (Array.isArray(item)) {
        printArray(item, level + 1);
      } else {
        console.log(indent + "  " + JSON.stringify(item));
      }
    });
    console.log(indent + "]");
  } else {
    console.log(indent + JSON.stringify(arr));
  }
};

module.exports = { printArray };

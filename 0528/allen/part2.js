function rainbow(){
    let colors = ["red", "blue", "yellow", "orange", "purple"]
    output(colors[0]);
    output(colors[2]);
    colors[4]="green";
    let fourthColor = colors[3];
    output(fourthColor);
    colors.push("pink");
    colors.unshift ("white");
    output(colors.length);
    let removedColor = colors.pop();
    output(removedColor);

    let results = colors.map((color, index) => `${index}, ${color}`).join(' or ');
    output(results);
}

function output(str) {
    console.log(str);
  }
  
  rainbow();
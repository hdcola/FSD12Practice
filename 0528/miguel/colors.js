
// Helpers
function output(string) {
    console.log(string);
}

function rainbow() {
    // 1、2
    let colors = ["red", "blue", "yellow", "orange", "purple"];

    // 3
    output(colors[0]);

    // 4
    output(colors[2]);

    // 5
    colors[colors.length - 1] = "green";

    // 6
    const fourthColor = colors[3];
    output(fourthColor);

    // 7
    colors.push("pink");

    // 8
    colors.unshift("white");

    // 9
    output(colors.length);

    // 10
    let removedColor = colors.pop();
    output(removedColor);

    // 11
    for (let i = 0; i < colors.length; i++) {
        output(`${i}, ${colors[i]}`);
    }
}

rainbow();
// let test = `noop
// addx 3
// addx -5`

let test = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

const input = `noop
noop
noop
addx 4
addx 3
addx 3
addx 3
noop
addx 2
addx 1
addx -7
addx 10
addx 1
addx 5
addx -3
addx -7
addx 13
addx 5
addx 2
addx 1
addx -30
addx -8
noop
addx 3
addx 2
addx 7
noop
addx -2
addx 5
addx 2
addx -7
addx 8
addx 2
addx 5
addx 2
addx -12
noop
addx 17
addx 3
addx -2
addx 2
noop
addx 3
addx -38
noop
addx 3
addx 4
noop
addx 5
noop
noop
noop
addx 1
addx 2
addx 5
addx 2
addx -3
addx 4
addx 2
noop
noop
addx 7
addx -30
addx 31
addx 4
noop
addx -24
addx -12
addx 1
addx 5
addx 5
noop
noop
noop
addx -12
addx 13
addx 4
noop
addx 23
addx -19
addx 1
addx 5
addx 12
addx -28
addx 19
noop
addx 3
addx 2
addx 5
addx -40
addx 4
addx 32
addx -31
noop
addx 13
addx -8
addx 5
addx 2
addx 5
noop
noop
noop
addx 2
addx -7
addx 8
addx -7
addx 14
addx 3
addx -2
addx 2
addx 5
addx -40
noop
noop
addx 3
addx 4
addx 1
noop
addx 2
addx 5
addx 2
addx 21
noop
addx -16
addx 3
noop
addx 2
noop
addx 1
noop
noop
addx 4
addx 5
noop
noop
noop
noop
noop
noop
noop`;

let X = 1;
const data = input.split("\n").map((x) => x.split(" "));
// console.log(data);
const cycles = data.reduce((acc, x) => acc + (x[0] === "noop" ? 1 : 2), 0);
let addCyccleCount = 0;
let instructionPosition = 0;
let signalStrength = 0;
let signalStrengthBreakpoint = 20;

let CRT = [];

for (let i = 0; i < cycles; i++) {
  let action = data[instructionPosition][0];
  let value = parseInt(data[instructionPosition][1]);
  if (action === "noop") {
    instructionPosition++;
  } else if (action === "addx") {
    if (addCyccleCount % 2 !== 0) {
      X += value;
      addCyccleCount++;
      instructionPosition++;
    } else {
      addCyccleCount++;
    }
  }

  if (i + 2 === signalStrengthBreakpoint) {
    signalStrength += signalStrengthBreakpoint * X;
    signalStrengthBreakpoint += 40;
  }
}

console.log(signalStrength);

const HEIGHT = 6;
const WIDTH = 40;
let crtPosition = 0;
let crtLine = 0;

let row = "";

const checkLine = () => {
  sprite = [X - 1, X, X + 1];
  if (sprite.includes(cycle)) {
    line.push("# ");
  } else {
    line.push(". ");
  }
  cycle++;
  if (cycle % 40 === 0) {
    CRT = [...CRT, line];
    line = [];
    X += 40;
  }
};

let cycle = 0;
X = 1;
let sprite = [];
let line = [];
for (let i = 0; i < data.length; i++) {
  let action = data[i][0];
  let value = parseInt(data[i][1]);
  if (action === "noop") {
    checkLine();
  }
  if (action === "addx") {
    checkLine();
    checkLine();
    X += value;
  }
}

console.log(CRT.join("\n").toString().replace(/,/g, ""));

// turn
let currentTurn = 1;

// marked fields
let countX = 0;
let countO = 0;

// lock grid
var isLocked = false;

// clear board
const wipeBoard = () => {
  const cols = document.getElementsByClassName("col");
  document.querySelector(".title").innerHTML = "";
  for (let i = 0; i < cols.length; i++) {
    cols[i].textContent = "";
  }

  // reset variables
  currentTurn = 1;
  document.querySelector("#turn").innerHTML = "Player " + currentTurn;
  countO = 0;
  countX = 0;
  isLocked = false;
  return;
};

const turn = element => {
  if (!isLocked) {
    // 1
    if (currentTurn === 1) {
      // if empty
      if (element.textContent.toLowerCase() == "") {
        if (countX == 3) {
          alert("you can only mark 3 fields!");
          return;
        }
        mark("X", element);
        countX += 1;
        currentTurn = 2;
        document.querySelector("#turn").innerHTML = "Player " + currentTurn;
      }
      // if marked by 1
      else if (element.textContent.toLowerCase() == "x") {
        unmark(element);
        countX -= 1;
      }
      // if marked by opponent
      else if (element.textContent.toLowerCase() == "o") {
        alert(
          "You cannot remove / mark a field already marked by your opponent"
        );
      }
    }
    // 2
    else if (currentTurn == 2) {
      // if empty
      if (element.textContent.toLowerCase() == "") {
        if (countO == 3) {
          alert("you can only mark 3 fields!");
          return;
        }
        mark("O", element);
        countO += 1;
        currentTurn = 1;
        document.querySelector("#turn").innerHTML = "Player " + currentTurn;
      }
      // if marked by 1
      else if (element.textContent.toLowerCase() == "o") {
        unmark(element);
        countO -= 1;
      }
      // if marked by opponent
      else if (element.textContent.toLowerCase() == "x") {
        alert(
          "You cannot remove / mark a field already marked by your opponent"
        );
      }
    }

    check();
  }
};

// unmark field
const unmark = element => {
  element.textContent = "";
};

// mark field
const mark = (content, element) => {
  element.textContent = content;
};

const check = () => {
  // loser
  var loser = undefined;

  const cols = document.getElementsByClassName("col");

  // format cols
  let fields = [];
  for (let i = 0; i < cols.length; i++) {
    fields.push(cols[i].textContent.toLowerCase());
  }

  // interpret 1,2 => x,o
  if (currentTurn == 1) {
    var checkChar = "o";
  } else {
    var checkChar = "x";
  }

  // vertical
  if (
    fields[0] == checkChar &&
    fields[1] == checkChar &&
    fields[2] == checkChar
  ) {
    loser = currentTurn;
  }
  if (
    fields[3] == checkChar &&
    fields[4] == checkChar &&
    fields[5] == checkChar
  ) {
    loser = currentTurn;
  }
  if (
    fields[6] == checkChar &&
    fields[7] == checkChar &&
    fields[8] == checkChar
  ) {
    loser = currentTurn;
  }
  // horizontal
  if (
    fields[0] == checkChar &&
    fields[3] == checkChar &&
    fields[6] == checkChar
  ) {
    loser = currentTurn;
  }
  if (
    fields[1] == checkChar &&
    fields[4] == checkChar &&
    fields[7] == checkChar
  ) {
    loser = currentTurn;
  }
  if (
    fields[2] == checkChar &&
    fields[6] == checkChar &&
    fields[8] == checkChar
  ) {
    loser = currentTurn;
  }
  // tilted
  if (
    fields[0] == checkChar &&
    fields[4] == checkChar &&
    fields[8] == checkChar
  ) {
    loser = currentTurn;
  }
  if (
    fields[2] == checkChar &&
    fields[4] == checkChar &&
    fields[6] == checkChar
  ) {
    loser = currentTurn;
  }

  if (loser !== undefined) {
    gameOver(loser);
    return;
  }
};

const gameOver = loser => {
  if (loser == 1) {
    var winner = 2;
  } else if (loser == 2) {
    var winner = 1;
  }

  isLocked = true;

  document.querySelector(
    ".title"
  ).innerHTML = `Game over! Player ${winner} has ran of with the victory!`;
};

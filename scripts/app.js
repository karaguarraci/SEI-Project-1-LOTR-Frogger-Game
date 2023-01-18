const finish = document.querySelector("mordor");
const text = document.querySelector("#instructions");
const countDown = document.querySelector("#timer");
const startButton = document.querySelector("#startButton");
const themeMusic = document.querySelector("#start-theme");
const playPauseButton = document.querySelector("#music-controls");
const livesRemaining = document.querySelector(".lives-remaining");
const width = 9;
const numberOfBoxes = 90;
const boxes = [];
let currentPosition = 85;
let currentDirection = "right";
currentTime = 30;
let lives = 3;
let isPlaying = false;
const deadMarshes = [
  36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
];
let deadMarshSpirit = [38, 41, 46, 53];
let deadMarshFace = [36, 39, 43, 49];
let nazgulSprite = [74, 77, 80];
let flyingNazgulSprite = [0];
let trollSprite = [63, 66, 69];
let orcSprite = [20, 23, 26];
let witchKingSprite = [9, 12, 15];
let raftSpriteTop = [36, 39, 42];
let raftSpriteBottom = [47, 50, 53];
let treeSprite = [73, 79];
let rockSprite = [59, 65];
let lavaRockSprite = [0, 7, 11, 25, 31];
let reedSprite = [40, 46, 52];
let shireBackground = [
  72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
];
const moriaBackground = [
  54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
];
const mordorBackground = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
];

const gatesOfMordor = [
  18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
];

function createGrid() {
  for (let index = 0; index < numberOfBoxes; index++) {
    const box = document.createElement("div");
    // box.innerText = index;
    document.querySelector(".grid").appendChild(box);
    boxes.push(box);
  }
  addSprite();
  boxes[currentPosition].classList.add("frodo");
  boxes[4].classList.add("mordor");
  // boxes[67].classList.add("moria-door");
  boxes[86].classList.add("hobbit-hole");
  boxes[0].classList.add("flying-nazgul");
}

function addSprite() {
  deadMarshes.forEach((i) => {
    boxes[i].classList.add("marsh");
  });
  shireBackground.forEach((i) => {
    boxes[i].classList.add("shire");
  });
  moriaBackground.forEach((i) => {
    boxes[i].classList.add("moria");
  });
  mordorBackground.forEach((i) => {
    boxes[i].classList.add("mordor-background");
  });
  gatesOfMordor.forEach((i) => {
    boxes[i].classList.add("mordor-gate");
  });
  nazgulSprite.forEach((i) => {
    boxes[i].classList.add("nazgul");
  });
  trollSprite.forEach((i) => {
    boxes[i].classList.add("troll");
  });
  orcSprite.forEach((i) => {
    boxes[i].classList.add("orc");
  });
  witchKingSprite.forEach((i) => {
    boxes[i].classList.add("witchking");
  });
  raftSpriteTop.forEach((i) => {
    boxes[i].classList.add("raft");
  });
  raftSpriteBottom.forEach((i) => {
    boxes[i].classList.add("raft");
  });
  deadMarshFace.forEach((i) => {
    boxes[i].classList.add("face");
  });
  deadMarshSpirit.forEach((i) => {
    boxes[i].classList.add("spirit");
  });
  treeSprite.forEach((i) => {
    boxes[i].classList.add("trees");
  });
  rockSprite.forEach((i) => {
    boxes[i].classList.add("rock");
  });
  lavaRockSprite.forEach((i) => {
    boxes[i].classList.add("lava-rock");
  });
  reedSprite.forEach((i) => {
    boxes[i].classList.add("reed");
  });
}

function onMove(event) {
  const x = currentPosition % width;

  boxes[currentPosition].classList.remove("frodo");
  if (event.code === "ArrowRight") {
    if (x < 9) {
      currentPosition++;
    }
  } else if (event.code === "ArrowLeft") {
    if (x > 0) {
      currentPosition--;
    }
  } else if (event.code === "ArrowDown") {
    if (currentPosition + width < numberOfBoxes) {
      currentPosition += width;
    }
  } else if (event.code === "ArrowUp") {
    if (currentPosition - width >= 0) {
      currentPosition -= width;
    }
  }

  boxes[currentPosition].classList.add("frodo");
}

function moveNazgul() {
  nazgulSprite.forEach((nazgulPosition) => {
    const currentIndex = nazgulSprite.indexOf(nazgulPosition);
    let nextIndex;
    if (currentDirection === "left") {
      nextIndex = nazgulPosition + 1;
    } else {
      nextIndex = nazgulPosition - 1;
    }
    if (nextIndex < 72 || nextIndex > 80) {
      if (currentDirection === "right") {
        nextIndex = 80;
      } else {
        nextIndex = 72;
      }
    }
    boxes[nazgulPosition].classList.remove("nazgul");
    boxes[nextIndex].classList.add("nazgul");
    nazgulSprite[currentIndex] = nextIndex;
  });
}

function moveTrolls() {
  trollSprite.forEach((trollPosition) => {
    const currentIndex = trollSprite.indexOf(trollPosition);
    let nextIndex;
    if (currentDirection === "right") {
      nextIndex = trollPosition + 1;
    } else {
      nextIndex = trollPosition - 1;
    }
    if (nextIndex < 63 || nextIndex > 71) {
      for (let i = 0; i < 1; i++) {
        if (currentDirection === "left") {
          nextIndex = 71;
        } else {
          nextIndex = 63;
        }
      }
    }
    boxes[trollPosition].classList.remove("troll");
    boxes[nextIndex].classList.add("troll");
    trollSprite[currentIndex] = nextIndex;
  });
}

function moveRaftTop() {
  raftSpriteTop.forEach((raftPosition) => {
    const currentIndex = raftSpriteTop.indexOf(raftPosition);
    let nextIndex;
    if (currentDirection === "right") {
      nextIndex = raftPosition + 1;
    } else {
      nextIndex = raftPosition - 1;
    }
    if (nextIndex < 36 || nextIndex > 44) {
      if (currentDirection === "left") {
        nextIndex = 44;
      } else {
        nextIndex = 36;
      }
    }
    if (boxes[raftPosition].classList.contains("frodo")) {
      currentPosition = nextIndex;
      boxes[raftPosition].classList.remove("frodo");
      boxes[nextIndex].classList.add("frodo");
    }
    boxes[raftPosition].classList.remove("raft");
    boxes[nextIndex].classList.add("raft");
    raftSpriteTop[currentIndex] = nextIndex;
  });
}

function moveRaftBottom() {
  raftSpriteBottom.forEach((raftPosition) => {
    const currentIndex = raftSpriteBottom.indexOf(raftPosition);
    let nextIndex;
    if (currentDirection === "left") {
      nextIndex = raftPosition + 1;
    } else {
      nextIndex = raftPosition - 1;
    }
    if (nextIndex < 45 || nextIndex > 53) {
      if (currentDirection === "right") {
        nextIndex = 53;
      } else {
        nextIndex = 45;
      }
    }
    if (boxes[raftPosition].classList.contains("frodo")) {
      currentPosition = nextIndex;
      boxes[raftPosition].classList.remove("frodo");
      boxes[nextIndex].classList.add("frodo");
    }
    boxes[raftPosition].classList.remove("raft");
    boxes[nextIndex].classList.add("raft");
    raftSpriteBottom[currentIndex] = nextIndex;
  });
}

function moveOrc() {
  orcSprite.forEach((orcPosition) => {
    const currentIndex = orcSprite.indexOf(orcPosition);
    let nextIndex;
    if (currentDirection === "left") {
      nextIndex = orcPosition + 1;
    } else {
      nextIndex = orcPosition - 1;
    }
    if (nextIndex < 18 || nextIndex > 26) {
      if (currentDirection === "right") {
        nextIndex = 26;
      } else {
        nextIndex = 18;
      }
    }
    boxes[orcPosition].classList.remove("orc");
    boxes[nextIndex].classList.add("orc");
    orcSprite[currentIndex] = nextIndex;
  });
}
function moveWitchKing() {
  witchKingSprite.forEach((witchKingPosition) => {
    const currentIndex = witchKingSprite.indexOf(witchKingPosition);
    let nextIndex;
    if (currentDirection === "right") {
      nextIndex = witchKingPosition + 1;
    } else {
      nextIndex = witchKingPosition - 1;
    }
    if (nextIndex < 9 || nextIndex > 17) {
      if (currentDirection === "left") {
        nextIndex = 17;
      } else {
        nextIndex = 9;
      }
    }
    boxes[witchKingPosition].classList.remove("witchking");
    boxes[nextIndex].classList.add("witchking");
    witchKingSprite[currentIndex] = nextIndex;
  });
}

function moveFlyingNazgul() {
  flyingNazgulSprite.forEach((flyingNazgulPosition) => {
    const currentIndex = flyingNazgulSprite.indexOf(flyingNazgulPosition);
    let nextIndex;
    if (currentDirection === "right") {
      nextIndex = flyingNazgulPosition + 1;
    } else {
      nextIndex = flyingNazgulPosition - 1;
    }
    if (nextIndex < 0 || nextIndex > 8) {
      if (currentDirection === "left") {
        nextIndex = 8;
      } else {
        nextIndex = 0;
      }
    }
    boxes[flyingNazgulPosition].classList.remove("flying-nazgul");
    boxes[nextIndex].classList.add("flying-nazgul");
    flyingNazgulSprite[currentIndex] = nextIndex;
  });
}

const moveAll = () => {
  moveSprite = setInterval(() => {
    moveNazgul();
    moveTrolls();
    moveRaftBottom();
    moveRaftTop();
    moveOrc();
    moveWitchKing();
    moveFlyingNazgul();
  }, 700);
};

const timeLeft = () => {
  timerId = setInterval(() => {
    timer.innerText = currentTime;
    currentTime--;
  }, 1000);
};

const resetTimer = () => {
  timerId = null;
  timer.innerText = currentTime;
  currentTime = 30;
};

const gameEnd = () => {
  resultCheck = setInterval(() => {
    youLose();
    youWin();
    livesCount();
  }, 200);
};

function onClick() {
  timeLeft();
  moveAll();
  gameEnd();
  startButton.style.display = "none";
  document.addEventListener("keyup", onMove);
  instructions.innerText = "Hurry! Time is running out!";
  livesRemaining.innerText = "Lives remaining: " + lives;
  countDown.innerHTML = 30;
  themeMusic.pause();
  themeMusic.src = "../assets/Main Theme.mp3";
  themeMusic.load();
  themeMusic.play();
}

function livesCount() {
  if (
    boxes[currentPosition].classList.contains("nazgul") ||
    boxes[currentPosition].classList.contains("troll") ||
    (boxes[currentPosition].classList.contains("marsh") &&
      !boxes[currentPosition].classList.contains("raft")) ||
    boxes[currentPosition].classList.contains("orc") ||
    boxes[currentPosition].classList.contains("witchking") ||
    boxes[currentPosition].classList.contains("flying-nazgul")
  ) {
    lives--;
    boxes[currentPosition].classList.remove("frodo");
    currentPosition = 85;
    boxes[currentPosition].classList.add("frodo");
    livesRemaining.innerText = "Lives remaining: " + lives;
  }
}

function youWin() {
  if (boxes[currentPosition].classList.contains("mordor")) {
    clearInterval(timerId);
    instructions.innerText = "You saved Middle Earth!";
    boxes[currentPosition].classList.remove("frodo");
    currentPosition = 85;
    boxes[currentPosition].classList.add("frodo");
    document.removeEventListener("keyup", onMove);
    themeMusic.pause();
    themeMusic.src = "../assets/WinTheme.mp3";
    themeMusic.load();
    themeMusic.play();
    console.log(themeMusic);
    clearInterval(resultCheck);
    clearInterval(moveSprite);
    playAgain();
    lives = 3;
  }
}

function youLose() {
  if (currentTime <= 0 || lives === 0) {
    console.log(currentPosition);
    boxes[currentPosition].classList.remove("frodo");
    currentPosition = 85;
    boxes[currentPosition].classList.add("frodo");
    document.removeEventListener("keyup", onMove);
    clearInterval(timerId);
    themeMusic.pause();
    themeMusic.src = "../assets/LoseTheme.mp3";
    themeMusic.load();
    themeMusic.play();
    instructions.innerText = "Middle Earth is doomed!";
    clearInterval(moveSprite);
    clearInterval(resultCheck);
    playAgain();
    lives = 3;
  }
}

function playAgain() {
  const resetButton = document.createElement("button");
  resetButton.innerHTML = "Play Again";
  resetButton.id = "reset-button";
  resetButton.classList.add("reset-button");
  instructions.appendChild(resetButton);
  clearInterval(resultCheck);
  resetButton.addEventListener("click", onClick);
  resetTimer();
  lives = 3;
}

function toggleMusic() {
  if (isPlaying) {
    themeMusic.pause();
    playPauseButton.innerHTML = "&#9658;";
    isPlaying = false;
  } else {
    themeMusic.play();
    playPauseButton.innerHTML = "||";
    isPlaying = true;
    console.log(themeMusic);
  }
}

startButton.addEventListener("click", onClick);
playPauseButton.addEventListener("click", toggleMusic);
createGrid();
// themeMusic.play();

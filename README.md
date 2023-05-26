# SEI Project 1 - Frogger Game
This is the first big project that I have completed. It is a grid-based game developed using HTML, CSS, and JavaScript, modelled on Frogger with a Lord of the Rings theme. In place of a frog, the user will control Frodo and the objective is to navigate him up the grid to Mount Doom using keyboard inputs. The player must avoid enemies that can kill Frodo, resulting in the loss of one of three lives and eventual defeat. Additionally, a thirty-second countdown timer adds to the challenge, ending in defeat if it should reach zero.

You can play the game [here](https://karaguarraci.github.io/)

## Tech Stack
- HTML
- CSS
- JavaScript

## Project Brief
- Render a game in the browser
- Be built on a grid
- Design logic for winning & visually display which player won
- Include separate HTML / CSS / JavaScript files
- Deploy your game online

## Timeframe

2 weeks | Solo project

## Planning
During planning, I first divided the project into different stages, each with specific objectives. 
Initially, I spent time planning by creating a wireframe to outline the desired game functionalities and initial thoughts on styling. I then spent the time we had over the holiday researching how to implement these and updating my wireframe. 
I allocated a large portion of time to focussing on the fundamental features and basic styling to ensure I had a working game by the project end. However, implementing some of the features I had planned proved more challenging than anticipated given the timeline and I had to revise my initial plan. Towards the end of the project timeline, I had an opportunity to incorporate stretch goals such as the lives system and timer. Additionally, I focused on further refining the styling to fully realise the Lord of the Rings theme.


After deciding on creating a Lord of the Rings Frogger game, I began planning by considering the game's features and functionality, as well as the styling. To accomplish this, I created a wireframe using Excalidraw. I carefully thought about the various elements I intended to include in the game and the corresponding logic required to implement each feature. Although some aspects were challenging to fully understand during the planning stage, I was able to include them with ongoing research and trial and error during the coding phase.

<img src="https://github.com/karaguarraci/karaguarraci.github.io/assets/115991254/22c21724-3268-481a-9da7-dd6936ac4cd1" alt="project wireframe" width="450">

## Build/Code Process

### Planning

This was my first day planning the project, I had decided on a Lord of the Rings inspired Frogger game. I made up my initial wireframe and thought about how I could make the grid and how that would then lead into the other parts of my game, such as pinpointing separate parts to add in enemies or parts of the background. During my research over the next couple of weeks I had initially thought to make the grid using HTML as I could then pinpoint areas using classes. I decided against this and found a way of creating the grid using JavaScript, which made the code a lot more concise. 

### MVP

I started to build the basics of my game, beginning with creating the grid using JavaScript seen in the snippet below:

```js
function createGrid() {
  for (let index = 0; index < numberOfBoxes; index++) {
    const box = document.createElement("div");
    // box.innerText = index;
    document.querySelector(".grid").appendChild(box);
    boxes.push(box);
  }
```
This was a much more concise way of creating the grid than I had originally planned on using in HTML. 

At this stage I also added my enemy sprites, character and marshes onto the grid and was able to move my character using the arrow keys on the keyboard. I struggled to add the classes to my divs using JavaScript at first and could not quite figure out how to add the background colour to make the marshes, which was the river element of my game. I have detailed how I was able to overcome this, as well as adding in my sprites, in the challenges section of my ReadMe. 

The next step was to get the sprites to move, as they were the ‘enemies’ that the character had to avoid in order to make it to the end. To achieve this and have them only stay in their row and not move around the grid, I needed to use forEach and multiple if statements as shown below: 

```js
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
```
I have written the same function for each moving sprite, with slight variations depending on the direction of their movement. However, in hindsight, I realise that this approach resulted in a considerable amount of repetitive code. If I were to revisit this project in the future, I would aim to find a more concise and efficient method of implementing these functions, which would improve the code's readability and maintainability.

Following on from this, I needed to ensure that my character would reset to the beginning after colliding with an enemy or entering the water of the marshes. I was able to do this by using the code below in my youLose function: 

```js
if (
    boxes[currentPosition].classList.contains("nazgul") ||
    boxes[currentPosition].classList.contains("troll") ||
    (boxes[currentPosition].classList.contains("marsh") &&
      !boxes[currentPosition].classList.contains("raft")) ||
    boxes[currentPosition].classList.contains("orc") ||
    boxes[currentPosition].classList.contains("witchking") ||
    boxes[currentPosition].classList.contains("flying-nazgul")
  ) {
    boxes[currentPosition].classList.remove("frodo");
    currentPosition = 85;
    boxes[currentPosition].classList.add("frodo");
    }
```

The purpose of this code was to ensure that if Frodo is on a square with any of the enemies or the marsh without a raft, then it will remove Frodo from the current position on the grid and reset the current position to the start and then add frodo back to the current position. 

Following this, the next objective was to create a start menu for the game, however I had decided to keep this on the same page as the game. The start menu was designed to contain an introduction, instructions and a start button. The start button was given an onClick function that called the relevant functions for the game to begin, and also altered the innerText and innerHTML to display the timer and remaining lives.

```js
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
```
<img src="https://github.com/karaguarraci/karaguarraci.github.io/assets/115991254/5cfe93d1-8222-41d5-b536-3c1718b02ee2" alt="game screenshot" width="250">
<img src="https://github.com/karaguarraci/karaguarraci.github.io/assets/115991254/1fe071a2-4f0b-4704-8738-e568c7efcadf" alt="game screenshot" width="250">


At a certain point, I noticed that the character was not moving with the rafts, causing them to fall into the water and reset. To address this issue, I needed to ensure that Frodo moved with the "raft" class by checking if the current position contains the "raft" class and updating the current position accordingly using an if statement. Specifically, I checked if the raft position contained the "frodo" class and set the current position, represented by Frodo's position, to the next index, represented by the position of the raft. I also removed the "frodo" class from the old position and added it to the new position. This way, Frodo would move along with the rafts and avoid falling into the water:

```js
if (boxes[raftPosition].classList.contains("frodo")) {
      currentPosition = nextIndex;
      boxes[raftPosition].classList.remove("frodo");
      boxes[nextIndex].classList.add("frodo");
    }
```

I also implemented a "youWin" function to determine when the player reaches the finish point and wins the game. Within this function, I added a condition to check whether the current position contains the "mordor" class, indicating that the player has won. Upon winning, the function changes the background music, updates the text of the start menu, and stops all movement in the game. Additionally, a "Play Again" button appears, allowing the player to restart the game. This button also appears if the player loses the game.

<img src="https://github.com/karaguarraci/karaguarraci.github.io/assets/115991254/8f638797-dc40-4d9a-bada-c2b7eb316a31" alt="game screenshot" width="250">

### Stretch goals and Styling

I had incorporated some basic styling into the game, but wanted to spend the remaining time refining its appearance while also working on some stretch goals. My goal was to add a countdown to increase the game's level of difficulty, along with 3 lives for the character to make the game more engaging. While challenging, I succeeded in implementing both of these features.
To begin, I created a variable called currentTime and initialised it to 30. Next, I created a function called timeLeft, which displays the countdown timer on the page in an empty div element that I added to the HTML file. Using setInterval, this function reduces the timer value by 1 every second, providing players with a sense of urgency as they work to complete the game before time runs out.

```js
const timeLeft = () => {
  timerId = setInterval(() => {
    timer.innerText = currentTime;
    currentTime--;
  }, 1000);
};
```

Within the “youWin” and “youLose” functions, I added clearInterval(timerId) to stop the timer. 
In addition to the countdown timer, I added a ‘lives’ system to the game. When the character collides with certain obstacles, such as trolls or orcs, their lives decrease by one. The game continues until the player has no lives left. To display the remaining lives, I added a new div element to the HTML file and updated its inner text every time the player loses a life.

Overall, these new features add both difficulty and replay value to the game, making it more engaging and challenging for players.

## Finished Product

<img src="https://github.com/karaguarraci/karaguarraci.github.io/assets/115991254/285d9bdc-4fc4-45a0-96d8-fd575eca4ff9" alt="game screenshot" width="450">

## Challenges

I had several challenges throughout this project that I needed to overcome in order to have a working game. 


Initially, I faced challenges trying to add classes to my divs using JavaScript, particularly in adding a background colour to simulate a river. I was only able to change the background for one box and not all that I required. Fortunately, with some research and collaborative discussions with peers, I was able to resolve the issue. I created a new array to target the boxes I wanted to alter the class for, but I encountered further problems. After some debugging, I realised that I had created a duplicate variable 'squares,' which was already declared as 'boxes.' To incorporate my sprites, I used a similar approach, but it was not very readable. To resolve this I used the forEach method. 

```js
const deadMarshes = [
  36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
];

deadMarshes.forEach((i) => {
    boxes[i].classList.add("marsh");
  });
```

#### Original Code
```js
function addNazgul() {
for (let i = 0; i < nazgulSprite.length;  i++){   
boxes[nazgulSprite[i]].classList.add("nazgul");
 }}
```
#### Updated Code
```js
nazgulSprite.forEach((i) => {
    boxes[i].classList.add("nazgul");
  });
```

Another problem I encountered was an issue with the collision detection between the character and enemy sprites. While I had written the required logic for this feature, it did not work as intended. After examining my code, I realised that the function was being called immediately and only once, leading to the function running before the character moved and subsequently not running again. To resolve this issue, I implemented a setInterval to enable the function to run every 200 milliseconds, continuously checking for collisions between the character and the enemy sprites.

## Wins

One of my stretch goals, as mentioned above, was to add a ‘lives’ feature to my game, something I was unsure I would be able to implement at this stage. 


To implement the "lives" feature, I created a function called livesCount(). This function replaces the collision conditions used in the youLose() function but also subtracts one life from the player's remaining lives count each time Frodo collides with an enemy sprite.

I then updated the youLose() function to include a condition that checks if the player's remaining lives count is equal to zero. If the condition is met, the game will end and the player will lose.

Overall, the livesCount() function and the updated youLose() function work together to add a "lives" feature to the game, which enhances gameplay and adds an additional layer of challenge.

```js
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
```
## Key Learnings

As I reflect on my first major project, I recognise that my focus on functionality resulted in code that is messy, repetitive, and difficult to read. In hindsight, I understand the importance of prioritising code structure and organisation from the outset, rather than having to refactor extensively at the end of the project.

In future projects, I plan to prioritise code structure as I work, to ensure that my code is clear, concise, and easy to navigate. By doing so, I aim to create maintainable code that is easier to read and understand, both for myself and for other developers who may work on the project in the future. Ultimately, I believe that this approach will lead to more efficient development and a better end-user experience.

## Known Bugs

During the process of adding music to my project, I initially set the start menu music to play automatically. However, upon deploying the project, I discovered that this behaviour was blocked by the browser. As a workaround, I implemented a play button for the music, which allowed the user to start the music manually.

While this solution worked, I noticed that if the user did not click the play button before starting the game, the in-game music would begin playing, but the play button would still show the "play" icon instead of the "pause" icon. This resulted in the user needing to click the button twice in order to pause the music.

In future iterations of this project, I plan to explore alternative solutions to this issue, such as automatically pausing the in-game music if the play button has not been clicked. By addressing this issue, I aim to enhance the overall user experience and ensure that the music feature functions as intended.

## Future Improvements

As I reflect on my project, my main area for improvement lies in refactoring the code to make it more readable and less repetitive. Additionally, I would like to enhance the styling of the project and improve its responsiveness, as the current version does not maintain its appearance on smaller screens. 
In addition to code and design improvements, I would also like to address a functional issue with the game's raft feature. Specifically, I plan to modify the code to ensure that the raft remains visible even when Frodo is on it, rather than disappearing from view.
By making these improvements, I believe that the overall user experience of the project will be enhanced, resulting in a more engaging and enjoyable game.

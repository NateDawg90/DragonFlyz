# Penelope the Penguin

[NateDawg90.github.io/dragonflyz][game] is a browser game created in Javascript by Nathan Johnson.

![Game Screen: ][game_screen]

### Background

This is a sidescrolling neverending swimming game starring a penguin. The objective is to swim for as long as possible without hitting a wall or going off the screen.

### Functionality & MVP  

With this game, users are able to:

- [ ] Start and reset the game
- [ ] Play the game correctly and without bugs
- [ ] See the current highscore

In addition, this project will include:

- [ ] A section describing the goal and controls of the game
- [ ] A production Readme

## Controls

Holding click or the spacebar will cause the penguin to dive into the water gradually, then more quickly.

## Rules

The penguin will constantly swim with the same horizontal velocity. If you collide with a wall, which will be going up and down the screen, you will have to start over. You also lose if you wall off the screen or swim too low or high and go off the screen.

## Display

The game canvas will take up the entire browser. There will be a prompt screen where you press spacebar or click to begin, then the penguin will automatically swim forward.  The high score will be displayed in the upper right corner.


### View

This app will consist of a single screen with game board and nav links to the Github, my LinkedIn, and the About modal.  The highscore will be displayed in the upper-right corner of the screen.  The penguin will start on the left side of the screen in the vertical center of the screen.


### Architecture and Technologies


Special credit goes to Pete Goodman (website) for inspiration on the framework for a similar helicopter game.



This project was be implemented with the following technologies:

- Vanilla JavaScript for overall structure and game logic,
- Webpack to bundle and serve up the various scripts.

Constants are declared for penguin properties, such as dimensions and speed vectors. Physics properties are also defined for terminal velocity, gravity and friction coefficients. As for the obstacles and walls, their width, height, separation, and various other properties are defined.   

Functionally, the game first creates the background and the penguin and resets the game data. It then creates the initial walls and runs a draw function that keeps calling itself until the game has been ended (the player dies). Obstacles are generated randomly and given a constant velocity with which to move across the screen.

A key listener listens for the user's input, and if it is given, the penguin moves vertically in a direction reverse to gravity. Otherwise, gravity carries it up.

a checkForImpact() function checks to see if the penguin has collided with any of the obtacles or walls. If so, an endgame state is reached. A death text, randomly generated, will flash on the screen, and the game will stop moving. Another user input restarts the game.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running.  Create `webpack.config.js` as well as `package.json`. Find graphics to use for the game. Write a basic entry file and the bare bones of all 3 scripts outlined above.  Goals for the day:

- Get a green bundle with `webpack`
- Have graphics picked out for water, penguin, walls, etc.
- Learn enough about rendering a 2D board on the canvas element
- Study other APIs that have similar game results

**Day 2**: This is the start of the board and game classes and libraries. Build out the `Board` object.  Then, use `board.js` to create and render the penguin and some obstacles. Create vector and speed logic for the obstacles. Have user input control the penguin. Goals for the day:

- Complete the `board.js` module (constructor)
- Render a penguin object to the `Canvas`
- Render obstacles in front of the penguin
- Create velocity utilities
- Be able to move penguin with spacebar or click

**Day 3**: Build in the ability to toggle the start of the game which will start the penguin moving up and forward. Build conditions for the penguin having collided, and the penguin being off the board. Start, reset buttons. Set both of these as conditions for having failed the game. Have the game working. Goals for the day:

- Have the game working, from start to penguin death


**Day 4**: Create modal showing game concept and controls. Create highscore element. Style the frontend, making it polished and professional.  Goals for the day:

- Working game with modal and highscore
- Have a styled `Canvas`, nice looking controls and title


### Bonus features

There are many directions this game app could eventually go.  Some anticipated updates are:

- [ ] Add laser powerups allowing penguin to shoot lasers that destroy walls
- [ ] Add spikes on top and bottom of water that kill penguin when collided

[game_screen]: ./assets/game_screen.png "Penelope the Penguin game Display"

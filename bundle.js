/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(1);
	__webpack_require__(5);

	// document.write(require("./content.js"));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "* {\n  padding: 0; margin: 0;\n}\n\nbody {\n  display: flex;\n  flex-direction: column;\n}\n\n#by {\n  font-size: 20px;\n  font-weight: bold;\n  font-family: sans-serif;\n  color: black;\n}\n\n#controls {\n  font-size: 20px;\n  font-weight: bold;\n  font-family: sans-serif;\n  color: black;\n}\n\n#header {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n\n}\n\n#title {\n  font-size: 40px;\n  font-weight: bold;\n  color: #0C1BA0;\n  font-family: 'Pacifico';\n}\n#myCanvas {\n  background: blue;\n  /*display: block;*/\n  display: flex;\n  flex-direction: column;\n  margin: 0 auto;\n}\n\ndiv {\n  color: red;\n}\n\n#scorecontainer {\n  display: flex;\n  justify-content: space-around;\n}\n\n#scorecontainer * {\n  font-weight: bold;\n  color: black;\n  font-size: 20px;\n}\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	// var canvas = document.getElementById("myCanvas"),
	// ctx, width, height,
	//
	// score = 0,
	// best = 0,
	//
	// // penguin
	// x = 60,
	// y = canvas.height/2,
	// dx = 0,
	// dy = -7,
	// penguinRadius = 25,
	// swimPressed = false,
	//
	// currentState,
	// states = {
	//   splash: 0, game: 1, score: 2
	// },
	//
	// penguin = [],
	// walls = [];
	//
	// function main() {
	//   canvas.document.createElement('canvas');
	//
	//   width = window.innerWidth;
	//   height = window.innerHeight;
	//
	//   if (width >= 500) {
	//     width = 320;
	//     height = 480;
	//     canvas.style.border = '1px solid #000';
	//   }
	//
	//   canvas.width = width;
	//   canvas.height = height;
	//   ctx = canvas.getContext("2d");
	//
	//   document.body.appendChild(canvas);
	//
	//   var img = new Image();
	//   img.onload = function() {
	//     console.log("loading");
	//   };
	//   img.src = 'assets/penguin.pg';
	// }
	//
	// function run() {
	//
	// }
	// function update() {
	//
	// }
	//
	// function render() {
	//
	// }
	//
	// main();

	var canvas = document.getElementById('myCanvas'),
	    penguinCanvas = document.getElementById('penguin'),
	    ctx = canvas.getContext("2d"),
	    refreshRate = 20,
	    penguin = {
	    width: 50,
	    height: 20,
	    topSpeed: 5,
	    acceleration: -0.2,
	    img: null
	},
	    physics = {
	    terminalVelocity: -3.5,
	    gravity: -.5,
	    friction: .8
	},
	    walls = {
	    separation: 30,
	    width: 30,
	    step: 10,
	    startHeight: 60,
	    maxHeight: 120,
	    heightIncreaseInterval: 5,
	    heightIncreaseStep: 10
	},
	    obstacles = {
	    separation: 150,
	    width: 40,
	    height: 80
	},
	    colors = {
	    bg: "#0c1ba0",
	    fill: "#723c09",
	    penguin: "#ffff00"
	},
	    gameData = {
	    penguin: {
	        x: 20,
	        y: 0,
	        speed: 0,
	        rotation: 0
	    },
	    walls: {
	        counter: 0,
	        currentHeight: 0,
	        currentStep: 0,
	        heightIncreaseInterval: 0, // fudge
	        current: []
	    },
	    obstacles: {
	        counter: 0,
	        current: []
	    }
	},
	    scores = {
	    current: 0,
	    top: 0,
	    elements: {
	        current: null,
	        top: null
	    },
	    halfStep: 0 // fudge
	},
	    canvasInterval = null,
	    mouseDown = false,
	    gameRunning = false,
	    deathText = false,
	    scoreCont = document.createElement('div');
	scoreCont.id = 'scorecontainer';
	insertAfter(scoreCont, canvas);

	initScoring();
	createBG();

	// set the intial copter game data
	resetGameData();

	// create penguin element
	createPenguin();

	// create initial floor & ceiling
	createInitialWalls();

	// set a mouse listener to start the game
	initKeyListener();

	function init() {
	    initScoring();
	    createBG();

	    // set the intial copter game data
	    resetGameData();

	    // create copter element
	    createPenguin();

	    // create initial floor & ceiling
	    createInitialWalls();

	    // set a mouse listener to start the game
	    initKeyListener();
	}

	function createBG() {

	    // get the global draw context
	    // var draw = ctx;

	    // draw the outer rounded rectangle
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    ctx.beginPath();
	    roundedRect(ctx, 0, 0, canvas.width, canvas.height, 10);
	    ctx.fillStyle = colors.bg;
	    ctx.fill();
	}

	function resetGameData() {

	    // reset current score
	    scores.current = scores.elements.current.innerHTML = 0;

	    // reset 'y' position of penguin
	    gameData.penguin.y = Math.round(canvas.height / 2);

	    // reset the starting height of the walls
	    gameData.walls.currentHeight = walls.startHeight;

	    // reset the steps between wall heights
	    gameData.walls.currentStep = walls.step;

	    // set first obstacle to start straight away
	    gameData.obstacles.counter = obstacles.separation - obstacles.width;

	    // remove all obstacles
	    gameData.obstacles.current.length = 0;

	    // remove all walls
	    gameData.walls.current.length = 0;

	    // reset death text
	    if (!!deathText) {
	        deathText.style.display = "none";
	    }

	    // create initial floor and ceiling
	    createInitialWalls();
	}

	function createPenguin() {

	    // get the global draw context
	    // var draw = ctx;

	    // condition : calculate penguin position based on whether the mouse is currently held down
	    if (mouseDown === true) {
	        gameData.penguin.speed -= penguin.acceleration;
	        if (gameData.penguin.speed < -penguin.topSpeed) gameData.penguin.speed = -penguin.topSpeed;
	        gameData.penguin.rotation = gameData.penguin.rotation + 0.01;
	        if (gameData.penguin.rotation > 0.25) gameData.penguin.rotation = 0.25;

	        // mouse button not held down
	    } else {
	        gameData.penguin.speed = (gameData.penguin.speed + physics.gravity) * physics.friction;
	        if (gameData.penguin.speed > physics.terminalVelocity) gameData.penguin.speed = physics.terminalVelocity;
	        gameData.penguin.rotation = gameData.penguin.rotation - 0.02;
	        if (gameData.penguin.rotation < -0.2) gameData.penguin.rotation = -0.2;
	    }

	    // set new Y position
	    gameData.penguin.y = gameData.penguin.y + gameData.penguin.speed;

	    // create and position penguin element
	    ctx.save();
	    ctx.translate(gameData.penguin.x, gameData.penguin.y);
	    ctx.rotate(gameData.penguin.rotation);

	    // condition : if an image is specified, use it
	    if (penguin.img) {

	        // create penguin element
	        var penguinImg = new Image();
	        penguinImg.src = penguin.img;

	        penguinCanvas.width = 100;
	        penguinCanvas.height = 100;

	        var s_penguin = sprite({
	            context: penguinCanvas.getContext("2d"),
	            width: 137,
	            height: 72,
	            image: penguinImg
	        });

	        // when image has loaded
	        penguinImg.onload = function () {
	            s_penguin.render();
	            penguin.width = s_penguin.width;
	            penguin.height = s_penguin.height;
	        };

	        // penguinImg.onload = function() {
	        //     ctx.drawImage(penguinImg, gameData.penguin.x, gameData.penguin.y, penguinImg.width, penguinImg.height);
	        //     penguin.width = penguinImg.width;
	        //     penguin.height = penguinImg.height;
	        // };

	        // no image set, use a block
	    } else {
	        ctx.beginPath();
	        roundedRect(ctx, 0, 0, penguin.width, penguin.height, 10);
	        ctx.fillStyle = colors.penguin;
	        ctx.fill();
	    }

	    ctx.restore();
	}

	function sprite(options) {

	    var that = {};

	    that.context = options.context;
	    that.width = options.width;
	    that.height = options.height;
	    that.image = options.image;

	    that.render = function () {
	        // Draw the animation
	        that.context.drawImage(that.image, 0, 0, that.width, that.height, 0, 0, that.width, that.height);
	    };
	    return that;
	}

	function roundedRect(a, x, y, width, height, radius) {
	    a.beginPath();
	    a.moveTo(x, y + radius);
	    a.lineTo(x, y + height - radius);
	    a.quadraticCurveTo(x, y + height, x + radius, y + height);
	    a.lineTo(x + width - radius, y + height);
	    a.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
	    a.lineTo(x + width, y + radius);
	    a.quadraticCurveTo(x + width, y, x + width - radius, y);
	    a.lineTo(x + radius, y);
	    a.quadraticCurveTo(x, y, x, y + radius);
	    //draw.stroke();
	}

	function initScoring() {

	    // create score html elements and add them to the page
	    scores.elements.current = createScore('current');
	    scores.elements.top = createScore('top');

	    // retrieve the current top score from cookie, if cookie script is present
	    // if (!!cookie && !!cookie.get) {
	    //     var topScore = cookie.get('topScore');
	    // }

	    // condition : if a current top score exists, set it
	    // if (topScore) {
	    //     scores.top = scores.elements.top.innerHTML = topScore;
	    // }
	}

	function createScore(scoreType) {

	    // create score element
	    var scoreContainer = document.createElement("p");
	    scoreContainer.id = scoreType + "scorecontainer";
	    var scoreContainerText = document.createTextNode(ucFirst(scoreType) + " score: ");
	    scoreContainer.appendChild(scoreContainerText);

	    // create score container, ready to return
	    var score = document.createElement("strong");
	    score.id = scoreType + "score";

	    // set the current score to 0
	    var scoreText = document.createTextNode("0");
	    score.appendChild(scoreText);
	    scoreContainer.appendChild(score);

	    // add the scores to the page
	    scoreCont.appendChild(scoreContainer);
	    // insertAfter(scoreContainer, canvas);

	    return score;
	}

	function initKeyListener() {

	    document.addEventListener("keydown", keyDownHandler, false);
	    document.addEventListener("keyup", keyUpHandler, false);

	    document.addEventListener("mousedown", keyDownHandler, false);
	    document.addEventListener("mouseup", keyUpHandler, false);

	    function keyDownHandler(e) {
	        if (e.keyCode == 32 || e.type === "mousedown") {
	            mouseDown = true;
	            if (gameRunning === false) {
	                startGame();
	            }
	        }
	    }

	    function keyUpHandler(e) {
	        if (e.keyCode == 32 || e.type === "mouseup") {
	            mouseDown = false;
	        }
	    }
	}

	function startGame() {

	    // reset game data
	    resetGameData();

	    // set running variable
	    gameRunning = true;

	    // set interval to start the game
	    // canvasInterval = setInterval('draw()', refreshRate);
	    draw();
	}

	function draw() {

	    // check for impact
	    var impact = checkForImpact();

	    // condition : check for an impact
	    if (impact === false) {

	        // update graphics
	        createBG();
	        createPenguin();
	        createWalls();
	        createObstacles();

	        // update score
	        updateScore();
	        requestAnimationFrame(draw);

	        // condition : an impact has occurred, end the game
	    } else {
	        endGame();
	    }
	}

	function checkForImpact() {

	    // condition : OBSTACLES - only want to check for impacts on the latest, if it's in range
	    if (gameData.obstacles.current.length >= 1) {

	        // loop through the obstacles
	        for (var x = gameData.obstacles.current.length - 1; x >= 0; x--) {

	            // only check the current obstacle if it overlaps horizontally with the penguin
	            if (gameData.obstacles.current[x].x >= gameData.penguin.x && gameData.obstacles.current[x].x <= gameData.penguin.x + obstacles.width) {
	                // condition : check for impacts on obstacles in range
	                if (gameData.penguin.y >= gameData.obstacles.current[x].y && gameData.penguin.y <= gameData.obstacles.current[x].y + obstacles.height) {
	                    return true;
	                }
	            }
	        }
	    }

	    // loop through walls that we need to do detection
	    for (var i = 0; i < gameData.walls.current.length; i++) {

	        if (gameData.walls.current[i].x < walls.width + penguin.width) {

	            // condition : check for impacts on the walls that are in range
	            if ((gameData.walls.current[0].width == canvas.width + walls.width || // first wall
	            gameData.walls.current[i].x >= 0 // all other walls
	            ) && (gameData.penguin.y < gameData.walls.current[i].height || //top
	            gameData.penguin.y > canvas.height - penguin.height - (gameData.walls.current[i].y - gameData.walls.current[i].height) // bottom
	            )) {
	                return true;
	            }
	        }
	    }

	    // condition : final impact check - if somehow the penguin has gone off screen, above or below
	    if (gameData.penguin.y < 0 || gameData.penguin.y > canvas.height - penguin.height) {
	        return true;
	    }

	    // no impact detected
	    return false;
	}

	function createInitialWalls() {

	    // get the global draw context
	    // var ctx = ctx;

	    // generate values for the new wall
	    var newwall = {
	        x: 0,
	        y: gameData.walls.currentHeight,
	        width: canvas.width + walls.width,
	        height: gameData.walls.currentHeight / 2
	    };

	    // add wall to the array
	    gameData.walls.current.push(newwall);

	    // ctx ceiling
	    ctx.save();
	    ctx.beginPath();
	    ctx.fillStyle = colors.fill;
	    ctx.fillRect(newwall.x, 0, newwall.width, newwall.height);
	    ctx.fill();
	    ctx.restore();

	    // ctx floor
	    ctx.beginPath();
	    ctx.fillStyle = colors.fill;
	    ctx.fillRect(newwall.x, canvas.height - newwall.height, newwall.width, newwall.height);
	    ctx.fill();
	}

	function createWalls() {

	    // get the global draw context
	    // var draw = ctx;

	    // condition : if the separation (between walls) has been reached, create a new wall
	    if (gameData.walls.counter++ >= Math.floor(walls.separation / penguin.topSpeed)) {

	        // get previous wall height
	        var previousHeight = gameData.walls.current[gameData.walls.current.length - 1].height;

	        // random decision, whether to increase or decrease the height (either 0 or 1)
	        var plusMinus = Math.round(Math.random());

	        // throw in the occasional bigger jump in wall positioning...
	        var bigOne = Math.round(Math.random() * 10);

	        // set variable that will contain new height
	        var newHeight;

	        // condition : calculate the new height
	        if (bigOne == 10) {
	            newHeight = gameData.walls.currentHeight / 2;
	        } else if (plusMinus == 1) {
	            newHeight = previousHeight + Math.floor(Math.random() * gameData.walls.currentStep);
	        } else {
	            newHeight = previousHeight - Math.floor(Math.random() * gameData.walls.currentStep);
	        }

	        // condition : stop the height going too...high
	        if (newHeight > gameData.walls.currentHeight) {
	            newHeight = gameData.walls.currentHeight - gameData.walls.currentStep;
	        }

	        // condition : stop the height going too...low
	        if (newHeight < 0) {
	            newHeight = gameData.walls.currentStep;
	        }

	        // generate values for the new wall
	        var newwall = {
	            x: canvas.width,
	            y: gameData.walls.currentHeight,
	            width: walls.width,
	            height: newHeight
	        };

	        // add wall to the array
	        gameData.walls.current.push(newwall);

	        // reset wall separation counter
	        gameData.walls.counter = 0;
	    }

	    // ctx every wall in the array
	    for (var i = 0; i < gameData.walls.current.length; i++) {

	        // ctx ceiling
	        ctx.save();
	        ctx.beginPath();
	        ctx.fillStyle = colors.fill;
	        ctx.fillRect(gameData.walls.current[i].x -= penguin.topSpeed, 0, gameData.walls.current[i].width, gameData.walls.current[i].height);
	        ctx.fill();
	        ctx.restore();

	        // ctx floor
	        ctx.beginPath();
	        ctx.fillStyle = colors.fill;
	        ctx.fillRect(gameData.walls.current[i].x, canvas.height - (gameData.walls.current[i].y - gameData.walls.current[i].height), gameData.walls.current[i].width, gameData.walls.current[i].y - gameData.walls.current[i].height);
	        ctx.fill();

	        // condition : if the last wall in the array has disappeared off screen, remove it
	        if (gameData.walls.current[i].x <= -(2 * gameData.walls.current[i].width)) {
	            gameData.walls.current.splice(i, 1);
	        }
	    }
	}

	function createObstacles() {

	    // get the global draw context
	    // var draw = ctx;

	    // condition : if the separation (between obstacles) has been reached, create a new obstacle
	    if (gameData.obstacles.counter++ >= Math.floor(obstacles.separation / penguin.topSpeed)) {

	        // condition : increase the current height of the walls every x number of times
	        if (gameData.walls.currentHeight <= walls.maxHeight && walls.heightIncreaseInterval > 0 && gameData.walls.heightIncreaseInterval++ == walls.heightIncreaseInterval) {

	            // increase the potential height of each wall
	            gameData.walls.currentHeight += walls.heightIncreaseStep;

	            // increase slightly the potential height difference between each wall
	            gameData.walls.currentStep++;

	            // reset counter
	            gameData.walls.heightIncreaseInterval = 0;
	        }

	        // generate values for the new obstacle
	        var newObstacle = {
	            x: canvas.width,
	            y: Math.floor(Math.random() * (canvas.height - 2 * gameData.walls.currentHeight) + gameData.walls.currentHeight / 2)
	        };

	        // add obstacle to the array
	        gameData.obstacles.current.push(newObstacle);

	        // reset obstacle separation counter
	        gameData.obstacles.counter = 0;
	    }

	    // ctx every obstacle in the array
	    for (var i = 0; i < gameData.obstacles.current.length; i++) {

	        ctx.beginPath();
	        ctx.fillStyle = colors.fill;
	        roundedRect(ctx, gameData.obstacles.current[i].x -= penguin.topSpeed, gameData.obstacles.current[i].y, obstacles.width, obstacles.height, 10);
	        ctx.fill();

	        // condition : if the last obstacle in the array has disappeared off screen, remove it
	        if (gameData.obstacles.current[i].x <= -canvas.width) {
	            gameData.obstacles.current.splice(i, 1);
	        }
	    }
	}

	function updateScore() {
	    scores.halfStep = scores.halfStep == 0 ? 1 : 0;
	    if (scores.halfStep == 1) {
	        scores.current++;
	        scores.elements.current.innerHTML = scores.current;
	    }
	}

	function endGame() {

	    // condition : if the current score is higher than the top score, set it
	    if (scores.current > scores.top) {

	        // set the top score
	        scores.top = scores.current;
	        scores.elements.top.innerHTML = scores.current;

	        // set cookie containing the top score
	        // if (cookie && cookie.set) {
	        //     cookie.set('topScore', scores.current, 1000, '/');
	        // }
	    }
	    // condition : create death text ?
	    var deathPhrases = ["GOODBYE SWEET PRINCE!", "D3AD", "GAME OVER", "GIT GUD", "ANGRY FEET"];
	    deathText = document.createElement("p");
	    deathText.id = "deathtext";
	    var deathTextText = document.createTextNode(deathPhrases[Math.floor(Math.random() * deathPhrases.length)]);
	    deathText.appendChild(deathTextText);
	    // insertAfter(deathText, canvas);

	    scoreCont.appendChild(deathText);

	    // if (!deathText) {
	    //     deathText = document.createElement("p");
	    //     deathText.id = "deathtext";
	    //     var deathTextText = document.createTextNode(deathPhrases[Math.floor(Math.random()*deathPhrases.length)]);
	    //     deathText.appendChild(deathTextText);
	    //     insertAfter(deathText, canvas);
	    // } else {
	    //     deathText.style.display = "block";
	    // }

	    // stop the interval
	    clearInterval(canvasInterval);

	    // set running variable
	    gameRunning = false;
	}

	function insertAfter(newNode, referenceNode) {
	    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}

	function ucFirst(textString) {
	    //return textString.substr(0,1).toUpperCase() + textString.substr(1,textString.length);
	    return textString;
	}

	// document.addEventListener("keydown", keyDownHandler, false);
	// document.addEventListener("keyup", keyUpHandler, false);
	//
	// function keyDownHandler(e) {
	//     if(e.keyCode == 32) {
	//         swimPressed = true;
	//     }
	// }
	//
	// function keyUpHandler(e) {
	//     if(e.keyCode == 32) {
	//         swimPressed = false;
	//     }
	// }

	// function collisionDetection() {
	//     for (let c = 0; c < wallColumnCount; c++) {
	//         for (let r = 0; r < wallRowCount; r++) {
	//             var b = bricks[c][r];
	//             if (x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
	//                 dy = -dy;
	//                 b.status = 0;
	//                 score++;
	//             }
	//         }
	//     }
	// }

	// draw();

/***/ }
/******/ ]);
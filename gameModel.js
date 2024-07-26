const gameModel = (function () {
    let score = 0;
    let time = 30;
    let gameInterval;
    let moleInterval;
    let snakeInterval;
    let snakeFlag = true;
    const gameBlocks = [];

    for (let i = 0; i < 12; i++) {
        gameBlocks.push({ id: i, hasMole: false, hasSnake: false });
    }

    return {
        getScore: function () {
            return score;
        },
        getTime: function () {
            return time;
        },
        getGameBlocks: function () {
            return gameBlocks;
        },
        incrementScore: function () {
            score++;
        },
        decrementTime: function () {
            time--;
        },
        resetGame: function () {
            score = 0;
            time = 30;
            gameBlocks.forEach(block => {
                block.hasMole = false;
                block.hasSnake = false;
            });
        },
        setGameInterval: function (interval) {
            gameInterval = interval;
        },
        setMoleInterval: function (interval) {
            moleInterval = interval;
        },
        setSnakeInterval: function (interval) {
            snakeInterval = interval;
        },
        clearAllIntervals: function () {
            clearInterval(gameInterval);
            clearInterval(moleInterval);
            clearInterval(snakeInterval);
        },
        resetSnakeFlag: function () {
            snakeFlag = true;
        },
        disableSnakeFlag: function () {
            snakeFlag = false;
        },
        isSnakeFlagEnabled: function () {
            return snakeFlag;
        },
    };
})();

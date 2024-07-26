const gameController = (function (model, view) {
    function startGame() {
        model.resetGame();
        view.updateScore(model.getScore());
        view.updateTime(model.getTime());
        view.clearBoard();
        model.resetSnakeFlag();
        model.clearAllIntervals();
        model.setGameInterval(setInterval(updateTimer, 1000));
        model.setMoleInterval(setInterval(createMole, 800));
        model.setSnakeInterval(setInterval(createSnake, 2000));
    }

    function updateTimer() {
        model.decrementTime();
        view.updateTime(model.getTime());
        if (model.getTime() <= 0) {
            model.clearAllIntervals();
            view.showAlert("Time is Over !");
        }
    }

    function createMole() {
        const gameBlocks = model.getGameBlocks();
        const currentMoles = gameBlocks.filter(block => block.hasMole).length;
        if (currentMoles >= 3) return;

        const emptyBlocks = gameBlocks.filter(block => !block.hasMole && !block.hasSnake);
        const randomBlock = emptyBlocks[Math.floor(Math.random() * emptyBlocks.length)];
        randomBlock.hasMole = true;

        const blockElement = document.querySelector(`[data-id="${randomBlock.id}"]`);
        view.showMole(blockElement);

        setTimeout(function () {
            if (randomBlock.hasMole) {
                randomBlock.hasMole = false;
                view.clearBlock(blockElement);
            }
        }, 2000);
    }

    function createSnake() {
        const gameBlocks = model.getGameBlocks();
        const currentSnakes = gameBlocks.filter(block => block.hasSnake).length;
        if (currentSnakes >= 1) return;

        const emptyBlocks = gameBlocks.filter(block => !block.hasMole && !block.hasSnake);
        const randomBlock = emptyBlocks[Math.floor(Math.random() * emptyBlocks.length)];
        randomBlock.hasSnake = true;

        const blockElement = document.querySelector(`[data-id="${randomBlock.id}"]`);
        view.showSnake(blockElement);

        setTimeout(function () {
            if (randomBlock.hasSnake && model.isSnakeFlagEnabled()) {
                randomBlock.hasSnake = false;
                view.clearBlock(blockElement);
            }
        }, 2000);
    }

    function handleBlockClick(id) {
        const gameBlocks = model.getGameBlocks();
        const block = gameBlocks.find(block => block.id === id);
        if (block.hasMole) {
            block.hasMole = false;
            const blockElement = document.querySelector(`[data-id="${id}"]`);
            view.clearBlock(blockElement);
            model.incrementScore();
            view.updateScore(model.getScore());
        }
        else if(block.hasSnake){
                handleSnakeClick();
        }
    }

    function handleSnakeClick() {
        model.disableSnakeFlag();
        view.showAllSnakes(model.getGameBlocks());
        model.clearAllIntervals();
        model.resetGame();
    }


    return {
        init: function () {
            view.initBoard(model.getGameBlocks(), handleBlockClick);
            document.querySelector('.start-button').onclick = startGame;
        },
    };
})(gameModel, gameView);

gameController.init();

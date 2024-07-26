const gameView = (function () {
    const gameBoard = document.getElementById('gameBoard');
    const scoreCounter = document.getElementById('score');
    const timeCounter = document.getElementById('time');

    return {
        initBoard: function (gameBlocks, handleBlockClick) {
            gameBoard.innerHTML = '';
            gameBlocks.forEach(function (block) {
                const div = document.createElement('div');
                div.className = 'game-block';
                div.setAttribute('data-id', block.id);
                div.onclick = function () {
                    handleBlockClick(block.id);
                };
                gameBoard.appendChild(div);
            });
        },
        updateScore: function (score) {
            scoreCounter.textContent = score;
        },
        updateTime: function (time) {
            timeCounter.textContent = time;
        },
        clearBoard: function () {
            const blocks = gameBoard.querySelectorAll('.game-block');
            blocks.forEach(function (block) {
                block.innerHTML = '';
            });
        },
        showMole: function (blockElement) {
            const moleImg = document.createElement('img');
            moleImg.src = "./mole.jpg";
            moleImg.className = 'mole';
            blockElement.appendChild(moleImg);
        },
        showSnake: function (blockElement) {
            const snakeImg = document.createElement('img');
            snakeImg.src = "./snake.jpg";
            snakeImg.className = 'snake';
            blockElement.appendChild(snakeImg);
        },
        clearBlock: function (blockElement) {
            blockElement.innerHTML = '';
        },
        showAllSnakes: function (gameBlocks) {
            gameBlocks.forEach(function (block) {
                const blockElement = gameBoard.querySelector('[data-id="' + block.id + '"]');
                const snakeImg = document.createElement('img');
                snakeImg.src = "./snake.jpg";
                snakeImg.className = 'snake';
                blockElement.innerHTML = '';
                blockElement.appendChild(snakeImg);
            });
        },
        showAlert: function (message) {
            alert(message);
        },
    };
})();

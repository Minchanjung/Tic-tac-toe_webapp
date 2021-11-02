"use strict";

//gameboard module
const gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const setField = (index, sign) => {
        if (index > board.length) return;
        board[index] = sign;
    };

    const getField = (index) => {
        if (index > board.length) return;
        return board[index];
    };

    const reset = () => {
        for (let i=0; i < board.length; i++) {
            board[i] = "";
        }
    }

    return { setField, getField, reset };
})();

//factory functions to create players
const playerFactory = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign
    }
    return { getSign }
}

//module to display the game
const displayGameboard = (() => {
    const gameBoardCells = document.querySelectorAll(".cell");
    const messageElement = document.querySelector("#message");
    const resetBtn = document.querySelector("#resetButton");

    gameBoardCells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
            //console.log(gameboard.getField(parseInt(e.target.dataset.index)));
            if (gameController.getIsOver() || e.target.textContent !== "") return;
            gameController.playRound(parseInt(e.target.dataset.index));
            updateGameboard();
        })
    });

    resetBtn.addEventListener("click", (e) => {
        gameboard.reset();
        gameController.reset();
        updateGameboard();
        setMessageElement("Player X's turn");
    });
    
    const updateGameboard = () => {
        for (let i = 0; i < gameBoardCells.length; i++) {
            console.log(gameboard.getField(i));
            gameBoardCells[i].textContent = gameboard.getField(i);
        }
    };
    
    const setResultMessage = (winner) => {
        if (winner === "Draw") {
            setMessageElement("It's a draw!");
        } else {
            setMessageElement(`Player ${winner} has won!`);
        }
    };
    
    const setMessageElement = (message) => {
        messageElement.textContent = message;
    };
    
    return { setResultMessage, setMessageElement };
    
})();

const gameController = (() => {
    const playerX = playerFactory("X");
    const playerO = playerFactory("O");
    let round = 1;
    let isOver = false;

    const playRound = (fieldIndex) => {
        console.log(fieldIndex);
        gameboard.setField(fieldIndex, getCurrentPlayerSign());
        if (checkWinner(fieldIndex)) {
            displayGameboard.setResultMessage(getCurrentPlayerSign());
            isOver = true;
            return;
        }
        if (round === 9) {
            displayGameboard.setResultMessage("Draw");
            isOver = true;
            return;
        }
        round++;
        displayGameboard.setMessageElement(
            `Player ${getCurrentPlayerSign()}'s turn`
        );
    };
    
    const getCurrentPlayerSign = () => {
        console.log(playerX.getSign());
        return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
    };
    
    const checkWinner = (fieldIndex) => {
        const winConditions = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
    
        return winConditions
          .filter((combination) => combination.includes(fieldIndex))
          .some((possibleCombination) =>
            possibleCombination.every(
              (index) => gameboard.getField(index) === getCurrentPlayerSign()
            )
          );
    };
    
    const getIsOver = () => {
        return isOver;
    };
    
    const reset = () => {
        round = 1;
        isOver = false;
    };
    
    return { playRound, getIsOver, reset };
})();


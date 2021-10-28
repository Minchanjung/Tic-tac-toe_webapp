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
        for (i=0; i < board.length; i++) {
            board[i] = "";
        }
    }

    return {setField, getField, reset};
})();

//factory functions to create players
const playerFactory = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign
    }
    return {getSign}
}

let player1 = playerFactory("X");

console.log(player1)
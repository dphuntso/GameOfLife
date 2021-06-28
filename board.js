
var NEIGHBOURSCOUNT = 7;
var NeighboursCord = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

function generateRandomState() {
    if (Math.floor(Math.random() * 10) < 9) return DEAD;
    return ALIVE;
}

// get ALIVE neighbours count
function countNeighboursAlive(board, row, column, rules) {
    var neighbour = 0;
    let tempRow = 0;
    let tempCol = 0;
    let aliveCount = 0;

    // check each neighbour
    while (neighbour < NEIGHBOURSCOUNT) {
        tempRow = row + NeighboursCord[neighbour][0];
        tempCol = column + NeighboursCord[neighbour][1];
        // check if current neighbour's row is valid
        if (tempRow > -1 && tempRow < rules.ROW) {
            // check if current neighbour's column is valid
            if (tempCol > -1 && tempCol < rules.COLUMN) {
                if (board[tempRow][tempCol] == rules.ALIVE) aliveCount++;
            }
        }
        neighbour++;
    }
    return aliveCount;
}

// return the cell's state for next iteration. 
function cellNextState(board, row, column, rules) {
    let neighboursAlive = countNeighboursAlive(board, row, column, rules);
    if (board[row][column] == rules.DEAD) {
        if (neighboursAlive == 3) return rules.ALIVE;
    } else {
        if (neighboursAlive == 2 || neighboursAlive == 3) return rules.ALIVE;
    }

    // if the above two condition is not met then cell is dead for the next iteration
    return rules.DEAD;
}

// check board
function processBoard(currentBoard, nextBoard, rules) {
    let row = 0;
    while (row < rules.ROW) {
        let col = 0;
        while (col < rules.COLUMN) {
            nextBoard[row][col] = cellNextState(currentBoard, row, col, rules);
            col++;
        }
        row++;
    }
}

function check(data) {
    if (data) console.log("items is good.")
    else console.log("item is bad")
}

// create board
function createBoard(emptyBoard, rules) {
    let board = new Array(rules.ROW);
    for (let row = 0; row < rules.ROW; row++) {
        board[row] = new Array(rules.COLUMN);
    }
    if (emptyBoard) return board;
    for (let row = 0; row < rules.ROW; row++) {
        for (let col = 0; col < rules.COLUMN; col++) {
            board[row][col] = generateRandomState();
        }
    }
    return board;
}

// draw board
function printBoard(board, rules) {
    let row =0;
    console.log()
    while (row < rules.ROW) {
        let str = "                       ";
        for (let col = 0; col < rules.COLUMN; col++) {
            str = str + board[row][col] + " | ";
        }
        str += "\n";
        str += "                       ";
        for (let col = 0; col < rules.COLUMN; col++) {
            str +=  "-" + " - ";
        }
        console.log(str);
        row++;
    }
}

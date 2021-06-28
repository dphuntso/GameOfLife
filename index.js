

function test() {
    let board = createBoard(false, ROW, COLUMN);
    printBoard(board);
}

function donothing(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    })
}

async function startGame(rounds) {
    let currentBoard = createBoard(false, ROW, COLUMN);
    let nextBoard = createBoard(true, ROW, COLUMN);
    
    let iteration = rounds;
    printBoard(currentBoard);
    while (rounds-- != 0) {
        processBoard(currentBoard, nextBoard);
        // await donothing(1500);
        printBoard(nextBoard);
        let temp = currentBoard;
        currentBoard = nextBoard;
        nextBoard = temp;
    }
}

function setRules(row, column, dead, alive) {
    return {
        ROW: row,
        COLUMN: column,
        DEAD: dead,
        ALIVE: alive
    }
}

function createTable(rules) {
    for(let i=0; i < rules.ROW; i++) {
        let tr = document.createElement("tr");
        // tr.style.width = "100%";
        for (let col=0; col < rules.COLUMN; col++) {
            let td = document.createElement("td");
            tr.appendChild(td);
        }
        document.getElementById("table").appendChild(tr);
    }
}

// test();
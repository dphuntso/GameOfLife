

function test() {
    let board = createBoard(false, ROW, COLUMN);
    printBoard(board);
}

function waitTime(time) {
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
        // await waitTime(1500);
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
    let str = "";
    let total = "";
    for(let i=0; i < rules.ROW; i++) {
        str += "<tr>"
        // let tr = document.createElement("tr");
        // tr.style.width = "100%";
        for (let col=0; col < rules.COLUMN; col++) {
            str += "<td></td>";
            // let td = document.createElement("td");
            // tr.appendChild(td);
        }
        str += "</tr>"
        total += str;
        str = "";
        // document.getElementById("table").appendChild(tr);
    }
    document.getElementById("table").innerHTML = total;
}

function drawBoard(board, rules) {
    var table = document.getElementById("table");
    for (var i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        for (var j = 0, col; col = row.cells[j]; j++) {
            if (board[i][j] == rules.DEAD) {
                row.cells[j].style.backgroundColor = "white";
            } else {
                row.cells[j].style.backgroundColor = "black";
            }
            //iterate through columns
            //columns would be accessed using the "col" variable assigned in the for loop
        }  
    }
}

function nextState(boards, rules) {
    let {currentBoard, nextBoard} = boards;
    processBoard(currentBoard, nextBoard, rules);
    drawBoard(nextBoard, rules);
    let temp = currentBoard;
    boards.currentBoard = nextBoard;
    boards.nextBoard = temp;
}


// test();
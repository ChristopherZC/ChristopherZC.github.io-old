export default class Game {
    constructor() {
        let myHp = 40;
        let level = 4;
        let opHp = 40;
        let board = [];
        let boardO = [];
        let buyboard = [];
        let state = "Attack";
        this.board = board;
        this.boardO = boardO;
        this.phase = null;
        this.myHp = myHp;
        this.opHp = opHp;
        this.level = level;
        this.state = state;
        this.buyboard = buyboard;
    }

    createBoard(level) {
        for (let i = 0; i < 7; i++) {
            let health1 = Math.floor(Math.random() * Math.floor(level))
            this.buyboard[i] = {
                attack: Math.floor(Math.random() * Math.floor(level)),
                currentHealth: health1, maxHealth: health1
            }
        }
    }

    setupNewGame() {
        for (let i = 0; i < 7; i++) {
            let health1 = Math.floor(Math.random() * Math.floor(3))
            this.board[i] = {attack: Math.floor(Math.random() * Math.floor(3)),
                currentHealth: health1, maxHealth: health1}

            let health2 = Math.floor(Math.random() * Math.floor(3))
            this.boardO[i] = {attack: Math.floor(Math.random() * Math.floor(3)),
                currentHealth: health2, maxHealth: health2}
        }
    }

    doAttacks() {
        let myScore = 0;
        let oScore = 0;
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i].currentHealth > 0 && this.boardO[i].currentHealth > 0) {
                this.board[i].currentHealth = this.board[i].currentHealth - this.boardO[i].attack;
                this.boardO[i].currentHealth = this.boardO[i].currentHealth - this.board[i].attack;
            } else {
                if (this.board[i].currentHealth <= 0) {
                    oScore++;
                }
                if (this.boardO[i].currentHealth <= 0) {
                    myScore++;
                }
            }
        }
        if (myScore > oScore) {
            this.opHp = this.opHp - this.level;
        } else if (myScore < oScore) {
            this.myHp = this.myHp - this.level;
        }
    }
}

let game = new Game();
game.setupNewGame();
game.createBoard();

export const loadMinionsAttack = function () {
    return `<table id="GameTable" style="width:100%"><tr>
            <th>${game.opHp}</th>
            </tr><tr>
            <th>${game.board[0].maxHealth}</th>
            <th>${game.board[1].maxHealth}</th>
            <th>${game.board[2].maxHealth}</th>
            <th>${game.board[3].maxHealth}</th>
            <th>${game.board[4].maxHealth}</th>
            <th>${game.board[5].maxHealth}</th>
            <th>${game.board[6].maxHealth}</th>
            </tr><tr>
            <th>${game.boardO[0].maxHealth}</th>
            <th>${game.boardO[1].maxHealth}</th>
            <th>${game.boardO[2].maxHealth}</th>
            <th>${game.boardO[3].maxHealth}</th>
            <th>${game.boardO[4].maxHealth}</th>
            <th>${game.boardO[5].maxHealth}</th>
            <th>${game.boardO[6].maxHealth}</th>
            </tr><tr>
            <th>${game.myHp}</th>
            <button class = "submitB" type = "submit">Attack!</button>
            </tr><tr>
            </table>
            `
};

export const loadMinionsRecruit = function () {
    return `<table id="GameTable" style="width:100%"><tr>
            <th>RECRUIT!</th>
            </tr><tr>
            <th class="buyable" id="0">${game.buyboard[0].maxHealth}</th>
            <th class="buyable" id="1">${game.buyboard[1].maxHealth}</th>
            <th class="buyable" id="2">${game.buyboard[2].maxHealth}</th>
            <th class="buyable" id="3">${game.buyboard[3].maxHealth}</th>
            <th class="buyable" id="4">${game.buyboard[4].maxHealth}</th>
            <th class="buyable" id="5">${game.buyboard[5].maxHealth}</th>
            <th class="buyable" id="6">${game.buyboard[6].maxHealth}</th>
            </tr><tr>
            <th>${game.boardO[0].maxHealth}</th>
            <th>${game.boardO[1].maxHealth}</th>
            <th>${game.boardO[2].maxHealth}</th>
            <th>${game.boardO[3].maxHealth}</th>
            <th>${game.boardO[4].maxHealth}</th>
            <th>${game.boardO[5].maxHealth}</th>
            <th>${game.boardO[6].maxHealth}</th>
            </tr><tr>
            <th>${game.myHp}</th>
            <button class = "submitB" type = "submit">done</button>
            </tr><tr>
            </table>
            `
};

export const loadElementsintoDOM = function()
{
    const $root = $('#root');
    let gameState = "Attack";
    $('#root').on("click", ".submitB", function(event) {
        event.preventDefault();
        console.log(game.state);
        console.log(game.level);
        if (gameState === "Attack") {
            event.preventDefault();
            gameState = "Recruit";
            game.doAttacks();
            game.level++;
            game.createBoard(game.level);
            const $root = $('#root');
            $('#root').empty();
            $('#root').append(loadMinionsAttack());

        }

        if (gameState === "Recruit") {
            const $root = $('#root');
            $('#root').empty();
            $('#root').append(loadMinionsRecruit());
            gameState = "Attack";
        }
    })

    $('#root').on("click", ".buyable", function(event) {
        event.preventDefault();
        let id = $(this).attr('id');
        game.board[id] = game.buyboard[id];
    })

    $('#root').append(loadMinionsRecruit());
};

$(function() {
    loadElementsintoDOM();
});

console.log(game.state);
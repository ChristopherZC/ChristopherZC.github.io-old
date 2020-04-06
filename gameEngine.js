export default class Game {
    constructor() {
        let myHp = 40;
        let level = 5;
        let opHp = 40;
        let board = [];
        let boardO = [];
        this.board = board;
        this.boardO = boardO;
        this.phase = null;
        this.myHp = myHp;
        this.opHp = opHp;
        this.level = level;
    }

    setupNewGame() {
        for (let i = 0; i < 7; i++) {
            let health1 = Math.floor(Math.random() * Math.floor(10))
            this.board[i] = {attack: Math.floor(Math.random() * Math.floor(10)),
                currentHealth: health1, maxHealth: health1}

            let health2 = Math.floor(Math.random() * Math.floor(10))
            this.boardO[i] = {attack: Math.floor(Math.random() * Math.floor(10)),
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

export const loadMinions = function () {
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
            </tr><tr>
            </table>
            `
};

export const loadElementsintoDOM = function()
{
    const $root = $('#root');
    document.addEventListener('click', function(event)
    {
        game.doAttacks();
        const $root = $('#root');
        $('#root').append(loadMinions());
    }, true);
    $('#root').append(loadMinions());
};

$(function() {
    loadElementsintoDOM();
});
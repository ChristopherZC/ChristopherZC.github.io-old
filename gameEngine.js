export default class Game {
    constructor() {
        let myHp = 40;
        let level = 3;
        let opHp = 40;
        let board = [];
        let boardO = [];
        let buyboard = [];
        let dmg = 0;
        let state = "Attack";
        let loser = "";
        this.board = board;
        this.boardO = boardO;
        this.phase = null;
        this.myHp = myHp;
        this.opHp = opHp;
        this.level = level;
        this.state = state;
        this.buyboard = buyboard;
        this.loser = "op";
    }

    createBoard(level) {
        for (let i = 0; i < 7; i++) {
            let health1 = Math.floor(Math.random() * Math.floor(level)) + 1;
            this.buyboard[i] = {
                attack: Math.floor(Math.random() * Math.floor(level)) + 1,
                currentHealth: health1, maxHealth: health1
            };
        }
    }

    setupNewGame() {
        for (let i = 0; i < 7; i++) {
            let health1 = Math.floor(Math.random() * Math.floor(3)) + 1;
            this.board[i] = {attack: Math.floor(Math.random() * Math.floor(3)) + 1,
                currentHealth: health1, maxHealth: health1}

            let health2 = Math.floor(Math.random() * Math.floor(4)) + 1;
            this.boardO[i] = {attack: Math.floor(Math.random() * Math.floor(4)) + 1,
                currentHealth: health2, maxHealth: health2}
        }
    }

    doAttacks() {
        let myScore = 0;
        let oScore = 0;
        let dmg = 0;
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
            for (let i = 0; i < this.board.length; i++) {
                if (this.boardO[i].currentHealth > 0) {
                    dmg = dmg + this.board[i].attack;
                }
            }
            this.loser = "op";
            this.dmg = dmg;
        } else if (myScore < oScore) {
            for (let i = 0; i < this.boardO.length; i++) {
                if (this.boardO[i].currentHealth > 0) {
                    dmg = dmg + this.boardO[i].attack;
                }
            }
            this.loser = "me";
            this.dmg = dmg;
        }
    }
}

let game = new Game();
game.setupNewGame();
game.createBoard(3);

export const loadMinionsAttack = function() {
    let dom = `<table id="GameTable" style="width:100%"><tr>
            <th class = "enemyHP">${game.opHp}</th>`;
    for (let i = 0; i < 40; i++) {
        i = i + 6;
        dom = dom +  `<th class = "enemyHP"></th>`;
    }
    dom = dom + `</tr><tr>`
    for (let i = 0; i < game.board.length; i++) {
        dom = dom + `<th class="minion">${game.boardO[i].maxHealth} Minion name here ${game.boardO[i].attack}</th>`;
    }
    dom = dom + `</tr><tr>`
    for (let i = 0; i < game.boardO.length; i++) {
        dom = dom +  `<th class="minion" >${ game.board[i].maxHealth } minion name here ${game.board[i].attack}</th>`;
    }
    dom = dom +  `</tr><tr>
    </tr><tr>
    <th class = "hpBar">${game.myHp}</th>`
    for (let i = 0; i < 40; i++) {
        i = i + 6;
        dom = dom +  `<th class = "hpBar"></th>`;
    }
    dom = dom + `</table><button class = "submitB" type = "submit">Attack!</button>
        `
    return dom;
}
export const loadMinionsRecruit = function () {
    let dom = `<table id="GameTable" style="..."><tr>
            <th>RECRUIT!</th>
            </tr><tr>`
    for (let i = 0; i < game.buyboard.length; i++) {
        dom = dom + `<th class="buyable" id=${i}><a href="#">${ game.buyboard[i].maxHealth } name here ${game.buyboard[i].attack}</a></th>`;
    }
    dom = dom + `</tr><tr>`
    for (let i = 0; i < game.boardO.length; i++) {
        dom = dom +  `<th class="minion">${ game.board[i].maxHealth } name here ${game.board[i].attack}</th>`;
    }
    dom = dom +  `</tr><tr>`
    dom = dom + `<th class = "image", src = "Coin_website.png"></th></tr><tr>
         <th class = "hpBar">${game.myHp}</th>`
    for (let i = 0; i < 40; i++) {
        i = i + 6;
        dom = dom +  `<th class = "hpBar"></th>`;
    }
    dom = dom + `
        </table> <button class = "submitB" type = "submit">done</button>
            `
    return dom;
}

export const loadMinionsDefense = function () {
    let dom = `<table id="GameTable" style="..."><tr>
            <th>DEFEND!</th>
            </tr><tr>`
    for (let i = 0; i < 10; i++) {
        dom = dom + `<th class="defend" id=${i} ><a href="#"> ${i} </a></th>`;
    }
    dom = dom + `</tr><tr>`
    for (let i = 0; i < game.boardO.length; i++) {
        dom = dom +  `<th class="minion">${ game.boardO[i].maxHealth }</th>`;
    }
    dom = dom +  `</tr><tr>
        </tr><tr>
        <th class = "hpBar">${game.myHp}</th>
        </table> <button class = "submitB" type = "submit">done</button>
            `
    return dom;
}


export const loadElementsintoDOM = function()
{
    const $root = $('#root');
    let gameState = "Attack";
    $('#root').on("click", ".submitB", function(event) {
        event.preventDefault();
        console.log(game.opHp);
        if (game.state === "Attack") {
            game.state = "Defend";
            game.doAttacks();
            console.log(game.dmg);
            game.level++;
            game.createBoard(game.level);
            const $root = $('#root');
            $('#root').empty();
            $('#root').append(loadMinionsAttack());

        } else if (game.state === "Defend") {
            if (game.loser === "op") {
                $('#root').empty();
                $('#root').append(loadMinionsRecruit());
                game.state = "Attack";
                game.opHp = game.opHp - 5;
            } else {
                game.state = "Recruit";
                $('#root').empty();
                $('#root').append(loadMinionsDefense());
            }

        } else if (game.state=== "Recruit") {
            $('#root').empty();
            $('#root').append(loadMinionsRecruit());
            game.state = "Attack";
        }
    })

    $('#root').on("click", ".defend", function(event) {
        event.preventDefault();
        let id = $(this).attr('id');
        game.myHp = game.myHp - game.dmg % id;
        $('#root').empty();
        $('#root').append(loadMinionsRecruit());
        game.state = "Attack";
    })

    $('#root').on("click", ".buyable", function(event) {
        event.preventDefault();
        let id = $(this).attr('id');
        console.log(id + " bought");
        game.board[id] = game.buyboard[id];
        game.createBoard(game.level);
    })

    $('#root').append(loadMinionsRecruit());
};

$(function() {
    loadElementsintoDOM();
});
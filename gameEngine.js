import minionData from "./cardData.js"


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
        let avail = [];
        this.avail = avail;
    }

    getMinions(level) {
        this.avail = minionData.filter(minion => minion.lvl <= this.level);
    }

    createBoard(level) {
        this.getMinions(level);
        for (let i = 0; i < 7; i++) {
            /*let health1 = Math.floor(Math.random() * Math.floor(level)) + 1;
            this.buyboard[i] = {
                attack: Math.floor(Math.random() * Math.floor(level)) + 1,
                currentHealth: health1, maxHealth: health1 */
            this.buyboard[i] = this.avail[Math.floor(Math.random() * this.avail.length)];
        }
    }

    setupNewGame() {
        for (let i = 0; i < 7; i++) {
            this.board[i] = this.avail[Math.floor(Math.random() * this.avail.length)];

            this.boardO[i] = this.avail[Math.floor(Math.random() * this.avail.length)];
        }
    }

    doAttacks() {
        let myScore = 0;
        let oScore = 0;
        let dmg = 0;
        for (let i = 0; i < this.board.length; i++) {
            let myMHP = this.board[i].health;
            let oMHP = this.boardO[i].health;
            while (oMHP > 0 && myMHP > 0) {
                myMHP = myMHP - this.boardO[i].atk;
                oMHP = oMHP - this.board[i].atk;
            }
            if (oMHP > 0) {
                oScore++;
            } else if (myMHP > 0) {
                myScore++;
            }
        }
        if (myScore > oScore) {
            for (let i = 0; i < this.board.length; i++) {
                if (this.boardO[i].currentHealth > 0) {
                    dmg = dmg + this.board[i].atk;
                }
            }
            this.loser = "op";
            this.dmg = dmg;
        } else if (myScore < oScore) {
            for (let i = 0; i < this.boardO.length; i++) {
                if (this.boardO[i].currentHealth > 0) {
                    dmg = dmg + this.boardO[i].atk;
                }
            }
            this.loser = "me";
            this.dmg = dmg;
        }
    }
}

let game = new Game();
game.getMinions(3);
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
        dom = dom + `<th class="minion"><img src = ${game.boardO[i].img} ></th>`;
    }
    dom = dom + `</tr><tr>`
    for (let i = 0; i < game.boardO.length; i++) {
        dom = dom +  `<th class="minion" ><img src = ${game.board[i].img} ></th>`;
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
        //dom = dom + `<th class="buyable" id=${i}><a href="#">${ game.buyboard[i].maxHealth } name here ${game.buyboard[i].attack}</a></th>`;
        dom = dom + `<th class = "buyable" id=${i}><a href="#"><img src = ${game.buyboard[i].img} ></a></th>`
    }
    dom = dom + `</tr><tr>`
    for (let i = 0; i < game.boardO.length; i++) {
        //dom = dom +  `<th class="minion">${ game.board[i].maxHealth } name here ${game.board[i].attack}</th>`;
        dom = dom + `<th class = "buyable" id=${i}><a href="#"><img src = ${game.board[i].img} ></a></th>`
    }
    dom = dom +  `</tr><tr>`
    for (let i =0; i < game.level; i++) {
        dom = dom + `<td><img class = "image", src = "Coin_website.png"></td>`
    }
    dom = dom + `</td></tr><th class = "hpBar">${game.myHp}</th>`
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
            <th>UNDER CONSTRUCTION</th>
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
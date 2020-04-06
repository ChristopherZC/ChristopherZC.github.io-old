import Game from "./game.js";
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
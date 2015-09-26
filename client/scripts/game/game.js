'use strict';

var spaceCraft;
var cursors;
var game = new Phaser.Game(window.innerWidth, window.innerWidth, Phaser.CANVAS, 'game', {
    init: init,
    preload: preload,
    create: create,
    update: update,
    render: render
});

/**
 * @constructor
 */
var SpaceCraft = function (spec)
{
    var that = {};
    var sprite;

    sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'spaceCraft');

    that.sprite = function ()
    {
        return sprite;
    };

    that.getUserAPI = function ()
    {
        var api = {};

        api.rotateLeft = function ()
        {
            sprite.body.rotateLeft(1);
        };

        api.rotateRight = function ()
        {
            sprite.body.rotateRight(1);
        };

        api.setZeroRotation = function ()
        {
            sprite.body.setZeroRotation();
        };

        api.thrust = function ()
        {
            sprite.body.thrust(10);
        };

        api.reverse = function ()
        {
            sprite.body.reverse(10);
        };

        return api;
    };

    return that;
};

function runUserScript()
{
    var userFunction = new Function('spaceCraft', editor.getValue());
    userFunction(spaceCraft.getUserAPI());
}

function init()
{
    game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
}

function preload()
{
    game.load.image('starField', 'resources/assets/starField.png');
    game.load.image('spaceCraft', 'resources/assets/spaceCraft.png');
}

function create()
{
    game.add.tileSprite(0, 0, 1920, 1920, 'starField');
    game.world.setBounds(0, 0, 1920, 1920);

    game.scale.pageAlignVertically = true;
    game.scale.pageAlignHorizontally = true;

    spaceCraft = SpaceCraft();

    game.physics.startSystem(Phaser.Physics.P2JS);

    game.physics.p2.enable(spaceCraft.sprite());

    game.camera.follow(spaceCraft.sprite());
    game.camera.deadzone = new Phaser.Rectangle(100, 100, 500, 500);

    cursors = game.input.keyboard.createCursorKeys();
}

function update()
{
    runUserScript();
}

function render()
{
    var zone = game.camera.deadzone;

    game.context.fillStyle = 'rgba(255,255,255,0.1)';
    game.context.fillRect(zone.x, zone.y, zone.width, zone.height);

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(spaceCraft.sprite(), 32, 500);
}

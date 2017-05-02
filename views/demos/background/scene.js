/*

scene.js demo for forframe.js

 */

var BG_lin = function (options) {

    options = options || {};

    this.sw = options.sw || 3000;
    this.sh = options.sh || 952;

    this.vp = {

        w : 200,
        h : 200,
        x : 0,
        y : 0

    };

    this.drawCalls = [];

};

BG_lin.prototype.findBGCalls = function () {};

var sec = new BG_lin();

scene({

    projectName : 'background',

    maxFrame : 100,

    viewPort : {

        w : 480,
        h : 360

    },

    logo : {
        w : 128,
        h : 56,
        opacity : .4,
        skin : {
            imgIndex : 0,
            sx : 0,
            sy : 0,
            sw : 128,
            sh : 56
        }
    },

    parts : [{

            id : 'box',
            w : 640,
            h : 480,
            forFrame : function (pt) {},
            skin : {
                imgIndex : 1,
                sx : 0,
                sy : 0,
                sw : 1200,
                sh : 1200,
                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    var bias = 1 - Math.abs(.5 - this.percentDone) / .5;

                    ctx.strokeStyle = '#ff0000';
                    ctx.strokeRect(0, 0, pt.w, pt.h);

                    skin.sw = 1200;
                    skin.sh = 1200;

                }

            }

        }

    ],

    // define the forFrame movement
    forFrame : function () {}

});

// inject a canvas into an element with an id of 'apparea'.
scene.injectCanvas('ui_display');

scene.load(
    [
        'img/mylogo_128.png',
        'demos/background/img/background_2_seamless.png'
    ],
    function (progress) {

    // uncomment to save as png
    if (progress === 1) {

        var playback = {

            appendRender : function (ctx) {},
            appendZ : 0,

            containerId : 'ui_controls',

            frameRate : 40
        };

        scene.injectUI(playback);
        autoGif.injectUI(playback, scene.state.maxFrame);

    }

});

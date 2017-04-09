/*

scene.js demo for forframe.js

 */

scene({

    projectName : 'demo1',

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

            id : 'd',
            w : 32,
            h : 32,
            forFrame : function (pt) {

                pt.w = 800 - 700 * this.percentDone;
                pt.h = 700 - 600 * this.percentDone;

                pt.x = 240 - pt.w / 2 - pt.w;
                pt.y = 180 - pt.h / 2;

            },
            skin : {
                imgIndex : 1,
                sx : 0,
                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    //ctx.fillStyle = '#ff0000';
                    //ctx.fillRect(0, 0, pt.w, pt.h);

                }

            }

        }, {

            id : 'j',
            w : 32,
            h : 32,
            forFrame : function (pt) {

                pt.w = 800 - 700 * this.percentDone;
                pt.h = 700 - 600 * this.percentDone;

                pt.x = 240 - pt.w / 2;
                pt.y = 180 - pt.h / 2;

            },
            skin : {
                imgIndex : 1,
                sx : 32,
                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    //skin.sx = 32 + 32 * this.percentDone;

                    //ctx.fillStyle = '#00ff00';
                    //ctx.fillRect(0, 0, pt.w, pt.h);

                }

            }

        }, {

            id : 'p',
            w : 32,
            h : 32,
            forFrame : function (pt) {

                pt.w = 800 - 700 * this.percentDone;
                pt.h = 700 - 600 * this.percentDone;

                pt.x = 240 - pt.w / 2 + pt.w;
                pt.y = 180 - pt.h / 2;

            },
            skin : {

                imgIndex : 1,
                sx : 64,
                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    //ctx.fillStyle = '#0000ff';
                    //ctx.fillRect(0, 0, pt.w, pt.h);

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
        'img/sheet1.png'
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

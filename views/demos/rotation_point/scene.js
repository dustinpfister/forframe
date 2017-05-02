/*

scene.js demo for forframe.js

 */

scene({

    projectName : 'rotation_point',

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
            w : 128,
            h : 128,
            forFrame : function (pt) {

                var bias = 1 - Math.abs(.5 - this.percentDone) / .5;

                pt.x = 240;
                pt.y = 180;
                pt.rx = -64 * bias;
                pt.ry = -64 * bias;
                //pt.radian = Math.PI * 2 * bias;

            },
            skin : {
                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    var bias = 1 - Math.abs(.5 - this.percentDone) / .5;

                    ctx.lineWidth = 3;

                    ctx.fillStyle = '#ffffff';
                    ctx.textBaseline = 'top';
                    ctx.font = '20px courier';

                    // the part area

                    ctx.strokeStyle = '#ffffff';
                    ctx.strokeRect(0, 0, pt.w, pt.h);
                    ctx.fillText('the part area', 0, 0);

                    // the part

                    ctx.strokeStyle = '#ff00ff';
                    ctx.strokeRect(pt.rx, pt.ry, pt.w, pt.h);
                    ctx.fillText('the ajusted area', pt.rx, pt.ry);

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
        'img/mylogo_128.png'
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

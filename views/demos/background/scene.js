/*

scene.js demo for forframe.js

 */

scene({

    projectName : 'demo1',

    maxFrame : 50,

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

            id : 'horse_body',
            w : 64,
            h : 128,
            forFrame : function (pt) {

                //pt.x = this.percentDone * 100;

                pt.x = this.viewPort.w / 2 - pt.w / 2;
                pt.y = this.viewPort.h / 2 - pt.h / 2 - 50 * this.percentDone;

                console.log(this);

            },
            skin : {
                imgIndex : 1,
                sx : 0,
                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    ctx.strokeStyle = '#ff0000';
                    ctx.strokeRect(0, 0, pt.w, pt.h);

                    //ctx.drawImage(this.img[skin.imgIndex],0,0);


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
        'demos/background/img/seahorse.jpg'
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

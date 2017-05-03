/*

scene.js demo for forframe.js

 */

scene({

    projectName : 'seahorse',

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

    parts : [

        // body
        {

            id : 'horse_body',
            w : 150,
            h : 200,
            forFrame : function (pt) {

                //pt.x = this.percentDone * 100;

                var bias = 1 - Math.abs(.5 - this.percentDone) / .5;

                pt.x = this.viewPort.w / 2 - pt.w / 2;
                pt.y = this.viewPort.h / 2 - pt.h / 2 - 50 * bias + 70;

            },
            skin : {
                imgIndex : 1,
                sx : 0,
                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    ctx.strokeStyle = 'rgba(255,0,0,.4)';
                    ctx.strokeRect(0, 0, pt.w, pt.h);
                    ctx.strokeStyle = 'rgba(255,0,0,1)';
                    ctx.strokeRect(pt.rx, pt.ry, pt.w, pt.h);

                    //ctx.drawImage(this.img[skin.imgIndex],0,0,pt.w,pt.h);

                }

            }

        },

        // head
        {

            id : 'horse_head',
            w : 96,
            h : 110,
            forFrame : function (pt) {

                //pt.x = this.percentDone * 100;
                var pt_hb = this.parts['horse_body'];

                var bias = 1 - Math.abs(.5 - this.percentDone) / .5;

                pt.x = pt_hb.x + pt_hb.w;
                pt.y = pt_hb.y;
                pt.rx = -pt.w / 2;
                pt.ry = -pt.h;

                pt.radian = Math.PI / 4 + 1 * bias;

            },
            skin : {
                //imgIndex : 2,
                sx : 0,
                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    ctx.strokeStyle = 'rgba(0,255,0,.2)';

                    ctx.strokeRect(0, 0, pt.w, pt.h);
                    ctx.strokeStyle = '#00ff00';
                    ctx.strokeRect(pt.rx, pt.ry, pt.w, pt.h);

                    //ctx.drawImage(this.img[skin.imgIndex],0,0);

                    //ctx.drawImage(this.img[2],0,0,pt.w,pt.h);

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
        'demos/seahorse/img/horse_body.png',
        'demos/seahorse/img/horse_head_2.png'
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

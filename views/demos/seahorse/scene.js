/*

scene.js demo for forframe.js

 */

var showAreas = false;
var BG_lin = function (options) {

    options = options || {};

    this.sw = options.sw || 256;
    this.sh = options.sh || 64;

    this.vp = {

        w : 32,
        h : 32,
        x : 240,
        y : 0

    };

    this.drawCalls = [];

    // find source values with current vp state
    this.findSourceValues();

    // set destanation values
    this.setDestValues();

};

BG_lin.prototype.setDestValues = function () {

    var x = 0,
    y = 0,
    self = this;

    this.drawCalls.forEach(function (drawCall) {

        drawCall.dx = x + (drawCall.sx ? Math.abs(self.vp.w - (self.sw - drawCall.sx)) : 0);
        drawCall.dy = y;
        drawCall.dw = self.vp.w;
        drawCall.dh = self.vp.h;

    });

};

// get source values for add draw Image calls (sx,sy,sw,sh)
BG_lin.prototype.findSourceValues = function () {

    this.drawCalls = [];

    if (this.vp.x + this.vp.w > this.sw) {

        // need two
        this.drawCalls.push({

            // the part that is at the far right side
            sx : this.vp.x,
            sy : this.vp.y,
            sw : this.sw - this.vp.x,
            sh : this.vp.h

        });

        this.drawCalls.push({

            // the part at the far left of the source image
            sx : 0,
            sy : this.vp.y,
            sw : this.vp.w - (this.sw - this.vp.x),
            sh : this.vp.h,

        });

    } else {

        // just need one
        this.drawCalls.push({

            // just get it when it's one call
            sx : this.vp.x,
            sy : this.vp.y,
            sw : this.vp.w,
            sh : this.vp.h

        });

    }

};

var bg = new BG_lin({

        sw : 3000,
        sh : 952

    });

scene({

    projectName : 'seahorse',

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

    parts : [

        // background
        {

            id : 'background',

            forFrame : function (pt) {

                pt.w = this.viewPort.w;
                pt.h = this.viewPort.h;

                // set backgorund view port

                bg.vp = {

                    w : 952,
                    h : 952,
                    x : 3000 * this.percentDone,
                    y : 0

                };

                bg.findSourceValues();
                //bg.setDestValues();

                //console.log(bg);

            },

            skin : {
                //imgIndex : 3,
                //sx : 140,
                //sw : 30,
                //sh : 80,
                appendRender : function (ctx, skin) {

                    var pt = skin.part,
                    self = this;

                    if (showAreas) {
                        ctx.strokeStyle = 'rgba(0,128,0,1)';
                        ctx.strokeRect(pt.rx, pt.ry, pt.w, pt.h);
                    }

                    ctx.fillStyle = '#2a2a2a';
                    //ctx.fillRect(0, 0, pt.w, pt.h);

                    //ctx.drawImage(this.img[4], 0, 0, 952, 952, 0, 0, this.viewPort.w, this.viewPort.h);


                    bg.drawCalls.forEach(function (dc, i) {

                        //console.log(dc);

                        ctx.drawImage(

                            self.img[4],
                            dc.sx,
                            dc.sy,
                            dc.sw,
                            dc.sh,

                            (952 - dc.sw) / 952 * 480 * i,
                            0,
                            dc.sw / 952 * 480,
                            360);

                    });

                }
            }

        },

        // seahorse body
        {

            id : 'horse_body',
            w : 150,
            h : 200,
            forFrame : function (pt) {

                var bias = 1 - Math.abs(.5 - this.percentDone) / .5;

                pt.x = this.viewPort.w / 2 - pt.w / 2;
                pt.y = this.viewPort.h / 2 - pt.h / 2 - 50 * bias + 70;

            },
            skin : {
                //imgIndex : 1,
                sx : 0,
                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    if (showAreas) {
                        ctx.strokeStyle = 'rgba(255,0,0,.4)';
                        ctx.strokeRect(0, 0, pt.w, pt.h);
                        ctx.strokeStyle = 'rgba(255,0,0,1)';
                        ctx.strokeRect(pt.rx, pt.ry, pt.w, pt.h);

                    }

                    // ???
                    ctx.drawImage(this.img[1], 0, 0, pt.w, pt.h);

                }

            }

        },

        // seahorse head
        {

            id : 'horse_head',
            w : 96,
            h : 110,
            forFrame : function (pt) {

                //pt.x = this.percentDone * 100;
                var pt_hb = this.parts['horse_body'];

                var bias = 1 - Math.abs(.5 - this.percentDone) / .5;

                pt.x = pt_hb.x + pt_hb.w / 2;
                pt.y = pt_hb.y;

                pt.radian =  - .15 + .15 * bias;

            },
            skin : {
                //imgIndex : 2,
                sx : 0,
                appendRender : function (ctx, skin) {

                    var pt = skin.part;
                    if (showAreas) {
                        ctx.strokeStyle = '#00ff00';
                        ctx.strokeRect(pt.rx, pt.ry, pt.w, pt.h);
                    }
                    ctx.drawImage(this.img[2], pt.rx, pt.ry, pt.w, pt.h);

                }

            }

        },

        // body
        {

            id : 'body_front',
            w : 77,
            h : 224,
            forFrame : function (pt) {

                var pt_hb = this.parts['horse_body'],
                bias = 1 - Math.abs(.5 - this.percentDone) / .5;

                pt.x = pt_hb.x + 10;
                pt.y = pt_hb.y - 30 - 10 * bias;
            },

            skin : {
                imgIndex : 5,
                sw : 77,
                sh : 224,
                appendRender : function (ctx, skin) {}
            }

        },

        //emme head
        {

            id : 'emme_head',
            w : 70,
            h : 70,
            forFrame : function (pt) {

                var pt_hb = this.parts['horse_body'],
                bias = 1 - Math.abs(.5 - this.percentDone) / .5;

                pt.x = 212;
                //pt.y = 115 - 50 * bias;
                pt.y = pt_hb.y - 30 - 10 * bias;
                pt.rx = -pt.w / 2;
                pt.ry = -pt.h / 2;
                pt.radian = .25 * bias;

            },

            skin : {
                imgIndex : 6,
                sw : 371,
                sh : 491,
                appendRender : function (ctx, skin) {

                    var pt = skin.part;
                    if (showAreas) {
                        ctx.strokeStyle = 'rgba(255,128,0,1)';

                        ctx.strokeRect(pt.rx, pt.ry, pt.w, pt.h);
                    }
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
        'demos/seahorse/img/horse_head_2.png',
        'demos/seahorse/img/emme_parts.png',
        'demos/seahorse/img/background_3_seamless.png',
        'demos/seahorse/img/body1.png',
        'demos/seahorse/img/emme_head.png'
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

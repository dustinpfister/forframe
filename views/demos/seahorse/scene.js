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
                            dc.sw / 952 * 480 ,
                            360);

                    });

                }
            }

        },

        // emme bicep right
        {

            id : 'emme_bicep_left',
            w : 30,
            h : 80,
            forFrame : function (pt) {

                var bias = 1 - Math.abs(.5 - this.percentDone) / .5;

                pt.x = 190;
                pt.y = 140 - 35 * bias;
                pt.rx = -15;
                pt.ry = 0;
                pt.radian = -Math.PI / 2 - .2 * bias;

            },

            skin : {
                imgIndex : 3,
                sx : 140,
                sw : 30,
                sh : 80,
                appendRender : function (ctx, skin) {

                    var pt = skin.part;
                    if (showAreas) {
                        ctx.strokeStyle = 'rgba(0,128,0,1)';
                        ctx.strokeRect(pt.rx, pt.ry, pt.w, pt.h);
                    }
                }
            }
        },

        // emme forarm right
        {

            id : 'emme_forarm_left',
            w : 30,
            h : 80,
            forFrame : function (pt) {

                var bias = 1 - Math.abs(.5 - this.percentDone) / .5;

                pt.x = 260;
                pt.y = 140 - 50 * bias;
                pt.rx = -15;
                pt.ry = -15;
                pt.radian = Math.PI + .7;

            },

            skin : {
                imgIndex : 3,
                sx : 170,
                sw : 30,
                sh : 80,
                appendRender : function (ctx, skin) {

                    var pt = skin.part;
                    if (showAreas) {
                        ctx.strokeStyle = 'rgba(0,0,128,.4)';
                        ctx.strokeRect(0, 0, pt.w, pt.h);

                        ctx.strokeStyle = 'rgba(0,0,128,1)';
                        ctx.strokeRect(pt.rx, pt.ry, pt.w, pt.h);
                    }
                }
            }
        },

        // emme_thigh_right
        {

            id : 'emme_thigh_left',
            w : 40,
            h : 96,
            forFrame : function (pt) {

                var bias = 1 - Math.abs(.5 - this.percentDone) / .5;

                pt.x = 160;
                pt.y = 240 - 35 * bias;
                pt.radian = Math.PI * -0.5 + .15 * bias;

            },

            skin : {
                imgIndex : 3,
                sx : 60,
                sw : 40,
                sh : 96,
                appendRender : function (ctx, skin) {

                    var pt = skin.part;

                    if (showAreas) {

                        ctx.strokeStyle = 'rgba(255,0,255,1)';

                        ctx.strokeRect(0, 0, pt.w, pt.h);

                    }
                }
            }
        },

        // emme caff right
        {

            id : 'emme_caff_left',
            w : 40,
            h : 96,
            forFrame : function (pt) {

                var bias = 1 - Math.abs(.5 - this.percentDone) / .5;

                pt.x = 235;
                pt.y = 215 - 15 * bias;
                pt.radian =  - .2 + .2 * bias;

            },

            skin : {
                imgIndex : 3,
                sx : 100,
                sw : 40,
                sh : 96,
                appendRender : function (ctx, skin) {

                    var pt = skin.part;
                    if (showAreas) {
                        ctx.strokeStyle = 'rgba(0,0,255,1)';

                        ctx.strokeRect(0, 0, pt.w, pt.h);
                    }
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

        // head
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

        // emme head
        {

            id : 'emme_head',
            w : 60,
            h : 60,
            forFrame : function (pt) {

                var bias = 1 - Math.abs(.5 - this.percentDone) / .5;

                pt.x = 175;
                pt.y = 90 - 35 * bias;
                pt.rx = -pt.w / 2;
                pt.ry = -pt.h / 2;
                pt.radian =  - .15 * bias;

            },

            skin : {
                imgIndex : 3,
                sx : 200,
                sw : 60,
                sh : 60,
                appendRender : function (ctx, skin) {

                    var pt = skin.part;
                    if (showAreas) {
                        ctx.strokeStyle = 'rgba(255,128,0,1)';

                        ctx.strokeRect(pt.rx, pt.ry, pt.w, pt.h);
                    }
                }
            }
        },

        // emme body
        {

            id : 'emme_body',
            w : 60,
            h : 120,
            forFrame : function (pt) {

                var bias = 1 - Math.abs(.5 - this.percentDone) / .5;

                pt.x = 160;
                pt.y = 120 - 35 * bias;

            },

            skin : {
                imgIndex : 3,
                sx : 0,
                sw : 60,
                sh : 120,
                appendRender : function (ctx, skin) {

                    var pt = skin.part;
                    if (showAreas) {
                        ctx.strokeStyle = 'rgba(255,255,0,1)';

                        ctx.strokeRect(0, 0, pt.w, pt.h);
                    }
                }
            }
        },

        // emme_thigh_right

        {

            id : 'emme_thigh_right',
            w : 40,
            h : 96,
            forFrame : function (pt) {

                var bias = 1 - Math.abs(.5 - this.percentDone) / .5;

                pt.x = 160;
                pt.y = 240 - 35 * bias;
                pt.radian = Math.PI * -0.4 + .2 * bias;

            },

            skin : {
                imgIndex : 3,
                sx : 60,
                sw : 40,
                sh : 96,
                appendRender : function (ctx, skin) {

                    var pt = skin.part;
                    if (showAreas) {
                        ctx.strokeStyle = 'rgba(255,0,255,1)';

                        ctx.strokeRect(0, 0, pt.w, pt.h);
                    }
                }
            }
        },

        // emme caff right
        {

            id : 'emme_caff_right',
            w : 40,
            h : 96,
            forFrame : function (pt) {

                var bias = 1 - Math.abs(.5 - this.percentDone) / .5;

                pt.x = 240;
                pt.y = 240 - 15 * bias;
                pt.radian = .4 * bias;

            },

            skin : {
                imgIndex : 3,
                sx : 100,
                sw : 40,
                sh : 96,
                appendRender : function (ctx, skin) {

                    var pt = skin.part;
                    if (showAreas) {
                        ctx.strokeStyle = 'rgba(0,0,255,1)';

                        ctx.strokeRect(0, 0, pt.w, pt.h);
                    }
                }
            }
        },

        // emme bicep right
        {

            id : 'emme_bicep_right',
            w : 30,
            h : 80,
            forFrame : function (pt) {

                var bias = 1 - Math.abs(.5 - this.percentDone) / .5;

                pt.x = 190;
                pt.y = 140 - 35 * bias;
                pt.rx = -15;
                pt.ry = 0;
                pt.radian = Math.PI / 2 - .2 * bias;

            },

            skin : {
                imgIndex : 3,
                sx : 140,
                sw : 30,
                sh : 80,
                appendRender : function (ctx, skin) {

                    var pt = skin.part;
                    if (showAreas) {
                        ctx.strokeStyle = 'rgba(0,128,0,1)';
                        ctx.strokeRect(pt.rx, pt.ry, pt.w, pt.h);
                    }
                }
            }
        },

        // emme forarm right
        {

            id : 'emme_forarm_right',
            w : 30,
            h : 80,
            forFrame : function (pt) {

                var bias = 1 - Math.abs(.5 - this.percentDone) / .5;

                pt.x = 114;
                pt.y = 140 - 18 * bias;
                pt.rx = -15;
                pt.ry = -15;
                pt.radian = Math.PI;

            },

            skin : {
                imgIndex : 3,
                sx : 170,
                sw : 30,
                sh : 80,
                appendRender : function (ctx, skin) {

                    var pt = skin.part;
                    if (showAreas) {
                        ctx.strokeStyle = 'rgba(0,0,128,.4)';
                        ctx.strokeRect(0, 0, pt.w, pt.h);

                        ctx.strokeStyle = 'rgba(0,0,128,1)';
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
        'demos/seahorse/img/background_2_seamless.png'
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

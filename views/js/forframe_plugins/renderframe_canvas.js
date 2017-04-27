
scene.injectPlugin({

    name : 'renderFrame',

    ui : function () {

        var ui = document.createElement('p');
        ui.innerHTML = '<p><\/p>';

        return ui;

    },

    method : function (scope) {

        var prop,
        skin,
        state = this,
        pt,
        rx,
        ry,
        z = 0,
        playbackObj = scope[0],
        ctx = state.ctx,
        appendZ,
        disp;

        if (playbackObj === undefined) {
            playbackObj = {};
        }

        appendZ = playbackObj.appendZ === undefined ? Object.keys(state.parts).length - 1 : playbackObj.appendZ;

        // clear canvas.
        if (playbackObj.drawBackground) {

            playbackObj.drawBackground(state.ctx);

        } else {

            state.ctx.fillStyle = 'black';
            state.ctx.fillRect(0, 0, state.canvas.width, state.canvas.height);

        }

        // ALERT! a for in loop!? NO!
        for (prop in state.parts) {

            // append render?
            if (playbackObj.appendRender && z === appendZ) {

                playbackObj.appendRender.call(state, ctx);

            }

            z += 1;

            pt = state.parts[prop];

            ctx.save();
            // default to state.opacity
            ctx.globalAlpha = state.opacity;

            // if part opacity that will override state.opacity
            if (Number(pt.opacity) >= 0) {

                ctx.globalAlpha = pt.opacity;

            }

            //ctx.translate(pt.x + pt.w / 2, pt.y + pt.h / 2);

            // set rotation r, and rotation y
            rx = pt.rx === undefined ? pt.x + pt.w / 2 : pt.rx;
            ry = pt.ry === undefined ? pt.y + pt.w / 2 : pt.ry;

            ctx.translate(rx, ry);
            ctx.rotate(pt.radian);

            skin = pt.skin;

            if (Number(skin.imgIndex) > -1) {

                // if we have a skin for the part use the skin
                ctx.strokeStyle = '#ff0000';
                ctx.drawImage(
                    state.img[skin.imgIndex],
                    skin.sx,
                    skin.sy,
                    skin.sw,
                    skin.sh,
                    -pt.w / 2 + Number(skin.xOffset),
                    -pt.h / 2 + Number(skin.yOffset),
                    pt.w,
                    pt.h);

                if (skin.renderPartBox) {

                    ctx.strokeRect(-pt.w / 2, -pt.h / 2, pt.w, pt.h);

                }

            }

            if (skin.appendRender != 'none') {

                skin.draw();

            }

            ctx.restore();

        }

        // all parts rendered, so render logo if given
        if (state.logo) {

            pt = state.logo;
            skin = state.logo.skin;

            ctx.save();
            ctx.globalAlpha = state.opacity;

            if (Number(pt.opacity) >= 0) {

                ctx.globalAlpha = pt.opacity;

            }

            ctx.drawImage(
                state.img[skin.imgIndex],
                skin.sx,
                skin.sy,
                skin.sw,
                skin.sh,
                pt.x + Number(skin.xOffset),
                pt.y + Number(skin.yOffset),
                pt.w,
                pt.h);

            ctx.restore();

        }

        disp = document.getElementById('for_frame_ui_info');

        if (disp) {

            disp.innerHTML = 'frame: ' + state.frame + '\/' + state.maxFrame;

        }

    }

});

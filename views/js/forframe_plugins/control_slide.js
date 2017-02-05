/*
 *    control_slide.js
 *
 *    a slide control plug-in for froFrame.js
 *
 */

scene.injectPlugin((function () {

        // set the frame based on the current event
        var setFrame = function (e, marker) {

            var maxFrame = scene.state.maxFrame,
            per = e.clientX / e.target.clientWidth,
            frame = Math.floor(maxFrame * per);

            if (e.target.id === 'control_slide_bar') {

                scene.setFrame(frame);
                scene.renderFrame(frame);

                marker.style.left = Math.floor(e.target.clientWidth * per - 3) + 'px';

            }
        },
        frameSetActive = false;

        return {

            name : 'control_slide',

            ui : function () {

                var bar = document.createElement('div'),
                marker = document.createElement('div');

                bar.id = 'control_slide_bar';
                bar.style.width = '100%';
                bar.style.height = '10px';
                bar.style.background = '#ff0000';
                marker.style.width = '6px';
                marker.style.height = '10px';
                marker.style.position = 'absolute';
                marker.style.background = '#00ff00';

                bar.addEventListener('mousedown', function (e) {

                    frameSetActive = true;

                });

                bar.addEventListener('mouseup', function (e) {

                    frameSetActive = false;

                });

                bar.addEventListener('mouseout', function (e) {

                    //frameSetActive = false;

                });

                bar.addEventListener('mousemove', function (e) {

                    if (frameSetActive) {

                        setFrame(e, marker);

                    }

                });

                bar.appendChild(marker);

                return bar;

            }

        };

    }
        ()));

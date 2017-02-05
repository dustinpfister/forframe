
scene.injectPlugin({

    name : 'injectUI',
    ui : function () {

        var ui = document.createElement('p');
        ui.innerHTML = '<p><\/p>';

        return ui;

    },

    method : function (scope) {

        var ui = document.createElement('div'),
        control;

        ui.style.outline = '1px solid #000000';
        ui.style.width = '640px';
        ui.style.height = '120px';

        // play/stop button
        control = document.createElement('input');
        control.type = 'button';
        control.value = 'play\/stop';
        control.style.margin = '10px';
        control.addEventListener('click', function (e) {

            scene.play(scope[0]);

        });
        ui.appendChild(control);

        // step+ button
        control = document.createElement('input');
        control.type = 'button';
        control.value = 'step+';
        control.style.margin = '10px';
        control.addEventListener('click', function (e) {

            // step the current frame forward
            scene.step();
            scene.renderFrame(scope[0]);

        });
        ui.appendChild(control);

        // step- button
        control = document.createElement('input');
        control.type = 'button';
        control.value = 'step-';
        control.style.margin = '10px';
        control.addEventListener('click', function (e) {

            // step the current frame forward
            scene.step(true);
            scene.renderFrame(scope[0]);

        });
        ui.appendChild(control);

        // make PNG's
        /*
        control = document.createElement('input');
        control.type = 'button';
        control.value = 'toPNGCollection';
        control.style.margin = '10px';
        control.addEventListener('click', function (e) {

        scene.toPNGCollection(scope[0]);

        });
        ui.appendChild(control);

		*/
         

        // info div
        control = document.createElement('div');
        control.id = 'for_frame_ui_info';
        control.style.margin = '10px';
        ui.appendChild(control);

        scene.setFrame(0);
        scene.renderFrame(scope[0]);

        document.getElementById(scope[0].containerId).appendChild(ui);

    }

});

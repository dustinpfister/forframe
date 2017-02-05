
var cssLink = document.createElement("link") 
cssLink.href = "css/style.css"; 
cssLink.rel = "stylesheet"; 
cssLink.type = "text/css"; 
document.getElementById('ui_plugins').contentWindow.document.body.appendChild(cssLink);

scene.onPlugInject = function (plugObj) {

    var plugs = document.getElementById('ui_plugins').contentWindow.document,
    container = document.createElement('div'),
    html = plugObj.ui()

        if (typeof html === 'string') {

            plugs.body.innerHTML += html;

        } else {

            // else assume a dom ref

            container.className = 'ui_plugin_container';
            container.innerHTML = '<p>' + plugObj.name + '<\/p>';
            container.appendChild(html);

            plugs.body.appendChild(container);

        }

};

AFRAME.registerComponent('change-scene-on-click', {
    schema: {
        color: {default: 'green'},
        sceneNum: {default: 0}
    },

    update: function () {
        var data = this.data;
        var el = this.el;  // <a-box>
        var defaultColor = el.getAttribute('material').color;
        var sky = document.querySelector('a-sky');

        function loadPorts(transports) {
            var boxes = document.querySelectorAll('a-box');
            for (var i=0; i< boxes.length; i++){
                //I think we can reuse the same two/three box port objects and just set their data appropriately.
                //As long as we have exactly the same number of boxes in every scene, we need no additional logic.
                boxes[i].setAttribute('position', transports[i].pos);
                boxes[i].setAttribute('change-scene-on-click', 
                    "sceneNum: " + transports[i].sceneIndex);
            }
            return;
        }

        el.addEventListener('click', function () {
            var scene = scenelist[data.sceneNum];
            sky.setAttribute('src', scene.sceneref);
            sky.setAttribute('phi-start', scene.sceneyrot);
            el.setAttribute('color', defaultColor);
            //Set sky yaw.
            loadPorts(scene.transports);
            //Call a function to (un)load new tooltip boxes here.

        });

        el.addEventListener('mouseenter', function () {
            el.setAttribute('color', data.color);
        });

        el.addEventListener('mouseleave', function () {
            el.setAttribute('color', defaultColor);
        });
    }
});
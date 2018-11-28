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

        function setPois(tooltips){
            console.log('setPois');
            var poi1_trigger = document.querySelector('#poi1');
            var poi2_trigger = document.querySelector('#poi2');
            var poi1_src = document.querySelector('#image1');
            var poi1_src = document.querySelector('#image2');
            var scene = scenelist[data.sceneNum];

            poi1_trigger.setAttribute('position', scene.tooltips[0].pos);
            poi1_src.setAttribute('material', {
                src: scene.tooltips[0].videoAsset
            });
            poi2_trigger.setAttribute('position', scene.tooltips[1].pos);
            poi2_src.setAttribute('material', {
                src: scene.tooltips[1].videoAsset
            });
            return;
        }

        function startNarration(narration){
            console.log(narration);
            var narr = document.querySelector('#sceneNarration');
            narr.setAttribute('sound', {
                src: narration
            });
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
            setPois(scene.tooltips);
            startNarration(scene.narration);
        });

        el.addEventListener('mouseenter', function () {
            el.setAttribute('color', data.color);
        });

        el.addEventListener('mouseleave', function () {
            el.setAttribute('color', defaultColor);
        });
    }
});
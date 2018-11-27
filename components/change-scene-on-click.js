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

        function loadPois(tooltips){
            var spheres = document.querySelectorAll('a-sphere');
            var scene = scenelist[data.sceneNum];
            var pois = document.querySelectorAll('vidpanel');
            console.log(pois);
            for (var i=0; i< spheres.length; i++){
                spheres[i].setAttribute('position', tooltips[i].pos);
                spheres[i].setAttribute('change-scene-on-click', 
                    "sceneNum: " + tooltips[i].sceneIndex);
                pois[i].setAttribute('position', scene.tooltips[i].pos);
                pois[i].setAttribute('material', {
                    src: scene.tooltips[0].videoAsset
                });
            
            }
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
            loadPois(scene.tooltips);
            loadPorts(scene.transports);
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
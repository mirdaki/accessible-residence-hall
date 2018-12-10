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
            var boxes = document.querySelectorAll('.model');
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
            var circles = document.querySelectorAll('a-circle');
            var scene = scenelist[data.sceneNum];
            var pois = document.querySelectorAll('.vidpanel');
            //this is printing out an empty list
            console.log(pois);
            for (var i=0; i< circles.length; i++){
                //circle positions
                circles[i].setAttribute('position', tooltips[i].pos);
                circles[i].setAttribute(('scale'), tooltips[i].scale);
                //vid pannel positions    
                pois[i].setAttribute('position', scene.tooltips[i].vidPos);
                pois[i].setAttribute('material', {
                    src: tooltips[i].videoAsset
                });
                pois[i].setAttribute('sound', {
                    src: tooltips[i].poiNarration
                });
            }
            return;
        }

        function startNarration(narration){
            var narrScene = document.querySelector('#sceneNarration');
            narrScene.setAttribute('sound', {
                src: narration
            });
            narrScene.components.sound.playSound();
            console.log("THIS IS NARRATION " + narration);
            return;
        }

        function clickFunction(){
            //el.removeAttribute('click');
            //el.setAttribute('change-scene-on-click', data);
            el.setAttribute('color', defaultColor);
            var scene = scenelist[data.sceneNum];
            sky.setAttribute('src', scene.sceneref);
            sky.setAttribute('phi-start', scene.sceneyrot);
            el.setAttribute('color', defaultColor);
            //Set sky yaw.
            loadPois(scene.tooltips);
            loadPorts(scene.transports);
            startNarration(scene.narration);
            el.removeEventListener('click', clickFunction);
            return;
        }

        el.addEventListener('click', clickFunction);

        el.addEventListener('mouseenter', function () {
            el.setAttribute('color', data.color);
        });

        el.addEventListener('mouseleave', function () {
            el.setAttribute('color', defaultColor);
        });
    }
});
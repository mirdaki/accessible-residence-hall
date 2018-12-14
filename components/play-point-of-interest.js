AFRAME.registerComponent('play-point-of-interest',{

    schema:{
        poi:{default: ''},
        narr:{default: ''},
        number:{default: 0}
    },

    update: function(){
        var data = this.data;
        var el = this.el;
        //get the narration and other attributes from here

        var narration = document.querySelector('#sceneNarration');

        el.addEventListener('click', function(){
            //var videoSource = el.getAttribute('material', src);
            var material = el.getAttribute ('material');
            var video = material.src;

            console.log('playing video');
            // narration.components.sound.pauseSound();

            // End scene narrations and captions
            narration.components.sound.stopSound();
            document.querySelector("#captions").setAttribute('value', "");
            clearInterval(sceneTimerControl);
            captionIndex = 0;

            //playing video
            el.components.sound.playSound();

            //if image don't play video
            if((video.id).includes('Image')){
                //video.play();
                loadCaptions();
            }
            else{
                video.play();
                //load captions
                loadCaptions();
            }
            //playing poi narration sound
            el.addEventListener('mouseleave', function(){
                var video = document.querySelector(data.poi);
                // el.components.sound.pauseSound();
                el.components.sound.stopSound();

                // Turn off captions
                clearInterval(poiTimerControl);
                document.querySelector("#captions").setAttribute('value', "");
                poiCaptionIndex = 0;

                if(!(video.id).includes('Image')){
                    video.pause();
                }
                //resume scene narration
                console.log('stopping video');
                // narration.components.sound.playSound();
            });
        });

        function loadCaptions(){
            var text = document.querySelector("#captions");
            var scene = scenelist[globalData.sceneNum];

            // If at end of list
            if (scene.tooltips[data.number].poiCaptions.length == poiCaptionIndex)
            {
                text.setAttribute('value', "");
                clearInterval(poiTimerControl);
                poiCaptionIndex = 0;
                return;
            }

            text.setAttribute('value', scene.tooltips[data.number].poiCaptions[poiCaptionIndex].text);
            clearInterval(poiTimerControl);
            poiTimerControl = setInterval(loadCaptions, scene.tooltips[data.number].poiCaptions[poiCaptionIndex].time);
            ++poiCaptionIndex;
        }
    }

});


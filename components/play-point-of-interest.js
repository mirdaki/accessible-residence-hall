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
            var video = document.querySelector(data.poi);
            //var poiNarr = document.querySelector(data.narr);
            console.log('playing video');
            narration.components.sound.pauseSound();
            //playing video
            el.components.sound.playSound();
            video.play();
            //load captions
            loadCaptions();
            //playing poi narration sound
            el.addEventListener('mouseleave', function(){
                var video = document.querySelector(data.poi);
                var poiNarr = document.querySelector(data.narr);
                el.components.sound.pauseSound();
                video.pause();

                //resume scene narration
                console.log('stopping video');
                narration.components.sound.playSound();
            });
        });

        function loadCaptions(){
            var text = document.querySelector("#captions");
            var scene = scenelist[globalData.sceneNum];

            // If at end of list
            if (scene.tooltips[data.number].poiCaptions.length == poiCaptionIndex)
            {
                text.setAttribute('value', "");
                clearInterval(timerControl);
                poiCaptionIndex = 0;
                return;
            }

            text.setAttribute('value', scene.tooltips[data.number].poiCaptions[poiCaptionIndex].text);
            clearInterval(timerControl);
            timerControl = setInterval(loadCaptions, scene.tooltips[data.number].poiCaptions[poiCaptionIndex].time);
            ++poiCaptionIndex;
        }
    }

});


AFRAME.registerComponent('play-point-of-interest',{

    schema:{
        poi:{default: ''},
        narr:{default: ''}
    },

    update: function(){
        var data = this.data;
        var el = this.el;
                //get the narration and other attributes from here

        var narration = document.querySelector('#sceneNarration');

        el.addEventListener('click', function(){
            var video = document.querySelector(data.poi);
            //var poiNarr = document.querySelector(data.narr);
            console.log("THIS IS POI "+poiNarr);
            console.log('playing video');
            narration.components.sound.pauseSound();
            //playing video
            el.components.sound.playSound();
            video.play();
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
    }

});


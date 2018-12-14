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
            //var videoSource = el.getAttribute('material', src);
            var material = el.getAttribute ('material');
            var video = material.src;

            console.log('playing video');
            narration.components.sound.pauseSound();
            //playing video
            el.components.sound.playSound();
            
            if(!(video.id).includes('Image')){
                video.play();
            }
            //playing poi narration sound
            el.addEventListener('mouseleave', function(){
                var video = document.querySelector(data.poi);
                el.components.sound.pauseSound();
                if(!(video.id).includes('Image')){
                    video.pause();
                }
                //resume scene narration
                console.log('stopping video');
                narration.components.sound.playSound();
            });
        });
    }

});


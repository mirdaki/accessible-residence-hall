AFRAME.registerComponent('play-point-of-interest',{

    schema:{
        poi:{default: ''}
    },

    update: function(){
        var data = this.data;
        var el = this.el;
                //get the narration and other attributes from here

        var narration = document.querySelector('[sound]');

        el.addEventListener('click', function(){
            var video = document.querySelector(data.poi);
            console.log(video);
            console.log('playing video');
            narration.components.sound.pauseSound();
            //playing video
            video.play();

            el.addEventListener('mouseleave', function(){
                var video = document.querySelector(data.poi);
                video.pause();
                //resume scene narration
                console.log('stopping video');
                narration.components.sound.playSound();
            });
        });
    }

});


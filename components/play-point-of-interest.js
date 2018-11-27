AFRAME.registerComponent('play-point-of-interest',{

    schema:{
        poi:{default: ''}
    },

    update: function(){
        var data = this.data;
        var el = this.el;
                //get the narration and other attributes from here

        var narration = document.querySelector('[sound]');
        //el.setAttribute('material',{
        //    src: '#lift'
        //});
        el.addEventListener('click', function(){
            var video = document.querySelector(data.poi);
            narration.components.sound.pauseSound();
            //playing video
            video.play();
            video.addEventListener('mouseleave', function(){
                var video = document.querySelector(data.poi);
                video.pause();
                //resume scene narration
                narration.components.sound.playSound();
            });
        });
    }

});


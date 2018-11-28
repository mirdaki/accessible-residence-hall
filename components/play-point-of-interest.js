AFRAME.registerComponent('play-point-of-interest',{

    schema:{
        poi:{default: ''}
    },

    update: function(){
        var data = this.data;
        var el = this.el;
        var sky = document.querySelector('a-sky');
                //get the narration and other attributes from here

        var narration = document.querySelector('[sound]');
        //el.setAttribute('material',{
        //    src: '#lift'
        //});

        
        
        el.addEventListener('mouseenter', function(){
            var video_source = el.getAttribute('material').src;
            var video = document.querySelector('#'+video_source.id);
            var scene = sky.getAttribute('src');//the id of the current scene

            console.log('entered video');
            console.log(narration);
            console.log(scene);
            console.log(el.getAttribute('material').src);
            //pauseing scene narration
            narration.components.sound.pauseSound();
            //playing video
            video.play();
        });
        el.addEventListener('mouseleave', function(){
            var video_source = el.getAttribute('material').src;
            var video = document.querySelector('#'+video_source.id);
            
            console.log('exited video');
            //pausing video
            video.pause();
            //resume scene narration
            narration.components.sound.playSound();

        });
       

    }

});


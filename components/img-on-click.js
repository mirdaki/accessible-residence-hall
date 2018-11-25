AFRAME.registerComponent('img-on-click', {
    schema: {
        target: {default: ''}
    },

    update: function () {
        var data = this.data;
        var el = this.el;  // <the a-circle>

        el.addEventListener('click', function () {
            var img = document.querySelector(data.target);
            img.setAttribute('visible', true);
            //Nested listener that is invoked from the image (and not the POI)
            img.addEventListener('mouseleave', function () {
                img.setAttribute('visible', false);
            });
        });
    }
});
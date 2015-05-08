define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ ' <div class="widget upload-widget">',
            '       <input class="upload" type="file" name="image"/>',
            '       <button class="remove hidden">Remove Image</button>',
            '   </div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'change input.upload': 'onInputChange',
            'click button.remove': 'removeImage'
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value'

            } );

            Widget.prototype.initialize.call( this, options );

            if(options.model.get(options.name))
                this.$('button.remove').removeClass('hidden');

        },

        onInputChange: function(e){

            var that = this;

            if(
                !e.target.files[0] ||
                (
                    e.target.files[0].type !== 'image/jpeg' &&
                    e.target.files[0].type !== 'image/png'  &&
                    e.target.files[0].type !== 'image/jpg'
                )
            ){
                console.error('File upload error. you cant upload anything but a picture');
            }
            else{
                $.ajax({
                    url: 'upload.php',
                    method: 'POST',
                    contentType:false,
                    processData: false,
                    data: (function(){
                        var data = new FormData();
                        data.append('image', e.target.files[0]);
                        return data;
                    })()
                })
                .done(function(imageUrl){
                    that.$('button.remove').removeClass('hidden');
                    that.change(imageUrl);
                });
            }

        },

        removeImage: function(){
            this.$('button.remove').addClass('hidden');
            this.change('');
        }

    } );

} );

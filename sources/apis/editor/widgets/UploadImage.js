define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, Widget ) {

    return Widget.extend( {

        el : [ '<div class="widget upload-button-widget">'
        ,'           <input type="file" id="uploader" value="Upload" name="image" class="upload">'
        , '          <input type="hidden" class="imageName" value="">'            
        ,'      </div>'
        ].join( '' ),

        events : _.extend( { }, Widget.prototype.events, {
            'change .upload:input' : 'uploadEvent',
            'change .imageName:input' : 'changeEvent',
        } ),

        initialize : function ( options ) {

            options = _.defaults( options || { }, {

                model        : new Backbone.Model( ),
                name         : 'value',
                selectEvent  : 'uploadSelectEvent',
                cancelEvent  : 'uploadCancelEvent',
                text         : '',
                action       : null

            }, options );

            Widget.prototype.initialize.call( this, options );

            this.$el.find( '.button' ).text( this.options.text );

            if ( this.options.action ) {
                this.$el.find( '.button' ).attr('data-action', this.options.action);
            }
        },

        clickEvent : function ( e ) {

            e.preventDefault();

            //Upload
            this.$el.find('.file').trigger('click');

        },

        uploadEvent: function ( e ) {
            var self = this;
            if ( e.target.files[ 0 ] ) {

                if ( this.options.selectEvent ) {
                    this.options.model.trigger( this.options.selectEvent, e.target.files[0], this );
                $.ajax({
                    url: 'upload.php',
                    type: 'POST',
                    contentType:false,
                    processData: false,
                    data: function(){
                        var data = new FormData();
                        data.append('picture',$('#uploader').get(0).files[0]);
                        return data;
                    }(),
                    success: function (data) {
                        self.change( data );
                    }
                });
                }

            } else {

                //User canceled upload
                if ( this.options.cancelEvent ) {
                    this.options.model.trigger( this.options.cancelEvent, this );
                }

            }
        },
        changeEvent: function( e ){
            var value = $( '.imageName' ).val( );
        },

        render : function ( ) {
            $( '.imageName' ).val();
        }

    } );

} );

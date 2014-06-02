define( [

    'vendors/Backbone',
    'vendors/Underscore',

    'apis/editor/widgets/Image',
    'apis/editor/widgets/Widget'

], function ( Backbone, _, ImageWidget, Widget ) {

    return Widget.extend( {

        el : [ '<div class="widget image-widget factored-image-widget">'
             , '    <div class="widget-wrapper">'
             , '        <a class="display toggle">'
             , '            <img class="false-preview" />'
             , '        </a>'
             , '    </div>'
             , '    <div class="selectbox">'
             , '    </div>'
             , '</div>'
        ].join( '' ),

        initialize : function ( options ) {

            options = _.defaults( options || { }, {

                model     : new Backbone.Model( ),
                name      : 'value',

                maxWidth  : Infinity,
                maxHeight : Infinity,

                convert : function ( n ) {
                    return n / 100;
                }

            } );

            Widget.prototype.initialize.call( this, options );

            if ( typeof this.get( 'factor' ) === 'undefined' )
                this.set( 'factor', 1 );

            this.set( { r : 0, g : 0, b : 0 } );

            this.canvas = document.createElement( 'canvas' );
            this.context = this.canvas.getContext( '2d' );

            this.image = ImageWidget.reify( this, _.defaults( { }, this.options.imageOptions, {

                el : this.$el,

                model : this.model,
                name : this.field( 'original' )

            } ) );

            this.updateImageEvent( );

        },

        render : function ( ) {

            Widget.prototype.render.apply( this, arguments );

            var value = this.get( );

            if ( value instanceof HTMLCanvasElement ) {
                this.$( '.false-preview' ).css( 'background-color', 'rgb(0, 0, 0)' );
                this.$( '.false-preview' ).attr( 'src', value.toDataURL( ) );
            } else {
                this.$( '.false-preview' ).attr( 'src', 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==' );
                this.$( '.false-preview' ).css( 'background-color', 'rgb(' + Math.round( value.r * 255 ) + ',' + Math.round( value.g * 255 ) + ',' + Math.round( value.b * 255 ) + ')');
            }

        },

        delegateEvents : function ( ) {

            Widget.prototype.delegateEvents.apply( this, arguments );

            this.model.on( 'change:' + this.field( 'original' ), this.updateImageEvent, this );
            this.model.on( 'change:' + this.field( 'factor' ), this.updateImageEvent, this );

        },

        undelegateEvents : function ( ) {

            Widget.prototype.undelegateEvents.apply( this, arguments );

            this.model.off( 'change:' + this.field( 'original' ), this.updateImageEvent, this );
            this.model.off( 'change:' + this.field( 'factor' ), this.updateImageEvent, this );

        },

        updateImageEvent : function ( ) {

            var original = this.get( 'original' );
            var factor = this.options.convert( this.get( 'factor' ) );

            if ( original instanceof Image ) {

                var onLoad = function ( ) {

                    if ( this.get( 'original' ) !== original )
                        return ; // This call is not relevant anymore

                    var canvas = this.canvas;
                    var context = this.context;

                    var width = original.width, height = original.height;

                    var ratio = width / height;

                    if ( width > this.options.maxWidth ) {
                        width = this.options.maxWidth;
                        height = Math.floor( width / ratio );
                    }

                    if ( height > this.options.maxHeight ) {
                        height = this.options.maxHeight;
                        width = Math.floor( height * ratio );
                    }

                    this.canvas.width = width;
                    this.canvas.height = height;

                    context.drawImage( original, 0, 0, original.width, original.height, 0, 0, canvas.width, canvas.height );
                    context.fillStyle = 'rgba(0, 0, 0, ' + ( 1 - factor ) + ')';
                    context.fillRect( 0, 0, canvas.width, canvas.height );

                    if ( this.get( ) !== canvas ) {
                        this.set( canvas );
                    } else {
                        // We need to force the change signal by reseting the field before
                        this.model.set( this.field( ), null, { silent : true } );
                        this.model.set( this.field( ), canvas );
                    }

                }.bind( this );

                if ( original.complete ) {
                    // Using a delayed execution allows to give the same specificity to both code branches : the image will not be completed when returning. Some tests are using this assertion.
                    window.setTimeout( onLoad, 0 );
                } else {
                    original.addEventListener( 'load', onLoad );
                }

            } else {

                // Using a delayed execution allows to give the same specificity to both code branches : the image will not be completed when returning. Some tests are using this assertion.
                window.setTimeout( function ( ) {

                    this.set( {
                        r : original.r * factor,
                        g : original.g * factor,
                        b : original.b * factor
                    } );

                }.bind( this ), 0 );

            }

        }


    } );

} );

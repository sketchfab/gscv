define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/popups/Texture',
    'apis/editor/widgets/Tabbed',
    'apis/editor/widgets/Vertical',
    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, TexturesPopup, TabbedWidget, VerticalWidget, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget image-widget">',
            '    <div class="widget-wrapper">',
            '        <a class="display toggle">',
            '            <canvas class="preview"></canvas>',
            '        </a>',
            '    </div>',
            '    <div class="selectbox">',
            '    </div>',
            '</div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'click .toggle': 'toggleEvent',
            'click .open': 'openEvent'
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value',

                allowColor: true,
                allowTexture: true,

                // Expects models to have { label:, value:, image: } properties
                collection: new Backbone.Collection()

            } );

            Widget.prototype.initialize.call( this, options );

            this.globalCloseEvent_ = this.globalCloseEvent.bind( this );

            this.canvas = this.$( '.preview' )[ 0 ] || document.createElement( 'canvas' );
            this.context = this.canvas.getContext( '2d' );

            if ( this.get() === undefined )
                this.set( {
                    r: 1,
                    g: 1,
                    b: 1
                } );


            var colorPanel, texturePanel;

            if ( this.options.allowColor && this.options.allowTexture ) {

                var tabbed = TabbedWidget.reify( this );
                this.$( '.selectbox' ).append( tabbed.$el );
                texturePanel = tabbed.createPanel( 'Texture' );
                colorPanel = tabbed.createPanel( 'Color' );

            } else {

                if ( this.options.allowColor ) {
                    colorPanel = VerticalWidget.reify( this );
                    this.$( '.selectbox' ).append( colorPanel.$el );
                }

                if ( this.options.allowTexture ) {
                    texturePanel = VerticalWidget.reify( this );
                    this.$( '.selectbox' ).append( texturePanel.$el );
                }

            }

            if ( this.options.allowColor ) {

                this.colorWidget = colorPanel.createWidget( 'Color' );
                this.colorWidget.on( 'change', this.applyColorEvent, this );

            }

            if ( this.options.allowTexture ) {

                var importWidget = texturePanel.createWidget( 'Button', {
                    text: 'Manage textures'
                } );

                importWidget.model.on( 'click', function () {

                    var popup = new TexturesPopup( this, {

                        model: this.textureWidget.options.model,
                        name: this.textureWidget.options.name,

                        collection: this.options.collection

                    } );

                    popup.on( 'uploadRequest', function ( file ) {
                        this.model.trigger( 'uploadSelectEvent', file );
                    }.bind( this ) );

                }.bind( this ) );

                this.textureWidget = texturePanel.createWidget( 'Select', {
                    placeholder: 'Choose texture',
                    options: this.options.collection,
                    image: 'image'
                } );

                this.textureWidget.model.on( 'change', this.applyTextureEvent, this );
                this.model.on( 'change', this.updateTextureEvent, this );
                this.options.collection.on( 'add', this.updateTextureEvent, this );

                this.updateTextureEvent();

                var filtering = texturePanel.createWidget( 'Horizontal' );
                filtering.createWidget( 'Label', {
                    content: 'Filtering:',
                    classname: 'setting'
                } );
                filtering.createWidget( 'Select', {
                    model: this.model,
                    name: this.field( 'minFilter' ),
                    allowEmpty: false,
                    options: {
                        'NEAREST': 'Nearest',
                        'LINEAR': 'Bilinear',
                        'LINEAR_MIPMAP_LINEAR': 'Trilinear'
                    }
                } );

                var format = texturePanel.createWidget( 'Horizontal' );
                format.createWidget( 'Label', {
                    content: 'Format:',
                    classname: 'setting'
                } );
                format.createWidget( 'Select', {
                    model: this.model,
                    name: this.field( 'internalFormat' ),
                    allowEmpty: false,
                    options: {
                        'RGB': 'RGB',
                        'RGBA': 'RGBA',
                        'LUMINANCE': 'Luminance'
                    }
                } );

                var wraps = texturePanel.createWidget( 'Horizontal' );
                wraps.createWidget( 'Label', {
                    content: 'Wrap S:',
                    classname: 'setting'
                } );
                wraps.createWidget( 'Select', {
                    model: this.model,
                    name: this.field( 'wrapS' ),
                    allowEmpty: false,
                    options: {
                        'REPEAT': 'Repeat',
                        'MIRRORED_REPEAT': 'Mirror',
                        'CLAMP_TO_EDGE': 'Clamp'
                    }
                } );

                var wrapt = texturePanel.createWidget( 'Horizontal' );
                wrapt.createWidget( 'Label', {
                    content: 'Wrap T:',
                    classname: 'setting'
                } );
                wrapt.createWidget( 'Select', {
                    model: this.model,
                    name: this.field( 'wrapT' ),
                    allowEmpty: false,
                    options: {
                        'REPEAT': 'Repeat',
                        'MIRRORED_REPEAT': 'Mirror',
                        'CLAMP_TO_EDGE': 'Clamp'
                    }
                } );
            }
        },

        delegateEvents: function () {

            Widget.prototype.delegateEvents.apply( this, arguments );

            $( document ).on( 'mousedown', this.globalCloseEvent_ );

        },

        undelegateEvents: function () {

            Widget.prototype.undelegateEvents.apply( this, arguments );

            $( document ).off( 'mousedown', this.globalCloseEvent_ );

        },

        render: function () {

            Widget.prototype.render.apply( this, arguments );

            var value = this.get();

            if ( value instanceof HTMLImageElement || value instanceof HTMLCanvasElement ) {

                this.canvas.width = value.width;
                this.canvas.height = value.height;

                this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
                this.context.drawImage( value, 0, 0 );

            } else {

                this.canvas.width = this.canvas.height = 1;

                this.context.fillStyle = 'rgb(' + Math.round( value.r * 255 ) + ',' + Math.round( value.g * 255 ) + ',' + Math.round( value.b * 255 ) + ')';
                this.context.fillRect( 0, 0, 1, 1 );

                // We might have a color without colorWidget (if options.allowColor is false)
                if ( this.colorWidget ) {
                    this.colorWidget.set( value );
                }

            }

        },

        toggleEvent: function ( e ) {

            if ( this.$el.hasClass( 'opened' ) ) {
                this.closeEvent( e );
            } else {
                this.openEvent( e );
            }

        },

        openEvent: function ( e ) {

            e.preventDefault();
            e.stopPropagation();

            this.$el.addClass( 'opened' );

        },

        closeEvent: function ( /*e*/) {

            this.$el.removeClass( 'opened' );

        },

        globalCloseEvent: function ( e ) {

            if ( $.contains( this.el, e.target ) )
                return;

            this.closeEvent( e );

        },

        applyColorEvent: function () {

            this.change( this.colorWidget.get() );

        },

        // When the Select value change, we update the widget

        applyTextureEvent: function () {

            var textureUID = this.textureWidget.get();
            var texture = this.options.collection.findWhere( {
                'value': textureUID
            } );

            if ( !texture )
                return;

            var image = texture.get( 'imageData' );

            // The flag allow us to know if we're still relevant.
            // It's useful is multiple applyTextureEvent are triggered before an image has been loaded.

            var flag = this.flag = {};

            var onReady = function () {

                if ( flag !== this.flag )
                    return;

                if ( image.imageModel ) {
                    this.change( image );
                } else {
                    this.change( { r : 1, g : 1, b : 1 } );
                }

            }.bind( this );

            if ( image.complete ) {
                onReady();
            } else image.addEventListener( 'load', function () {
                onReady();
            } );

        },

        // When the widget value change, we update the Select value

        updateTextureEvent: function () {

            var value = this.get();

            if ( value instanceof Image ) {
                var selectedTexture = this.options.collection.findWhere( {
                    image: value.src
                } );
                this.textureWidget.set( selectedTexture ? selectedTexture.get( 'value' ) : null );
            } else {
                this.textureWidget.set( null );
            }

        }

    } );

} );

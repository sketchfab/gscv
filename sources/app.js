/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
            name : 'Hugo Caillard',
            job : 'Web Developer',
            'bg-color' : {
                r: .2,
                g: .2,
                b: .2
            },
            'border-color' : {
                r: .2,
                g: .2,
                b: .2
            }
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:border-size', this.onBorderSizeChange, this );
            this.model.on( 'change:border-color', this.onBorderColorChange, this );
            this.model.on( 'change:bg-color', this.onBGColorChange, this );
            this.model.on( 'change:image', this.onImageChange, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
        },

        rgbToHex: function ( rgb ) {
            var rounded = {
                r: rgb.r * 255,
                g: rgb.g * 255,
                b: rgb.b * 255
            };
            return  '#' + ( 16777216 | rounded.b | ( rounded.g << 8 ) | ( rounded.r << 16 ) ).toString( 16 ).substr( 1 );
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onBorderSizeChange : function ( ) {
            this.$el.css( 'border-width', this.model.get( 'border-size' ) );
        },

        onBorderColorChange : function ( ) {
            var hex = this.rgbToHex( this.model.get( 'border-color' ) );
            console.log(hex);
            this.$el.css( 'border-color',  hex );
        },

        onBGColorChange : function ( ) {
            var hex = this.rgbToHex( this.model.get( 'bg-color' ) );
            this.$el.css( 'background-color',  hex );
        }

    } );

    // --- --- --- --- --- --- --- --- ---

    var card = new Card( );
    var view = new View( {
        model : card,
        el : $( '.card' )
    } );

    // --- --- --- --- --- --- --- --- ---

    view.render( );

    // --- --- --- --- --- --- --- --- ---

    var texts = editor.createWidget( 'Group', {
        label : 'Card Texts'
    } );

    texts.createWidget( 'Name', 'Input', {
        model : card,
        name  : 'name',
        $parentEl : view.$el,
        color: {
            r: .9,
            g: .9,
            b: .9
        }
    } );

    texts.createWidget( 'Job', 'Input', {
        model  : card,
        name  : 'job',
        $parentEl : view.$el,
        color: {
            r: .6,
            g: .6,
            b: .6
        }
    } );

    // --- --- --- --- --- --- --- --- ---

    var appearance = editor.createWidget( 'Group', {
        label  : 'Card Appearance',
        opened : false
    } );

    appearance.createWidget( 'Border radius', 'NumberedSlider', {
        model : card,
        name  : 'radius'
    } );

    appearance.createWidget( 'Border size', 'NumberedSlider', {
        model : card,
        name  : 'border-size'
    } );

    appearance.createWidget( 'Border color', 'Color', {
        model : card,
        name  : 'border-color'
    } );

    appearance.createWidget( 'Background color', 'Color', {
        model : card,
        name  : 'bg-color'
    } );

} );


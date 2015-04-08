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
            this.model.on( 'change:bg-color', this.onColorChange, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onColorChange : function ( ) {
            var rgb = this.model.get( 'bg-color' );
            var rounded = {
                r: rgb.r * 255,
                g: rgb.g * 255,
                b: rgb.b * 255
            };
            var hex = '#' + ( 16777216 | rounded.b | ( rounded.g << 8 ) | ( rounded.r << 16 ) ).toString( 16 ).substr( 1 );

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
        $parentEl : view.$el
    } );

    texts.createWidget( 'Job', 'Input', {
        model  : card,
        name  : 'job',
        $parentEl : view.$el
    } );

    // --- --- --- --- --- --- --- --- ---

    var appearance = editor.createWidget( 'Group', {
        label  : 'Card Appearance',
       // opened : false
    } );

    appearance.createWidget( 'Border radius', 'NumberedSlider', {
        model : card,
        name  : 'radius'
    } );

    appearance.createWidget( 'Background color', 'Color', {
        model : card,
        name  : 'bg-color'
    } );

} );


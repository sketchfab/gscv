/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
            background: "#2C2C2C"
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:background', this.onBackColorChange, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onBackColorChange( );
            // console.log(this.model.get('background'));
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onBackColorChange : function ( ) {
            var hexColor = this.rgb2hex(this.model.get( 'background' ));
            this.$el.css( 'background-color', hexColor );
            // console.log('background changed : ', hexColor );
        },

        rgb2hex : function ( rgb ) {

            var rounded = {
                r: rgb.r * 255,
                g: rgb.g * 255,
                b: rgb.b * 255
            };
            return '#' + ( 16777216 | rounded.b | ( rounded.g << 8 ) | ( rounded.r << 16 ) ).toString( 16 ).substr( 1 );
        }

    } );

    // --- --- --- --- --- --- --- --- ---

    var card = new Card( );
    var view = new View( { model : card, el : $( '.card' ) } );

    view.render( );

    // --- --- --- --- --- --- --- --- ---

    var appearance = editor.createWidget( 'Group', {
        label : 'Card Appearance'
    } );

    appearance.createWidget( 'Border radius', 'NumberedSlider', {
        model : card,
        name  : 'radius'
    } );

    appearance.createWidget( 'Background', 'Color', {
        model : card,
        name : 'background'
    });

    // appearance.createWidget( 'test', 'FilePicker', {
    //         model : card,
    //         selectEvent: 'uploadSelectEvent',
    //         cancelEvent: 'uploadCancelEvent',
    //         text: '',
    //         action: null
    //     });
    
    // Hack to initialize default color of color pickers
    appearance.$el.find('.color-widget input').val(card.defaults.background);
    appearance.$el.find('.color-widget input').trigger('change');

} );

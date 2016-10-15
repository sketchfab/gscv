/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
            cardBackgroundColor : { r : 0.17255, g : 0.17255, b : 0.17255 },
            fontsize : 24,
            fontColor : { r : 1, g : 1, b : 1 },
            name : 'My Name',
            job : 'My job',
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:cardBackgroundColor', this.onCardBackgroundColorChange, this );
            this.model.on( 'change:fontsize', this.onFontSizeChange, this );
            this.model.on( 'change:fontColor', this.onFontColorChange, this );
            this.model.on( 'change:name', this.onNameChange, this );
            this.model.on( 'change:job', this.onJobChange, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onCardBackgroundColorChange( );
            this.onFontSizeChange( );
            this.onFontColorChange();
            this.onNameChange( );
            this.onJobChange( );
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onCardBackgroundColorChange : function ( ) {
            this.$el.css( 'background-color', this.rgbToHex( this.model.get( 'cardBackgroundColor' ) ) );
        },

        onFontSizeChange : function ( ) {
            this.$el.css( 'font-size', this.model.get( 'fontsize' ) );
        },

        onFontColorChange : function ( ) {
            this.$el.css( 'color', this.rgbToHex( this.model.get( 'fontColor' ) ) );
        },

        onNameChange : function ( ) {
            this.$( '.name' ).text( this.model.get( 'name' ) );
        },

        onJobChange : function ( ) {
            this.$( '.job' ).text( this.model.get( 'job' ) );
        },

        rgbToHex : function ( rgb ) {
            var rounded = {
                r: rgb.r * 255,
                g: rgb.g * 255,
                b: rgb.b * 255
            };
            return '#' + ( 16777216 | rounded.b | ( rounded.g << 8 ) | ( rounded.r << 16 ) ).toString( 16 ).substr( 1 );
        },

    } );

    // --- --- --- --- --- --- --- --- ---

    var card = new Card( );
    var view = new View( { model : card, el : $( '.card' ) } );

    view.render( );

    // --- --- --- --- --- --- --- --- ---

    // card appearance
    var appearance = editor.createWidget( 'Group', {
        label : 'Card Appearance'
    } );

    appearance.createWidget( 'Border radius', 'NumberedSlider', {
        model : card,
        name  : 'radius'
    } );

    appearance.createWidget( 'Background color', 'Color', {
        model : card,
        name : 'cardBackgroundColor'
    } );


    // font appearance
    var fontAppearance = editor.createWidget( 'Group', {
        label : 'Font appearance'
    } );

    fontAppearance.createWidget( 'Font size', 'NumberedSlider', {
        model : card,
        name  : 'fontsize'
    } );

    fontAppearance.createWidget( 'Font color', 'Color', {
        model : card,
        name : 'fontColor'
    })


    // text appearance
    var textContent = editor.createWidget( 'Group', {
        label : 'Text content'
    } );

    textContent.createWidget( 'Name', 'Text', {
        model : card,
        name : 'name'
    } );

    textContent.createWidget( 'Job', 'Text', {
        model : card,
        name : 'job'
    })

} );

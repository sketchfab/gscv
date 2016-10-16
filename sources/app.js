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
            nameFontSize : 24,
            jobFontSize : 18,
            nameFontColor : { r : 1, g : 1, b : 1 },
            jobFontColor : { r : 1, g : 1, b : 1 },
            nameFontFamily : 'Helvetica',
            jobFontFamily : 'Arial',
            name : 'My Name',
            job : 'My job',
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:cardBackgroundColor', this.onCardBackgroundColorChange, this );
            this.model.on( 'change:nameFontSize', this.onNameFontSizeChange, this );
            this.model.on( 'change:jobFontSize', this.onJobFontSizeChange, this );
            this.model.on( 'change:nameFontColor', this.onNameFontColorChange, this );
            this.model.on( 'change:jobFontColor', this.onJobFontColorChange, this );
            this.model.on( 'change:nameFontFamily', this.onNameFontFamilyChange, this );
            this.model.on( 'change:jobFontFamily', this.onJobFontFamilyChange, this );
            this.model.on( 'change:name', this.onNameChange, this );
            this.model.on( 'change:job', this.onJobChange, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onCardBackgroundColorChange( );
            this.onNameFontSizeChange( );
            this.onJobFontSizeChange( );
            this.onNameFontColorChange( );
            this.onJobFontColorChange( );
            this.onNameFontFamilyChange( );
            this.onJobFontFamilyChange( );
            this.onNameChange( );
            this.onJobChange( );
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onCardBackgroundColorChange : function ( ) {
            this.$el.css( 'background-color', this.rgbToHex( this.model.get( 'cardBackgroundColor' ) ) );
        },

        onNameFontSizeChange : function ( ) {
            this.$( '.name' ).css( 'font-size', this.model.get( 'nameFontSize' ) );
        },

        onJobFontSizeChange : function ( ) {
            this.$( '.job' ).css( 'font-size', this.model.get( 'jobFontSize' ) );
        },

        onNameFontColorChange : function ( ) {
            this.$( '.name' ).css( 'color', this.rgbToHex( this.model.get( 'nameFontColor' ) ) );
        },

        onJobFontColorChange : function ( ) {
            this.$( '.job' ).css( 'color', this.rgbToHex( this.model.get( 'jobFontColor' ) ) );
        },

        onNameFontFamilyChange : function ( ) {
            this.$( '.name' ).css( 'font-family', this.model.get( 'nameFontFamily' ) );
        },

        onJobFontFamilyChange : function ( ) {
            this.$( '.job' ).css( 'font-family', this.model.get( 'jobFontFamily' ) );
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


    // text appearance
    var textAppearance = editor.createWidget( 'Group', {
        label : 'Text appearance'
    } );

    // name
    var nameAppearance = textAppearance.createWidget( 'Group', {
        label : 'Name appearance'
    } );

    nameAppearance.createWidget( 'Name', 'Text', {
        model : card,
        name : 'name'
    } );

    nameAppearance.createWidget( 'Name font family', 'Text',  {
        model : card,
        name : 'nameFontFamily'
    } );

    nameAppearance.createWidget( 'Name font size', 'NumberedSlider', {
        model : card,
        name  : 'nameFontSize'
    } );

    nameAppearance.createWidget( 'Name font color', 'Color', {
        model : card,
        name : 'nameFontColor'
    } );

    // job
    var jobAppearance = textAppearance.createWidget( 'Group', {
        label : 'Job appearance'
    } );

    jobAppearance.createWidget( 'Job', 'Text', {
        model : card,
        name : 'job'
    } );

    jobAppearance.createWidget( 'Job font family', 'Text',  {
        model : card,
        name : 'jobFontFamily'
    } );

    jobAppearance.createWidget( 'Job font size', 'NumberedSlider', {
        model : card,
        name  : 'jobFontSize'
    } );

    jobAppearance.createWidget( 'Job font color', 'Color', {
        model : card,
        name : 'jobFontColor'
    } );

} );

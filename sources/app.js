/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
            backgroundColor : { r : 0.17255, g : 0.17255, b : 0.17255 },
            secondBackgroundColor : { r : 1, g : 1, b : 1 },
            borderWidth : 10,
            borderStyle : 'none',
            borderColor : { r : 0, g : 0, b : 0 },
            isLinearGradientActive : false,
            linearGradientOrientation : 45,

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
            this.model.on( 'change:backgroundColor', this.onBackgroundColorChange, this );
            this.model.on( 'change:secondBackgroundColor', this.onSecondBackgroundColorChange, this );
            this.model.on( 'change:isLinearGradientActive', this.onIsLinearGradientActiveChange, this );
            this.model.on( 'change:linearGradientOrientation', this.onLinearGradientOrientationChange, this);
            this.model.on( 'change:borderWidth', this.onBorderWidthChange, this );
            this.model.on( 'change:borderStyle', this.onBorderStyleChange, this );
            this.model.on( 'change:borderColor', this.onBorderColorChange, this );

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
            this.onBackgroundColorChange( );
            this.onBorderWidthChange( );
            this.onBorderStyleChange( );
            this.onBorderColorChange( );

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

        onBorderWidthChange : function ( ) {
            this.$el.css( 'border-width', this.model.get( 'borderWidth' ) );
        },

        onBorderStyleChange : function ( ) {
            this.$el.css( 'border-style', this.model.get( 'borderStyle' ) );
        },

        onBorderColorChange : function ( ) {
            this.$el.css( 'border-color', this.rgbToHex( this.model.get( 'borderColor' ) ) );
        },

        onBackgroundColorChange : function ( ) {
            if( this.model.get( 'isLinearGradientActive' ) ) {
                this.$el.css( 'background-image', this.getLinearGradient( ) );
            } else {
                this.$el.css( 'background-color', this.rgbToHex( this.model.get( 'backgroundColor' ) ) );
            }
        },

        onSecondBackgroundColorChange : function ( ) {
            this.$el.css( 'background-image', this.getLinearGradient( ) );
        },

        onIsLinearGradientActiveChange : function ( ) {
            if( this.model.get( 'isLinearGradientActive' ) ) {
                this.$el.css( 'background-image', this.getLinearGradient( ) );
            } else {
                this.$el.css( 'background-image', '' );
                this.$el.css( 'background-color', this.rgbToHex( this.model.get( 'backgroundColor' ) ) );
            }
        },

        onLinearGradientOrientationChange : function ( ) {
            this.$el.css( 'background-image', this.getLinearGradient( ) );
        },

        getLinearGradient : function ( ) {
            return 'linear-gradient( ' + this.model.get( 'linearGradientOrientation' ) + 'deg, ' +
                    this.rgbToHex( this.model.get( 'backgroundColor' ) ) + ', ' + 
                    this.rgbToHex( this.model.get( 'secondBackgroundColor' ) ) + ')';
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

    appearance.createWidget( 'Border width', 'NumberedSlider', {
        model : card,
        name : 'borderWidth'
    } );

    appearance.createWidget( 'Border style', 'Select', {
        model : card,
        name : 'borderStyle',
        options : {
            'none' : 'None',
            'solid' : 'Solid',
            'dotted' : 'Dotted',
            'dashed' : 'Dashed',
            'double' : 'Double',
            'groove' : 'Groove',
            'ridge' : 'Ridge',
            'inset' : 'Inset',
            'outset' : 'Outset'
        }
    } );

    appearance.createWidget( 'Border color', 'Image', {
        model : card,
        name : 'borderColor',
        allowTexture : false
    })

    appearance.createWidget( 'Background color', 'Image', {
        model : card,
        name : 'backgroundColor',
        allowTexture : false
    } );

    appearance.createWidget( 'ToggleSwitch', {
        model : card,
        label : 'Linear gradient',
        name : 'isLinearGradientActive'
    } );

    var hiddenLinearGradient = appearance.createWidget( 'Hyde', {
        model : card,
        name : 'isLinearGradientActive'
    } );
    
    hiddenLinearGradient.createWidget( 'Second color', 'Image', {
        model : card,
        name : 'secondBackgroundColor',
        allowTexture : false
    } );

    hiddenLinearGradient.createWidget( 'Linear gradient orientation', 'Angle', {
        model : card,
        name : 'linearGradientOrientation'
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

    nameAppearance.createWidget( 'Name font color', 'Image', {
        model : card,
        name : 'nameFontColor',
        allowTexture : false
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

    jobAppearance.createWidget( 'Job font color', 'Image', {
        model : card,
        name : 'jobFontColor',
        allowTexture : false
    } );

} );

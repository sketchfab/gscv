/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            bckgColor : { "r" : 0, "g" : 0, "b" : 0 },
            bckgImg   : undefined,
            radius    : 10,
            name      : "Maël Nison",
            job       : "FrontEnd Developer",
            font      : "Courier New",
            fontSize  : 11,
            fontColor : { "r" : 0, "g" : 0, "b" : 0 }
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:bckgColor', this.onBckgColorChange, this );
            this.model.on( 'change:bckgImg', this.onBckgImgChange, this );
            this.model.on( 'change:radius', this.onRadiusChange, this );

            this.model.on( 'change:name', this.onNameChange, this );
            this.model.on( 'change:job', this.onJobChange, this );
            this.model.on( 'change:font', this.onFontChange, this );
            this.model.on( 'change:fontSize', this.onFontSizeChange, this );
            this.model.on( 'change:fontColor', this.onFontColorChange, this );        
        },

        render : function ( ) {
            this.onBckgColorChange( );
            this.onBckgImgChange( );
            this.onRadiusChange( );
            this.onNameChange( );
            this.onJobChange( );
            this.onFontChange( );
            this.onFontSizeChange( );
            this.onFontColorChange( );
        },
        
        onBckgColorChange : function ( ) {
            // Color.js is probably badly understood...
            var r = Math.round ( this.model.get('bckgColor')["r"] * 255 );
            var g = Math.round ( this.model.get('bckgColor')["g"] * 255 );
            var b = Math.round ( this.model.get('bckgColor')["b"] * 255 );
            var rgb = "rgb(" + r + "," + g + "," + b + ")";
            this.$el.css( 'background-color', rgb );
        },

        onBckgImgChange : function ( ) {
            // Stuck, no input from the upload box ..?
            console.log( this.model.get( 'bckgImg') );
            if ( this.model.get( 'bckgImg' ) )
            {
                console.log( this.model.get( 'bckgImg') );
                this.$el.css( 'background-image', "url" + "(" + this.model.get( 'bckgImg' ) + ")" );
            }
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },
        
        onNameChange : function ( ) {
            this.$el.children( 'div.name' ).text( this.model.get( 'name' ) );
        },

        onJobChange : function ( ) {
            this.$el.children( 'div.job' ).text( this.model.get( 'job' ) );
        },

        onFontChange : function ( ) {
            this.$el.css( 'font-family', this.model.get( 'font') );
        },

        onFontSizeChange : function ( ) {
            this.$el.css( 'font-size', this.model.get( 'fontSize' ) );
        },

        onFontColorChange : function ( ) {
            // Color.js is probably badly understood...
            var r = Math.round ( this.model.get('fontColor')["r"] * 255 );
            var g = Math.round ( this.model.get('fontColor')["g"] * 255 );
            var b = Math.round ( this.model.get('fontColor')["b"] * 255 );
            var rgb = "rgb(" + r + "," + g + "," + b + ")";
            this.$el.children( 'div.name' ).css( 'color', rgb );
            this.$el.children( 'div.job' ).css( 'color', rgb );
        }  

    } );

    // --- --- --- --- --- --- --- --- ---

    var card = new Card( );
    var view = new View( { model : card, el : $( '.card' ) } );

    view.render( );

    // --- --- --- --- CARD WIDGETS --- --- --- ---

    var appearance = editor.createWidget( 'Group', {
        label : 'Card Appearance'
    } );

    appearance.createWidget( 'Background Color', 'Color', {
        model: card,
        name: 'bckgColor'
    } );

    appearance.createWidget( 'Background Image', 'FilePicker', {
        model: card,
        name: 'bckgImg'
    } );

    appearance.createWidget( 'Border radius', 'NumberedSlider', {
        model : card,
        name  : 'radius'
    } );

    // --- --- --- --- TEXT WIDGETS --- --- --- ---

    var textAppearance = editor.createWidget( 'Group', {
        label : 'Text Appearance'
    } );

    textAppearance.createWidget( 'Name', 'Text', {
        model : card,
        name  : 'name'
    } );

    textAppearance.createWidget( 'Job', 'Text', {
        model : card,
        name  : 'job'
    } );

    textAppearance.createWidget( 'Font', 'Select', {
        model : card,
        options : ['Arial', 'Courier New', 'Helvetica', 'Impact', 'Verdana'],
        name  : 'font'
    } );

    textAppearance.createWidget( 'Font Size', 'NumberedSlider', {
        model : card,
        name  : 'fontSize'
    } );

    textAppearance.createWidget( 'Font Color', 'Color', {
        model : card,
        name  : 'fontColor'
    } );
    

} );

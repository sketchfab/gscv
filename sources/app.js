/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius   : 10,
            name     : "Maël Nison",
            job      : "FrontEnd Developer",
            font     : "Courier New",
            fontSize : 11,
            fontColor : "rgb( 0, 0, 0)"
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:name', this.onNameChange, this );
            this.model.on( 'change:job', this.onJobChange, this );
            this.model.on( 'change:font', this.onFontChange, this );
            this.model.on( 'change:fontSize', this.onFontSizeChange, this );
            this.model.on( 'change:fontColor', this.onFontColorChange, this );
            this.model.on( 'change:radius', this.onRadiusChange, this );        
        },

        render : function ( ) {
            this.onNameChange( );
            this.onJobChange( );
            this.onFontChange( );
            this.onFontSizeChange( );
            this.onFontColorChange( );
            this.onRadiusChange( );  
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
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
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

    // --- --- --- --- --- --- --- --- ---

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

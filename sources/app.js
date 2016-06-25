/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
            fontSize : 20,
            backgroundColor : {r:0, g:0, b:0},
            textColor : {r:1, g:1, b:1},
            name : "Prénom NOM",
            job : "Fonction"
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:fontSize', this.onFontSizeChange, this );
            this.model.on( 'change:backgroundColor', this.onBackgroundColorChange, this );
            this.model.on( 'change:textColor', this.onTextColorChange, this );
            this.model.on( 'change:name', this.onFirstnameChange, this );
            this.model.on( 'change:job', this.onJobChange, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onFontSizeChange( );
            this.onBackgroundColorChange( );
            this.onTextColorChange( );
            this.onFirstnameChange( );
            this.onJobChange( );
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onFontSizeChange : function ( ) {
            this.$el.css( "font-size" , this.model.get( 'fontSize' )+" px");
        },

        onBackgroundColorChange : function ( ) {
            var color = this.model.get( 'backgroundColor' );
            this.$el.css( 'background-color', "rgb("+Math.round(color.r*255)+","+Math.round(color.g*255)+","+Math.round(color.b*255)+")" );
        },

        onTextColorChange : function ( ) {
            var color = this.model.get( 'textColor' );
            this.$el.css( 'color', "rgb("+Math.round(color.r*255)+","+Math.round(color.g*255)+","+Math.round(color.b*255)+")" );
        },

        onFirstnameChange : function ( ) {
            $(this.$el.find(".name")).text( this.model.get( 'name' ) );
        },

        onJobChange : function ( ) {
            $(this.$el.find(".job")).text( this.model.get( 'job' ) );
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

    appearance.createWidget( 'Font size', 'Number', {
        model : card,
        name  : 'fontSize'
    } );

    appearance.createWidget( 'Background color', 'Color', {
        model : card,
        name  : 'backgroundColor'
    } );

    appearance.createWidget( 'Text color', 'Color', {
        model : card,
        name  : 'textColor'
    } );


    var content = editor.createWidget( 'Group', {
        label : 'Content'
    } );

    content.createWidget( 'Name', 'TextField', {
        model : card,
        name : 'name'
    } );

    content.createWidget( 'Job', 'TextField', {
        model : card,
        name : 'job'
    } );

} );

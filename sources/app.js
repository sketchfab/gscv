/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            firstName : 'John',
            lastName : 'Doe',
            title : 'Frontend developer',
            radius : 10,
            borderWith : 0,
            borderStyle : 'solid',
            borderColor : '#000000'
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:firstName', this.onFirstNameChange, this );
            this.model.on( 'change:lastName', this.onLastNameChange, this );
            this.model.on( 'change:title', this.onTitleChange, this );
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:borderWith', this.onBorderChange, this );
            this.model.on( 'change:borderStyle', this.onBorderChange, this );
            this.model.on( 'change:borderColor', this.onBorderChange, this );
        },

        render : function ( ) {
            this.onFirstNameChange( );
            this.onLastNameChange( );
            this.onTitleChange( );
            this.onRadiusChange( );
            this.onBorderChange( );
        },

        onFirstNameChange : function ( ) {
            this.$el.find('.ske-js-Card-firstName').text( this.model.get( 'firstName' ) );
        },

        onLastNameChange : function ( ) {
            this.$el.find('.ske-js-Card-lastName').text( this.model.get( 'lastName' ) );
        },

        onTitleChange : function ( ) {
            this.$el.find('.ske-js-Card-title').text( this.model.get( 'title' ) );
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onBorderChange : function ( ) {

            this.$el.css({
              'border-width': this.model.get( 'borderWith' ),
              'border-style': this.model.get( 'borderStyle' ),
              'border-color': this.model.get( 'borderColor' )
            })
        }

    } );

    // --- --- --- --- --- --- --- --- ---

    var card = new Card( );
    var view = new View( { model : card, el : $( '.card' ) } );

    view.render( );

    // --- --- --- --- --- --- --- --- ---

    var appearance = editor.createWidget( 'Group', {
        label : 'Card Content'
    } );

    appearance.createWidget( 'First name', 'Input', {
        model : card,
        name  : 'firstName'
    } );

    appearance.createWidget( 'Last name', 'Input', {
        model : card,
        name  : 'lastName'
    } );

    appearance.createWidget( 'Title', 'Input', {
        model : card,
        name  : 'title'
    } );

    var appearance = editor.createWidget( 'Group', {
        label : 'Card Appearance'
    } );

    appearance.createWidget( 'Border radius', 'NumberedSlider', {
        model : card,
        name  : 'radius'
    } );

    appearance.createWidget( 'Border width', 'NumberedSlider', {
        model : card,
        name  : 'borderWith'
    } );

    appearance.createWidget( 'Border color', 'Color', {
        model : card,
        name  : 'borderColor'
    } );

} );

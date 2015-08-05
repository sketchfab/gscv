/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
            name   : "Maël Nison",
            job    : "FrontEnd Developer"
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:name', this.onNameChange, this );
            this.model.on( 'change:job', this.onJobChange, this );
            this.model.on( 'change:radius', this.onRadiusChange, this );        
        },

        render : function ( ) {
            this.onNameChange( );
            this.onJobChange( );
            this.onRadiusChange( );  
        },

        onNameChange : function ( ) {
            this.$el.children( 'div.name' ).text( this.model.get( 'name' ) );
        },

        onJobChange : function ( ) {
            this.$el.children( 'div.job' ).text( this.model.get( 'job' ) );
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

    appearance.createWidget( 'Name', 'Text', {
        model : card,
        name  : 'name'
    } );

    appearance.createWidget( 'Job', 'Text', {
        model : card,
        name  : 'job'
    } );

    appearance.createWidget( 'Border radius', 'NumberedSlider', {
        model : card,
        name  : 'radius'
    } );

} );

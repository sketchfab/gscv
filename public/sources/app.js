/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
            name : $('.name').text(),
            job : $('.job').text()
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'click', this.onNameUpdate, this );
            this.model.on( 'click', this.onJobUpdate, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onNameUpdate( );
            this.onJobUpdate( );
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onNameUpdate : function ( ) {
            this.$el.find('.name').text( this.model.get( 'name' ) );
        },

        onJobUpdate : function ( ) {
            this.$el.find('.job').text( this.model.get( 'job' ) );
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

    appearance.createWidget( 'Nom', 'InputText', {
      model : card,
      name : 'name'
    } );

    appearance.createWidget( 'Métier', 'InputText', {
      model : card,
      name : 'job'
    } );

} );

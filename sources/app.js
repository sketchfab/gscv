/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
        },
        
        urlRoot : '/api/cards/'

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:background', this.onBackgroundChange, this);
            this.model.on( 'click', this.onSave, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onBackgroundChange( );
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onBackgroundChange : function ( ) {
            this.$el.css( 'background', this.model.get( 'background' ) );
        },
        
        onSave : function ( ) {
            this.model.save( );
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

    appearance.createWidget( 'Background color', 'Color', {
        model : card,
        name  : 'background'
    } );
    
    editor.createWidget( 'Button', {
        model : card,
        text  : 'Save'
    } );

} );

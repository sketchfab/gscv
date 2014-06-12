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
            this.model.on( 'change:color', this.onColorChange, this);
            this.model.on( 'change:background', this.onBackgroundChange, this);
            this.model.on( 'click', this.onSave, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onColorChange( );
            this.onBackgroundChange( );
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onBackgroundChange : function ( ) {
            this.$el.css( 'background', this.model.get( 'background' ) );
        },
        
        onColorChange : function ( ) {
            this.$el.css( 'color', this.model.get( 'color' ) );
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

    var colors = editor.createWidget( 'Group', {
        label : 'Card Colors',
        opened: false
    } );

    colors.createWidget( 'Background color', 'Color', {
        model : card,
        name  : 'background',
        base  : '#82d4f2'
    } );
    
    colors.createWidget( 'Text color', 'Color', {
        model : card,
        name  : 'color',
        base  : '#2a2a2a'
    } );

    editor.createWidget( 'Button', {
        model : card,
        text  : 'Save'
    } );

} );

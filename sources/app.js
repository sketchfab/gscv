/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'
], function ( Backbone, $, editor) {

    var Card = Backbone.Model.extend( {

        defaults : {
            name: 'John Doe',
            title: 'Developer',
            radius : 10
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:name', this.onNameChange, this );
            this.model.on( 'change:title', this.onTitleChange, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onNameChange( );
            this.onTitleChange( );
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onNameChange: function() {
            this.$el.find('.name').text(this.model.get('name'));
        },

        onTitleChange: function() {
            this.$el.find('.job').text(this.model.get('title'));
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

    appearance.createWidget('Name','EditableField', {
        model: card,
        name: 'name'
    });

    appearance.createWidget('Title','EditableField', {
        model: card,
        name: 'title'
    });

} );

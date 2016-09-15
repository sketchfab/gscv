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
            job : $('.job').text(),
            sizeText : 16
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:name', this.onNameUpdate, this );
            this.model.on( 'change:job', this.onJobUpdate, this );
            this.model.on( 'change:colorText', this.onColorChange, this );
            this.model.on( 'change:sizeText', this.onTextChange, this );
            this.model.on( 'change:backgroundCard', this.onBackgroundChange, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onNameUpdate( );
            this.onJobUpdate( );
            this.onColorChange( );
            this.onTextChange( );
            this.onBackgroundChange( );
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onNameUpdate : function ( ) {
            this.$el.find('.name').text( this.model.get( 'name' ) );
        },

        onJobUpdate : function ( ) {
            this.$el.find('.job').text( this.model.get( 'job' ) );
        },

        onColorChange : function ( ) {
          this.$el.css( 'color', this.model.get('colorText') );
        },

        onTextChange : function ( ) {
            this.$el.css( 'font-size', this.model.get( 'sizeText' ) );
        },

        onBackgroundChange : function ( ) {
            this.$el.css( 'background-image', this.model.get( 'backgroundCard' ) );
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

    appearance.createWidget( 'Taille du texte', 'NumberedSlider', {
        model : card,
        name  : 'sizeText'
    } );

    appearance.createWidget( 'Couleur du texte', 'Color', {
        model : card,
        name : 'colorText'
    } );

    appearance.createWidget( 'Background de la carte', 'FilePicker', {
        model: card,
        name: 'backgroundCard'
    } );

} );

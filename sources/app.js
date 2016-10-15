/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
            fontsize : 24,
            name : 'My Name',
            job : 'My job',
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:fontsize', this.onFontSizeChange, this );
            this.model.on( 'change:name', this.onNameChange, this );
            this.model.on( 'change:job', this.onJobChange, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onFontSizeChange( );
            this.onNameChange( );
            this.onJobChange( );
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onFontSizeChange : function ( ) {
            this.$el.css( 'font-size', this.model.get( 'fontsize' ) );
        },

        onNameChange : function ( ) {
            this.$( '.name' ).text( this.model.get( 'name' ) );
        },

        onJobChange : function ( ) {
            this.$( '.job' ).text( this.model.get( 'job' ) );
        },

    } );

    // --- --- --- --- --- --- --- --- ---

    var card = new Card( );
    var view = new View( { model : card, el : $( '.card' ) } );

    view.render( );

    // --- --- --- --- --- --- --- --- ---

    // card appearance
    var appearance = editor.createWidget( 'Group', {
        label : 'Card Appearance'
    } );

    appearance.createWidget( 'Border radius', 'NumberedSlider', {
        model : card,
        name  : 'radius'
    } );


    // font appearance
    var fontAppearance = editor.createWidget( 'Group', {
        label : 'Font appearance'
    } );

    fontAppearance.createWidget( 'Font size', 'NumberedSlider', {
        model : card,
        name  : 'fontsize'
    } );


    // text appearance
    var textContent = editor.createWidget( 'Group', {
        label : 'Text content'
    } );

    textContent.createWidget( 'Name', 'Text', {
        model : card,
        name : 'name'
    } );

    textContent.createWidget( 'Job', 'Text', {
        model : card,
        name : 'job'
    })

} );

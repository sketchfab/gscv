/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
            name   : 'Quentin Leffray',
            job    : 'Backend Developer',
            email  : 'fiahil@gmail.com',
            url    : ''
        },
        
        urlRoot : '/api/cards/'

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:color', this.onColorChange, this);
            this.model.on( 'change:background', this.onBackgroundChange, this);
            this.model.on( 'change:name', this.onNameChange, this);
            this.model.on( 'change:job', this.onJobChange, this);
            this.model.on( 'change:email', this.onEmailChange, this);
            this.model.on( 'click', this.onSave, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onColorChange( );
            this.onBackgroundChange( );
            this.onNameChange( );
            this.onJobChange( );
            this.onEmailChange( );
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

        onNameChange : function ( ) {
            this.$('.name').text( this.model.get( 'name' ) );
        },

        onJobChange : function ( ) {
            this.$('.job').text( this.model.get( 'job' ) );
        },

        onEmailChange : function ( ) {
            this.$('.email').text( this.model.get( 'email' ) );
        },

        onSave : function ( ) {

            // Save model and provide visual feedback
            this.model.save( { }, {
                error   : function ( ) {
                    $( '.editor-panel' ).css( 'background-color', '#d12424' );
                    $( '.editor-panel' ).animate( { backgroundColor : '#595959' }, 300 );
                },

                success : function ( ) {
                    $( '.editor-panel' ).css( 'background-color', '#2fc129' );
                    $( '.editor-panel' ).animate( { backgroundColor : '#595959' }, 300 );
                }
            } );
        }

    } );

    // --- --- --- --- --- --- --- --- ---

    if ( window.cardID != -1 ) {
        var card = new Card( { id: window.cardID } );
        card.fetch( );
    }
    else {
        var card = new Card( );
    }

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

    // --- --- --- --- --- --- --- --- ---

    var data = editor.createWidget( 'Group', {
        label : 'Informations'
    } );

    data.createWidget( 'Name', 'String', {
        model : card,
        name  : 'name'
    } );

    data.createWidget( 'Job', 'String', {
        model : card,
        name  : 'job'
    } );

    data.createWidget( 'Email', 'String', {
        model : card,
        name  : 'email'
    } );

    // --- --- --- --- --- --- --- --- ---

    var settings = editor.createWidget( 'Group', {
        label : 'Card Settings'
    } );

    settings.createWidget( 'URL', 'String', {
        model : card,
        name  : 'url'
    } );

    // --- --- --- --- --- --- --- --- ---

    editor.createWidget( 'Button', {
        model : card,
        text  : 'Save'
    } );

} );

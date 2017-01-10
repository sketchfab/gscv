/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
            padding: 50,
            title: {
                text: 'Name',
                size: 30,
                color: '#ffffff'
            },
            subtitle: {
                text: 'Job',
                size: 20,
                color: '#bbbbbb'
            }
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:padding', this.onPaddingChange, this );
            this.model.on( 'change:title', this.bindRichTextChange( '.name', 'title' ), this );
            this.model.on( 'change:subtitle', this.bindRichTextChange( '.job', 'subtitle' ), this );
            this.model.on( 'all', this.debugChange, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onPaddingChange( );
            this.bindRichTextChange( '.name', 'title' )();
            this.bindRichTextChange( '.job', 'subtitle' )();
        },

        bindRichTextChange: function ( selector, key ) {
            var $richText = this.$el.find( selector );

            return function ( ) {
                var datas = this.model.get( key );
                $richText.text( datas.text );
                $richText.css( 'font-size', datas.size );
                $richText.css( 'color', datas.color );
            }.bind( this );
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onPaddingChange : function ( ) {
            this.$el.css( 'padding', this.model.get( 'padding' ) );
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

    appearance.createWidget( 'Paddings', 'NumberedSlider', {
        model : card,
        name  : 'padding'
    } );

    appearance.createWidget( 'Title', 'RichText', {
        model : card,
        name  : 'title',
        colorOptions : {
            format: 'hex'
        },
    } );

    appearance.createWidget( 'Subtitle', 'RichText', {
        model : card,
        name  : 'subtitle',
        colorOptions : {
            format: 'hex'
        },
    } );

} );

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
            this.model.on( 'change:radius',     this.bindPropertyChange( 'radius', 'border-radius' ), this );
            this.model.on( 'change:padding',    this.bindPropertyChange( 'padding', 'padding' ), this );
            this.model.on( 'change:title',      this.bindRichTextChange( 'title', '.name' ), this );
            this.model.on( 'change:subtitle',   this.bindRichTextChange( 'subtitle', '.job' ), this );
            this.model.on( 'all',               this.debugChange, this );
        },

        render : function ( ) {
            this.bindPropertyChange( 'radius', 'border-radius' )();
            this.bindPropertyChange( 'padding', 'padding' )();
            this.bindRichTextChange( 'title', '.name' )();
            this.bindRichTextChange( 'subtitle', '.job' )();
        },

        bindPropertyChange : function ( key, property ) {
            return function ( ) {
                this.$el.css( property, this.model.get( key ) );
            }.bind( this );
        },

        bindRichTextChange: function ( key, selector ) {
            var $richText = this.$el.find( selector );

            return function ( ) {
                var datas = this.model.get( key );
                $richText.text( datas.text );
                $richText.css( 'font-size', datas.size );
                $richText.css( 'color', datas.color );
            }.bind( this );
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

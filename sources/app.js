/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
            background: '#222222',
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
            this.handlers = [ ];

            this.addHandler( 'change:radius',     this.bindPropertyChange( 'radius', 'border-radius' ) );
            this.addHandler( 'change:padding',    this.bindPropertyChange( 'padding', 'padding' ) );
            this.addHandler( 'change:background', this.bindPropertyChange( 'background', 'background-color' ) );
            this.addHandler( 'change:title',      this.bindRichTextChange( 'title', '.name' ) );
            this.addHandler( 'change:subtitle',   this.bindRichTextChange( 'subtitle', '.job' ) );
        },

        render : function ( ) {
            this.handlers.forEach( handler => handler.call( this ) );
        },

        addHandler: function ( event, handler ) {
            this.model.on( event, handler, this );
            this.handlers.push( handler );
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

    var appearanceGroup = editor.createWidget( 'Group', {
        label : 'Card Appearance'
    } );

    appearanceGroup.createWidget( 'Border radius', 'NumberedSlider', {
        model : card,
        name  : 'radius'
    } );

    appearanceGroup.createWidget( 'Paddings', 'NumberedSlider', {
        model : card,
        name  : 'padding'
    } );

    appearanceGroup.createWidget( 'Background Color', 'Color', {
        model : card,
        name  : 'background',
        format: 'hex'
    } );

    var contentGroup = editor.createWidget( 'Group', {
        label : 'Content'
    } );

    contentGroup.createWidget( 'Title', 'RichText', {
        model : card,
        name  : 'title',
        colorOptions : {
            format: 'hex'
        },
    } );

    contentGroup.createWidget( 'Subtitle', 'RichText', {
        model : card,
        name  : 'subtitle',
        colorOptions : {
            format: 'hex'
        },
    } );

} );

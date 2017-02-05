/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
            background : {
              r: 0.1725490196,
              g: 0.1725490196,
              b: 0.1725490196
            },
            name: "Maël Nison",
            job: "Frontend Developer",
            font: 14,
            image: "",
            color: {
              r: 1,
              g: 1,
              b: 1
            }
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:font', this.onFontChange, this );
            this.model.on( 'change:background', this.onBackgroundChange, this );
            this.model.on( 'change:name', this.onNameChange, this );
            this.model.on( 'change:job', this.onJobChange, this );
            this.model.on( 'change:image', this.onImageChange, this );
            this.model.on( 'change:color', this.onColorChange, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onNameChange( );
            this.onJobChange( );
            this.onBackgroundChange( );
            this.onFontChange( );
            this.onImageChange( );
            this.onColorChange( );
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onFontChange : function ( ) {
            this.$el.css( 'font-size', this.model.get( 'font' ) );
        },

        onColorChange : function ( ) {
            var rgb = {
              r: this.model.get( 'color' ).r * 255,
              g: this.model.get( 'color' ).g * 255,
              b: this.model.get( 'color' ).b * 255
            };
            var hex = '#' + ( 16777216 | rgb.b | ( rgb.g << 8 ) | ( rgb.r << 16 ) ).toString( 16 ).substr( 1 );
            this.$el.css( 'color', hex );
        },

        onNameChange : function ( ) {
            this.$('.name').html(this.model.get( 'name' ) );
        },

        onJobChange : function ( ) {
            this.$('.job').html(this.model.get( 'job' ) );
        },

        onBackgroundChange : function ( ) {
            var rgb = {
              r: this.model.get( 'background' ).r * 255,
              g: this.model.get( 'background' ).g * 255,
              b: this.model.get( 'background' ).b * 255
            };
            var hex = '#' + ( 16777216 | rgb.b | ( rgb.g << 8 ) | ( rgb.r << 16 ) ).toString( 16 ).substr( 1 );
            this.$el.css( 'background', hex );
        },

        onImageChange : function ( ) {
            this.$el.css( 'background-image',  'url(images/' + this.model.get('image').name + ')');
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

    appearance.createWidget( 'Name', 'Input', {
        model : card,
        name  : 'name'
    } );

    appearance.createWidget( 'Job', 'Input', {
        model : card,
        name  : 'job'
    } );

    appearance.createWidget( 'Background color', 'Image', {
        model : card,
        name  : 'background'
    } );

    appearance.createWidget( 'Font size', 'NumberedSlider', {
        model : card,
        name  : 'font'
    } );

    appearance.createWidget( 'Font color', 'Image', {
        model : card,
        name  : 'color'
    } );

    appearance.createWidget( 'Image', 'FilePicker', {
        model : card,
        name  : 'image',
        text: 'Select File'
    } );
} );

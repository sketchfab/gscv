/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
            name: 'Tiago Ferreira',
            job: 'Pokemon Trainer',
            backgroundColor: {
              r: 0.17,
              g: 0.17,
              b: 0.17,
            },
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:backgroundColor', this.onBackgroundColorChange, this );
            this.model.on( 'change:name', this.onNameChange, this );
            this.model.on( 'change:job', this.onJobChange, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onNameChange( );
            this.onJobChange( );
            this.onBackgroundColorChange( );
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onBackgroundColorChange : function ( ) {
            var rgb = this.model.get( 'backgroundColor' );
            var rounded = {
                r: rgb.r * 255,
                g: rgb.g * 255,
                b: rgb.b * 255
            };
            var hex = '#' + ( 16777216 | rounded.b | ( rounded.g << 8 ) | ( rounded.r << 16 ) ).toString( 16 ).substr( 1 );
            this.$el.css( 'background-color', hex );
        },

        onNameChange : function ( ) {
          this.$el.find( '.name' ).html(this.model.get( 'name' ));
        },

        onJobChange : function ( ) {
          this.$el.find( '.job' ).html(this.model.get( 'job' ));
        },

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
        name  : 'backgroundColor'
    } );

    appearance.createWidget( 'Name', 'TextInput', {
        model : card,
        name  : 'name'
    } );

    appearance.createWidget( 'Job', 'TextInput', {
        model : card,
        name  : 'job'
    } );

} );

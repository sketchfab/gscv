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
            rotateY: 15,
            rotateX: 35,
            rotateZ: 10,
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:backgroundColor', this.onBackgroundColorChange, this );
            this.model.on( 'change:name', this.onNameChange, this );
            this.model.on( 'change:job', this.onJobChange, this );
            this.model.on( 'change:rotateY', this.onRotationChange, this );
            this.model.on( 'change:rotateX', this.onRotationChange, this );
            this.model.on( 'change:rotateZ', this.onRotationChange, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onNameChange( );
            this.onJobChange( );
            this.onBackgroundColorChange( );

            this.onRotationChange();
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onRotationChange : function ( ) {
              this.$el.css( 'transform', 'rotateY( '+this.model.get( 'rotateY' )+'deg ) rotateX( '+this.model.get( 'rotateX' )+'deg ) rotateZ( '+this.model.get( 'rotateZ' )+'deg )' );
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

    var position = editor.createWidget( 'Group', {
        label : 'Card Position'
    } );

    position.createWidget('Rotate Y', 'NumberedSlider', {
        model : card,
        name  : 'rotateY',
        minimum: -180,
        maximum: 180,
    });

    position.createWidget('Rotate X', 'NumberedSlider', {
        model : card,
        name  : 'rotateX',
        minimum: -180,
        maximum: 180,
    });

    position.createWidget('Rotate Z', 'NumberedSlider', {
        model : card,
        name  : 'rotateZ',
        minimum: -180,
        maximum: 180,
    });
} );

/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 8,
            textColor : '#FFFFFF',
            nameSize : 28,
            jobSize : 14,
            background : 'white'
        },

        backgroundList : {
            'grey': {
                label: 'Simple grey',
                applyTo: function ($target) {
                    $target.css('background', 'linear-gradient(180deg, #666 0%,#333 100%)');
                }
            },

            'white': {
                label: 'Corporate',
                applyTo: function ($target) {
                    $target.css('background', 'white');
                }
            },

            'colors1': {
                label: 'Frozen',
                applyTo: function ($target) {

                    $target.css('background', 'url("img/colors-01.jpg") center');
                    $target.css('background-size', 'cover');
                }
            },

            'colors2': {
                label: 'Spring',
                applyTo: function ($target) {

                    $target.css('background', 'url("img/colors-02.jpg") center');
                    $target.css('background-size', 'cover');
                }
            }
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:textColor', this.onTextColorChange, this );
            this.model.on( 'change:nameSize', 	  this.onNameSizeChange, this );
            this.model.on( 'change:jobSize', 	  this.onJobSizeChange, this );
            this.model.on( 'change:background',   this.onBackgroundChange, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onTextColorChange( );
            this.onNameSizeChange( );
            this.onJobSizeChange( );
            this.onBackgroundChange( );
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },
        onTextColorChange: function(){
            this.$el.find('.title').css('color', this.model.get('textColor'));
        },
        onNameSizeChange : function ( ) {
            this.$el.find('.name').css(
                'font-size',
                this.model.get('nameSize') + "px"
            );
        },
        onJobSizeChange : function ( ) {
            this.$el.find('.job').css(
                'font-size',
                this.model.get('jobSize') + "px"
            );
        },
        onBackgroundChange : function ( ) {
            var bgID = this.model.get( 'background' );
            this.model.backgroundList[ bgID ].applyTo( this.$el );
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
        name  : 'radius',
        minimum: 0,
        maximum: 40
    } );

    var backgroundImage = editor.createWidget( 'Group', {
        label : 'Background Image'
    } );

    backgroundImage.createWidget( 'Background Image', 'Select', {
        model : card,
        name  : 'background',
        placeholder : 'Select background',
        options : (function( ) {
            var list = { };
            for( var id in card.backgroundList)
                    list[id] = card.backgroundList[id].label;
            return list;
        })( )
    } );

    var font = editor.createWidget( 'Group', {
        label : 'Font'
    } );

    font.createWidget('Text Color', 'Color', {
        model: card,
        name: 'textColor'
    } );

    font.createWidget( 'Name Size', 'NumberedSlider', {
        model : card,
        name  : 'nameSize',
        minimum: 14,
        maximum: 40
    } );
    font.createWidget( 'Job Size', 'NumberedSlider', {
        model : card,
        name  : 'jobSize',
        minimum: 6,
        maximum: 25
    } );



} );

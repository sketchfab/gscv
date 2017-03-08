/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {
    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:background-color', this.onBackgroundColorChange, this );
            this.model.on( 'change:background-opacity', this.onBackgroundColorChange, this) ;
            this.model.on( 'change:font-family', this.onFontFamilyChange, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onProfileInfosChange : function ( ) {
          console.log(this.model.get('profile-infos'))
        },

        onBackgroundColorChange : function ( ) {
            // clone received value
            var colorValue = JSON.parse(JSON.stringify(this.model.get('background-color')));

            // not my proudest wank
            var color = 'rgba(' + Object.keys(colorValue).map(function(key) {
                // set value format for css
                return parseInt(colorValue[key] *= 255);
            }).reduce(function(total, value) {
                // concat all the value
                return total + ',' + value;
            }) + ',1)';

            // handle opacity
            var currentAlpha = color.split(',')[3];
            var newAlpha = this.model.get('background-opacity') / 100;

            // update card
            var newBackground = color.replace(currentAlpha, newAlpha + ')');
            this.$el.css('background-color', newBackground);
        },

        onFontFamilyChange : function ( ) {
          this.$el.parent().css('font-family', this.model.get('font-family'));
        }
    });

    // --- --- --- --- --- --- --- --- ---

    var card = new Card();
    var view = new View({model: card, el: $('.card')});

    view.render();

    // --- --- --- --- --- --- --- --- ---

    var appearance = editor.createWidget('Group', {label: 'Card Appearance'});

    appearance.createWidget('Border radius', 'NumberedSlider', {
        model: card,
        name: 'radius',
        maximum: 60
    });

    appearance.createWidget('Background color', 'Color', {
        model: card,
        name: 'background-color'
    }).set('#1caad9');

    appearance.createWidget('Background opacity', 'NumberedSlider', {
        model: card,
        name: 'background-opacity'
    }).set(100);


    appearance.createWidget('Font family', 'Select', {
        model: card,
        name: 'font-family',
        placeholder: 'Select your font',
        collection: window.fonts
      });


});

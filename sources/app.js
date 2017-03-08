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
            this.model.on( 'change:font-color', this.onFontColorChange, this );
        },

        rgbToCss: function ( rgbObject ) {
          // clone received value
          var colorValue = JSON.parse(JSON.stringify(rgbObject));

          // not my proudest wank
          var color = 'rgba(' + Object.keys(colorValue).map(function(key) {
              // set value format for css
              return parseInt(colorValue[key] *= 255);
          }).reduce(function(total, value) {
              // concat all the value
              return total + ',' + value;
          }) + ',1)';

          return color;
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

            var color = this.rgbToCss(this.model.get('background-color'));
            // handle opacity
            var currentAlpha = color.split(',')[3];
            var newAlpha = this.model.get('background-opacity') / 100;

            // update card
            var newBackground = color.replace(currentAlpha, newAlpha + ')');
            this.$el.css('background-color', newBackground);
        },

        onFontColorChange : function ( ) {

            var color = this.rgbToCss(this.model.get('font-color'));
            this.$el.css('color', color);
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

    var cardAppearance = editor.createWidget('Group', {label: 'Card Appearance'});

    cardAppearance.createWidget('Border radius', 'NumberedSlider', {
        model: card,
        name: 'radius',
        maximum: 60
    });

    cardAppearance.createWidget('Background color', 'Color', {
        model: card,
        name: 'background-color'
    }).set('#1caad9');

    cardAppearance.createWidget('Background opacity', 'NumberedSlider', {
        model: card,
        name: 'background-opacity'
    }).set(100);


    var fontAppearance = editor.createWidget('Group', {label: 'Font Appearance'});

    fontAppearance.createWidget('Font family', 'Select', {
        model: card,
        name: 'font-family',
        placeholder: 'Select your font',
        collection: window.fonts
      });

      fontAppearance.createWidget('Font color', 'Color', {
          model: card,
          name: 'font-color'
      }).set('#ffffff');

});

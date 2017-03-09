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
            this.model.on( 'change:font-size', this.onFontSizeChange, this );
            this.model.on( 'change:job', this.onJobChange, this );
            this.model.on( 'change:name', this.onNameChange, this );
            this.model.on( 'change:picture', this.onPictureChange, this );
            this.model.on( 'change:networks-facebook', this.onNetworksFacebookChange, this );
            this.model.on( 'change:networks-twitter', this.onNetworksTwitterChange, this );
            this.model.on( 'change:networks-github', this.onNetworksGithubChange, this );
            this.model.on( 'change:networks-linkedin', this.onNetworksLinkedinChange, this );
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

        notEmptyString(str){
          return str.length > 0 ? true : false;
        },

        render : function ( ) {
            this.onRadiusChange( );
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onJobChange : function ( ) {
            this.$el.find('.job').text(this.model.get( 'job' ))
        },

        onNetworksFacebookChange : function ( ) {
            var username = this.model.get( 'networks-facebook');
            var parent = this.$el.find('.fa-facebook-square').parent();

            if(this.notEmptyString(username))
                parent.css({ 'display' : 'flex'});
            else
                parent.css({ 'display' : 'none'});

            this.$el.find('.fa-facebook-square + p').text( username );
        },

        onNetworksTwitterChange : function ( ) {
          var username = this.model.get( 'networks-twitter');
          var parent = this.$el.find('.fa-twitter-square').parent();

          if(this.notEmptyString(username))
              parent.css({ 'display' : 'flex'});
          else
              parent.css({ 'display' : 'none'});

          this.$el.find('.fa-twitter-square + p').text( username );
        },

        onNetworksGithubChange : function ( ) {
          var username = this.model.get( 'networks-github');
          var parent = this.$el.find('.fa-github').parent();

          if(this.notEmptyString(username))
              parent.css({ 'display' : 'flex'});
          else
              parent.css({ 'display' : 'none'});

          this.$el.find('.fa-github + p').text( username );
        },

        onNetworksLinkedinChange : function ( ) {
          var username = this.model.get( 'networks-linkedin');
          var parent = this.$el.find('.fa-linkedin-square').parent();

          if(this.notEmptyString(username))
              parent.css({ 'display' : 'flex'});
          else
              parent.css({ 'display' : 'none'});

          this.$el.find('.fa-linkedin-square + p').text( username );
        },

        onNameChange : function ( ) {
            this.$el.find('.name').text(this.model.get( 'name' ))
        },

        onFontSizeChange : function ( ) {
            this.$el.css( 'font-size', this.model.get( 'font-size' ) );
        },
        onPictureChange : function ( ) {
          this.$el.find('.picture').css('background-image', 'url('+ this.model.get( 'picture' )+')')
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

    var content = editor.createWidget('Group',
    {
      label: 'Content',
      opened: false
    });

    content.createWidget('Your name', 'Text', {
        model: card,
        placeholder: 'Jeff',
        name: 'name',
      }).set('Your name');

    content.createWidget('Your job description', 'Text', {
        model: card,
        placeholder: 'CEO',
        name: 'job',
      }).set('Intern at Sketchfab');

    content.createWidget('Your picture', 'FilePicker', {
        model: card,
        name: 'picture',
      });

    var networks = content.createWidget('', 'Group', {
        model: card,
        name: 'networks',
        label: 'Your networks',

      });
    networks.createWidget('Twitter username', 'Text', {
        model: card,
        name: 'networks-twitter',
      });

    networks.createWidget('Facebook username', 'Text', {
        model: card,
        name: 'networks-facebook',
      });

    networks.createWidget('Github username', 'Text', {
        model: card,
        name: 'networks-github',
      });

    networks.createWidget('Linkedin username', 'Text', {
        model: card,
        name: 'networks-linkedin',
      });



    var cardAppearance = editor.createWidget('Group',
    {
      label: 'Card Appearance',
      opened: false
    });

    cardAppearance.createWidget('Border radius', 'NumberedSlider', {
        model: card,
        name: 'radius',
        maximum: 60
    }).set(3);

    cardAppearance.createWidget('Background color', 'Color', {
        model: card,
        name: 'background-color'
    }).set('#1caad9');

    cardAppearance.createWidget('Background opacity', 'NumberedSlider', {
        model: card,
        name: 'background-opacity'
    }).set(100);


    var fontAppearance = editor.createWidget('Group',
    {
      label: 'Font Appearance',
      opened: false
    });

    fontAppearance.createWidget('Font family', 'Select', {
        model: card,
        name: 'font-family',
        placeholder: 'Select your font',
        list: window.fonts
      });

      fontAppearance.createWidget('Font color', 'Color', {
          model: card,
          name: 'font-color'
      }).set('#ffffff');


      fontAppearance.createWidget('Font size', 'NumberedSlider', {
          model: card,
          name: 'font-size',
          maximum: 24,
          minim: 9
      }).set(14);

      var exportBtn = editor.createWidget('Button',
      {
        label: 'Content',
        text: 'Export card',
      });

      exportBtn.exportCard = function() {
        var html2obj = html2canvas($('.card'));

        var queue  = html2obj.parse();
        var canvas = html2obj.render(queue);
        var img = canvas.toDataURL();

        var link = document.createElement("a");
        link.download = 'Your gscv';
        link.href = img;
        link.click();
      };
      exportBtn.$el.click(exportBtn.exportCard)
});

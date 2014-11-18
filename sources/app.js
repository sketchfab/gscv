/*global define*/
define([
  'vendors/Backbone',
  'vendors/JQuery',
  'editor'
], function(Backbone, $, editor) {

  'use strict';

  var Card = Backbone.Model.extend({
    defaults: {
      radius: 20,
      bgColor: '#1caad9',
      bgImage: '',
      isBgMosaic: false,
      fontColor: '#FFFFFF',
      fontSize: 16,
      fontFamily: 'Titillium Web',
      textShadow: '#0A1BA5',
      dimensions: {
        width: 550,
        height: 300
      },
      name: 'Dave Lauper',
      position: 'CTO',
      company: 'Internet',
      location: 'San Francisco, CA'
    }
  });

  var View = Backbone.View.extend({
    template: _.template($('#card-template').html()),
    events: {
      'resize': 'updateDimensions',
      'focus [contenteditable]': 'startEdit',
      'blur [contenteditable]': 'endEdit'
    },
    initialize: function() {
      // bindings
      this.model.on('change:radius', this.onRadiusChange, this);
      this.model.on('change:bgImage change:isBgMosaic', this.onBgImageChange, this);
      this.model.on('change:bgColor', this.onBgColorChange, this);
      this.model.on('change:fontColor', this.onFontColorChange, this);
      this.model.on('change:fontSize', this.onFontSizeChange, this);
      this.model.on('change:dimensions', this.onDimensionsChange, this);
      this.model.on('change:textShadow', this.onTextShadowChange, this);
      this.model.on('change:fontFamily', this.onFontFamilyChange, this);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.onBgColorChange();
      this.onBgImageChange();
      this.onRadiusChange();

      return this;
    },
    keyControlEditMode: function (e) {
      var initialData = this.model.get(e.target.className);

      if (e.which===27) {
        e.preventDefault();

        $(e.target)
          .text(initialData)
          .blur();
      } else if (e.which===13) {
        e.preventDefault();

        $(e.target).blur();
      }
    },
    startEdit: function (e) {
      document.addEventListener('keydown', this.keyControlEditMode.bind(this), true);
    },
    endEdit: function (e) {
      document.removeEventListener('keydown', this.keyControlEditMode.bind(this), true);
      if (e.target.innerText.length > 0){
        this.updateData(e);
      } else {
        e.target.innerText = this.model.get(e.target.className);
      }
    },
    updateData: function (e) {
      this.model.set(e.target.className, e.target.innerText);
    },
    updateDimensions: function () {
      this.model.set('dimensions', {
        width: this.$el.width(),
        height: this.$el.height()
      });
    },
    onDimensionsChange: function () {
      var dimensions = this.model.get('dimensions');

      this.$el.css({
        'width': dimensions.width,
        'height': dimensions.height
      });
    },
    onTextShadowChange: function () {
      this.$el.css('text-shadow', '0 1px 0 '+this.model.get('textShadow'));
    },
    onBgColorChange: function () {
      this.$el.css('background-color', this.model.get('bgColor'));
    },
    onBgPositionChange:  function () {
      this.$el.css('background-position', this.model.get('bgPosition'));
    },
    onBgImageChange: function () {
      if (this.model.get('bgImage')) {
        this.$el.css('background-image', 'url('+this.model.get('bgImage')+')');
      } else {
        this.$el.css('background-image', '');
      }

      this.$el.css('background-size', this.model.get('isBgMosaic') ? 'initial' : 'cover');
    },
    onFontColorChange: function () {
      this.$el.css('color', this.model.get('fontColor'));
    },
    onFontSizeChange: function () {
      this.$el.css('font-size', this.model.get('fontSize')+'px');
    },
    onFontFamilyChange: function () {
      this.$el.css('font-family', this.model.get('fontFamily'));
    },
    onRadiusChange: function() {
      var radius = this.model.get('radius'),
          paddingRatio = .4;

      this.$el.css({
        'border-radius': radius,
        'padding': Math.max(20, radius*paddingRatio)
      });
    }
  });

  // --- --- --- --- --- --- --- --- ---

  var card = new Card();
  var view = new View({
    model: card,
    el: $('.card')
  });

  view.render();

  // --- --- --- --- --- --- --- --- ---

  var appearance = editor.createWidget('Group', {
    label: 'Borders',
    opened : false
  });
  appearance.createWidget('Radius', 'NumberedSlider', {
    model: card,
    name: 'radius'
  });
  var background = editor.createWidget('Group', {
    label: 'Background Settings'
  });
  background.createWidget('Background Image/Color', 'Background', {
    model: card,
    backgroundUploaderOptions: {
      name: 'bgImage',
      text: 'Upload an image',
      hintLabel: 'need inspiration?',
      hintLink: 'http://subtlepatterns.com/'
    },
    colorPickerOptions: {
      model: card,
      name: 'bgColor'
    }
  });
  var text = editor.createWidget('Group', {
    label : 'Text Settings',
    opened : false
  });
  text.createWidget( 'Label', {
    content: 'Font Family:',
    classname: 'setting'
  });
  text.createWidget('Select', {
    model: card,
    name: 'fontFamily',
    allowEmpty: false,
    allowMultiple: false,
    options: {
      'Open Sans': 'Open Sans',
      'Titillium Web': 'Titillium Web',
      'Comic Sans MS': 'Comic Sans MS'
    }
  });
  text.createWidget('Font Size', 'NumberedSlider', {
    model: card,
    name: 'fontSize',
    minimum: 10,
    maximum: 32
  });
  text.createWidget('Text Color', 'ColorPicker', {
    model: card,
    name: 'fontColor'
  });
  var textShadow = text.createWidget('Group', {
    label : 'Text Shadow',
    opened : false
  });
  textShadow.createWidget('Shadow Color', 'ColorPicker', {
    model: card,
    name: 'textShadow'
  });


  $('html').addClass('ready');
});

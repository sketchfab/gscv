define([
  'vendors/Backbone',
  'vendors/JQuery',
  'vendors/Underscore',
  'apis/editor/widgets/Button'
], function(Backbone, $, _, ButtonWidget) {

  'use strict';

  return ButtonWidget.extend({

    el: ['<div class="widget upload-button-widget">',
      '  <input type="file" class="file" accept=".png,.jpg,.gif">',
      '  <p><label><input type="checkbox" class="isMosaic"> treat as mosaic pattern</label></p>',
      '  <button class="button btn-secondary uploader"></button>',
      '  <p><a href="#" target="_blank" class="hint"></a></p>',
      '  <p class="remove"><a href="#">&times; remove image</a></p>',
      '</div>'
    ].join(''),

    events: _.extend({}, ButtonWidget.prototype.events, {
      'change .file': 'changeEvent',
      'click .remove a': 'removeEvent',
      'change .isMosaic': 'toggleIsMosaic'
    }),

    initialize: function(options) {

      options = _.defaults(options || {}, {
        model: new Backbone.Model(),
        name: 'value',
        text: '',
        hintLabel: '',
        hintLink: ''
      }, options);

      ButtonWidget.prototype.initialize.call(this, options);

      this.$el.find('.uploader').text(this.options.text);

      if (this.options.hintLink.length && this.options.hintLabel.length) {
        this.$el.find('.hint')
          .attr('href', this.options.hintLink)
          .text(this.options.hintLabel)
      }
    },

    render: function () {
      var img = this.options.model.get(this.options.name);

      if (!img) {
        this.$el.find('.remove').hide();
      } else {
        this.$el.find('.remove').show();
      }
    },

    clickEvent: function(e) {
      e.preventDefault();
      //Upload
      this.$el.find('.file').trigger('click');
    },

    toggleIsMosaic: function(e) {
      this.options.model.set('isBgMosaic', $(e.target).is(':checked'));
    },

    removeEvent: function(e) {
      e.preventDefault();
      this.options.model.set(this.options.name, '');
    },

    changeEvent: function(e) {

      var f = e.target.files[0]

      if (f) {
        // Only process image files.
        if (!f.type.match('image.*')) {
          return false;
        }

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
          return function(e) {
            this.options.model.set(this.options.name, e.target.result)
          };
        })(f).bind(this);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
      }
    }
  });
});
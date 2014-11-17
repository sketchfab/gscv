define([
  'vendors/Backbone',
  'vendors/JQuery',
  'vendors/Underscore',
  'apis/editor/popups/Texture',
  'apis/editor/widgets/Tabbed',
  'apis/editor/widgets/Vertical',
  'apis/editor/widgets/Widget'

], function(Backbone, $, _, TexturesPopup, TabbedWidget, VerticalWidget, Widget) {

  'use strict';

  return Widget.extend({

    el: ['<div class="widget image-widget">',
      '    <div class="widget-wrapper">',
      '        <a class="display toggle">',
      '            <canvas class="preview"></canvas>',
      '        </a>',
      '    </div>',
      '    <div class="selectbox">',
      '    </div>',
      '</div>'
    ].join(''),

    events: _.extend({}, Widget.prototype.events, {
      'click .toggle': 'toggleEvent',
      'click .open': 'openEvent'
    }),

    initialize: function(options) {

      options = _.defaults(options || {}, {
        model: new Backbone.Model(),
      });

      Widget.prototype.initialize.call(this, options);

      this.globalCloseEvent_ = this.globalCloseEvent.bind(this);

      this.canvas = this.$('.preview')[0] || document.createElement('canvas');
      this.context = this.canvas.getContext('2d');

      var colorPanel, texturePanel;

      var tabbed = TabbedWidget.reify(this);
      this.$('.selectbox').append(tabbed.$el);

      colorPanel = tabbed.createPanel('Color');
      texturePanel = tabbed.createPanel('Image');

      _.extend({model: this.options.model}, this.options.backgroundUploaderOptions);
      _.extend({model: this.options.model}, this.options.colorPickerOptions);

      this.colorWidget = colorPanel.createWidget('ColorPicker', this.options.colorPickerOptions);
      this.colorWidget.on('change', this.applyColorEvent, this);

      this.bgWidget = texturePanel.createWidget('BackgroundUploader', this.options.backgroundUploaderOptions);

      this.bgWidget.model.on('change', this.applyImageEvent, this);
    },

    delegateEvents: function() {
      Widget.prototype.delegateEvents.apply(this, arguments);

      $(document).on('mousedown', this.globalCloseEvent_);
    },

    undelegateEvents: function() {
      Widget.prototype.undelegateEvents.apply(this, arguments);

      $(document).off('mousedown', this.globalCloseEvent_);
    },

    render: function() {

      Widget.prototype.render.apply(this, arguments);

      var color = this.options.model.get(this.options.colorPickerOptions.name),
          image = this.options.model.get(this.options.backgroundUploaderOptions.name),
          ctx = this.context;

      if (image) {
        var img = new Image();
        img.src = image;
        img.onload = function () {
          ctx.drawImage(img, 0, 0);
        };
      }
      if (color) {
        this.canvas.width = this.canvas.height = 1;

        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1, 1);

        this.colorWidget.set(color);
      }
    },

    toggleEvent: function(e) {
      if (this.$el.hasClass('opened')) {
        this.closeEvent(e);
      } else {
        this.openEvent(e);
      }
    },

    openEvent: function(e) {
      e.preventDefault();
      e.stopPropagation();

      this.$el.addClass('opened');
    },

    closeEvent: function( /*e*/ ) {
      this.$el.removeClass('opened');
    },

    globalCloseEvent: function(e) {
      if ($.contains(this.el, e.target))
        return;

      this.closeEvent(e);
    },

    applyColorEvent: function() {
      this.options.model.set(this.options.colorPickerOptions.name, this.colorWidget.get());
    },

    applyImageEvent: function (e) {
      var attr = this.options.backgroundUploaderOptions.name;
      this.options.model.set('isBgMosaic', this.bgWidget.model.get('isBgMosaic'));
      this.options.model.set(attr, this.bgWidget.model.get(attr));
    }
  });
});

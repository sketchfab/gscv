'use strict'

define([
  'vendors/Underscore',
  'apis/editor/widgets/Widget'
], function(_, Widget) {

  return Widget.extend({

    el: ['<div class="widget input-widget">',
      '      <div class="widget-wrapper">',
      '          <input class="input" type="text" />',
      '      </div>',
      '  </div>'
    ].join(''),

    events: _.extend({}, Widget.prototype.events, {
      'keyup .input': 'keyupEvent'
    }),

    initialize: function(options) {
      options = _.defaults(options || {}, {
        model: new Backbone.Model(),
        name: 'value',
        value: undefined
      }, options)

      Widget.prototype.initialize.call(this, options)

      if (typeof this.get() === 'undefined') {
        this.set(this.options.value)
      }
    },

    keyupEvent: function( e ) {
      var value = $( e.currentTarget ).val()
      this.change(value)
    },

    render: function() {
      this.$('.input').html( this.get() )
    }

  })

})

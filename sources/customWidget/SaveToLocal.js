define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget save-to-local-widget">',
            '          <button>Save locally</button>',
            '      </div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            // It is more reactive to see live changes as the use types.
            'click button': '_saveToLocal'
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {
                model: new Backbone.Model(),
                name: 'local',
                // This is better to do so in order to don't deal with the local storage key
                // Or also to have another solution such as indexedDB
                // Or use the Cache API
                saveToLocal: function(jsonToSave){
                  throw new Error('SaveToLocalWidget: You need to provide a saveTo function.', jsonToSave)
                }
            } );

            Widget.prototype.initialize.call( this, options );
        },

        render: function renderSaveToLocal() {
          this.$el.html(this.get() ? 'saved': '<button>Save locally</button>');
        },
        // Save to local as given in option and dispatch a change event
        _saveToLocal: function _saveToLocal( e ) {
            this.options.saveToLocal(this.options.model.toJSON());
            this.change(true);
        }

    } );

} );

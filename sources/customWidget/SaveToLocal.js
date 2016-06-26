define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget save-to-local-widget">',
            '          <div class="widget button-widget"><button class="button">Save locally</button></div>',
            '      </div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            // It is more reactive to see live changes as the use types.
            'click button.cancel': '_restoreFromLocal',
            'click button.save': '_saveToLocal'
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {
                model: new Backbone.Model(),
                name: 'local',
                // This is better to do so in order to don't deal with the local storage key
                // Or also to have another solution such as indexedDB
                // Or use the Cache API
                // Maybe this would have been better as an event on the model.
                // But the feature is on the widget...
                saveToLocal: function(jsonToSave){
                  throw new Error('SaveToLocalWidget: You need to provide a saveTo function.', jsonToSave)
                },
                getFromLocal: function(){
                  throw new Error('SaveToLocalWidget: You need to provide a getFromLocal function');
                }
            } );

            Widget.prototype.initialize.call( this, options );
        },

        render: function renderSaveToLocal() {
          this.$el.html(this.get() ?
            'saved':
            '<div class="button-widget"><button class="button cancel">Cancel</button><hr /><button class="button save">Save locally</button><div class="widget button-widget">');
        },
        // Save to local as given in option and dispatch a change event
        _saveToLocal: function _saveToLocal( e ) {
            this.options.saveToLocal(this.options.model.toJSON());
            this.change(true);
        },
        _restoreFromLocal: function _restoreFromLocal(){
          this.options.model.set(this.options.getFromLocal());
        }

    } );

} );

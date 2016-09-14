define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget button-widget">',
              '          <button class="button btn-secondary">',
              '          </button>',
              '      </div>'
            ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'click .button': 'clickEvent'
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                event: 'click',
                text: ''

            }, options );

            Widget.prototype.initialize.call( this, options );

            this.$el.find( '.button' ).text( this.options.text );

        },

        clickEvent: function ( e ) {

            e.preventDefault();

            if ( this.options.event ) {
                this.options.model.trigger( this.options.event );
            }

        }

    } );

} );

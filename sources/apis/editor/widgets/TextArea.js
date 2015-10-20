define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget textarea-widget">',
            '          <textarea rows="4" class="text value" size="8" />',
            '      </div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'keyup .value': 'changeEvent'
        }),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value',

                className: ''

            }, options );

            Widget.prototype.initialize.call( this, options );

            if ( this.options.className ) {
                this.$( '.text' ).addClass( this.options.className );
            }

        },

        changeEvent: function ( e ) {
            this.set( this.$( '.text' ).val() );
        },

        render: function () {

            this.$( '.text' ).val( this.get() );

        }

    } );

} );
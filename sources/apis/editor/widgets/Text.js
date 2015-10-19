define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget text-widget">',
            '          <input type="text" class="text value" size="8" />',
            '      </div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'keyup .value': 'changeEvent'
        }),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value',

                content: undefined,
                className: ''

            }, options );

            Widget.prototype.initialize.call( this, options );

            if ( typeof this.get() === 'undefined' )
                this.set( this.options.content );

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

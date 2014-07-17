define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget label-widget">',
            '          <span class="text">',
            '          </span class="text">',
            '      </div>'
        ].join( '' ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value',

                content: undefined,
                className: '',

                escape: true

            }, options );

            Widget.prototype.initialize.call( this, options );

            if ( typeof this.get() === 'undefined' )
                this.set( this.options.content );

            if ( this.options.className ) {
                this.$( '.text' ).addClass( this.options.className );
            }

        },

        render: function () {

            this.$( '.text' )[ this.options.escape ? 'text' : 'html' ]( this.get() );

        }

    } );

} );

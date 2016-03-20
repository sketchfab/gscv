define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget input-widget">',
            '          <input class="text" type="text" placeholder="">',
            '      </div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'keyup .text:input': 'changeEvent',

        } ),

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

        changeEvent: function ( e ) {

            var value = $( e.currentTarget ).val();

            // This force the update
            this.set( !value );
            this.change( value );

        },

        render: function () {

            // this.$( '.text' )[ this.options.escape ? 'text' : 'html' ]( this.get() );
            this.$( '.text' ).attr('placeholder', this.options.placeholder);

        }

    } );

} );

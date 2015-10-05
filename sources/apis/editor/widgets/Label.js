define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget label-widget">',
            '          <input type="text" name="value" class="text"/>',
            '      </div>'
        ].join( '' ),
        
        events: _.extend( {}, Widget.prototype.events, {
            'keyup .text:input': 'changeEvent'
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
        
        changeEvent: function () {

            this.set( this.$( '.text' ).val() );
            
        },

        render: function () {

            this.$( '.text' )[ this.options.escape ? 'val' : 'html' ]( this.get() );
            
        }

    } );

} );

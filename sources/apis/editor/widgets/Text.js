define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget text-widget">',
            '      <input type="text" class="js-text">',
            '  </div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'change .js-text:input': 'changeEvent',
            'keydown .js-text:input': 'changeEvent',
            'keyup .js-text:input': 'changeEvent'
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value'

            }, options );

            Widget.prototype.initialize.call( this, options );

            if ( typeof this.get( ) === 'undefined' )
                this.set( '' );
        },

        render: function ( ) {

            this.$el.find( '.js-text' ).val( this.get() );

        },

        changeEvent: function ( e ) {

            this.set( this.$('.js-text').val() );

        }

    } );

} );

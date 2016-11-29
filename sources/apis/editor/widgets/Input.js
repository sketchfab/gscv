define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget input-widget">',
            '          <input class="text" type="text" value="">',
            '      </div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'keyup .text:input': 'keyUpEvent',
        }),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value',
                placeholder: 'placeholder'

            }, options );

            Widget.prototype.initialize.call( this, options );
        },

        keyUpEvent: function (e) {
            var value = this.$( e.currentTarget ).val();
            this.change( value );

        },

        render: function () {

        }

    } );

} );

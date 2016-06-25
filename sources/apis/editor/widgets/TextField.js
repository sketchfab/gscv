define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget textfield-widget">',
              '          <input type="text" class="textfield"/>',
              '      </div>'
            ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'change .textfield': 'changeEvent'
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value'

            }, options );
            
            Widget.prototype.initialize.call( this, options );

            this.$el.find( '.textfield' ).val( this.get() );

        },

        changeEvent: function ( e ) {
            e.preventDefault();

            var value = $(e.target).val();
            this.change( value );
        }

    } );

} );

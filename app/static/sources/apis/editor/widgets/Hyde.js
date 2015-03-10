// “Some day...after I am dead, you may perhaps come to learn the right and wrong of this. I cannot tell you.”
// ― Robert Louis Stevenson, The Strange Case of Dr. Jekyll and Mr. Hyde

define( [

    'vendors/Backbone',
    'vendors/Underscore',

    'apis/editor/widgets/Vertical'

], function ( Backbone, _, Vertical ) {

    'use strict';

    return Vertical.extend( {

        el: [ '<div class="widget layout-widget vertical-widget hyde-widget">',
            '          <div class="widget-wrapper">',
            '              <div class="children"></div>',
            '          </div>',
            '      </div>'
        ].join( '' ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value'

            } );

            Vertical.prototype.initialize.call( this, options );

        },

        render: function () {

            this.$el.toggle( Boolean( this.get() ) );

        }

    } );

} );

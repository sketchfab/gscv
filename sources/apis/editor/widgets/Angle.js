define( [

    'vendors/Underscore',

    'apis/editor/widgets/Number'

], function ( _, NumberWidget ) {

    'use strict';

    return NumberWidget.extend( {

        el: [ '<div class="widget angle-widget">',
            '      <div class="widget-wrapper">',
            '          <div class="decrease"><a></a></div>',
            '          <div class="value"></div>',
            '          <div class="increase"><a></a></div>',
            '      </div>',
            '  </div>'
        ].join( '' ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                minimum: 0,
                maximum: 360,
                step: 90,

                cycle: true

            } );

            NumberWidget.prototype.initialize.call( this, options );

        }

    } );

} );

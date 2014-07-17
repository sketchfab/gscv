define( [

    'vendors/Underscore',

    'apis/editor/widgets/Angle'

], function ( _, AngleWidget ) {

    'use strict';

    return AngleWidget.extend( {

        el: [ '<div class="widget orientation-widget">',
            '          <div class="widget-wrapper">',
            '              <div class="decrease"><a></a></div>',
            '              <div class="value"></div>',
            '              <div class="increase"><a></a></div>',
            '          </div>',
            '      </div>'
        ].join( '' ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                label: ''

            } );

            AngleWidget.prototype.initialize.call( this, options );

        },

        render: function () {
            var $valueElement = this.$( '.value' );
            $valueElement.text( this.options.label );
        }

    } );

} );

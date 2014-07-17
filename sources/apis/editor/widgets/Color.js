define( [

    'vendors/Backbone',
    'vendors/SvgColorPicker',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, SvgColorPicker, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget color-widget">',
            '    <div class="widget-wrapper">',
            '        <div class="box">',
            '            <div class="picker-wrapper">',
            '                <div class="picker-padder"></div>',
            '                <div class="picker"><div class="cursor"></div></div>',
            '            </div>',
            '            <div class="slider-wrapper">',
            '                <div class="slider"><div class="cursor"></div></div>',
            '            </div>',
            '        </div>',
            '        <input class="value" size="8" />',
            '    </div>',
            '</div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'change .value:input': 'changeEvent'
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value'

            } );

            Widget.prototype.initialize.call( this, options );

            if ( typeof this.get() === 'undefined' )
                this.set( {
                    r: 1,
                    g: 1,
                    b: 1
                } );

            this.colorPicker = SvgColorPicker( {

                slider: this.$( '.slider' )[ 0 ],
                picker: this.$( '.picker' )[ 0 ],

                sliderCursor: this.$( '.slider > .cursor' )[ 0 ],
                pickerCursor: this.$( '.picker > .cursor' )[ 0 ]

            }, function ( hsv, rgb /*, hex*/ ) {

                this.change( rgb );

            }.bind( this ) );

        },

        changeEvent: function () {

            this.colorPicker.set( this.$( '.value' ).val() );

        },

        render: function () {

            var rgb = this.get();

            this.colorPicker.set( rgb );

            var rounded = {
                r: rgb.r * 255,
                g: rgb.g * 255,
                b: rgb.b * 255
            };
            var hex = '#' + ( 16777216 | rounded.b | ( rounded.g << 8 ) | ( rounded.r << 16 ) ).toString( 16 ).substr( 1 );

            this.$( '.value' ).val( hex );

        }

    } );

} );

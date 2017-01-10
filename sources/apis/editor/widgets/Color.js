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
                name: 'value',
                format: 'rgb'

            } );

            Widget.prototype.initialize.call( this, options );

            var color = this.get() || {
                r: 1,
                g: 1,
                b: 1
            };
            var rgb = this.convertColor( color, { to: 'rgb' } );

            this.colorPicker = SvgColorPicker( {

                slider: this.$( '.slider' )[ 0 ],
                picker: this.$( '.picker' )[ 0 ],

                sliderCursor: this.$( '.slider > .cursor' )[ 0 ],
                pickerCursor: this.$( '.picker > .cursor' )[ 0 ]

            }, function ( hsv, rgb /*, hex*/ ) {

                var color = this.convertColor( rgb, { from: 'rgb' } );
                this.set( color );

            }.bind( this ) );

            this.set( color );
            this.colorPicker.set( rgb );

        },

        changeEvent: function () {

            this.colorPicker.set( this.$( '.value' ).val() );

        },

        render: function () {

            var hex = this.convertColor( this.get(), { to: 'hex' } );
            this.$( '.value' ).val( hex );

        },

        rgbToHex: function ( rgb ) {

            var rounded = {
                r: rgb.r * 255,
                g: rgb.g * 255,
                b: rgb.b * 255
            };
            var hex = '#' + ( 16777216 | rounded.b | ( rounded.g << 8 ) | ( rounded.r << 16 ) ).toString( 16 ).substr( 1 );

            return hex;
        },

        hexToRgb: function ( hex ) {

            // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16) / 255,
                g: parseInt(result[2], 16) / 255,
                b: parseInt(result[3], 16) / 255
            } : null;
        },

        convertColor: function ( color, options ) {

            var from = options.from || this.options.format;
            var to = options.to || this.options.format;

            if ( from != to ) {

                if ( from == 'hex' )
                    color = this.hexToRgb( color );

                if ( to == 'hex' )
                    color = this.rgbToHex( color );

            }

            return color;
        }

    } );

} );

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
            '        <div class="box" style="display:none">',
            '            <div class="picker-wrapper">',
            '                <div class="picker-padder"></div>',
            '                <div class="picker"><div class="cursor"></div></div>',
            '            </div>',
            '            <div class="slider-wrapper">',
            '                <div class="slider"><div class="cursor"></div></div>',
            '            </div>',
            '        </div>',
            '        <div>',
            '        <input class="value" size="8" />',
            '        <div class="valueColorBox"></div>',
            '        </div>',
            '    </div>',
            '</div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'change .value:input': 'changeEvent',
            'click .valueColorBox': 'togglePicker'
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value',
                type: 'rgb' // can be 'rgb' or 'hex'

            } );

            Widget.prototype.initialize.call( this, options );

            if ( typeof this.get() === 'undefined' )
                this.set( {
                    r: 1,
                    g: 1,
                    b: 1
                } );
            
            // storing the initial value in the model
            var intitialValue = this.get();

            this.colorPicker = SvgColorPicker( {

                slider: this.$( '.slider' )[ 0 ],
                picker: this.$( '.picker' )[ 0 ],

                sliderCursor: this.$( '.slider > .cursor' )[ 0 ],
                pickerCursor: this.$( '.picker > .cursor' )[ 0 ]

            }, function ( hsv, rgb /*, hex*/ ) {
                if (this.options.type === 'hex') {
                    this.change( this.rgb2hex(rgb) );
                } else{
                    this.change( rgb );
                }
                this.$('.valueColorBox').css('background-color', this.$( '.value' ).val());

            }.bind( this ) );

            // this hack will initialize the colorpicker to the right value
            this.change(intitialValue);
        },

        changeEvent: function () {
            console.log('color: ', this.$( '.value' ).val());
            this.colorPicker.set( this.$( '.value' ).val() );
            this.$('.valueColorBox').css('background-color', this.$( '.value' ).val());
        },

        togglePicker : function(){
            this.$('.widget-wrapper > .box').toggle();
        },

        rgb2hex : function ( rgb ) {

            var rounded = {
                r: rgb.r * 255,
                g: rgb.g * 255,
                b: rgb.b * 255
            };
            return '#' + ( 16777216 | rounded.b | ( rounded.g << 8 ) | ( rounded.r << 16 ) ).toString( 16 ).substr( 1 );
        },

        render: function () {

            var rgb = this.get();
            console.log("ahahaha",this.get());
            this.colorPicker.set( rgb );

            if (this.options.type === 'hex') {
                this.$( '.value' ).val( rgb );
            } else{
                this.$( '.value' ).val( this.rgb2hex(rgb) );
            }
            

        }

    } );

} );

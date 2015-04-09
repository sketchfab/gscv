define( [
    'vendors/Backbone',
    'vendors/Underscore',

    'apis/editor/widgets/Vertical'

], function ( Backbone, _, VerticalWidget ) {

    'use strict';
    return VerticalWidget.extend( {

        el: [ '<div class="widget input-widget">',
            '          <div class="widget-wrapper">',
            '              <div><input type="text" class="value"></div><br>',
            '              <div class="children"></div>',
            '          </div>',
            '      </div>',
        ].join( '' ),

        events: _.extend( {}, VerticalWidget.prototype.events, {
            'input .value:input': 'input',
        } ),

        initialize: function ( options ) {
            options = _.defaults( options || {}, {
                model : new Backbone.Model(),
                name  : 'Text',

                value : 'Your text here'

            }, options );


            VerticalWidget.prototype.initialize.call( this, options );

            var text = this.get() || options.value;
            this.$( 'input' ).val( text );

            if ( !options.$parentEl ) {
                console.error( 'You have to specify the parent element of the text.' );
                return false;
            }

            this.$text = $('<div />', {
                            class : this.options.name,
                            text  : text
                        })

            options.$parentEl.append(this.$text);

            var common = {
                model: this.model,
                name: this.options.name
            };

            this.colorWidget = this.createWidget( 'Color', _.extend( {}, common, this.options.colorOptions ) );
            this.applyColor( ( this.options.color || {r:0, g: 0, b: 0} ) );
            this.colorWidget.on( 'change', this.applyColor, this );
        },

        input: function ( e ) {
            this.$text.html( $( e.currentTarget ).val() );
        },

        applyColor: function ( color ) {
            var rgb = color || this.colorWidget.get( );
            var rounded = {
                r: rgb.r * 255,
                g: rgb.g * 255,
                b: rgb.b * 255
            };
            var hex = '#' + ( 16777216 | rounded.b | ( rounded.g << 8 ) | ( rounded.r << 16 ) ).toString( 16 ).substr( 1 );

            if ( color )
                this.colorWidget.set ( hex )

            this.$text.css( 'color',  hex );
        }

    } );

} );

define( [

    'vendors/Backbone',
    'vendors/SvgColorPicker',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, SvgColorPicker, _, Widget ) {

    return Widget.extend( {

        el : [ '<div class="widget color-widget">'
             , '    <div class="widget-wrapper">'
             , '        <div class="box">'
             , '            <div class="picker-wrapper">'
             , '                <div class="picker-padder"></div>'
             , '                <div class="picker"><div class="cursor"></div></div>',
             , '            </div>'
             , '            <div class="slider-wrapper">'
             , '                <div class="slider"><div class="cursor"></div></div>',
             , '            </div>'
             , '        </div>'
             , '        <input class="value" size="8" />'
             , '    </div>'
             , '</div>'
        ].join( '' ),

        events : _.extend( { }, Widget.prototype.events, {
            'change .value:input' : 'changeEvent'
        } ),

        initialize : function ( options ) {

            options = _.defaults( options || { }, {

                model : new Backbone.Model( ),
                name  : 'value',
                base  : '#000000'

            } );

            Widget.prototype.initialize.call( this, options );

            if ( typeof this.get( ) === 'undefined' )
                this.set( { r : 1, g : 1, b : 1 } );

            this.colorPicker = SvgColorPicker( {

                slider : this.$( '.slider' )[ 0 ],
                picker : this.$( '.picker' )[ 0 ],

                sliderCursor : this.$( '.slider > .cursor' )[ 0 ],
                pickerCursor : this.$( '.picker > .cursor' )[ 0 ]

            }, function ( hsv, rgb, hex ) {

                this.change( hex );

            }.bind( this ) );

            this.colorPicker.set( this.options.base );

        },

        changeEvent : function ( ) {

            this.colorPicker.set( this.$( '.value' ).val( ) );

        },

        render : function ( ) {

            this.colorPicker.set( this.get( ) );
            this.$( '.value' ).val( this.get( ) );

        }

    } );

} );

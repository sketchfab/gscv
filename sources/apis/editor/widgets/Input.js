define( [

    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget input-widget">',
            '          <div class="widget-wrapper">',
            '              <input type="text" class="value">',
            '          </div>',
            '      </div>',
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'input .value:input': 'input',
        } ),

        initialize: function ( options ) {
            options = _.defaults( options || {}, {
                model : new Backbone.Model(),
                name  : 'Text',

                value : 'Your text here'

            }, options );


            Widget.prototype.initialize.call( this, options );

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
        },

        input: function ( e ) {
            this.$text.html( $( e.currentTarget ).val() );
        }

    } );

} );

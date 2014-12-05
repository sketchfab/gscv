define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget label-widget">',
            '        <input class="form-input" placeholder="">',
            '  </div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'keyup input': 'changeEvent'
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                placeholder: 'placeholder text',

                content: undefined,
                className: '',
                type: 'text',

                escape: true

            }, options );

            Widget.prototype.initialize.call( this, options );

            if ( typeof this.get() === 'undefined' )
                this.set( this.options.content );

            var input = this.$( 'input');

            if ( this.options.className ) {
                input.addClass( this.options.className );
            }

            if ( this.options.type ) {
                input.attr( 'type', this.options.type );
            }

            if ( this.options.placeholder ) {
                input.attr( 'placeholder', this.options.placeholder );
            }

        },

        changeEvent: function ( ) {
            
            this.change( this.$( 'input').val() );

        }

    } );

} );

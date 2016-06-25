define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget text-widget">',
            '          <input >',
            '      </div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            // It is more reactive to see live changes as the use types.
            'keyup input': '_readInputValue'
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value',
                // Indicates the user that he can type
                placeholder: 'Please fill this text'

            } );

            Widget.prototype.initialize.call( this, options );

            this.$('input')
                .val( this.options.text )
                .attr('placeholder', this.options.placeholder);

        },

        render: function renderText() {
            console.log('renderText')
            this.$('input').val(this.get());

        },

        _readInputValue: function readInputValueOnBlur( e ) {
            e.preventDefault();
            e.stopPropagation();
            this.change( this.$('input').val() );
        }

    } );

} );

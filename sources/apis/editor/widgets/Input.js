define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget input-widget">',
            '       <input type="text" class="input-text"/>',
            '  </div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'change .input-text:input': 'changeEvent',
            'keyup .input-text:input': 'keyupEvent',
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value'

            } );

            Widget.prototype.initialize.call( this, options );

            if ( this.options.className ) {
                this.$el.find( '.input-text' ).addClass( this.options.className );
            }

            if ( this.options.placeholder ) {
                this.$el.find( '.input-text' ).attr( 'placeholder', this.options.placeholder );
            }
        },

        keyupEvent: function ( e ) {

            var value = this.$el.find( '.input-text' ).val();
            this.change( value );

        }

    } );

} );
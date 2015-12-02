
define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget textarea-widget">',
            '       <textarea class="textarea"></textarea>',
            '  </div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'change .textarea': 'changeEvent',
            'keyup .textarea': 'keyupEvent',
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value',
                className: ''

            } );

            Widget.prototype.initialize.call( this, options );

            if ( this.options.className ) {
                this.$el.find( '.textarea' ).addClass( this.options.className );
            }

            if ( this.options.placeholder ) {
                this.$el.find( '.textarea' ).attr( 'placeholder', this.options.placeholder );
            }
        },

        keyupEvent: function ( e ) {
            console.log($( e.currentTarget ).val());
            var value = this.$el.find( '.textarea' ).val();
            this.change( value );
        }

    } );

} );
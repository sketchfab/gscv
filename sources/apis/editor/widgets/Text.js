define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget label-widget">',
            '          <input type="text" class="text-input">',
            '          </input>',
            '      </div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'input .text-input': 'changeEvent',
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value',

                content: undefined,
                className: '',

                escape: true

            }, options );

            Widget.prototype.initialize.call( this, options );

            if ( typeof this.get() === 'undefined' )
                this.set( this.options.content );

            if ( this.options.className ) {
                this.$( '.text-input' ).addClass( this.options.className );
            }

            this.$( '.text-input' ).val(this.get());
        },
        render: function() {
          if ( this.options.placeholder ) {
            this.$('input').attr('placeholder', this.options.placeholder );
          }
        },

        changeEvent: function( e ) {

          var value = $( e.currentTarget ).val();
          // This force the update
          this.set( !value );
          this.change( value );
        },

    } );

} );

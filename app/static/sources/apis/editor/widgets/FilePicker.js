define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Button'

], function ( Backbone, $, _, ButtonWidget ) {

    'use strict';

    return ButtonWidget.extend( {

        el: [ '<div class="widget upload-button-widget">',
            '          <input type="file" class="file">',
            '          <button class="button btn-secondary">',
            '          </button>',
            '      </div>'
        ].join( '' ),

        events: _.extend( {}, ButtonWidget.prototype.events, {
            'change .file': 'changeEvent'
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                selectEvent: 'uploadSelectEvent',
                cancelEvent: 'uploadCancelEvent',
                text: '',
                action: null

            }, options );

            ButtonWidget.prototype.initialize.call( this, options );

            this.$el.find( '.button' ).text( this.options.text );

            if ( this.options.action ) {
                this.$el.find( '.button' ).attr( 'data-action', this.options.action );
            }
        },

        clickEvent: function ( e ) {

            e.preventDefault();

            //Upload
            this.$el.find( '.file' ).trigger( 'click' );

        },

        changeEvent: function ( e ) {

            if ( e.target.files[ 0 ] ) {

                if ( this.options.selectEvent ) {
                    this.options.model.trigger( this.options.selectEvent, e.target.files[ 0 ], this );
                }

            } else {

                //User canceled upload
                if ( this.options.cancelEvent ) {
                    this.options.model.trigger( this.options.cancelEvent, this );
                }

            }

        }

    } );

} );

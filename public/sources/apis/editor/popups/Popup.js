define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore'

], function ( Backbone, $, _ ) {

    'use strict';

    var template = _.template( [
        '<div class="popup-wrapper">',
        '    <div class="popup texture-popup">',
        '        <div class="popup-header">',
        '            <%= header %>',
        '        </div>',
        '        <div class="popup-content">',
        '            <%= content %>',
        '        </div>',
        '        <div class="popup-footer">',
        '            <%= footer %>',
        '        </div>',
        '    </div>',
        '</div>'
    ].join( '\n' ) );

    return Backbone.View.extend( {

        events: _.extend( {}, Backbone.View.prototype.events, {
            'click .popup-action-close': 'close',
            'click': 'closeIfOverlay'
        } ),

        el: function () {
            return template( {
                header: _.result( this, 'header' ),
                content: _.result( this, 'content' ),
                footer: _.result( this, 'footer' )
            } );
        },

        constructor: function ( parent, options ) {

            this.parent = parent;
            this.options = _.extend( {}, options );
            this.environment = _.extend( {}, parent ? parent.environment : {}, this.options.environment );

            $( document ).on( 'keydown', function ( e ) {

                if ( e.keyCode !== 27 )
                    return;

                if ( this.environment.popupStack.length === 0 )
                    return;

                this.environment.popupStack[ 0 ].close();

            }.bind( this ) );

            Backbone.View.call( this, options );

            this.render();

        },

        render: function () {

            this.setElement( _.result( this, 'el' ) );

            while ( this.environment.popupStack.length > 0 && this.environment.popupStack[ 0 ] !== this.parent ) {
                var stackedPopup = this.environment.popupStack.shift();
                stackedPopup.close();
            }

            this.environment.popupStack.unshift( this );

            this.$el.appendTo( this.environment.popupContainer );

        },

        close: function () {

            this.$el.remove();

        },

        closeIfOverlay: function ( e ) {

            if ( this.$( '.popup' ).has( e.target ).length )
                return;

            this.close();

        }

    } );

} );

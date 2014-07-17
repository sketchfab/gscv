define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget slider-widget">',
            '          <div class="widget-wrapper">',
            '              <div class="bar">',
            '                  <div class="slide">',
            '                      <div class="cursor"></div>',
            '                  </div>',
            '              </div>',
            '          </div>',
            '      </div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'click .bar': 'selectEvent',
            'mousedown .cursor': 'startEvent'
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value',

                minimum: 0,
                maximum: 100,
                step: 1

            } );

            Widget.prototype.initialize.call( this, options );

            if ( typeof this.get() === 'undefined' ) {
                this.set( 0 );
            }

        },

        delegateEvents: function () {

            Widget.prototype.delegateEvents.apply( this, arguments );

            $( window ).on( 'mousemove.delegateEvents' + this.cid, this.moveEvent.bind( this ) );
            $( window ).on( 'mouseup.delegateEvents' + this.cid, this.stopEvent.bind( this ) );

        },

        undelegateEvents: function () {

            Widget.prototype.undelegateEvents.apply( this, arguments );

            $( window ).off( '.delegateEvents' + this.cid );

        },

        render: function () {

            var range = this.options.maximum - this.options.minimum;
            var percent = ( this.get() - this.options.minimum ) / range * 100;

            this.$( '.slide' ).css( {
                width: percent + '%'
            } );

        },

        startEvent: function ( e ) {

            e.preventDefault();

            this.$el.addClass( 'fast' );
            this.started = true;

        },

        stopEvent: function ( e ) {

            if ( !this.started )
                return;

            e.preventDefault();

            this.$el.removeClass( 'fast' );
            this.started = false;

        },

        moveEvent: function ( e ) {

            if ( !this.started )
                return;

            e.preventDefault();

            this.selectEvent( e );

        },

        selectEvent: function ( e ) {

            e.preventDefault();

            var left = this.$el.position().left;
            var width = this.$el.width();

            var mouse = e.pageX;

            var value = ( mouse - left ) / width;
            value = Math.min( Math.max( 0, value ), 1 );
            value = this.options.minimum + value * ( this.options.maximum - this.options.minimum );

            var factor = value / this.options.step;
            var intFactor = Math.round( factor );
            if ( factor !== intFactor )
                value = intFactor * this.options.step;

            this.change( value );

        }

    } );

} );

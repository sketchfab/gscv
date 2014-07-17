define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Vertical',
    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, VerticalWidget, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget group-widget">',
            '          <div class="widget-wrapper">',
            '              <div class="header">',
            '                  <a class="label"></a>',
            '                  <a class="help">',
            '                      <i class="fa fa-question-circle"></i>',
            '                      <div class="tooltip"></div>',
            '                  </a>',
            '                  <a class="state"></a>',
            '              </div>',
            '              <div class="inner"></div>',
            '          </div>',
            '      </div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'click .header': 'toggleVisibilityEvent',
            'click .state': 'toggleStateEvent'
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value',

                inner: VerticalWidget.reify( this, {
                    withMargins: true
                } ),

                label: '',
                opened: true

            } );

            Widget.prototype.initialize.call( this, options );

            this.inner = this.options.inner;

            this.$( '.label' ).text( this.options.label );

            if ( this.options.help ) {
                this.$( '.help .tooltip' ).html( this.options.help );
            } else {
                this.$( '.help' ).hide();
            }

            this.$( '.inner' ).append( this.inner.$el );

            if ( this.options.opened ) {
                this.$el.addClass( 'opened' );
            }

        },

        delegateEvents: function () {

            Widget.prototype.delegateEvents.apply( this, arguments );

            this.inner.delegateEvents();

        },

        undelegateEvents: function () {

            Widget.prototype.undelegateEvents.apply( this, arguments );

            this.inner.undelegateEvents();

        },

        render: function () {

            this.$el.toggleClass( 'static', this.get() == null );

            this.$el.toggleClass( 'active', this.get() );

        },

        toggleVisibilityEvent: function ( e ) {

            e.preventDefault();

            this.$el.toggleClass( 'opened' );

        },

        toggleStateEvent: function ( e ) {

            e.preventDefault();
            e.stopPropagation();

            this.change( !this.model.get( this.options.name ) );

        },

        addWidget: function () {

            return this.inner.addWidget.apply( this.inner, arguments );

        },

        createWidget: function () {

            return this.inner.createWidget.apply( this.inner, arguments );

        }

    } );

} );

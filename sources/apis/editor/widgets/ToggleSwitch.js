define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget toggleswitch-widget">',
            '          <a class="state"></a>',
            '          <a class="label"></a>',
            '      </div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'click .state': 'toggleStateEvent',
            'click .label': 'toggleStateEvent'
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value',

                label: ''

            } );

            Widget.prototype.initialize.call( this, options );

            this.$( '.label' ).text( this.options.label );

        },

        render: function () {

            this.$el.toggleClass( 'active', this.get() );

        },

        toggleStateEvent: function ( e ) {

            e.preventDefault();
            e.stopPropagation();

            this.change( !this.model.get( this.options.name ) );

        }

    } );

} );

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, Widget ) {

    return Widget.extend( {

        initialize : function ( options ) {

            options = _.defaults( options || { }, {

                withMargins : true,
                withPadding : false,

            }, options );

            Widget.prototype.initialize.call( this, options );

            if ( this.options.withMargins ) {
                this.$el.addClass( 'with-margins' );
            }

            if ( this.options.withPadding ) {
                this.$el.addClass( 'with-padding' );
            }

        },

        addWidget : function ( label, widget ) {

            if ( arguments.length <= 1 ) {
                widget = label;
                label = undefined;
            }

            if ( label ) {
                $( '<div/>' )
                    .attr( 'class', 'widget widget-label' )
                    .append( $( '<label/>' )
                        .attr( 'class', 'label' )
                        .text( label ) )
                    .append( widget.$el )
                .appendTo( this.$( '.children' ) );
            } else {
                widget.$el
                .appendTo( this.$( '.children' ) );
            }

            return widget;

        },

        createWidget : function ( label, type, options ) {

            if ( arguments.length < 2 || ( arguments.length === 2 && typeof type === 'object' ) ) {
                options = type;
                type = label;
                label = undefined;
            }

            var WidgetType = require( 'apis/editor/defaultWidgets' )[ type ];

            if ( ! WidgetType )
                throw new Error( type + ': Invalid widget type' );

            var widget = WidgetType.reify( this, options );

            return this.addWidget( label, widget );

        }

    } );

} );

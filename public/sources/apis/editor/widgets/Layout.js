define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                withMargins: true,
                withPadding: false

            }, options );

            Widget.prototype.initialize.call( this, options );

            if ( this.options.withMargins ) {
                this.$el.addClass( 'with-margins' );
            }

            if ( this.options.withPadding ) {
                this.$el.addClass( 'with-padding' );
            }

        },

        addWidget: function ( label, widget ) {

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

        removeWidget: function ( widget ) {

            if ( this.$( widget.el ).length < 1 )
                return; // The layout does not contain this widget

            if ( widget.$el.parent().is( this.$( '.children' ) ) )
                widget.$el.remove();

            widget.$el.parentsUntil( this.$( '.children' ) ).remove();

        },

        // MULTIPLE SIGNATURES :
        //
        // createWidget : function ( type : String | Function )
        // createWidget : function ( type : String | Function, options : Object )
        // createWidget : function ( label : String, type : String | Function, options : Object )
        //
        // If type is a String, then the widget will be built upon the standard widget named as such.
        // For example, createWidget('Select') will create a Select widget, and is the equivalent of something like :
        //
        // define( [ 'apis/editor/widgets/Select' ], function ( Select ) {
        //     /*...*/.createWidget( Select );
        // } );

        createWidget: function ( label, type, options ) {

            if ( arguments.length === 1 || ( arguments.length === 2 && typeof type === 'object' ) ) {
                options = type;
                type = label;
                label = undefined;
            }

            // If not-a-function, we get the standard widget from its name
            var WidgetType = typeof type !== 'function' ?
                require( 'apis/editor/defaultWidgets' )[ type ] :
                type;

            if ( !WidgetType )
                throw new Error( type + ': Invalid widget type' );

            var widget = WidgetType.reify( this, options );

            return this.addWidget( label, widget );

        }

    } );

} );

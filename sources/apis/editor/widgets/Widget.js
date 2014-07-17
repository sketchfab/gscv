define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore'

], function ( Backbone, $, _ ) {

    'use strict';

    /**
     * WIDGET PIPELINE
     * |
     * |__ .constructor( parent?, options? ) - IS NOT OVERIDDEN BY CHILD CLASSES
     *     |
     *     |   - A base empty environment ({}) is created
     *     |   - If parent is not-null, the current environment will be populated with the parent environment
     *     |   - Then, if the widget has some options, the current environment will be extended with options.environment
     *     |
     *     |__ .initialize( options? ) - child classes implementation
     *     |   |
     *     |   |   - The widget will use default values for missing options
     *     |   |
     *     |   |__ .initialize( options ) - base widget implementation
     *     |       |
     *     |       |   - The options are stored in the object as "this.options"
     *     |       |   - The model property ("this.model") is updated to reflect the new model
     *     |
     *     |__ .render( )
     *         |
     *         |   - This method should be called everytime the widget model value changes
     *         |   - Its goal is to update the display according to the new values
     *         |   - It is automatically called after the widget instanciation
     */

    return Backbone.View.extend( {

        el: '<div class="widget"/>',

        constructor: function ( parent, options ) {

            this.environment = _.extend( {}, parent ? parent.environment : {}, ( options || {} ).environment );

            Backbone.View.call( this, options );

            this.render();

        },

        /**
         * Widgets automatically call their `render()` methods at creation.
         *
         * - Extends the standard Backbone function.
         */

        initialize: function ( options ) {

            Backbone.View.prototype.initialize.call( this, options );

            this.options = options || {};

            if ( this.options.id !== undefined ) {
                this.id = this.options.id;
                this.$el.attr( 'id', this.id );
            }

            if ( this.options.className !== undefined ) {
                this.className = this.options.className;
                this.$el.addClass( this.className );
            }

            this.collection = this.options.collection;
            this.model = this.options.model;

        },

        /**
         * When called, will still return the child element matching the selector BUT not the one which are under another widget.
         *
         * For example, assuming the following DOM tree in $el :
         *
         * ```html
         * <div class="widget">
         *     <div class="a">
         *         <div class="widget">
         *             <div class="a"></div>
         *         </div>
         *     </div>
         * </div>
         * ```
         *
         * Using `this.$('.a')` will not return the second div, because it is inside another widget element. This allows to implement nested element without colliding.
         *
         * - Replaces the standard Backbone implementation.
         */

        $: function ( selector ) {

            var currentWidget = this.$el;

            return this.$el.find( selector ).filter( function () {
                return $( this ).parent().closest( '.widget' ).is( currentWidget );
            } );

        },

        /**
         * Does basically the same thing that the $() override : the events will be 'scoped' to the current widget elements, and will not be triggered by nested widgets elements.
         *
         * Also binds a listener to the widget's model's `change` event.
         *
         * - Intercepts & extends the standard Backbone implementation.
         */

        delegateEvents: function ( events ) {

            if ( !events )
                events = _.result( this, 'events' ) || {};

            var currentWidget = this.$el;

            Backbone.View.prototype.delegateEvents.call( this, Object.keys( events ).reduce( function ( newEvents, key ) {

                var method = events[ key ];

                if ( !_.isFunction( method ) )
                    method = this[ events[ key ] ];

                if ( !method )
                    return newEvents;

                newEvents[ key ] = function ( e ) {

                    if ( e && e.currentTarget && !$( e.currentTarget ).closest( '.widget' ).is( currentWidget ) )
                        return;

                    method.apply( this, arguments );

                }.bind( this );

                return newEvents;

            }.bind( this ), {} ) );

            if ( this.model )
                this.model.on( 'change', this.modelChangeEvent, this );

            return this;

        },

        /**
         * Removes the handler binded to the model `change` event.
         *
         * - Extends the standard Backbone implementation.
         */

        undelegateEvents: function () {

            Backbone.View.prototype.undelegateEvents.apply( this, arguments );

            if ( this.model )
                this.model.off( 'change', this.modelChangeEvent, this );

            return this;

        },

        /**
         * Checks that the model changes concern the widget before calling `render()`.
         *
         * - Should not be manually called.
         */

        modelChangeEvent: function () {

            var name = this.options.name;
            var namespace = name + '.';

            // If there is no name, then we catch every event
            var thereIsNoName = ! name;

            // Is there some attribute that match the widget name ? (ie. a widget named "foo" will catch changes on properties "foo" and "foo.bar")
            var changedAttributes = Object.keys( this.model.changedAttributes() || {} );
            var hasInterestingChanges = changedAttributes.some( function ( attribute ) {
                return attribute === name || attribute.indexOf( namespace ) === 0;
            } );

            if ( thereIsNoName || hasInterestingChanges ) {
                this.render();
            }

        },

        /**
         * Triggers a value change which can be canceled.
         *
         * The event object will have the following properties :
         *
         *   - `target` is the widget triggering the change
         *   - `which` is the name of the affected field - can be undefined
         *   - `value` is the widget new value
         *   - `preventDefault` is a function which, when called, will prevent the widget default action from executing
         */

        change: function ( which, value ) {

            if ( arguments.length === 1 ) {
                value = which;
                which = undefined;
            }

            var triggerDefault = true;
            var defaultInhiber = function () {
                triggerDefault = false;
            };

            var eventObject = {
                target: this,
                which: which,
                value: value,
                preventDefault: defaultInhiber
            };

            this.trigger( 'change.before', eventObject );

            if ( triggerDefault ) {
                this.defaultAction( which, value );
                this.trigger( 'change' );
                return true;
            } else {
                return false;
            }

        },

        /**
         * This function is called every time that a 'change:before' event is successful.
         *
         * - Can be safely overriden.
         * - Should not be manually called.
         */

        defaultAction: function ( which, value ) {

            this.set( value );

        },

        /**
         * This function returns the name of the specified field.
         */

        field: function ( which ) {

            return this.options.name + ( which ? '.' + which : '' );

        },

        /**
         * This function returns the value of a widget field from the model.
         *
         * If specified, `which` is the name of the specific field requested. Only useful for some specific widgets.
         */

        get: function ( which ) {

            return this.model.get( this.field( which ) );

        },

        /**
         * This function sets the value of a widget field from the model.
         *
         * If specified, `which` is the name of the specific field affected. Only useful for some specific widgets.
         */

        set: function ( which, value ) {

            if ( arguments.length === 1 ) {
                value = which;
                which = undefined;
            }

            return this.model.set( this.field( which ), value );

        }

    }, {

        reify: function () {

            var args = arguments;
            var constructor = this;

            var F = function () {
                constructor.apply( this, args );
            };
            F.prototype = this.prototype;

            return new F();

        }

    } );

} );

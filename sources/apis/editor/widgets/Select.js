define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Options'

], function ( Backbone, $, _, OptionsWidget ) {

    return OptionsWidget.extend( {

        el : [ '<div class="widget select-widget">'
        ,'          <div class="widget-wrapper">'
        ,'              <a class="selection"></a>'
        ,'              <ul class="options"></ul>'
        ,'          </div>'
        ,'      </div>'
        ].join( '' ),

        events : _.extend( { }, OptionsWidget.prototype.events, {
            'click .selection' : 'toggleEvent'
        } ),

        initialize : function ( options ) {

            options = _.defaults( options || { }, {

                placeholder   : 'Select an option',

                allowMultiple : false,
                allowEmpty    : false

            } );

            OptionsWidget.prototype.initialize.call( this, options );

            if ( this.options.allowMultiple )
                this.set( this.get( )[ 0 ] );

            this._bindedCloseEvent = this.closeEvent.bind( this );

        },

        delegateEvents : function ( ) {

            OptionsWidget.prototype.delegateEvents.apply( this, arguments );

            $( document ).on( 'click', this._bindedCloseEvent );

        },

        undelegateEvents : function ( ) {

            OptionsWidget.prototype.undelegateEvents.apply( this, arguments );

            $( document ).off( 'click', this._bindedCloseEvent );

        },

        render : function ( ) {

            var value = this.get( );

            var options = this.options.options.filter( function ( model ) {
                return model.get( 'value' ) === value;
            } )[ 0 ];

            var label = options ? options.get( 'label' ) : '';

            var $selectionElement = this.$( '.selection' );
            $selectionElement.removeClass( 'placeholder', value );
            $selectionElement.text( label || this.options.placeholder );
            $selectionElement.attr( 'title', label || this.options.placeholder );

        },

        toggleEvent : function ( e ) {

            e.preventDefault( );
            e.stopPropagation( );

            this.$el.toggleClass( 'opened' );

        },

        closeEvent : function ( e ) {

            if ( ! this.$el.hasClass( 'opened' ) )
                return ;

            e.preventDefault( );
            this.$el.removeClass( 'opened' );

        }

    } );

} );

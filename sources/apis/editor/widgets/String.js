define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    return Widget.extend( {

        el : [ '<div class="widget number-widget">'
        ,'          <div class="widget-wrapper">'
        ,'              <input class="value" />'
        ,'          </div>'
        ,'      </div>'
        ].join( '' ),

        events: _.extend( { }, Widget.prototype.events, {
            'change .value:input'  : 'changeEvent'
        } ),

        initialize : function ( options ) {

            options = _.defaults( options || { }, {

                model    : new Backbone.Model( ),
                name     : 'value'

            } );

            Widget.prototype.initialize.call( this, options );

            this.$( '.value' ).val( this.get( ) );
        },

        changeEvent : function ( e ) {

            this.change( $( e.currentTarget ).val( ) );

        }

    } );

} );

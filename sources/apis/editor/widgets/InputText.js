define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    return Widget.extend( {

        el : [ '<div class="widget input-widget">'
        ,'          <input type="text" class="value" placeolder=""/>'
        ,'      </div>'
        ].join( '' ),

        events : _.extend( { }, Widget.prototype.events, {
            'keyup .value:input' : 'keyupEvent',
            'change .value:input'  : 'changeEvent'
        } ),

        initialize : function ( options ) {

            options = _.defaults( options || { }, {

                model     : new Backbone.Model( ),
                name      : 'value',

                className : '',
                placeholder: ''

            }, options );

            Widget.prototype.initialize.call( this, options );

            if ( typeof this.get( ) === 'undefined' )
                this.set( this.options.content );

            if ( this.options.className ) {
                this.$( '.value' ).addClass( this.options.className );
            }
            if ( this.options.placeholder ) {
                this.$( '.value' ).attr("placeholder", this.options.placeholder);
            }

        },
        changeEvent : function ( e ) {
            var value = $( e.currentTarget ).val( );
   
        },
        keyupEvent : function ( ) {
            var value = this.$( '.value' ).val();
            this.change( value );
        },
        render : function ( ) {
            this.$( '.value' ).val();
        }

    } );

} );

define( [

    'apis/editor/widgets/Vertical',
    'apis/editor/defaultWidgets'

], function ( VerticalWidget ) {

    return {

        start : function ( environment, options ) {

            var widget = VerticalWidget.reify( null, _.extend( {

                environment : _.extend( { }, environment, {
                    popupStack : [ ]
                } )

            }, options ) );

            if ( environment.rootContainer )
                widget.$el.appendTo( environment.rootContainer );

            return widget;

        }

    };

} );

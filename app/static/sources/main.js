require.config( {

    'baseUrl' : 'static/sources',

    'shim' : {
        'vendors/JQuery'            : { 'exports' : 'jQuery' },
        'vendors/Underscore'        : { 'exports' : '_' },
        'vendors/Backbone'          : { 'exports' : 'Backbone',      'deps' : [ 'vendors/JQuery', 'vendors/Underscore' ] },
        'vendors/SvgColorPicker'    : { 'exports' : 'SvgColorPicker' },
        'vendors/jquery/UI'         : { 'exports' : 'jQuery',        'deps' : [ 'vendors/JQuery' ] },
        'vendors/jquery/mousewheel' : { 'exports' : 'jQuery',        'deps' : [ 'vendors/JQuery' ] },
        'vendors/jquery/toggleAttr' : { 'exports' : 'jQuery',        'deps' : [ 'vendors/JQuery' ] }
    }

} );

require( [

    'vendors/JQuery',
    'vendors/jquery/UI',
    'vendors/jquery/mousewheel',
    'vendors/jquery/toggleAttr',

    'static/sources/apis/editor/API.js'

], function ( $, UI, mousewheel, toggleAttr, WidgetApi ) {

    $( function ( ) {

        define( 'editor', function ( ) {

            return WidgetApi.start( {
                rootContainer : $( '.editor-panel' )
            } );

        } );

        require( [ 'app' ] );

    } );

} );

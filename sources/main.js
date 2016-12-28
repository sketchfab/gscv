require.config( {

    'baseUrl' : 'sources',

    'shim' : {
        'vendors/JQuery'            : { 'exports' : 'jQuery' },
        'vendors/Underscore'        : { 'exports' : '_' },
        'vendors/Backbone'          : { 'exports' : 'Backbone',      'deps' : [ 'vendors/JQuery', 'vendors/Underscore' ] },
        'vendors/SvgColorPicker'    : { 'exports' : 'SvgColorPicker' },
        'vendors/jquery/UI'         : { 'exports' : 'jQuery',        'deps' : [ 'vendors/JQuery' ] },
        'vendors/jquery/mousewheel' : { 'exports' : 'jQuery',        'deps' : [ 'vendors/JQuery' ] },
        'vendors/jquery/toggleAttr' : { 'exports' : 'jQuery',        'deps' : [ 'vendors/JQuery' ] },
        'vendors/jquery/togglerSa'  : { 'exports' : 'jsToggler',     'deps' : [ 'vendors/JQuery' ] }
    }

} );

require( [

    'vendors/JQuery',
    'vendors/jquery/UI',
    'vendors/jquery/mousewheel',
    'vendors/jquery/toggleAttr',
    'vendors/jquery/togglerSa',

    'apis/editor/API.js'

], function ( $, UI, mousewheel, toggleAttr, togglerSa, WidgetApi) {

    $( function ( ) {
        togglerSa();
        define( 'editor', function ( ) {

            return WidgetApi.start( {
                rootContainer : $( '.editor-panel' )
            } );

        } );

        require( [ 'app' ] );

    } );

} );

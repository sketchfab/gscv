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
        'vendors/html2canvas'       : { 'exports' : 'html2canvas',        'deps' : [ ] }
    }

} );

require( [

    'vendors/JQuery',
    'vendors/jquery/UI',
    'vendors/jquery/mousewheel',
    'vendors/jquery/toggleAttr',
    'vendors/html2canvas',

    'sources/apis/editor/API.js'

], function ( $, UI, mousewheel, toggleAttr, html2canvas, WidgetApi ) {

    $( function ( ) {

        define( 'editor', function ( ) {

            return WidgetApi.start( {
                rootContainer : $( '.editor-panel' )
            } );

        } );

        require( [ 'app' ] );

    } );

} );

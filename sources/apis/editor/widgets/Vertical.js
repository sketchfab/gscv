define( [

    'apis/editor/widgets/Layout'

], function ( Layout ) {

    return Layout.extend( {

        el : [ '<div class="widget layout-widget vertical-widget">'
        ,'          <div class="widget-wrapper">'
        ,'              <div class="children"></div>'
        ,'          </div>'
        ,'      </div>'
        ].join( '' )

    } );

} );

( function ( $ ) {

    $.fn.toggleAttr = function ( name, flag ) {
        this.each( function ( ) {
            if ( typeof flag === 'undefined' ) {
                var value = $( this ).attr( name );
                var hasAttr = ! ( typeof value === 'undefined' || value === false );
                $( this ).toggleAttr( name, ! hasAttr );
            } else if ( flag ) {
                $( this ).attr( name, name );
            } else {
                $( this ).removeAttr( name );
            }
        } );
    };

} )( jQuery );

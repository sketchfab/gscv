var SvgColorPicker = ( function ( ) {

    var svgNS = 'http://www.w3.org/2000/svg';

    var _ = function ( name, properties, children ) {

        var el = document.createElementNS( svgNS, name );

        Object.keys( properties ).forEach( function ( property ) {
            el.setAttribute( property, properties[ property ] );
        } );

        ( children || [ ] ).forEach( function ( child ) {
            el.appendChild( child );
        } );

        return el;

    };

    var onDrag = function ( el, cursor, callback ) {

        var update = function ( e ) {

            var rect = el.getBoundingClientRect( );

            var left = clamp( e.clientX - rect.left, 0, rect.width );
            var top = clamp( e.clientY - rect.top, 0, rect.height );

            cursor.style.left = left + 'px';
            cursor.style.top = top + 'px';

            var x = left / rect.width;
            var y = top / rect.height;

            callback( x, y );

        };

        var dragged = false;

        el.addEventListener( 'mousedown', function ( e ) {
            dragged = true;
            update( e );
        } );

        cursor.addEventListener( 'mousedown', function ( e ) {
            dragged = true;
            update( e );
        } );

        document.addEventListener( 'blur', function ( ) {
            dragged = false;
        } );

        document.addEventListener( 'mouseup', function ( ) {
            dragged = false;
        } );

        document.addEventListener( 'mousemove', function ( e ) {
            if ( ! dragged ) return ;
            update( e );
        } );

    };

    var clamp = function ( n, min, max ) {

        n = Math.max( min, n );
        n = Math.min( n, max );

        return n;

    };

    var hexRegexp = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;
    var rgbRegexp = /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
    var hsvRegexp = /hsv\(\s*(\d{1,3})°\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;

    var parseColor = function ( text ) {

        var match;

        if ( match = hexRegexp.exec( text ) )
            return hex2hsv( text );

        if ( match = rgbRegexp.exec( text ) )
            return { r : parseInt( match[ 1 ], 10 ) / 255, g : parseInt( match[ 2 ], 10 ) / 255, b : parseInt( match[ 3 ], 10 ) / 255 };

        if ( match = hsvRegexp.exec( text ) )
            return { h : parseInt( match[ 1 ], 10 ) / 360, s : parseInt( match[ 2 ], 10 ) / 100, v : parseInt( match[ 3 ], 10 ) / 100 };

        throw new Error( 'Invalid color format' );

    };

    var hex2rgb = function ( hex ) {

        return {
            r : parseInt( hex.substr( 1, 2 ), 16 ) / 255,
            g : parseInt( hex.substr( 3, 2 ), 16 ) / 255,
            b : parseInt( hex.substr( 5, 2 ), 16 ) / 255
        };

    };

    var rgb2hex = function ( rgb ) {

        var hex = function ( n ) {
            return ( '00' + Math.round( n * 255 ).toString( 16 ) ).substr( - 2 );
        };

        return '#' + [
            hex( rgb.r ),
            hex( rgb.g ),
            hex( rgb.b )
        ].join( '' );

    };

    var hsvdup = function ( hsv ) {

        return {
            h : hsv.h,
            s : hsv.s,
            v : hsv.v
        };

    };

    var rgb2hsv = function ( rgb ) {

        var r = rgb.r, g = rgb.g, b = rgb.b;

        var max = Math.max( r, g, b ), min = Math.min( r, g, b );
        var h, s, v = max;

        var d = max - min;
        s = max === 0 ? 0 : d / max;

        if ( max === min ) {

            // achromatic
            h = 0;

        } else {

            switch ( max ) {
                case r : h = ( g - b ) / d + ( g < b ? 6 : 0 ); break;
                case g : h = ( b - r ) / d + 2; break;
                case b : h = ( r - g ) / d + 4; break;
            }

            h /= 6;

        }

        return { h : h, s : s, v : v };

    };

    var hsv2rgb = function ( hsv ) {

        var h = hsv.h, s = hsv.s, v = hsv.v;
        var r, g, b;

        var i = Math.floor( h * 6 );
        var f = h * 6 - i;
        var p = v * ( 1 - s );
        var q = v * ( 1 - f * s );
        var t = v * ( 1 - ( 1 - f ) * s );

        switch ( i % 6 ) {
            case 0 : r = v, g = t, b = p; break ;
            case 1 : r = q, g = v, b = p; break ;
            case 2 : r = p, g = v, b = t; break ;
            case 3 : r = p, g = q, b = v; break ;
            case 4 : r = t, g = p, b = v; break ;
            case 5 : r = v, g = p, b = q; break ;
        }

        return { r : r, g : g, b : b };

    };

    var hex2hsv = function ( hex ) {

        return rgb2hsv( hex2rgb( hex ) );

    };

    var hsv2hex = function ( hsv ) {

        return rgb2hex( hsv2rgb( hsv ) );

    };

    var _slider = function ( index ) {

        return _( 'svg', {

            'xmlns'   : 'http://www.w3.org/2000/svg',
            'version' : '1.1',

            'width'  : '100%',
            'height' : '100%'

        }, [

            _( 'defs', { }, [ _( 'linearGradient', {

                'id' : 'svgcolorpicker-gradient-hue-' + index,

                'x1' :   '0%',
                'y1' : '100%',

                'x2' :   '0%',
                'y2' :   '0%'

            }, [

                [   '0%', '#FF0000' ],
                [  '17%', '#FFFF00' ],
                [  '33%', '#00FF00' ],
                [  '50%', '#00FFFF' ],
                [  '67%', '#0000FF' ],
                [  '83%', '#FF00FF' ],
                [ '100%', '#FF0000' ]

            ].map( function ( parameters ) {

                return _( 'stop', {

                    'offset'       : parameters[ 0 ],
                    'stop-color'   : parameters[ 1 ],
                    'stop-opacity' : '1'

                } );

            } ) ) ] ),

            _( 'rect', {

                'x' : '0',
                'y' : '0',

                'width'  : '100%',
                'height' : '100%',

                'fill' : 'url(#svgcolorpicker-gradient-hue-' + index + ')'

            } )

        ] );

    };

    var _picker = function ( index ) {

        return _( 'svg', {

            'xmlns'   : 'http://www.w3.org/2000/svg',
            'version' : '1.1',

            'width'  : '100%',
            'height' : '100%'

        }, [

            _( 'defs', {
            }, [

                _( 'linearGradient', {

                    'id' : 'svgcolorpicker-gradient-black-' + index,

                    'x1' :   '0%',
                    'y1' : '100%',

                    'x2' :   '0%',
                    'y2' :   '0%'

                }, [

                    _( 'stop', { 'offset' :   '0%', 'stop-color' : '#000000', 'stop-opacity' : '1' } ),
                    _( 'stop', { 'offset' : '100%', 'stop-color' : '#000000', 'stop-opacity' : '0' } ),

                ] ),

                _( 'linearGradient', {

                    'id' : 'svgcolorpicker-gradient-white-' + index,

                    'x1' :   '0%',
                    'y1' : '100%',

                    'x2' : '100%',
                    'y2' : '100%'

                }, [

                    _( 'stop', { 'offset' :   '0%', 'stop-color' : '#FFFFFF', 'stop-opacity' : '1' } ),
                    _( 'stop', { 'offset' : '100%', 'stop-color' : '#FFFFFF', 'stop-opacity' : '0' } ),

                ] )

            ] ),

            _( 'rect', {

                'x' : '0',
                'y' : '0',

                'width'  : '100%',
                'height' : '100%',

                'fill' : 'url(#svgcolorpicker-gradient-white-' + index + ')'

            } ),

            _( 'rect', {

                'x' : '0',
                'y' : '0',

                'width'  : '100%',
                'height' : '100%',

                'fill' : 'url(#svgcolorpicker-gradient-black-' + index + ')'

            } )

        ] );

    };

    var count = 0;

    return function ( options, callback ) {

        var index = count ++;

        var color = { h : 1, s : 1, v : 1 };

        // Hue selector
        var slider = _slider( index );

        // Saturation / luminance selector
        var picker = _picker( index );

        var updateCursors = function ( ) {

            options.sliderCursor.style.left = 0;
            options.sliderCursor.style.top = ( 1 - color.h ) * 100 + '%';

            options.pickerCursor.style.left = color.s * 100 + '%';
            options.pickerCursor.style.top = ( 1 - color.v ) * 100 + '%';

        };

        var updateColor = function ( ) {

            var hsv = hsvdup( color );
            var rgb = hsv2rgb( hsv );
            var hex = rgb2hex( rgb );

            picker.style.backgroundColor = hsv2hex( { h : color.h, s : 1, v : 1 } );

            callback( hsv, rgb, hex );

        };

        onDrag( slider, options.sliderCursor, function ( x, y ) {

            color.h = 1 - y;

            updateColor( );

        } );

        onDrag( picker, options.pickerCursor, function ( x, y ) {

            color.s = x;
            color.v = 1 - y;

            updateColor( );

        } );

        options.slider.appendChild( slider );
        options.picker.appendChild( picker );

        updateColor( );

        return {

            set : function ( value ) {

                if ( typeof value === 'string' )
                    value = parseColor( value );

                var has = function ( obj, required ) {
                    var properties = Object.keys( obj );
                    return required.every( function ( property ) {
                        return properties.indexOf( property ) !== - 1;
                    } );
                };

                if ( has( value, [ 'r', 'g', 'b' ] ) ) {

                    color = rgb2hsv( {
                        r : clamp( value.r, 0, 1 ),
                        g : clamp( value.g, 0, 1 ),
                        b : clamp( value.b, 0, 1 )
                    } );

                } else if ( has( value, [ 'h', 's', 'v' ] ) ) {

                    color.h = clamp( value.h, 0, 1 );
                    color.s = clamp( value.s, 0, 1 );
                    color.v = clamp( value.v, 0, 1 );

                } else {

                    throw new Error( 'Invalid color format' );

                }

                updateCursors( );
                updateColor( );

            },

            update : function ( ) {

                updateCursors( );

            }

        };

    };

} )( );

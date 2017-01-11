define({

    /**
     * Return a Boolean indicating if the sequence of `keys` exists in the object `obj` and its sub-objects.
     */

    has: function ( obj, keys ) {

        if ( keys.length === 1 )
            return (typeof obj[ keys[0] ] != 'undefined');
        else if ( keys.length > 1 && typeof obj[ keys[0] ] != 'undefined' )
            return this.has( obj[ keys[0] ], keys.slice(1) );
        else
            return false;

    },

    /**
     * Return the value in the object `obj` and its sub-objects at the corresponding sequence of `keys`.
     */

    get: function ( obj, keys ) {

        if (keys.length === 1)
            return obj[ keys[0] ];
        else
            return this.get(obj[ keys[0] ], keys.slice(1));

    },

    /**
     * Set `value` in the object `obj` and its sub-objects at the corresponding to a sequence of `keys`.
     * If an object does not exists, it is created. Always return the updated object.
     */

    set: function ( obj, keys, value ) {

        var key = keys[0];

        if (typeof obj !== 'object')
            obj = { };

        if (keys.length === 0)
            return value;
        else
            obj[key] = this.set( obj[key], keys.slice(1), value );

        return obj;

    }

});

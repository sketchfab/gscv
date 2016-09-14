define( [

    'vendors/Backbone'

], function ( Backbone ) {

    'use strict';

    return Backbone.Model.extend( {

        initialize: function ( /*collection, status*/ ) {

            this.get( 'collection' ).on( 'add remove reset', this.refresh, this );

            this.refresh();

        },

        refresh: function () {

            var isCollectionEmpty = this.get( 'collection' ).isEmpty( );
            var shouldBeEmpty = Boolean( this.get( 'lookFor' ) );

            this.set( 'value', isCollectionEmpty === shouldBeEmpty );

        }

    } );

} );

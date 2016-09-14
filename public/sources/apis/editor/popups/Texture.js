define( [

    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/popups/Popup'

], function ( $, _, Popup ) {

    'use strict';

    return Popup.extend( {

        events: _.extend( {}, Popup.prototype.events, {
            'click .texture': 'selectTextureEvent',
            'click .texture .reupload': 'reuploadTextureEvent',
            'click .texture .delete': 'deleteTextureEvent',
            'change .upload-input': 'uploadTextureEvent',

            'keyup [name="filter"]': 'filterTexture',
            'change [name="filter"]': 'filterTexture',
            'submit .filter': 'filterTexture'
        } ),

        className: 'texture-popup',

        header: function () {

            return _.template( [

                '<div class="popup-name">',
                '    Textures',
                '</div>',
                '<div class="popup-actions">',
                '    <a class="popup-action-close"></a>',
                '</div>'

            ].join( '\n' ), {

            } );

        },

        content: function () {

            return _.template( [

                '<div class="toolbar">',
                '    <div class="import">',
                '        <input id="upload-texture" class="upload-input cloaked" type="file" accept="image/png, image/gif, image/jpeg" />',
                '        <label class="button btn-primary popup-button upload" for="upload-texture">Import texture</label>',
                '    </div>',
                '    <form class="filter"><input type="search" name="filter" placeholder="Search in textures"></form>',
                '</div>',
                '<div class="textures">',
                '    <%= textures %>',
                '</div>'

            ].join( '\n' ), {

                textures: _.result( this, 'textures' )

            } );

        },

        filterTexture: function ( /*e*/) {

            var query = this.$( '.filter [name="filter"]' ).val();

            if ( query !== '' ) {

                var filtered = this.options.collection.filter( function ( item ) {
                    return item.get( 'label' ).match( query );
                } );

                this.$( '.textures' ).html( this.textures( filtered ) );

            } else {

                this.$( '.textures' ).html( this.textures() );

            }
        },

        textures: function ( collection ) {

            return _.template( [

                '<% textures.forEach( function ( texture ) { %>',
                '    <div class="texture" data-value="<%- texture.get( \'value\' ) %>">',
                '        <div class="image">',
                '            <div style="background-image: url(<%- texture.get( \'image\' ) %>)"></div>',
                '        </div>',
                '        <div class="name"><%- texture.get( \'label\' ) %></div>',
                '        <div class="actions">',
                '            <input id="texture-<%- texture.get( \'value\' ) %>" class="cloaked" type="file" />',
                //              '            <label class="popup-button reupload" for="texture-<%- texture.get( \'value\' ) %>">Re-upload</label>',
                //              '            <a class="popup-button delete">Delete</a>',
                '        </div>',
                '    </div>',
                '<% } ); %>'

            ].join( '\n' ), {

                textures: collection || this.options.collection

            } );

        },

        initialize: function () {

            this.options.collection.on( 'add remove reset change', function () {
                this.$( '.textures' ).html( _.result( this, 'textures' ) );
            }.bind( this ) );

        },

        uploadTextureEvent: function ( e ) {

            this.trigger( 'uploadRequest', e.target.files[ 0 ] );

            e.target.value = null;

        },

        selectTextureEvent: function ( e ) {

            if ( $( e.target ).parentsUntil( e.currentTarget ).andSelf().filter( 'a, label' ).length > 0 )
                return;

            this.options.model.set( this.options.name, $( e.currentTarget ).attr( 'data-value' ) );

            this.close();

        },

        reuploadTextureEvent: function () {

        },

        deleteTextureEvent: function () {

        }

    } );

} );

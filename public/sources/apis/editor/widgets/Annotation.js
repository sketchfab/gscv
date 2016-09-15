define( [

    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget annotation-widget">',
            '          <div class="widget-wrapper">',
            '              <div class="extra sort-handle">',
            '                  <span class="index"></span>',
            '                  <div class="tools-cell">',
            '                      <div class="tool refresh" title="Use current point of view">',
            '                          <i class="fa fa-camera"></i>',
            '                      </div>',
            '                      <div class="tool delete" title="Delete">',
            '                          <i class="fa fa-trash-o"></i>',
            '                      </div>',
            '                      <div class="tool primary confirm" title="Save">',
            '                          Done',
            '                      </div>',
            '                      <div class="tool primary edit" title="Edit">',
            '                          Edit',
            '                      </div>',
            '                  </div>',
            '              </div>',
            '              <div class="content">',
            '                  <div class="preview-cell">',
            '                  </div>',
            '                  <div class="content-cell">',
            '                      <div class="title"></div>',
            '                      <div class="description"></div>',
            '                  </div>',
            '                  <div class="edit-cell">',
            '                      <input class="title" placeholder="Title" maxlength="64" />',
            '                      <textarea class="description" placeholder="Description" maxlength="256"></textarea>',
            '                  </div>',
            '              </div>',
            '          </div>',
            '      </div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'click .edit': 'startEdition',
            'dblclick .content': 'startEdition',
            'click .confirm': 'confirmEdition',
            'click .delete': 'deleteSelf',
            'click .refresh': 'refreshPosition',
            'click .preview-cell': 'selectSelf',
            'click .content-cell': 'selectSelf'
        } ),

        initialize: function () {

            this.clickSomeWhereElse_ = this.clickSomeWhereElse.bind( this );

            Widget.prototype.initialize.apply( this, arguments );

            this.on( 'sorted', function () {
                this.render();
            }.bind( this ) );

        },

        delegateEvents: function () {

            Widget.prototype.delegateEvents.apply( this, arguments );

            $( document ).on( 'click', this.clickSomeWhereElse_ );

        },

        undelegateEvents: function () {

            Widget.prototype.undelegateEvents.apply( this, arguments );

            $( document ).on( 'click', this.clickSomeWhereElse_ );

        },

        render: function () {

            if ( this.model.get( 'preview' ) )
                this.$( '.preview-cell' ).css( 'background-image', 'url(%s)'.replace( '%s', this.model.get( 'preview' ) ) );

            if ( this.model.collection ) {
                // We use "css('display', '')" rather than "show()", because a jQuery bug will use display:block instead of display:flex
                this.$( '.extra' )
                    .css( 'display', '' )
                    .find( '.index' )
                        .text( this.model.collection.indexOf( this.model ) + 1 );
            } else {
                this.$( '.extra' ).hide();
            }

            this.$( '.content-cell .title' ).text( this.model.get( 'name' ) );
            this.$( '.content-cell .description' ).text( this.model.get( 'content' ) );

        },

        startEdition: function () {

            if ( this.$el.hasClass( 'edition' ) )
                return;

            this.$( '.edit-cell .title' ).val( this.model.get( 'name' ) );
            this.$( '.edit-cell .description' ).val( this.model.get( 'content' ) );

            this.$el.addClass( 'edition' );

        },

        confirmEdition: function () {

            if ( !this.$el.hasClass( 'edition' ) )
                return;

            this.model.set( 'name', this.$( '.edit-cell .title' ).val() );
            this.model.set( 'content', this.$( '.edit-cell .description' ).val() );

            this.$el.removeClass( 'edition' );

        },

        refreshPosition: function () {

            this.model.get( 'refreshAction' )();

        },

        deleteSelf: function () {

            if ( !this.model.collection )
                return;

            var deferred = $.Deferred();
            var promise = deferred.promise();

            this.model.collection.trigger( 'beforeRemove', deferred, this.model );

            promise.then(
                function onConfirm() {
                    this.model.collection.remove( this.model );
                }.bind( this )
            );

        },

        selectSelf: function () {

            this.model.trigger( 'select', this.model );

        },

        clickSomeWhereElse: function ( e ) {

            if ( this.$el.has( e.target ).length )
                return;

            this.confirmEdition();

        }

    } );

} );

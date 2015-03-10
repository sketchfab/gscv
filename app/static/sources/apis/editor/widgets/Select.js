define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Options'

], function ( Backbone, $, _, OptionsWidget ) {

    'use strict';

    return OptionsWidget.extend( {

        el: [ '<div class="widget select-widget" tabindex="0">',
            '          <div class="widget-wrapper">',
            '              <a class="selection"></a>',
            '              <ul class="options"></ul>',
            '          </div>',
            '      </div>'
        ].join( '' ),

        events: _.extend( {}, OptionsWidget.prototype.events, {
            'mouseover [data-value]': 'mouseoverEvent',
            'blur': 'cancel',
            'click .selection': 'toggleEvent'
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                placeholder: 'Select an option',

                allowMultiple: false,
                allowEmpty: false

            } );

            OptionsWidget.prototype.initialize.call( this, options );

            if ( this.options.allowMultiple )
                this.set( this.get()[ 0 ] );

            this._keyBuffer = '';
            this._keyBufferTimestamp = null;

            this._bindedCloseEvent = this.closeEvent.bind( this );
            this._bindedKeyDownEvent = this.keyDownEvent.bind( this );
            this._bindedKeyPressEvent = this.keyPressEvent.bind( this );

        },

        delegateEvents: function () {

            OptionsWidget.prototype.delegateEvents.apply( this, arguments );

            $( document ).on( 'click', this._bindedCloseEvent );
            $( document ).on( 'keydown', this._bindedKeyDownEvent );
            $( document ).on( 'keypress', this._bindedKeyPressEvent );

        },

        undelegateEvents: function () {

            OptionsWidget.prototype.undelegateEvents.apply( this, arguments );

            $( document ).off( 'click', this._bindedCloseEvent );
            $( document ).off( 'keydown', this._bindedKeyDownEvent );
            $( document ).off( 'keypress', this._bindedKeyPressEvent );

        },

        render: function () {

            var value = this.get();

            var options = this.options.options.filter( function ( model ) {
                return model.get( 'value' ) === value;
            } )[ 0 ];

            var label = options ? options.get( 'label' ) : '';

            var $selectionElement = this.$( '.selection' );
            $selectionElement.removeClass( 'placeholder', value );
            $selectionElement.text( label || this.options.placeholder );
            $selectionElement.attr( 'title', label || this.options.placeholder );

        },

        isOpened: function () {

            return this.$el.hasClass( 'opened' );

        },

        isFocused: function () {

            return this.el === document.activeElement && !this.isOpened();

        },

        toggle: function () {

            if ( !this.isOpened() ) {
                this.open();
            } else {
                this.close();
            }

        },

        open: function () {

            this.lastValue = this.get();
            this.moveCursorToSelection();

            this.$el.addClass( 'opened' );

        },

        close: function () {

            this.$el.removeClass( 'opened' );

            this.moveCursorToSelection();

        },

        cancel: function () {

            if ( !this.isOpened() )
                return;

            this.triggerOption( this.lastValue );
            this.close();

        },

        setCursor: function ( offset ) {

            var $options = this.$( '[data-value]' );

            if ( offset < 0 )
                offset = $options.length + offset % $options.length;

            if ( offset >= $options.length )
                offset %= $options.length;

            $options.removeClass( 'cursor' );
            $options.eq( offset ).addClass( 'cursor' );

            this.cursorOffset = offset;

        },

        changeCursor: function ( relativeOffset ) {

            if ( relativeOffset === 0 )
                return;

            var optionCount = this.$( '[data-value]' ).length;

            if ( this.cursorOffset == null && !this.isOpened() )
                this.moveCursorToSelection();

            if ( this.cursorOffset == null ) {

                this.setCursor( relativeOffset > 0 ? 0 : optionCount - 1 );

            } else {

                var offset = this.cursorOffset + relativeOffset;

                if ( offset >= optionCount )
                    offset = optionCount - 1;

                if ( offset < 0 )
                    offset = 0;

                this.setCursor( offset );

            }

        },

        applyCursorToSelection: function () {

            if ( this.cursorOffset === null )
                return;

            this.triggerOption( this.$( '[data-value]' ).eq( this.cursorOffset ).attr( 'data-value' ) );

        },

        moveCursorToSelection: function () {

            var value = this.get();

            this.cursorOffset = this.$( '[data-value]' ).removeClass( 'cursor' ).filter( function () {
                return $( this ).attr( 'data-value' ) === value;
            } ).addClass( 'cursor' ).index();

        },

        toggleEvent: function ( e ) {

            e.preventDefault();
            e.stopPropagation();

            this.toggle();

        },

        closeEvent: function ( e ) {

            if ( this.$el.has( e.currentTarget ).length )
                return;

            if ( !this.$el.hasClass( 'opened' ) )
                return;

            e.preventDefault();

            this.close();

        },

        selectEvent: function () {

            OptionsWidget.prototype.selectEvent.apply( this, arguments );

            this.close();

        },

        mouseoverEvent: function ( e ) {

            this.setCursor( this.$( '[data-value]' ).index( e.currentTarget ) );

        },

        keyDownEvent: function ( e ) {

            switch ( e.keyCode ) {

            case 36 /*HOME*/ :
                if ( this.isOpened() || this.isFocused() ) {
                    this.setCursor( 0 );
                    this.applyCursorToSelection();
                }
                break;

            case 35 /*END*/ :
                if ( this.isOpened() || this.isFocused() ) {
                    this.setCursor( -1 );
                    this.applyCursorToSelection();
                }
                break;

            case 27 /*ESCAPE*/ :
                if ( this.isOpened() ) {
                    e.preventDefault();
                    this.cancel();
                }
                break;

            case 33 /*PAGE UP*/ :
                if ( this.isOpened() || this.isFocused() ) {
                    e.preventDefault();
                    this.changeCursor( -10 );
                    this.applyCursorToSelection();
                }
                break;

            case 34 /*PAGE DOWN*/ :
                if ( this.isOpened() || this.isFocused() ) {
                    e.preventDefault();
                    this.changeCursor( +10 );
                    this.applyCursorToSelection();
                }
                break;

            case 38 /*UP*/ :
                if ( this.isOpened() || this.isFocused() ) {
                    e.preventDefault();
                    this.changeCursor( -1 );
                    this.applyCursorToSelection();
                }
                break;

            case 40 /*DOWN*/ :
                if ( this.isOpened() || this.isFocused() ) {
                    e.preventDefault();
                    this.changeCursor( +1 );
                    this.applyCursorToSelection();
                }
                break;

            case 32 /*SPACE*/ :
            case 13 /*ENTER*/ :
                if ( this.isOpened() || this.isFocused() ) {
                    e.preventDefault();
                    this.toggle();
                    break;
                }
                break;
            case 8 /*BACKSPACE*/ :
                if ( this.isOpened() || this.isFocused() ) {
                    // We do not want users to exit the editor accidentally by pressing backspace ("history back")
                    // And ... well ... I don't want to leave the editor accidentally too ...
                    e.preventDefault();
                }
                break;

            }

        },

        keyPressEvent: function ( e ) {

            if ( !this.isOpened() && !this.isFocused() )
                return;

            var c = String.fromCharCode( e.keyCode ).toLowerCase();

            if ( c.length < 1 )
                return;

            var newTimestamp = new Date().getTime();
            if ( newTimestamp - this._keyBufferTimestamp > 700 )
                this._keyBuffer = '';

            this._keyBuffer += c;
            this._keyBufferTimestamp = newTimestamp;

            var findOption = function () {
                return this.options.options.find( function ( model ) {
                    return model.get( 'label' ).toLowerCase().indexOf( this._keyBuffer ) !== -1;
                }.bind( this ) );
            }.bind( this );

            var option = findOption();

            if ( !option && this._keyBuffer.length > 1 ) {
                this._keyBuffer = c;
                option = findOption();
            }

            if ( option ) {
                this.triggerOption( option.get( 'value' ) );
                this.setCursor( this.options.options.indexOf( option ) );
            }
        }

    } );

} );

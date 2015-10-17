/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
            background: "#2C2C2C",
            isBgImage: false

        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:background', this.onBackColorChange, this );
            this.model.on( 'uploadBgImage', this.onUploadBgImage, this );
            this.model.on( 'cancelBgImage', this.onCancelBgImage, this );
            this.model.on( 'removeBgImage', this.onRemoveBgImage, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onBackColorChange( );
            // console.log(this.model.get('background'));
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onBackColorChange : function ( ) {
            var hexColor = this.rgb2hex(this.model.get( 'background' ));
            this.$el.css( 'background-color', hexColor );
            // console.log('background changed : ', hexColor );
        },

        onUploadBgImage : function (photo) {
            var self = this;
            var fileReader = new FileReader();
                fileReader.readAsDataURL(photo);
                fileReader.onloadend = function(e){
                    self.$el.css("background-image", "url("+e.target.result+")");
                };
            $('.removeButton button').prop('disabled', false);
        },

        onCancelBgImage : function(){
            
        },

        onRemoveBgImage : function(){
            this.$el.css("background-image", "");
            $('.bgImagePicker input').val('');
            $('.removeButton button').prop('disabled', true);
        },

        rgb2hex : function ( rgb ) {

            var rounded = {
                r: rgb.r * 255,
                g: rgb.g * 255,
                b: rgb.b * 255
            };
            return '#' + ( 16777216 | rounded.b | ( rounded.g << 8 ) | ( rounded.r << 16 ) ).toString( 16 ).substr( 1 );
        }

    } );

    // --- --- --- --- --- --- --- --- ---

    var card = new Card( );
    var view = new View( { model : card, el : $( '.card' ) } );

    view.render( );

    // --- --- --- --- --- --- --- --- ---

    var appearance = editor.createWidget( 'Group', {
        label : 'Card Appearance'
    } );

    appearance.createWidget( 'Border radius', 'NumberedSlider', {
        model : card,
        name  : 'radius'
    } );

    appearance.createWidget( 'Background', 'Color', {
        model : card,
        name : 'background'
    });

    var bgImgPicker = appearance.createWidget( 'Horizontal', {});

    // appearance.createWidget( '', 'ToggleSwitch', {
    //     model : card,
    //     name : 'isBgImage',
    //     label : 'Background Image'
    // });
    bgImgPicker.createWidget( '', 'FilePicker', {
            model : card,
            selectEvent: 'uploadBgImage',
            cancelEvent: 'cancelBgImage',
            text: 'Browse'
            // action: null
        }).$el.addClass('bgImagePicker');
    bgImgPicker.createWidget( '', 'Button', {
            model : card,
            event: 'removeBgImage',
            text: 'X'
        }).$el.addClass('removeButton');
    
    // Hack to initialize default color of color pickers
    appearance.$el.find('.color-widget input').val(card.defaults.background);
    appearance.$el.find('.color-widget input').trigger('change');
    //console.log(view.$el.find('.cardMovingElements'));
    $('.removeButton button').prop('disabled', true);
    view.$el.find('.cardMovingElements').draggable({ containment: ".card", scroll: false });



} );

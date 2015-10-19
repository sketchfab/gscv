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
            isNameText: true,
            nameText: "Cyril Sabbagh",
            nameTextSize: 16,
            nameTextColor: "#FFFFFF",
            isJobText: true,
            jobText: "Frontend Developer",
            jobTextSize: 16,
            jobTextColor: "#FFFFFF",
            isContactText: false,
            contactText: "Adress:\u000AEmail:\u000APhone:",
            contactTextSize: 16,
            contactTextColor: "#FFFFFF"
            
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:background', this.onBackColorChange, this );
            this.model.on( 'uploadBgImage', this.onUploadBgImage, this );
            this.model.on( 'cancelBgImage', this.onCancelBgImage, this );
            this.model.on( 'removeBgImage', this.onRemoveBgImage, this );
            this.model.on( 'change:nameText', this.onNameTextChange, this );
            this.model.on( 'change:nameTextSize', this.onNameTextSizeChange, this );
            this.model.on( 'change:nameTextColor', this.onNameTextColorChange, this );
            this.model.on( 'change:isNameText', this.onIsNameTextChange, this );
            this.model.on( 'change:isJobText', this.onIsJobTextChange, this );
            this.model.on( 'change:jobText', this.onJobTextChange, this );
            this.model.on( 'change:jobTextSize', this.onJobTextSizeChange, this );
            this.model.on( 'change:jobTextColor', this.onJobTextColorChange, this );
            this.model.on( 'change:isContactText', this.onIsContactTextChange, this );
            this.model.on( 'change:contactText', this.onContactTextChange, this );
            this.model.on( 'change:contactTextSize', this.onContactTextSizeChange, this );
            this.model.on( 'change:contactTextColor', this.onContactTextColorChange, this );

        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onBackColorChange( );
            this.onNameTextChange();
            this.onJobTextChange();
            this.onContactTextChange();
            this.onIsContactTextChange();
            // console.log(this.model.get('background'));
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onBackColorChange : function ( ) {
            //var hexColor = this.rgb2hex(this.model.get( 'background' ));
            this.$el.css( 'background-color', this.model.get( 'background' ) );
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

        onNameTextChange : function(){
            this.$el.find(".name").html(this.model.get('nameText'));
        },

        onNameTextSizeChange : function(){
            this.$el.find(".name").css('font-size', this.model.get('nameTextSize'));
        },

        onNameTextColorChange : function() {
            this.$el.find('.name').css( 'color', this.model.get( 'nameTextColor' ) );
        },

        onIsNameTextChange : function() {
            $('.textGroupName').toggle();
            this.$el.find(".name").toggle();
        },

        onIsJobTextChange : function() {
            $('.textGroupJob').toggle();
            this.$el.find(".job").toggle();
        },

        onJobTextChange : function(){
            this.$el.find(".job").html(this.model.get('jobText'));
        },

        onJobTextSizeChange : function(){
            this.$el.find(".job").css('font-size', this.model.get('jobTextSize'));
        },

        onJobTextColorChange : function() {
            this.$el.find('.job').css( 'color', this.model.get( 'jobTextColor' ) );
        },

        onIsContactTextChange : function() {
            $('.textGroupContact').toggle();
            this.$el.find(".contactInfo").toggle();
        },

        onContactTextChange : function(){
            this.$el.find(".contactInfo").html(this.model.get('contactText'));
        },

        onContactTextSizeChange : function(){
            this.$el.find(".contactInfo").css('font-size', this.model.get('contactTextSize'));
        },

        onContactTextColorChange : function() {
            this.$el.find('.contactInfo').css( 'color', this.model.get( 'contactTextColor' ) );
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
        name : 'background',
        type : 'hex'
    });

    var bgImgPicker = appearance.createWidget( 'Horizontal', {});

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
    // appearance.$el.find('.color-widget input').val(card.defaults.background);
    // appearance.$el.find('.color-widget input').trigger('change');
    //console.log(view.$el.find('.cardMovingElements'));
    $('.removeButton button').prop('disabled', true);

    var textGroup = editor.createWidget( 'Group', {
            label : 'Card Text'
        });
    textGroup.createWidget('','ToggleSwitch',{
        model: card,
        name: 'isNameText',
        label: 'Name'
    });

    var textGroupName = textGroup.createWidget( 'Vertical', {
        });
    textGroupName.$el.addClass('textGroupName');
    textGroupName.createWidget('','Text', {
            model : card,
            name  : 'nameText'
        });
    textGroupName.createWidget( '', 'Color', {
        model : card,
        name : 'nameTextColor',
        type : 'hex'
    });
    textGroupName.createWidget( '', 'NumberedSlider', {
        model : card,
        name  : 'nameTextSize',
        minimum: 1,
        maximum: 100,
        step: 1,
        unit: 'px'
    });

    textGroup.createWidget('','ToggleSwitch',{
        model: card,
        name: 'isJobText',
        label: 'Job'
    });

    var textGroupJob = textGroup.createWidget( 'Vertical', {
        });
    textGroupJob.$el.addClass('textGroupJob');
    textGroupJob.createWidget('','Text', {
            model : card,
            name  : 'jobText'
        });
    textGroupJob.createWidget( '', 'Color', {
        model : card,
        name : 'jobTextColor',
        type : 'hex'
    });
    textGroupJob.createWidget( '', 'NumberedSlider', {
        model : card,
        name  : 'jobTextSize',
        minimum: 1,
        maximum: 100,
        step: 1,
        unit: 'px'
    });

    textGroup.createWidget('','ToggleSwitch',{
        model: card,
        name: 'isContactText',
        label: 'Contact Infos'
    });

    var textGroupContact = textGroup.createWidget( 'Vertical', {
        });
    textGroupContact.$el.addClass('textGroupContact').hide();
    textGroupContact.createWidget('','TextArea', {
            model : card,
            name  : 'contactText'
        });
    textGroupContact.createWidget( '', 'Color', {
        model : card,
        name : 'contactTextColor',
        type : 'hex'
    });
    textGroupContact.createWidget( '', 'NumberedSlider', {
        model : card,
        name  : 'contactTextSize',
        minimum: 1,
        maximum: 100,
        step: 1,
        unit: 'px'
    });

    view.$el.find('.cardMovingElements').draggable({ containment: ".card", scroll: false });

} );

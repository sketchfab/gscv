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
            contactText: "Address:\u000AEmail:\u000APhone:",
            contactTextSize: 16,
            contactTextColor: "#FFFFFF",
            isProfilePic: false,
            profilePicRadius: 0,
            profilePicSize: 150,
            isCompanyPic: false,
            companyPicWidth: 100
            
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
            this.model.on( 'change:isProfilePic', this.onIsProfilePicChange, this );
            this.model.on( 'uploadProfileImage', this.onUploadProfileImage, this );
            this.model.on( 'cancelProfileImage', this.onCancelProfileImage, this );
            this.model.on( 'change:profilePicRadius', this.onProfilePicRadiusChange, this );
            this.model.on( 'change:profilePicSize', this.onProfilePicSizeChange, this );
            this.model.on( 'change:isCompanyPic', this.onIsCompanyPicChange, this );
            this.model.on( 'uploadCompanyImage', this.onUploadCompanyImage, this );
            this.model.on( 'cancelCompanyImage', this.onCancelCompanyImage, this );
            this.model.on( 'change:companyPicWidth', this.onCompanyPicWidthChange, this );
            //this.model.on( 'exportCard', this.onExportCard, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onBackColorChange( );
            this.onNameTextChange();
            this.onJobTextChange();
            this.onContactTextChange();
            this.onIsContactTextChange();
            // this.onIsProfilePicChange();
            // this.onIsCompanyPicChange();
            //this.onProfilePicSizeChange();
            // console.log(this.model.get('background'));
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onBackColorChange : function ( ) {
            this.$el.css( 'background-color', this.model.get( 'background' ) );
        },

        onUploadBgImage : function (photo) {
            var self = this;
            var fileReader = new FileReader();
                fileReader.readAsDataURL(photo);
                fileReader.onloadend = function(e){
                    self.$el.css("background-image", "url("+e.target.result+")");
                };
            $('.bgImagePicker .removeButton button').prop('disabled', false);
        },

        onCancelBgImage : function(){
            
        },

        onRemoveBgImage : function(){
            this.$el.css("background-image", "");
            $('.bgImagePicker input').val('');
            $('.bgImagePicker .removeButton button').prop('disabled', true);
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
        },

        onIsProfilePicChange : function() {
            $('.pictureGroupProfile').toggle();
            this.$el.find(".profilePic").toggle();
        },

        onUploadProfileImage : function (photo) {
            var fileReader = new FileReader();
                fileReader.readAsDataURL(photo);
                fileReader.onloadend = function(e){
                    $('.profilePic').css("background-image", "url("+e.target.result+")");
                };
        },

        onCancelProfileImage : function(){
            
        },

        onProfilePicRadiusChange : function ( ) {
            $('.profilePic').css( 'border-radius', this.model.get( 'profilePicRadius' ) );
        },

        onProfilePicSizeChange : function ( ) {
            $('.profilePic').css( 'width', this.model.get( 'profilePicSize' ) ).css( 'height', this.model.get( 'profilePicSize' ) );
        },

        onIsCompanyPicChange : function() {
            $('.pictureGroupCompany').toggle();
            this.$el.find(".companyPic").toggle();
        },

        onUploadCompanyImage : function (photo) {
            var fileReader = new FileReader();
                fileReader.readAsDataURL(photo);
                fileReader.onloadend = function(e){
                    $('.companyPic').attr("src", e.target.result);
                };
        },

        onCancelCompanyImage : function(){
            
        },

        onCompanyPicWidthChange : function ( ) {
            $('.companyPic').css( 'width', this.model.get( 'companyPicWidth' ) );
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
    bgImgPicker.$el.addClass('bgImagePicker');

    bgImgPicker.createWidget( '', 'FilePicker', {
            model : card,
            selectEvent: 'uploadBgImage',
            cancelEvent: 'cancelBgImage',
            text: 'Browse'
            // action: null
        });
    bgImgPicker.createWidget( '', 'Button', {
            model : card,
            event: 'removeBgImage',
            text: 'X'
        }).$el.addClass('removeButton');

    $('.bgImagePicker .removeButton button').prop('disabled', true);

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
    textGroupName.$el.addClass('textGroupName verticalSection');
    textGroupName.createWidget('','Text', {
            model : card,
            name  : 'nameText'
        });
    textGroupName.createWidget( 'Color', 'Color', {
        model : card,
        name : 'nameTextColor',
        type : 'hex'
    });
    textGroupName.createWidget( 'Size', 'NumberedSlider', {
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
    textGroupJob.$el.addClass('textGroupJob verticalSection');
    textGroupJob.createWidget('','Text', {
            model : card,
            name  : 'jobText'
        });
    textGroupJob.createWidget( 'Color', 'Color', {
        model : card,
        name : 'jobTextColor',
        type : 'hex'
    });
    textGroupJob.createWidget( 'Size', 'NumberedSlider', {
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
    textGroupContact.$el.addClass('textGroupContact verticalSection').hide();
    textGroupContact.createWidget('','TextArea', {
            model : card,
            name  : 'contactText'
        });
    textGroupContact.createWidget( 'Color', 'Color', {
        model : card,
        name : 'contactTextColor',
        type : 'hex'
    });
    textGroupContact.createWidget( 'Size', 'NumberedSlider', {
        model : card,
        name  : 'contactTextSize',
        minimum: 1,
        maximum: 100,
        step: 1,
        unit: 'px'
    });

    var pictureGroup = editor.createWidget( 'Group', {
        label : 'Card Picture'
    });

    pictureGroup.createWidget('','ToggleSwitch',{
        model: card,
        name: 'isProfilePic',
        label: 'Profile'
    });
    var pictureGroupProfile = pictureGroup.createWidget( 'Vertical', {});
    pictureGroupProfile.$el.addClass('pictureGroupProfile verticalSection').hide();

    pictureGroupProfile.createWidget( '', 'FilePicker', {
            model : card,
            selectEvent: 'uploadProfileImage',
            cancelEvent: 'cancelProfileImage',
            text: 'Browse'
            // action: null
        });
    pictureGroupProfile.createWidget( 'Border radius', 'NumberedSlider', {
        model : card,
        name  : 'profilePicRadius'
    } );

    pictureGroupProfile.createWidget( 'Size', 'NumberedSlider', {
        model : card,
        name  : 'profilePicSize',
        minimum: 0,
        maximum: 260,
        unit: "px"
    } );

    pictureGroup.createWidget('','ToggleSwitch',{
        model: card,
        name: 'isCompanyPic',
        label: 'Company'
    });
    var pictureGroupCompany = pictureGroup.createWidget( 'Vertical', {});
    pictureGroupCompany.$el.addClass('pictureGroupCompany verticalSection').hide();

    pictureGroupCompany.createWidget( '', 'FilePicker', {
            model : card,
            selectEvent: 'uploadCompanyImage',
            cancelEvent: 'cancelCompanyImage',
            text: 'Browse'
            // action: null
        });

    pictureGroupCompany.createWidget( 'Size', 'NumberedSlider', {
        model : card,
        name  : 'companyPicWidth',
        minimum: 0,
        maximum: 500,
        unit: "px"
    } );

    $('.cardMovingElements').draggable({ containment: ".card", scroll: false });

} );

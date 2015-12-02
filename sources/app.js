/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
            borderWidth : 10,
            borderStyle : "Solid",
            nameFontSize : 20,
            jobFontSize : 15,
            informationFontSize : 13
        }

    } );


    var Content = Backbone.Model.extend( {

        defaults : {
            name : "Bob",
            job: "Singer",
            information: "Information"
        }

    } );

    var Logo = Backbone.Model.extend( {

        defaults : {
        }

    } );

    var LogoView = Backbone.View.extend( {
        initialize : function ( ) {
            this.model.on( 'uploadLogoEvent', this.onUploadLogoEvent, this );
            this.model.on( 'cancelLogoEvent', this.onCancelLogoEvent, this );
        },

        onUploadLogoEvent : function ( element ) {
            console.log(element);
            console.log(this.$el);
            var input = event.target;
            var reader = new FileReader();
            reader.onload = function(){
              var dataURL = reader.result;
              $('#output-logo').attr('src',dataURL);
            };
            reader.readAsDataURL(input.files[0]);
        },

        onCancelLogoEvent : function ( ) {
        }

    } );

    var ContentView = Backbone.View.extend( {
        initialize : function ( ) {
            this.model.on( 'change:name', this.onNameChange, this );
            this.model.on( 'change:job', this.onJobChange, this );
            this.model.on( 'change:information', this.onInformationChange, this );
        },
        
        render : function ( ) {
            this.onNameChange( );
            this.onJobChange( );
            this.onInformationChange();
        },

        onNameChange : function ( ) {
            this.$el.find('.name').text( this.model.get( 'name' ) );
        },

        onJobChange : function ( ) {
            this.$el.find('.job').text( this.model.get( 'job' ) );
        },

        onInformationChange : function ( ) {
            this.$el.find('.information').text( this.model.get( 'information' ) );
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {

            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:borderStyle', this.onBorderStyleChange, this );
            this.model.on( 'change:borderWidth', this.onBorderWidthChange, this );
            this.model.on( 'change:borderColor', this.onBorderColorChange, this );
            this.model.on( 'change:background', this.onBackgroundChange, this );
            this.model.on( 'change:fontColor', this.onFontColorChange, this );
            this.model.on( 'change:fontColorInformation', this.onFontColorInformationChange, this );
            this.model.on( 'change:nameFontSize', this.onNameFontSize, this );
            this.model.on( 'change:jobFontSize', this.onJobFontSize, this );
            this.model.on( 'change:informationFontSize', this.onInformationFontSize, this );

        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onBorderStyleChange( );
            this.onBorderWidthChange( );
            this.onBorderColorChange( );
            this.onFontColorChange( );
            this.onFontColorInformationChange( );
            this.onNameFontSize( );
            this.onJobFontSize( );
            this.onInformationFontSize( );
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onBorderStyleChange : function ( ) {
            this.$el.css( 'border-style', this.model.get( 'borderStyle' ) );
        },

        onBorderWidthChange : function ( ) {
            this.$el.css( 'border-width', this.model.get( 'borderWidth' ) );
        },

        onBorderColorChange : function ( ) {
            this.$el.css( 'border-color', this.model.get( 'borderColor' ) );
        },

        onBackgroundChange : function ( ) {
            this.$el.css( 'background', this.model.get( 'background' ) );
        },

        onFontColorChange : function ( ) {
            this.$el.find('.job').css('color', this.model.get( 'fontColor' ) );
            this.$el.find('.name').css('color', this.model.get( 'fontColor' ) );
        },

        onFontColorInformationChange : function ( ) {
            this.$el.find('.information').css('color', this.model.get( 'fontColorInformation' ) );
        },

        onNameFontSize : function ( ) {
            this.$el.find('.name').css( 'font-size', this.model.get( 'nameFontSize' ) );
        },

        onJobFontSize : function ( ) {
            this.$el.find('.job').css( 'font-size', this.model.get( 'jobFontSize' ) );
        },

        onInformationFontSize : function ( ) {
            this.$el.find('.information').css( 'font-size', this.model.get( 'informationFontSize' ) );
        },


    } );

    // --- --- --- --- --- --- --- --- ---

    var card = new Card( );
    var view = new View( { model : card, el : $( '.card' ) } );

    var cardContent = new Content( );
    var contentView = new ContentView( { model : cardContent, el : $( '.content' ) } );


    var cardLogo = new Logo( );
    var logoView = new LogoView( { model : cardLogo, el : $( '.logo' ) } );

    contentView.render( );
    view.render( );

    view.$el.find('.draggable').draggable({ containment: ".card", scroll: false });
    // --- --- --- --- --- --- --- --- ---

    var appearance = editor.createWidget( 'Group', {
        label : 'Card Appearance',
        opened: false
    } );

    appearance.createWidget( 'Border radius', 'NumberedSlider', {
        model : card,
        name  : 'radius',
        unit  : 'px'
    } );

    appearance.createWidget( 'Border style', 'Select', {
        model : card,
        name  : 'borderStyle',
        options: ['solid','dotted']
    } );

    appearance.createWidget( 'Border width', 'NumberedSlider', {
        model : card,
        name  : 'borderWidth',
        unit  : 'px'
    } );

    appearance.createWidget( 'Border color', 'Color', {
        model : card,
        name  : 'borderColor',
        color : '#AAAAAA'
    } );

    appearance.createWidget( 'background color', 'Color', {
        model : card,
        name  : 'background',
        color : '#EEEEEE'
    } );

    appearance.createWidget( 'Font color', 'Color', {
        model : card,
        name  : 'fontColor',
        color : '#000000'
    } );

    appearance.createWidget( 'Name font size', 'NumberedSlider', {
        model : card,
        name  : 'nameFontSize',
        unit  : 'px'
    } );

    appearance.createWidget( 'Job font size', 'NumberedSlider', {
        model : card,
        name  : 'jobFontSize',
        unit  : 'px'
    } );

    appearance.createWidget( 'Font color Information', 'Color', {
        model : card,
        name  : 'fontColorInformation',
        color : '#000000'
    } );

    appearance.createWidget( 'Information font size', 'NumberedSlider', {
        model : card,
        name  : 'informationFontSize',
        unit  : 'px'
    } );


    var content = editor.createWidget( 'Group', {
        label : 'Card Content',
        opened: false
    } );

    content.createWidget( 'Name', 'Input', {
        model : cardContent,
        name  : 'name',
        className: 'input-name',
        placeholder: 'Your name'
    } );

    content.createWidget( 'Job', 'Input', {
        model : cardContent,
        name  : 'job',
        className: 'input-job',
        placeholder: 'Your job'
    } );

    content.createWidget( 'Other Information', 'Textarea', {
        model : cardContent,
        name  : 'information',
        placeholder: 'Other Information...'
    } );

    var logo = editor.createWidget( 'Group', {
        label : 'Logo',
        opened: false
    } );

    logo.createWidget( 'Add logo', 'FilePicker', {
        model : cardLogo,
        text  : 'Upload logo',
        selectEvent: 'uploadLogoEvent',
        cancelEvent: 'cancelLogoEvent',
    } );
} );

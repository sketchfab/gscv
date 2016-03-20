/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            initColorsCard: false,
            initColorsText: false,
            radius : 10,
            width : 550,
            height : 300,
            pictureUrl :'profil.jpg',
            pictureSize: 100,
            pictureRadius:5,
            pictureScale:70,
            pictureOffset: 60,
            name:'Clément Delaunay',
            job: 'Développeur Web',
            email : 'clem.delaunay@gmail.com',
            website : 'http://clement.io',
            phone : '+336 87 25 09 44',
            nameFontSize:16,
            jobFontSize:16,
            contactFontSize: 16,
            pictureBackgroundUrl : '',
            backgroundColor: {rgb: {r: 44, g: 44, b: 44}, hex:'#2C2C2C'},
            textColor: {rgb: {r: 255, g: 255, b: 255}, hex:'#FFFFFF'},
            fontFamily: 'Lato'
        }

    } );

    var PanelView = Backbone.View.extend( {
        events: {
            'click .color-widget .colorCard' : 'initColorsCard',
            'click .color-widget .colorText' : 'initColorsText'
        },
        initColorsCard: function(){
            if(!this.model.get( 'initColorsCard' )) this.model.set( 'initColorsCard', true);
        },
        initColorsText: function(){
            if(!this.model.get( 'initColorsText' )) this.model.set( 'initColorsText', true);
        }
    })

    var CardView = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:width', this.onWidthChange, this );
            this.model.on( 'change:height', this.onHeightChange, this );
            this.model.on( 'change:pictureRadius', this.onPictureRadiusChange, this );
            this.model.on( 'change:pictureScale', this.onPictureScaleChange, this );
            this.model.on( 'change:name', this.onNameChange, this );
            this.model.on( 'change:job', this.onJobChange, this );
            this.model.on( 'change:email', this.onEmailChange, this );
            this.model.on( 'change:website', this.onWebsiteChange, this );
            this.model.on( 'change:phone', this.onPhoneChange, this );
            this.model.on( 'change:nameFontSize', this.onNameFontSizeChange, this );
            this.model.on( 'change:jobFontSize', this.onJobFontSizeChange, this );
            this.model.on( 'change:contactFontSize', this.onContactFontSizeChange, this );
            this.model.on( 'profilPictureUpload', this.onProfilePictureUrlChange, this );
            this.model.on( 'backgroundPictureUpload', this.onBackgroundPictureUrlChange, this );
            this.model.on( 'change:initColorsCard', this.onBackgroundColorChange, this );
            this.model.on( 'change:initColorsText', this.onTextColorChange, this );
            this.model.on( 'change:backgroundColor', this.onBackgroundColorChange, this );
            this.model.on( 'change:textColor', this.onTextColorChange, this );
            this.model.on( 'change:fontFamily', this.onFontFamilyChange, this );
            this.render();
        },

        render : function ( ) {
            this.onRadiusChange();
            this.onProfilePictureUrlChange();
            this.onPictureRadiusChange();
            this.onPictureScaleChange();

            this.onNameChange();
            this.onJobChange();
            this.onEmailChange();
            this.onWebsiteChange();
            this.onPhoneChange();
        },

        onRadiusChange : function ( ){
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        }, 
        onBackgroundColorChange: function ( ){
            var newColor = this.model.get( 'backgroundColor' );
            this.$el.css( 'background-image', '' );
            if(this.model.get( 'initColorsCard' )) this.$el.css( 'background-color', newColor.hex );
            else this.$el.css( 'background-color', '#2C2C2C');
        }, 
        onTextColorChange: function ( ){
            var newColor = this.model.get( 'textColor' );
            if(this.model.get( 'initColorsText' )) this.$el.css( 'color', newColor.hex );
            else this.$el.css( 'color', '#FFFFFF');
        }, 
        onWidthChange : function ( ){
            this.$el.css( 'width', this.model.get( 'width' ) );
            this.onPictureScaleChange();
        },
        onHeightChange : function ( ){
            this.$el.css( 'height', this.model.get( 'height' ) );
            this.onPictureScaleChange();
        },
        onProfilePictureUrlChange : function ( file ){
            if( file != undefined ) this.model.set( 'pictureUrl', URL.createObjectURL( file ));
            this.$('.picture').css( 'background-image', 'url(\'' + this.model.get( 'pictureUrl' ) + '\')' );
        },
        onBackgroundPictureUrlChange : function ( file ){
           if( file != undefined ) this.model.set( 'pictureBackgroundUrl', URL.createObjectURL( file ));
           this.$el.css( 'background-image', 'url(\'' + this.model.get( 'pictureBackgroundUrl' ) + '\')' );
        },
        onPictureRadiusChange : function ( ){
            this.$('.picture').css( 'border-radius', this.model.get( 'pictureRadius' ) );
        },
        onNameChange : function ( ){
            this.$('.name').text( this.model.get( 'name' ) );
        },
        onJobChange : function ( ){
            this.$('.job').text( this.model.get( 'job' ) );
        },
        onEmailChange : function ( ){
            this.$('.email').text( this.model.get( 'email' ) );
        },
        onWebsiteChange : function ( ){
            this.$('.website').text( this.model.get( 'website' ) );
        },
        onPhoneChange : function ( ){
            this.$('.phone').text( this.model.get( 'phone' ) );
        },
        onNameFontSizeChange : function ( ){
            this.$('.informations div:first-child()').css( 'font-size', this.model.get( 'nameFontSize' ) );
        },
        onJobFontSizeChange : function ( ){
            this.$('.informations div:last-child()').css( 'font-size', this.model.get( 'jobFontSize' ) );
        },
        onContactFontSizeChange : function ( ){
            this.$('.contact').css( 'font-size', this.model.get( 'contactFontSize' ) );
        },
        onFontFamilyChange : function ( ){
           this.$el.css( 'font-family', this.model.get( 'fontFamily' ) );
        },
        onPictureScaleChange: function ( ){
            var newSize = parseInt(this.model.get( 'pictureSize' ))+this.model.get( 'pictureScale' ),
                offset = this.model.get( 'pictureOffset' );

            var spaceHeight = this.model.get( 'height' ),
                spaceWidth = this.model.get( 'width' )-(this.$('.informations').css( 'width' ).replace('px','')),
                fixedSize;

            if(newSize >= spaceWidth ){
                this.$('.picture').css( 'width',  spaceWidth-offset );
                this.$('.picture').css( 'height', spaceWidth-offset );
            }
            else if(newSize >= spaceHeight ){
                this.$('.picture').css( 'width',  spaceHeight-offset );
                this.$('.picture').css( 'height', spaceHeight-offset );
            }
            else{
                this.$('.picture').css( 'width',  newSize-offset );
                this.$('.picture').css( 'height', newSize-offset );
            }
        }

    } );

    // --- --- --- --- --- --- --- --- ---

    var card = new Card( );
    var cardView = new CardView( { model : card, el : $( '.card' ) } );

    var panelView = new PanelView( { model: card, el : $('.editor') } );

    cardView.render( );

    // --- --- --- --- --- --- --- --- ---

    var cardAppearance = editor.createWidget( 'Group', {
        label : 'Card Appearance'
    } );

    cardAppearance.createWidget( 'Border radius', 'NumberedSlider', {
        model : card,
        name  : 'radius'
    } );

    cardAppearance.createWidget( 'Card width', 'NumberedSlider', {
        model : card,
        name  : 'width',
        maximum: 600,
        minimum:450
    } );

    cardAppearance.createWidget( 'Card height', 'NumberedSlider', {
        model : card,
        name  : 'height',
        maximum: 400,
        minimum:200
    } );

    cardAppearance.createWidget( 'Upload a background picture', 'FilePicker', {
        model : card,
        name  : 'pictureBackgroundUrl',
        text: 'Choose picture',
        selectEvent: 'backgroundPictureUpload'
    } );

    cardAppearance.createWidget( 'Or pick a background color', 'Color', {
        model : card,
        name  : 'backgroundColor',
        cssClass : 'colorCard'
    } );

    var pictureAppearance = editor.createWidget( 'Group', {
        label : 'Profile Picture Appearance'
    } );

    pictureAppearance.createWidget( 'Upload a picture', 'FilePicker', {
        model : card,
        name  : 'pictureUrl',
        text: 'Choose picture',
        selectEvent: 'profilPictureUpload'
    } );

    pictureAppearance.createWidget( 'Picture size', 'NumberedSlider', {
        model : card,
        name  : 'pictureScale',
        maximum: 150
    } );

    pictureAppearance.createWidget( 'Picture border radius', 'NumberedSlider', {
        model : card,
        name  : 'pictureRadius',
        maximum: 150
    } );

    var informationsAppearance = editor.createWidget( 'Group', {
        label : 'Informations Block Appearance'
    } );

    informationsAppearance.createWidget( '', 'Input', {
        model : card,
        name  : 'name',
        placeholder : 'Full Name'
    } );

    informationsAppearance.createWidget( 'Font Size', 'NumberedSlider', {
        model : card,
        name  : 'nameFontSize',
        maximum: 30
    } );

    informationsAppearance.createWidget( '', 'Input', {
        model : card,
        name  : 'job',
        placeholder : 'Job'
    } );

    informationsAppearance.createWidget( 'Font Size', 'NumberedSlider', {
        model : card,
        name  : 'jobFontSize',
        maximum: 30
    } );

    var contactAppearance = editor.createWidget( 'Group', {
        label : 'Contact Block Appearance'
    } );

    contactAppearance.createWidget( '', 'Input', {
        model : card,
        name  : 'email',
        placeholder : 'Email'
    } );

    contactAppearance.createWidget( '', 'Input', {
        model : card,
        name  : 'website',
        placeholder : 'Website'
    } );

    contactAppearance.createWidget( '', 'Input', {
        model : card,
        name  : 'phone',
        placeholder : 'Phone'
    } );

    contactAppearance.createWidget( 'Font Size', 'NumberedSlider', {
        model : card,
        name  : 'contactFontSize',
        maximum: 30
    } );

    var textAppearance = editor.createWidget( 'Group', {
        label : 'Global Text Appearance'
    } );

    textAppearance.createWidget( 'Font Family', 'Select', {
        model : card,
        name  : 'fontFamily',
        placeholder : 'Font Family',
        options : ['Lato', 'Montserrat', 'Raleway', 'Lora']
    } );

    textAppearance.createWidget( 'Text Color', 'Color', {
        model : card,
        name  : 'textColor',
        cssClass : 'colorText'
    } );

} );

/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
            width : 550,
            height : 300,
            pictureUrl :'profil.jpg',
            pictureSize: 100,
            pictureRadius:5,
            pictureScale:70,
            pictureOffset: 60,
            name:"",
            job: "",
            nameFontSize:16,
            jobFontSize:16
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:width', this.onWidthChange, this );
            this.model.on( 'change:height', this.onHeightChange, this );
            this.model.on( 'change:pictureRadius', this.onPictureRadiusChange, this );
            this.model.on( 'change:pictureScale', this.onPictureScaleChange, this );
            this.model.on( 'change:name', this.onNameChange, this );
            this.model.on( 'change:job', this.onJobChange, this );
            this.model.on( 'change:nameFontSize', this.onNameFontSizeChange, this );
            this.model.on( 'change:jobFontSize', this.onJobFontSizeChange, this );
            this.model.on( 'uploadSelectEvent', this.onPictureUrlChange, this );
            this.render();
        },

        render : function ( ) {
            this.onRadiusChange();
            this.onPictureUrlChange();
            this.onPictureRadiusChange();
            this.onPictureScaleChange();
        },

        onRadiusChange : function ( ){
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        }, 
        onWidthChange : function ( ){
            this.$el.css( 'width', this.model.get( 'width' ) );
            this.onPictureScaleChange();
        },
        onHeightChange : function ( ){
            this.$el.css( 'height', this.model.get( 'height' ) );
            this.onPictureScaleChange();
        },
        onPictureUrlChange : function ( file ){
            if( file != undefined ) this.model.set( 'pictureUrl', URL.createObjectURL( file ));
            this.$('.picture').css( 'background-image', 'url(\'' + this.model.get( 'pictureUrl' ) + '\')' );
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
        onNameFontSizeChange : function ( element ){
            this.$('.informations div:first-child()').css( 'font-size', this.model.get( 'nameFontSize' ) );
        },
        onJobFontSizeChange : function ( element ){
            this.$('.informations div:last-child()').css( 'font-size', this.model.get( 'jobFontSize' ) );
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
    var cardView = new View( { model : card, el : $( '.card' ) } );

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
        text: 'Choose picture'
    } );

    cardAppearance.createWidget( 'Or pick a background color', 'Color', {
        model : card,
        name  : 'backgroundColor'
    } );

    var pictureAppearance = editor.createWidget( 'Group', {
        label : 'Profile Picture Appearance'
    } );

    pictureAppearance.createWidget( 'Upload a picture', 'FilePicker', {
        model : card,
        name  : 'pictureUrl',
        text: 'Choose picture'
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
        name  : 'jobFontSize',
        placeholder : 'Font Family',
        options : ['Lato', 'Montserrat', 'Raleway', 'Lora']
    } );

    textAppearance.createWidget( 'Text Color', 'Color', {
        model : card,
        name  : 'textColor'
    } );



} );

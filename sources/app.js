/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
            initializeBackgroundColor: false,

            initializeFontDetailsColor: false,
            name:'Matthieu Moreau',
            job: 'Développeur Web',
            phone : '+33 (0) 651 105 000',
            email : 'hello@matthieumoreau.com',

            nameFontSize: 20, 
            jobFontSize: 15,
            phoneFontSize: 13, 
            emailFontSize: 13,
        }

    } );

    var CardView = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );

            this.model.on( 'change:backgroundColor', this.onBackgroundColorChange, this );
            this.model.on( 'change:detailsFontColor', this.onDetailsFontColorChange, this );

            this.model.on( 'change:name', this.onNameChange, this );
            this.model.on( 'change:nameFontSize', this.onNameFontSizeChange, this );
            this.model.on( 'change:job', this.onJobChange, this );
            this.model.on( 'change:jobFontSize', this.onJobFontSizeChange, this );
            this.model.on( 'change:phone', this.onPhoneChange, this );
            this.model.on( 'change:phoneFontSize', this.onPhoneFontSizeChange, this );
            this.model.on( 'change:email', this.onEmailChange, this );
            this.model.on( 'change:emailFontSize', this.onEmailFontSizeChange, this );

            this.model.on( 'uploadProfilePicture', this.onProfilePictureChange, this);


        },

        render : function ( ) {
            this.onRadiusChange( );

            this.onNameChange();
            this.onJobChange();
            this.onPhoneChange();
            this.onEmailChange();

            this.onProfilePictureChange();
        },


        /* CARD */ 

        onRadiusChange : function ( ) {
            
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onBackgroundColorChange : function ( ) {
           

            if (this.model.get( 'initializeBackgroundColor' )) {
                 this.$el.css( 'background-color', this.model.get( 'backgroundColor' ));
            } else {
                this.$el.css( 'background-color', '#000')
               
            }
        },

        /* DETAILS */ 

        onDetailsFontColorChange: function ( ){
            if (this.model.get( 'initializeFontDetailsColor' )) {
               this.$el.css( 'color', this.model.get( 'detailsFontColor' ));
            } else {
                this.$el.css( 'color', '#FFF');  
            }
        },

        onNameChange : function ( ){
            this.$('.name').text( this.model.get( 'name' ) );
        },

        onNameFontSizeChange : function ( ){
             this.$('.name').css( 'font-size', this.model.get( 'nameFontSize' ) );
        },

        onJobChange : function ( ){
            this.$('.job').text( this.model.get( 'job' ) );
        },

        onJobFontSizeChange : function ( ){
             this.$('.job').css( 'font-size', this.model.get( 'jobFontSize' ) );
        },

        onPhoneChange : function ( ){
            this.$('.phone').text( this.model.get( 'phone' ) );
        },

        onPhoneFontSizeChange : function ( ){
             this.$('.phone').css( 'font-size', this.model.get( 'phoneFontSize' ) );
        },

        onEmailChange : function ( ){
            this.$('.email').text( this.model.get( 'email' ) );
        },

        onEmailFontSizeChange : function ( ){
             this.$('.email').css( 'font-size', this.model.get( 'emailFontSize' ) );
        },

        onProfilePictureChange : function ( file ){
            if( file != undefined ) {
                this.model.set( 'profilePicture', URL.createObjectURL( file ));
                this.$('.profile-picture').css( 'background-image', 'url(\'' + this.model.get( 'profilePicture' ) + '\')' );
            } else {
                this.$('.profile-picture').css( 'background-image', 'url("http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/user-male-icon.png")');

            }
        }
        

    } );

    var EditorView =  Backbone.View.extend( {

         events: {
            'click .backgroundColorPicker' : 'initializeBackgroundColor',
            'click .fontDetailsColorPicker' : 'initializeFontDetailsColor',
        },

        initializeBackgroundColor : function ( ) {
            if(!this.model.get( 'initializeBackgroundColor' )) {
                this.model.set( 'initializeBackgroundColor', true)
            };
        },

        initializeFontDetailsColor : function ( ) {
            if(!this.model.get( 'initializeFontDetailsColor' )) {
                this.model.set( 'initializeFontDetailsColor', true)
            };
        }
    } );

    // --- --- --- --- --- --- --- --- ---
    var card = new Card( );

    var cardView = new CardView( { model : card, el : $( '.card' ) } );
    cardView.render( );

    var editorView = new EditorView( { model: card, el : $('.editor') } );

    // --- --- --- --- --- --- --- --- ---

    
    /* CARD */

     var cardAppearance = editor.createWidget( 'Group', {
          label : 'Card style'
      } );
    
    
    cardAppearance.createWidget( 'Border radius', 'NumberedSlider', {
        model : card,
        name  : 'radius'
    } );

    cardAppearance.createWidget( 'Background color', 'Color', {
        model : card,
        name  : 'backgroundColor',
        class : 'backgroundColorPicker'
    } );

    /* DETAILS */ 

    var detailsAppearance = editor.createWidget( 'Group', {
        label : 'Card details'
    } );

    detailsAppearance.createWidget( 'Font color', 'Color', {
        model : card,
        name  : 'detailsFontColor',
        class : 'fontDetailsColorPicker'

    } );


        /* FULL NAME */

    detailsAppearance.createWidget( 'Full name', 'Input', {
        model : card,
        name  : 'name'
    } );

    detailsAppearance.createWidget( 'Full name - font size', 'NumberedSlider', {
        model : card,
        name  : 'nameFontSize'
    } );
    
        /* JOB */

    detailsAppearance.createWidget( 'Job', 'Input', {
        model : card,
        name  : 'job',
    } );

    detailsAppearance.createWidget( 'Job - font size', 'NumberedSlider', {
        model : card,
        name  : 'jobFontSize'
    } );

        /* PHONE */

    detailsAppearance.createWidget( 'Phone Number', 'Input', {
        model : card,
        name  : 'phone',
    } );

    detailsAppearance.createWidget( 'Phone - font size', 'NumberedSlider', {
        model : card,
        name  : 'phoneFontSize'
    } );

        /* EMAIL */ 

    detailsAppearance.createWidget( 'Email', 'Input', {
        model : card,
        name  : 'email',
    } );

    detailsAppearance.createWidget( 'Email - font size', 'NumberedSlider', {
        model : card,
        name  : 'emailFontSize'
    } );


    /* PICTURE */

    var pictureAppearance = editor.createWidget( 'Group', {
        label : 'Picture'
    } );

    pictureAppearance.createWidget( '', 'FilePicker', {
        model : card,
        name  : 'picture',
        text: 'Choose a profile picture',
        selectEvent: 'uploadProfilePicture'
    } );



} );

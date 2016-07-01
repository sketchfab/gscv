/*global define*/

define( [
    'vendors/Backbone',
    'vendors/JQuery',

    'editor'
], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            firstName: 'Jérémy',
            firstNameTop: '0',
            firstNameLeft: '0',

            lastName: 'Philippe',
            lastNameTop: '10',
            lastNameLeft: '50',

            job: 'Front-end developer',
            jobTop: '25',
            jobLeft: '30',

            company: 'Sketchfab',
            companyTop: '50',
            companyLeft: '50',

            textColor: '#000000',
            backgroundColor: '#000022',

            border: "0px solid transparent",
            radius : 10,
            picture: "url('https://zombiesruineverything.files.wordpress.com/2014/01/fifth6.jpg')",
        }
    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:border', this.onBorderChange, this );
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:firstName', this.onFirstNameChange, this );
            this.model.on( 'change:firstNameTop', this.onFirstNameTopChange, this );
            this.model.on( 'change:firstNameLeft', this.onFirstNameLeftChange, this );

            this.model.on( 'change:lastName', this.onLastNameChange, this );
            this.model.on( 'change:lastNameTop', this.onLastNameTopChange, this );
            this.model.on( 'change:lastNameLeft', this.onLastNameLeftChange, this );

            this.model.on( 'change:job', this.onJobChange, this );
            this.model.on( 'change:jobTop', this.onJobTopChange, this );
            this.model.on( 'change:jobLeft', this.onJobLeftChange, this );

            this.model.on( 'change:company', this.onCompanyChange, this );
            this.model.on( 'change:companyTop', this.onCompanyTopChange, this );
            this.model.on( 'change:companyLeft', this.onCompanyLeftChange, this );

            this.model.on( 'change:textColor', this.onTextColorChange, this );
            this.model.on( 'change:backgroundColor', this.onBackgroundColorChange, this );
            this.model.on( 'change:picture', this.onPictureChange, this );
        },

        render : function ( ) {
            this.onBorderChange(  );
            this.onRadiusChange( );
            this.onFirstNameChange( );
            this.onFirstNameTopChange( );
            this.onFirstNameLeftChange( );

            this.onLastNameChange( );
            this.onLastNameTopChange( );
            this.onLastNameLeftChange( );

            this.onJobChange( );
            this.onJobTopChange( );
            this.onJobLeftChange( );

            this.onCompanyChange( );
            this.onCompanyTopChange( );
            this.onCompanyLeftChange( );

            this.onTextColorChange( );
            this.onBackgroundColorChange( );
            // this.onPictureChange( );
        },

        onBorderChange: function(  ){
            this.$el.css('border', this.model.get('border'));
        },

        onRadiusChange: function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onTextColorChange: function(){
            this.$el.find('.firstName').css('color', this.model.get('textColor'));
            this.$el.find('.lastName').css('color', this.model.get('textColor'));
            this.$el.find('.job').css('color', this.model.get('textColor'));
            this.$el.find('.company').css('color', this.model.get('textColor'));
        },

        onBackgroundColorChange: function(){
            this.$el.css('background-color', this.model.get('backgroundColor'));
        },

        onFirstNameChange: function(){
            this.$el.find('.firstName').html(this.model.get('firstName'));
        },

        onFirstNameTopChange: function(){
            this.$el.find('.firstName').css('top', this.model.get('firstNameTop') + 'px');
        },

        onFirstNameLeftChange: function(){
            this.$el.find('.firstName').css('left', this.model.get('firstNameLeft') + 'px');
        },

        onLastNameChange: function(){
            this.$el.find('.lastName').html(this.model.get('lastName'));
        },

        onLastNameTopChange: function(){
            this.$el.find('.lastName').css('top', this.model.get('lastNameTop') + 'px');
        },

        onLastNameLeftChange: function(){
            this.$el.find('.lastName').css('left', this.model.get('lastNameLeft') + 'px');
        },

        onJobChange: function(){
            this.$el.find('.job').html(this.model.get('job'));
        },

        onJobTopChange: function(){
            this.$el.find('.job').css('top', this.model.get('jobTop') + 'px');
        },

        onJobLeftChange: function(){
            this.$el.find('.job').css('left', this.model.get('jobLeft') + 'px');
        },


        onCompanyChange: function(){
            this.$el.find('.company').html(this.model.get('company'));
        },

        onCompanyTopChange: function(){
            this.$el.find('.company').css('top', this.model.get('companyTop') + 'px');
        },

        onCompanyLeftChange: function(){
            this.$el.find('.company').css('top', this.model.get('companyLeft') + 'px');
        },
        //Doesn't work
        // onPictureChange: function(){
        //     this.$el.find('.picture').css('background-image', 'url(' + this.model.get('picture') + ')');
        // }

    } );

    // --- --- --- --- --- --- --- --- ---

    var card = new Card( );
    var view = new View( { model : card, el : $( '.card' ) } );

    view.render( );

    // --- --- --- --- --- --- --- --- ---


    /*   Appearance Widgets   */
    var appearance = editor.createWidget( 'Group', {
        label : 'Card Appearance'
    } );

    appearance.createWidget(' Border (width, material, color)', 'Input', {
        model: card,
        name: 'border'
    });

    appearance.createWidget( 'Border radius', 'NumberedSlider', {
        model : card,
        name  : 'radius'
    } );

    appearance.createWidget('Text Color', 'Color', {
        model: card,
        name: 'textColor'
    });

    appearance.createWidget('Background Color', 'Color', {
        model: card,
        name: 'backgroundColor'
    });


    //Position Widgets
    var position = editor.createWidget( 'Group', {
        label: 'Elements Position'
    });

    position.createWidget('FirstName Top Position', 'Number', {
        model: card,
        name: 'firstNameTop'
    });

    position.createWidget('FirstName Left Position', 'Number', {
        model: card,
        name: 'firstNameLeft'
    });

    position.createWidget('LastName Top Position', 'Number', {
        model: card,
        name: 'lastNameTop'
    });

    position.createWidget('LastName Left Position', 'Number', {
        model: card,
        name: 'lastNameTop'
    });

    position.createWidget('Job Top Position', 'Number', {
        model: card,
        name: 'jobTop'
    });

    position.createWidget('Job Left Position', 'Number', {
        model: card,
        name: 'jobLeft'
    });

    position.createWidget('Company Top Position', 'Number', {
        model: card,
        name: 'companyTop'
    });

    position.createWidget('Company Left Position', 'Number', {
        model: card,
        name: 'companyLeft'
    });

    /*    Content Widgets      */
    var content = editor.createWidget( 'Group', {
        label: 'Card Content'
    });

    content.createWidget( 'Prénom', 'Input',{
        model: card,
        name: 'firstName'
    });

    content.createWidget( 'Nom', 'Input',{
        model: card,
        name: 'lastName'
    });

    content.createWidget( 'Poste', 'Input',{
        model: card,
        name: 'job'
    });

    content.createWidget( 'Entreprise', 'Input',{
        model: card,
        name: 'company'
    });
    // content.createWidget('Image', 'FilePicker',{
    //     model: card,
    //     name: 'pic'
    // });

} );

/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,

            name:'Matthieu Moreau',
            job: 'Développeur Web',
            phone : '+33 (0) 651 105 000',
            email : 'hello@matthieumoreau.com'
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:name', this.onNameChange, this );
            this.model.on( 'change:job', this.onJobChange, this );
            this.model.on( 'change:phone', this.onPhoneChange, this );
            this.model.on( 'change:email', this.onEmailChange, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
            
            this.onNameChange();
            this.onJobChange();
            this.onPhoneChange();
            this.onEmailChange();
            

        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onNameChange : function ( ){
            this.$('.name').text( this.model.get( 'name' ) );
        },

        onJobChange : function ( ){
            this.$('.job').text( this.model.get( 'job' ) );
        },

        onPhoneChange : function ( ){
            this.$('.phone').text( this.model.get( 'phone' ) );
        },

        onEmailChange : function ( ){
            this.$('.email').text( this.model.get( 'email' ) );
        },

    } );

    // --- --- --- --- --- --- --- --- ---

    var card = new Card( );
    var view = new View( { model : card, el : $( '.card' ) } );

    view.render( );

    // --- --- --- --- --- --- --- --- ---

    
    /* CARD */

     var cardAppearance = editor.createWidget( 'Group', {
          label : 'Card style'
      } );
    
    
    cardAppearance.createWidget( 'Border radius', 'NumberedSlider', {
        model : card,
        name  : 'radius'
    } );

    /* DETAILS */ 

     var detailsAppearance = editor.createWidget( 'Group', {
          label : 'Card details'
      } );

    detailsAppearance.createWidget( 'Name', 'Input', {
        model : card,
        name  : 'name'
    } );

    detailsAppearance.createWidget( 'Job', 'Input', {
        model : card,
        name  : 'job',
    } );

    detailsAppearance.createWidget( 'Phone', 'Input', {
        model : card,
        name  : 'phone',
    } );

    detailsAppearance.createWidget( 'Email', 'Input', {
        model : card,
        name  : 'email',
    } );


    /* PICTURE */

    var PictureAppearance = editor.createWidget( 'Group', {
        label : 'Picture'
    } );

} );

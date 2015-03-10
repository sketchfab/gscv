/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {

            this.model.on( 'change:radius',         this.onRadiusChange, this );
            this.model.on( 'change:color',          this.onBGColorChange, this );
            this.model.on( 'change:orientation',    this.onOrientationChange, this );
            this.model.on( 'change:background',     this.onBackgroundImageChange, this );
            this.model.on( 'change:avatar',         this.onAvatarChange, this );

            this.model.on( 'change:name',           this.onNameChange, this );
            this.model.on( 'change:job',            this.onJobChange, this );
            this.model.on( 'change:description',    this.onDescriptionChange, this );
            this.model.on( 'change:phone',          this.onPhoneChange, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
        },

        onAvatarChange: function () {
            this.$el.find('.avatar').css( 'background-image', 'url(' + this.model.get('avatar') + ')');
        },

        onPhoneChange: function () {
            this.$el.find('.phone').text(this.model.get('phone').text);
            this.$el.find('.phone').css('font-size', this.model.get('phone').fontSize);
            this.$el.find('.phone').css('transform', 'translate(' + this.model.get('phone').x + 'px,' + this.model.get('phone').y + 'px)');
        },

        onNameChange: function () {
            this.$el.find('.name').text(this.model.get('name').text);
            this.$el.find('.name').css('font-size', this.model.get('name').fontSize);
            this.$el.find('.name').css('transform', 'translate(' + this.model.get('name').x + 'px,' + this.model.get('name').y + 'px)');
        },

        onJobChange: function () {
            this.$el.find('.job').text(this.model.get('job').text);
            this.$el.find('.job').css('font-size', this.model.get('job').fontSize);
            this.$el.find('.job').css('transform', 'translate(' + this.model.get('job').x + 'px,' + this.model.get('job').y + 'px)');
        },

        onDescriptionChange: function () {
            this.$el.find('.description').text(this.model.get('description').text);
            this.$el.find('.description').css('font-size', this.model.get('description').fontSize);
            this.$el.find('.description').css('transform', 'translate(' + this.model.get('description').x + 'px,' + this.model.get('description').y + 'px)');
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onBGColorChange : function ( ) {
            this.$el.css( 'background-color', this.model.get('color') );
        },

        onOrientationChange : function ( ) {
            this.$el.css( 'transform', 'rotate(' + this.model.get('orientation') + 'deg)' );
        },

        onBackgroundImageChange : function ( ) {
            this.$el.css( 'background-image', 'url(' + this.model.get('background') + ')');
        }

    } );

    // --- --- --- --- --- --- --- --- ---

    var card = new Card( );
    var view = new View( { model : card, el : $( '.card' ) } );

    view.render( );

    // --- --- --- --- --- --- --- --- ---

    var cardSettings = editor.createWidget( 'Group', {
        label : 'Card Settings'
    } );

    cardSettings.createWidget( 'Border radius', 'NumberedSlider', {
        model : card,
        name  : 'radius'
    } );

    cardSettings.createWidget( 'Upload Image', 'Background', {
        model       : card,
        name        : 'background'
    } );

    cardSettings.createWidget( 'Avatar', 'Avatar', {
        model : card,
        name  : 'avatar'
    } );

    cardSettings.createWidget( 'Background color', 'Color', {
        model : card,
        name  : 'color'
    } );


    var textSettings = editor.createWidget( 'Group', {
        label : 'Text Settings'
    } );

    textSettings.createWidget( 'Name', 'TextInfo', {
        model       : card,
        name        : 'name',
        text        : 'Alex',
        fontSize    : 90,
        x           : 155,
        y           : 0
    } );

    textSettings.createWidget( 'Job', 'TextInfo', {
        model       : card,
        name        : 'job',
        text        : 'Super Developer',
        fontSize    : 20,
        x           : 0,
        y           : 110
    } );

    textSettings.createWidget( 'Description', 'TextInfo', {
        model       : card,
        name        : 'description',
        text        : 'I build things...',
        fontSize    : 15,
        x           : 0,
        y           : 135
    } );

    textSettings.createWidget( 'Phone', 'TextInfo', {
        model       : card,
        name        : 'phone',
        text        : '02 38 41 09 13',
        fontSize    : 10,
        x           : 0,
        y           : 260
    } );

    var cardPreview = editor.createWidget( 'Group', {
        label : 'Card Preview'
    } );

    cardPreview.createWidget( 'Orientation', 'Orientation', {
        model : card,
        name  : 'orientation'
    } );

    var cardSave = editor.createWidget( 'Group', {
        label : 'Card Save/Load'
    } );

    cardSave.createWidget( 'Load', 'Load', {
        model   : card,
        name    : 'load'
    } );

    cardSave.createWidget( 'Save', 'Save', {
        model   : card,
        name    : 'save'
    } );
} );

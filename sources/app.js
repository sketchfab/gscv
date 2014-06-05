/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
            posNameTop: 80,
            posNameLeft: 20,
            posProfTop: 110,
            posProfLeft: 20,
            posImageTop: 20,
            posImageLeft: 20,
            imageWidth: 80,
            FontSizeName: 14,
            FontSizeJob: 14,
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:color', this.onColorChange, this );
            this.model.on( 'change:name', this.onNameChange, this );
            this.model.on( 'change:posNameTop', this.onPosNameTopChange, this );
            this.model.on( 'change:posNameLeft', this.onPosNameLeftChange, this );
            this.model.on( 'change:posProfTop', this.onPosProfTopChange, this );
            this.model.on( 'change:posProfLeft', this.onPosProfLeftChange, this );
            this.model.on( 'change:posImageTop', this.onPosImageTopChange, this );
            this.model.on( 'change:posImageLeft', this.onPosImageLeftChange, this );
            this.model.on( 'change:job', this.onJobChange, this );
            this.model.on( 'change:image', this.onImageChange, this );
            this.model.on( 'change:NameTextStyle', this.onNameTextStyleChange, this );
            this.model.on( 'change:JobTextStyle', this.onJobTextStyleChange, this );
            this.model.on( 'change:imageWidth', this.onImageWidthChange, this );
            this.model.on( 'change:FontSizeName', this.onFontSizeNameChange, this );
            this.model.on( 'change:FontSizeJob', this.onFontSizeJobChange, this );
            this.model.on( 'change:TextColorName', this.onTextColorNameChange, this );
            this.model.on( 'change:TextColorJob', this.onTextColorJobChange, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onColorChange
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },
        onColorChange: function( ){
            this.$el.css( 'background-color', this.model.get( 'color' ));
        },
        onNameChange: function( ){
            name.html(this.model.get( 'name' ));
        },
        onJobChange: function( ){
            job.html(this.model.get( 'job' ));
        },
        onImageChange: function( ){
            image.attr("src",this.model.get( 'image' ));
        },
        onPosNameTopChange: function( ){
            name.css({'top' : this.model.get( 'posNameTop' ) });
        },
        onPosNameLeftChange: function( ){
            name.css({'left' : this.model.get( 'posNameLeft' ) });
        },
        onPosProfTopChange: function( ){
            job.css({'top' : this.model.get( 'posProfTop' ) });
        },
        onPosProfLeftChange: function( ){
            job.css({'left' : this.model.get( 'posProfLeft' ) });
        },
        onPosImageTopChange: function( ){
            image.css({'top' : this.model.get( 'posImageTop' ) });
        },
        onPosImageLeftChange: function( ){
            image.css({'left' : this.model.get( 'posImageLeft' ) });
        },
        onNameTextStyleChange: function( ){
            var style = this.model.get( 'NameTextStyle' )
            switch(style){
                case 'regular': 
                    name.css({
                        'font-style' : 'normal',
                        'font-weight': '300'
                    });
                break;
                case 'italic':
                    name.css({
                        'font-style' : 'italic',
                        'font-weight': '300'
                    });
                break;
                case 'bold':
                    name.css({
                        'font-style' : 'normal',
                        'font-weight': '600'
                    });
                break;
                case 'boldItalic':
                    name.css({
                        'font-style' : 'italic',
                        'font-weight': '600'
                    });
                break;
            }
        },
        onJobTextStyleChange: function( ){
            var style = this.model.get( 'JobTextStyle' )
            switch(style){
                case 'regular': 
                    job.css({
                        'font-style' : 'normal',
                        'font-weight': '300'
                    });
                break;
                case 'italic':
                    job.css({
                        'font-style' : 'italic',
                        'font-weight': '300'
                    });
                break;
                case 'bold':
                    job.css({
                        'font-style' : 'normal',
                        'font-weight': '600'
                    });
                break;
                case 'boldItalic':
                    job.css({
                        'font-style' : 'italic',
                        'font-weight': '600'
                    });
                break;
            }
        },
        onImageWidthChange: function( ){
            image.css({'width' : this.model.get( 'imageWidth' )+ "px" });
        },
        onFontSizeNameChange: function( ){
            name.css({'font-size' : this.model.get( 'FontSizeName' )+ "px" });
        },
        onFontSizeJobChange: function( ){
            job.css({'font-size' : this.model.get( 'FontSizeJob' )+ "px" });
        },
        onTextColorNameChange: function( ){
            //name.css({'color' : this.model.get( 'TextColorName' )+ "px" });
        },
        onTextColorJobChange: function( ){
            //job.css({'color' : this.model.get( 'TextColorJob' )+ "px" });
        },




    } );

    // --- --- --- --- --- --- --- --- ---

    var card = new Card( );
    var view = new View( { model : card, el : $( '.card' ) } );

    var name    = $('#name');
    var job     = $('#job');
    var image   = $('#image');

    $('.header').on('click', function(){
        alert('couocu');
    });


    view.render( );

    // --- --- --- --- --- --- --- --- ---

    var appearance = editor.createWidget( 'Group', {
        label : 'Card Appearance'
    } );
    var content = editor.createWidget( 'Group', {
        label : 'Card Content',
        opened : false
    } );
    var textStyle = editor.createWidget( 'Group', {
        label : 'Text Style',
        opened : false
    } );
    var elementsPos = editor.createWidget( 'Group', {
        label : 'Elements offset',
        opened : false
    } );
    appearance.createWidget( 'Background color', 'Color',{
        model : card,
        name  : 'color'
    } );
    appearance.createWidget( 'Border radius', 'NumberedSlider', {
        model : card,
        name  : 'radius'
    } );
    content.createWidget( 'Image', 'UploadImage', {
        model : card,
        name  : 'image'
    } );
    content.createWidget( "Image width", 'NumberedSlider', {
        model : card,
        name  : 'imageWidth',
        minimum : 40,
        maximum : 150,
    } );
    elementsPos.createWidget( "Image offset", 'NumberedSlider', {
        model : card,
        name  : 'posImageTop',
        maximum : 280,
    } );
    elementsPos.createWidget( 'NumberedSlider', {
        model : card,
        name  : 'posImageLeft',
        maximum  : 440,
    } );
    content.createWidget( 'Name', 'InputText', {
        model : card,
        name  : 'name',
        placeholder : 'Your name'
    } );

    elementsPos.createWidget( 'Name offset', 'NumberedSlider', {
        model : card,
        name  : 'posNameTop',
        maximum : 280,
    } );
    elementsPos.createWidget( 'NumberedSlider', {
        model : card,
        name  : 'posNameLeft',
        maximum  : 440,
    } );
    content.createWidget( 'Job', 'InputText', {
        model : card,
        name  : 'job',
        placeholder : 'Your job'
    } );
    elementsPos.createWidget( 'Job offset', 'NumberedSlider', {
        model : card,
        name  : 'posProfTop',
        maximum : 280,
    } );
    elementsPos.createWidget( 'NumberedSlider', {
        model : card,
        name  : 'posProfLeft',
        maximum  : 440,
    } );
    textStyle.createWidget( 'Select a style for your name', 'Select', {
        model : card,
        name  : 'NameTextStyle',
        placeholder : 'Regular',
        options : {regular:'Regular', italic:'Italic', bold:'Bold', boldItalic:'Bold italic'},
    } );
    textStyle.createWidget( 'Font size for your name', 'NumberedSlider', {
        model : card,
        name  : 'FontSizeName',
        minimum : 8,
        maximum : 36,
    } );
    textStyle.createWidget( 'Text color for name', 'Color', {
        model : card,
        name  : 'TextColorName',
    } );
    textStyle.createWidget( 'Select a style for your job', 'Select', {
        model : card,
        name  : 'JobTextStyle',
        placeholder : 'Regular',
        options : {regular:'Regular', italic:'Italic', bold:'Bold', boldItalic:'Bold italic'},
    } );
    textStyle.createWidget( 'Font size for your job', 'NumberedSlider', {
        model : card,
        name  : 'FontSizeJob',
        minimum : 8,
        maximum : 36,
    } );
    textStyle.createWidget( 'Text color for job', 'Color', {
        model : card,
        name  : 'TextColorJob',
    } );

} );

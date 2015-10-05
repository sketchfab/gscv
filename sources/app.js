/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {
    'use strict';

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
            bgColor : '#804242',
            label : 'NOM Prénom',
            policelb : 25,
            job : 'Profession',
            policejb : 15,
            photoDefaut : 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQYT2HeYD_6ORhz1qCq_w4ZsL40my_VqaSdkyga15lWBnHYkUeDYA',
            bgDefaut : 'http://img01.deviantart.net/1b9a/i/2011/019/1/6/texture_102_by_sirius_sdz-d1rlzx7.jpg',
            switchPhoto:false,
            switchBg:false,
            photoSize : 50,
            bgSize : 100,
            switchPhoto : false,
            labelColor:'#fff',
            jobColor:'#fff',
            photoAxis:'x',
            photoAxisVal:'5'
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:bgColor', this.onColorChange, this );
            this.model.on( 'change:label', this.onLabelChange, this );
            this.model.on( 'change:policelb', this.onPolicelbChange, this );
            this.model.on( 'change:job', this.onJobChange, this );
            this.model.on( 'change:policejb', this.onPolicejbChange, this );
            this.model.on( 'uploadSelectEvent', this.onPhotoChange, this );
            this.model.on( 'uploadSelectEventBg', this.onBgChange, this );
            this.model.on( 'change:switchPhoto', this.onOptionPhotoChange, this );
            this.model.on( 'change:switchBg', this.onOptionBgChange, this );
            this.model.on( 'change:photoSize', this.onSizePhotoChange, this );
            this.model.on( 'change:bgSize', this.onSizeBgChange, this );
            this.model.on( 'change:labelColor', this.onLabelColorChange, this );
            this.model.on( 'change:jobColor', this.onJobColorChange, this );
            this.model.on( 'change:photoAxisVal', this.onPhotoAxisChange, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onColorChange( );
            this.onLabelChange( );
            this.onPolicelbChange( );
            this.onJobChange( );
            this.onPolicejbChange( );
            this.onPhotoChange( );
            this.onOptionPhotoChange( );
            this.onOptionBgChange( );
            this.onSizePhotoChange( );
            this.onSizeBgChange( );
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },
        onColorChange : function ( ) {
            var hex = this.generateHex(this.model.get( 'bgColor' ));
            this.$el.css( 'background-color', hex );
        },
        onLabelChange : function ( ) {
            this.$el.children(".name").text( this.model.get( 'label' ) );
        },
        onJobChange : function ( ) {
            this.$el.children(".job").text( this.model.get( 'job' ) );
        },
        onPolicelbChange : function ( ) {
            this.$el.children(".name").css( 'font-size', this.model.get( 'policelb' ) );
        },
        onPolicejbChange : function ( ) {
            this.$el.children(".job").css( 'font-size', this.model.get( 'policejb' ) );
        },
        onLabelColorChange : function ( ) {
            var hex = this.generateHex(this.model.get( 'labelColor' ));
             this.$el.children(".name").css( 'color', hex );
        },
        onJobColorChange : function ( ) {
            var hex = this.generateHex(this.model.get( 'jobColor' ));
             this.$el.children(".job").css( 'color', hex );
        },
        onPhotoChange : function ( photo ) {
            var image = this.$el.children(".photo");
            if(photo){
                
                var fileReader = new FileReader();
                fileReader.readAsDataURL(photo);
                fileReader.onloadend = function(e){
			
			          image.attr( 'src', e.target.result);
                    
                }
            }else{
                image.attr( 'src', this.model.get( 'photoDefaut' ) );
            }
        },
        onBgChange : function ( bg ) {
            var CardBg = this.$el;
            
            if(bg){
                var that = this;
                var fileReader = new FileReader();
                fileReader.readAsDataURL(bg);
                fileReader.onloadend = function(e){
                      that.model.set( 'bgDefaut', e.target.result );
                      that.model.set( 'switchBg', true );
			          CardBg.css( 'background-image', "url("+e.target.result+")");
                    
                }
            }else{
                CardBg.css( 'background-image', "url("+this.model.get( 'bgDefaut' )+")");
            }
        },
        onOptionPhotoChange : function ( ) {
            if(this.model.get( 'switchPhoto' )){
                this.$el.children(".photo").show();
            }else{
                this.$el.children(".photo").hide();
            }
        },
        onOptionBgChange : function ( ) {
            if(this.model.get( 'switchBg' )){
                this.onBgChange();
            }else{
                this.$el.css("background-image","none");
            }
        },
        onSizePhotoChange : function ( ) {
             this.$el.children(".photo").css( 'height', this.model.get( 'photoSize' )+"%" );
        },
        onSizeBgChange : function ( ) {
             this.$el.css( 'background-size', this.model.get( 'bgSize' )+"% auto" );
        },
        onPhotoAxisChange : function ( ) {
            $( '.card' )
            if(this.model.get( 'photoAxis' ) == 'x'){
                this.$el.children(".photo").css( 'right', this.model.get( 'photoAxisVal' )+"%" );  
            }else{
                this.$el.children(".photo").css( 'top', this.model.get( 'photoAxisVal' )+"%" );
            }
            
        },
        
        generateHex : function(rgb) {
            var rounded = {
                    r: rgb.r * 255,
                    g: rgb.g * 255,
                    b: rgb.b * 255
                };
            var hex = '#' + ( 16777216 | rounded.b | ( rounded.g << 8 ) | ( rounded.r << 16 ) ).toString( 16 ).substr( 1 );
            
            return hex;
        }

    } );

    // --- --- --- --- --- --- --- --- ---

    var card = new Card( );
    var view = new View( { model : card, el : $( '.card' ) } );

    view.render( );
    
    // --- --- --- --- --- --- --- --- ---

    var appearance = editor.createWidget( 'Group', {
        label : 'Ma carte'
    } );

    appearance.createWidget( 'Arrondie', 'NumberedSlider', {
        model : card,
        name  : 'radius'
    } );
    appearance.createWidget( 'Couleur de fond', 'Color', {
        model : card,
        name  : 'bgColor'
    } );
    var appearanceInput = editor.createWidget( 'Group', {
        label : 'Champs de saisie',
        opened : false
    } );

    appearanceInput.createWidget( '', 'Label', {
        model : card,
        name  : 'label'
    } );
    appearanceInput.createWidget( 'Taille de police nom', 'NumberedSlider', {
        model : card,
        name  : 'policelb'
    } );
    appearanceInput.createWidget( 'Couleur de police', 'Color', {
        model : card,
        name  : 'labelColor'
    } );
    appearanceInput.createWidget( '', 'Label', {
        model : card,
        name  : 'job'
    } ); 
    appearanceInput.createWidget( 'Taille de police profession', 'NumberedSlider', {
        model : card,
        name  : 'policejb'
    } );
     appearanceInput.createWidget( 'Couleur de police', 'Color', {
        model : card,
        name  : 'jobColor'
    } );
    var appearancePhoto = editor.createWidget( 'Group', {
        label : 'Photo de profil',
        name : 'photo',
        opened : false
    } );
    appearancePhoto.createWidget( '', 'ToggleSwitch', {
        model : card,
        name  : 'switchPhoto',
        label:'Afficher'
    } );
    appearancePhoto.createWidget( '', 'FilePicker', {
        model : card,
        text  : 'Parcourir'
    } );
    appearancePhoto.createWidget( 'Taille de la photo', 'NumberedSlider', {
        model : card,
        name  : 'photoSize'
    } );
    appearancePhoto.createWidget( 'Position', 'Axis', {  } );
    appearancePhoto.createWidget( '', 'NumberedSlider', {
        model : card,
        name  : 'photoAxisVal'
    } );
    
    var appearanceBg = editor.createWidget( 'Group', {
        label : 'Image de fond',
        opened : false
    } );
    appearanceBg.createWidget( '', 'ToggleSwitch', {
        model : card,
        name  : 'switchBg',
        label:'Afficher'
    } );
    appearanceBg.createWidget( '', 'FilePicker', {
        model : card,
        text  : 'Parcourir',
        action:'bg'
    } );
    appearanceBg.createWidget( 'Taille de la photo', 'NumberedSlider', {
        model : card,
        name  : 'bgSize',
        maximum: 200
    } );


    $(view.el).css("background-color", card.defaults.bgColor);
    $(view.el).children(".name").css("color", card.defaults.labelColor);
    $(view.el).children(".job").css("color", card.defaults.jobColor);
    
} );

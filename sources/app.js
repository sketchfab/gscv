/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            
            radius : 26,
            
			name : 'Maël Nison',
			job : 'Frontend Developer',
            phone : '06.23.45.64.98',
            mail : 'mael-nison@sketchfab.com',
            website : 'www.sketchfab.com',
            background : 'blue',
            
            logoSize : '150px',
            logoColor : '#FFFFFF',
            logoPosition : 'middle-right',
            
            textColor : '#FFFFFF',
            textSize : 23,
            textAlign : 'left',
            textPosition : 'bottom-left'
        },
        
        backgroundList : {
            
            'grey' : {
                label : 'Simple grey',
                applyTo : function ( $target ) {
                    $target.css( 'background', 'linear-gradient(180deg, #666 0%,#333 100%)' );
                }
            },
            
            'blue' : {
                label : 'Corporate',
                applyTo : function ( $target ) {
                    $target.css( 'background', 'linear-gradient(178deg, #6db3f2 0%,#1e69de 100%)' );
                }
            },
            
            'colors1' : {
                label : 'Frozen',
                applyTo : function ( $target ) {
                    
                    $target.css( 'background', 'url("img/colors-01.jpg") center' );
                    $target.css( 'background-size', 'cover' );
                }
            },
            
            'colors2' : {
                label : 'Spring',
                applyTo : function ( $target ) {
                    
                    $target.css( 'background', 'url("img/colors-02.jpg") center' );
                    $target.css( 'background-size', 'cover' );
                }
            },
            
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius',       this.onRadiusChange, this );
            this.model.on( 'change:background',   this.onBackgroundChange, this );
			this.model.on( 'change:name', 	      this.onNameChange, this );
			this.model.on( 'change:job', 	      this.onJobChange, this );
            this.model.on( 'change:phone', 	      this.onPhoneChange, this );
            this.model.on( 'change:mail', 	      this.onMailChange, this );
            this.model.on( 'change:website', 	  this.onWebsiteChange, this );
            this.model.on( 'change:logoSize', 	  this.onLogoSizeChange, this );
            this.model.on( 'change:logoColor', 	  this.onLogoColorChange, this );
            this.model.on( 'change:logoPosition', this.onLogoPositionChange, this );
           
            this.model.on( 'change:textColor', 	  this.onTextColorChange, this );
            this.model.on( 'change:textSize', 	  this.onTextSizeChange, this );
			this.model.on( 'change:textAlign', 	  this.onTextAlignChange, this );
			this.model.on( 'change:textPosition', this.onTextPositionChange, this );
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onBackgroundChange( );
            this.onNameChange( );
            this.onJobChange( );
            this.onPhoneChange( );
            this.onMailChange( );
            this.onWebsiteChange( );
            this.onLogoSizeChange( );
            this.onLogoColorChange( );
            this.onLogoPositionChange( );
            this.onTextColorChange( );
            this.onTextSizeChange( );
            this.onTextAlignChange( );
            this.onTextPositionChange( );
        },

        rgbToHex : function ( rgb ) {
            
            var rounded = {
                r: rgb.r * 255,
                g: rgb.g * 255,
                b: rgb.b * 255
            };
            return '#' + ( 16777216 | rounded.b | ( rounded.g << 8 ) | ( rounded.r << 16 ) ).toString( 16 ).substr( 1 );
        },
        
        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },
        
        onBackgroundChange : function ( ) {
            var bgID = this.model.get( 'background' );
            this.model.backgroundList[ bgID ].applyTo( this.$el );
        },
        
        onNameChange : function ( ) {
            this.$el.find( '.name' ).html( this.model.get( 'name' ) );
        },
                                    
        onJobChange : function ( ) {
            this.$el.find( '.job' ).html( this.model.get( 'job' ) );
        },
        
        onPhoneChange : function ( ) {
            this.$el.find( '.phone' ).html( this.model.get( 'phone' ) );
        },
        
        onMailChange : function ( ) {
            this.$el.find( '.mail' ).html( this.model.get( 'mail' ) );
        },
        
        onWebsiteChange : function ( ) {
            this.$el.find( '.website' ).html( this.model.get( 'website' ) );
        },
        
        onTextColorChange : function ( ) {
            
            var rgb = this.model.get( 'textColor' );
            var hex = this.rgbToHex( rgb );
            this.$el.css( 'color', hex );
        },
        
        onTextSizeChange : function ( ) {
            this.$el.find('.text').css(
                'font-size',
                this.model.get( 'textSize' ) + "px"
            );
        },
        
        onTextAlignChange : function ( ) {
            this.$el.css(
                'text-align',
                this.model.get( 'textAlign' )
            );
        },
        
        onTextPositionChange : function ( ) {
            var values = this.model.get( 'textPosition' ).split( '-' );
            var margin = [
                (values[0] === 'top') ? '0' : 'auto',
                (values[1] === 'right') ? '0' : 'auto',
                (values[0] === 'bottom') ? '0' : 'auto',
                (values[1] === 'left') ? '0' : 'auto' 
            ].join(' ');            
            
            this.$el.find( '.text' ).css( 'margin', margin );
        },
        
        onLogoSizeChange : function ( ) {
            var $logo = this.$el.find( '.logo' );
            var size = this.model.get( 'logoSize' );
            
            $logo.css( 'height', size )
                 .css( 'width', size );
            
            this.onLogoPositionChange();
        },
        
        onLogoColorChange : function ( ) {
            
            var rgb = this.model.get( 'logoColor' );
            var hex = this.rgbToHex( rgb );
            
            this.$el.find( '.logo .logo-bg' ).css( 'fill', hex );
            this.$el.find( '.logo .logo-cube' ).css( 'stroke', hex );
        },
        
        onLogoPositionChange : function ( ) {
            
            var $logo = this.$el.find( '.logo' );
            var h = $logo.height(),
                w = $logo.width();
            var margin = 50;
            var values = this.model.get( 'logoPosition' ).split( '-' );
            var hMax = this.$el.height() - 2 * margin,
                wMax = this.$el.width() - 2 * margin;
            var left = 0,
                top = 0;
            
            if (values[0] === 'top')
                top = margin;
            else if (values[0] === 'middle')
                top = margin + (hMax - h) / 2;
            else if (values[0] === 'bottom')
                top = margin + (hMax - h);
            
            if (values[1] === 'left')
                left = margin;
            else if (values[1] === 'center')
                left = margin + (wMax - w) / 2;
            else if (values[1] === 'right')
                left = margin + (wMax - w);
            
            $logo.css( 'top', top )
                 .css( 'left', left );
        }

    } );

    // --- --- --- --- --- --- --- --- ---

    var card = new Card( );
    var view = new View( { model : card, el : $( '.card' ) } );

    view.render( );

    // --- --- --- --- CARD --- --- --- --- ---

    var cardAppearance = editor.createWidget( 'Group', {
        label : 'Card Appearance'
    } );
    
    cardAppearance.createWidget( 'Border radius', 'NumberedSlider', {
        model : card,
        name  : 'radius'
    } );
    
    cardAppearance.createWidget( 'Background', 'Select', {
        model : card,
        name  : 'background',
        placeholder : 'Select background',
        options : (function( ) {
            var list = { };
            for( var id in card.backgroundList)
                list[id] = card.backgroundList[id].label;
            return list;
        })( )
    } );


    // --- --- --- --- LOGO --- --- --- --- ---

    var groupLogo = editor.createWidget( 'Group', {
        label : 'Logo'
    } );
    
    var appearanceLogo = groupLogo.createWidget( 'Horizontal', { } );
    
    appearanceLogo.createWidget( 'Color', 'Color', {
        model : card,
        name  : 'logoColor'
    } );
    
    var verticalLogo = appearanceLogo.createWidget( 'Vertical', { } );

    verticalLogo.createWidget( 'Size', 'Select', {
        model : card,
        name  : 'logoSize',
        placeholder : 'Size',
        options : {
            '50px' : 'Small',
            '100px' : 'Medium',
            '150px' : 'Large'
        }
    } );
    
    verticalLogo.createWidget( 'Position', 'Position', {
        model : card,
        name  : 'logoPosition'
    } );


    // --- --- --- --- TEXT --- --- --- --- ---

    var textAppearance = editor.createWidget( 'Group', {
        label : 'Text Appearance'
    } );
    
    textAppearance.createWidget( 'Size', 'NumberedSlider', {
        model : card,
        name  : 'textSize',
        minimum: 14,
        maximum: 40,
    } );
    
    var appearanceText1 = textAppearance.createWidget( 'Horizontal', { } );
    
    appearanceText1.createWidget( 'Color', 'Color', {
        model : card,
        name  : 'textColor'
    } );
    
    var appearanceText2 = appearanceText1.createWidget( 'Vertical', { } );

    appearanceText2.createWidget( 'Position', 'Position', {
        model : card,
        name  : 'textPosition'
    } );
    
    appearanceText2.createWidget( 'Align', 'Select', {
        model : card,
        name  : 'textAlign',
        placeholder : 'Align',
        options : {
            'left' : 'Left',
            'center' : 'Center',
            'right' : 'Right'
        }
    } );
    
    var content = editor.createWidget( 'Group', {
        label : 'Card Content'
    } );
    
    content.createWidget( 'Name', 'Text', {
        model : card,
        name  : 'name'
    } );
    
    content.createWidget( 'Job', 'Text', {
        model : card,
        name  : 'job'
    } );
    
    content.createWidget( 'Phone', 'Text', {
        model : card,
        name  : 'phone',
        attr : {
            type : 'tel'
        }
    } );
    
    content.createWidget( 'Mail', 'Text', {
        model : card,
        name  : 'mail',
        attr : {
            type : 'email'
        }
    } );
    
    content.createWidget( 'Website', 'Text', {
        model : card,
        name  : 'website',
        attr : {
            type : 'url'
        }
    } );

} );

/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor',

], function ( Backbone, $, editor ) {

    /*
    --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
    --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

                                UTILS

    --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
    --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
     */

    var Utils = {

        rgb2hex: function(red, green, blue) {
            var rgb = blue | (green << 8) | (red << 16);
            return '#' + (0x1000000 + rgb).toString(16).slice(1);
        },

        map: function( num, min1, max1, min2, max2, round ) {

            var round = round || false;

            num1 = ( num - min1 ) / ( max1 - min1 )
            num2 = ( num1 * ( max2 - min2 ) ) + min2

            if ( round ) {
                return Math.round( num2 );
            }

            return num2;

        },

        mapColor: function( _r, _g, _b ) {

            return {
                r: this.map( _r, 0, 1, 0, 255 ),
                g: this.map( _g, 0, 1, 0, 255 ),
                b: this.map( _b, 0, 1, 0, 255 ),
            }

        }

    };










    /*
    --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
    --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

                                DATA MODELS

    --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
    --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
     */
    
    // ############# POSITION MODEL ##################

    var PositionModel = Backbone.Model.extend( {

        defaults: {
            free: false,
            x: 0,
            y: 0
        }

    } );
    
    // ############# TEXT MODEL ##################

    var TextModel = Backbone.Model.extend( {

        defaults: {
            opacity: 100,
            fontSize: 16,
            bold: false,
            italic: false,
            letterSpacing: 0,
            textColor: { r: 1, g: 1, b: 1 }
        }

    } );
    
    // ############# CARD SIDE MODEL ##################
    
    var CardSideModel = Backbone.Model.extend( {

        defaults : {

            borderRadius : 10,

            backgroundColor: { r: 27, g: 169, b: 217 },
            textColor: { r: 1, g: 1, b: 1 },

            logo: {
                position: new PositionModel()
            },

            title: {
                position: new PositionModel(),
                name: new TextModel(),
                role: new TextModel()
            }

        }

    } );

    // ############# CARD  MODEL ##################
    
    var CardModel = Backbone.Model.extend( {

        defaults : {
            
            borderRadius : 10,

            front: new CardSideModel(),
            back: new CardSideModel()

        },

    } );









    
    /*
    --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
    --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

                                VIEWS

    --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---                                
    --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
     */
    
    // CARD FRONT VIEW --- --- --- --- --- --- --- --- ---
    
    var CardFrontView = Backbone.View.extend( {

        logo: null,


        initialize: function() {

            console.log(this.model);

        },


        initEvents: function() {

            this.model.on( 'change:backgroundColor', this.onBackgroundColorChange, this );

        },


        render : function () {

            this.onBackgroundColorChange();

        },


        onBackgroundColorChange: function () {

            var rgb = Utils.mapColor( this.model.get('backgroundColor').r, this.model.get('backgroundColor').g, this.model.get('backgroundColor').b );

            this.el.style.backgroundColor = Utils.rgb2hex( rgb.r, rgb.g, rgb.b );

        }

    } );

    // CARD FRONT VIEW --- --- --- --- --- --- --- --- ---
    
    var CardBackView = Backbone.View.extend( {

        style: null,

        logoView: null,
        logoViewHandler: null,

        titleView: null,
        titleViewStyle: null,
        titleViewHandler: null,
        

        nameView: null,
        nameViewStyle: null,

        roleView: null,
        roleViewStyle: null,

        selectedElement: null,
        canSelectedElementMove: false,


        initialize: function() {

            this.logoView = this.el.querySelector('.small-logo');
            this.logoViewHandler = this.logoView.querySelector('.handler');

            this.titleView = this.el.querySelector('.title');
            this.titleViewStyle = this.titleView.style;
            this.titleViewHandler = this.titleView.querySelector('.handler');

            this.nameView = this.titleView.querySelector('.name');
            this.nameViewStyle = this.nameView.style;

            this.roleView = this.titleView.querySelector('.role');
            this.roleViewStyle = this.roleView.style;

        },


        initEvents: function() {


            this.model.get('logo').position.on( 'change', this.onLogoChange, this );

            this.model.get('title').position.on( 'change', this.onTitleChange, this );
            this.model.get('title').name.on( 'change', this.onTitleChange, this );
            this.model.get('title').role.on( 'change', this.onTitleChange, this );

            // Just for colors


            $(this.logoViewHandler).on( 'mousedown', function(evt){ this.onElementMouseDown(this.logoView) }.bind(this) );
            $(this.titleViewHandler).on( 'mousedown', function(evt){ this.onElementMouseDown(this.titleView) }.bind(this) );
            $(window).on( 'mousemove', this.onElementMouseMove.bind(this) );
            $(window).on( 'mouseup', this.onElementMouseUp.bind(this) );

        },


        render : function () {

            

        },


        onTitleChange: function() {
            var r, g, b;

            // Position
            if ( this.model.get('title').position.get('free') ) {
                this.titleView.classList.add('draggable');
                this.titleView.style.position = 'absolute';
            }
            else {
                this.titleView.classList.remove('draggable');
                this.titleView.style.position = 'static';
            }
            
            r = Utils.map( this.model.get('title').name.get('textColor').r, 0, 1, 0, 255 );
            g = Utils.map( this.model.get('title').name.get('textColor').g, 0, 1, 0, 255 );
            b = Utils.map( this.model.get('title').name.get('textColor').b, 0, 1, 0, 255 );

            // Name
            this.nameViewStyle.opacity = this.model.get('title').name.get('opacity') / 100;
            this.nameViewStyle.fontSize = this.model.get('title').name.get('fontSize') + 'px';
            this.nameViewStyle.letterSpacing = this.model.get('title').name.get('letterSpacing') + 'px';
            this.nameViewStyle.fontWeight = this.model.get('title').name.get('bold') ? 'bold' : 'normal';
            this.nameViewStyle.fontStyle = this.model.get('title').name.get('italic') ? 'italic' : 'normal';
            
            if ( this.model.get('title').name.hasChanged('textColor') ) this.nameViewStyle.color = Utils.rgb2hex( r, g, b );

            r = Utils.map( this.model.get('title').role.get('textColor').r, 0, 1, 0, 255 );
            g = Utils.map( this.model.get('title').role.get('textColor').g, 0, 1, 0, 255 );
            b = Utils.map( this.model.get('title').role.get('textColor').b, 0, 1, 0, 255 );

            // Role
            this.roleViewStyle.opacity = this.model.get('title').role.get('opacity') / 100;
            this.roleViewStyle.fontSize = this.model.get('title').role.get('fontSize') + 'px';
            this.roleViewStyle.letterSpacing = this.model.get('title').role.get('letterSpacing') + 'px';
            this.roleViewStyle.fontWeight = this.model.get('title').role.get('bold') ? 'bold' : 'normal';
            this.roleViewStyle.fontStyle = this.model.get('title').role.get('italic') ? 'italic' : 'normal';
            
            if ( this.model.get('title').role.hasChanged('textColor') ) this.roleViewStyle.color = Utils.rgb2hex( r, g, b ); 

        },


        onElementMouseDown: function( el ) {

            this.canSelectedElementMove = true;

            this.selectedElement = el;

        },


        onElementMouseMove: function( evt ) {
            if ( !this.canSelectedElementMove ) return;

            var elementWidth = this.selectedElement.getBoundingClientRect().width;
            var cardOffsetX = this.el.parentNode.parentNode.offsetLeft;
            var cardContainerOffsetX = this.el.parentNode.parentNode.parentNode.offsetLeft;

            var elementHeight = this.selectedElement.getBoundingClientRect().height;
            var cardOffsetY = this.el.parentNode.parentNode.offsetTop;
            var cardContainerOffsetY = this.el.parentNode.parentNode.parentNode.offsetTop;
            var handlerHeight = 30;
            var padding = parseInt( window.getComputedStyle( this.selectedElement ).getPropertyValue('padding') ) * 2 // padding top and bottom 

            var x = evt.screenX - elementWidth - cardOffsetX - cardContainerOffsetX  ;
            var y = evt.screenY - elementHeight - cardOffsetY - cardContainerOffsetY - padding - ( handlerHeight * 1.5 ) ; 

            this.selectedElement.style.left = x + 'px';
            this.selectedElement.style.top = y + 'px';

        },


        onElementMouseUp: function( evt ) {

            this.canSelectedElementMove = false;

            this.selectedElement = null;
        }


    } );


    // CARD VIEW --- --- --- --- --- --- --- --- ---
    
    var CardView = Backbone.View.extend( {

        style: null,

        container3d: null,

        sideLabelView: null,
        sideLabelTimer: null,

        frontView: null,
        backView: null,


        initialize : function ( ) {

            // Cache style for performances
            this.style = this.el.style;

            this.container3d = this.el.querySelector('.sides-container');
            this.sideLabelView = this.el.querySelector('.side-label');

            this.frontView = new CardFrontView({ model: new CardSideModel(), el: this.el.querySelector('.front') });
            this.backView = new CardBackView({ model: new CardSideModel(), el: this.el.querySelector('.back') });

        },


        initEvents: function () {
            
            this.model.on( 'change:borderRadius', this.onRadiusChange, this );

            this.frontView.initEvents();
            this.backView.initEvents();

        },


        removeEvents: function () {
            
            this.model.off( 'change:borderRadius' );

        },


        render : function () {

            this.onRadiusChange();
            this.frontView.render();
            this.backView.render();

        },


        toggleFlip: function() {

            var label = '';

            clearTimeout( this.sideLabelTimer );

            this.container3d.classList.toggle('upsidedown');

             if ( this.container3d.classList.contains('upsidedown') ) {
                label = 'back';
                frontFolder.close().desactivate();
                backFolder.open().activate();
            }
            else {
                label = 'front';
                frontFolder.open().activate();
                backFolder.close().desactivate();
            }

            this.sideLabelView.innerHTML = label;

            if ( !this.sideLabelView.classList.contains('show') ) this.sideLabelView.classList.add('show');

            this.sideLabelTimer = setTimeout( function(){
                this.sideLabelView.classList.remove('show');
            }.bind( this ), 1200 );

            
        },


        onRadiusChange : function ( ) {

            this.frontView.el.style.borderRadius = this.frontView.el.style.webkitBorderRadius = this.model.get( 'borderRadius' ) + 'px';
            this.backView.el.style.borderRadius = this.backView.el.style.webkitBorderRadius = this.model.get( 'borderRadius' ) + 'px';

        }


    } );










    /*
    --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
    --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

                                APP

    --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---                                
    --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
     */
    
    var toggleFlip = function() {

        flipBtn.classList.toggle('upsidedown');

        cardView.toggleFlip();

    };

    var downloadCard = function() {

        var mainCanvas = document.createElement('canvas');
        var mainCtx = mainCanvas.getContext('2d');

        mainCanvas.width = 550;
        mainCanvas.height = 610;

        if ( !cardView.container3d.classList.contains('upsidedown') ) cardView.backView.el.classList.add('printMode');

        html2canvas( cardView.frontView.el , {
            onrendered: function(canvas) {
                
                mainCtx.drawImage( canvas, 0, 0 );

                html2canvas( cardView.backView.el , {
                    onrendered: function(canvas) {
                    
                        mainCtx.drawImage( canvas, 0, 310 );

                        cardView.backView.el.classList.remove('printMode');

                        var l = document.createElement("a");
                        l.download = 'sketch.png';
                        l.href = mainCanvas.toDataURL();
                        l.click();

                    }
                });

            }
        });
    }

    var cardModel = new CardModel( );
    var cardView = new CardView( { model : cardModel, el : $( '.card-container' ) } );

    var flipBtn = document.body.querySelector('.flip');
    var downloadBtn = document.body.querySelector('.download');

    flipBtn.addEventListener('click', toggleFlip.bind(this));
    downloadBtn.addEventListener('click', downloadCard.bind(this));

    cardView.render();












    /*
    --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
    --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

                                EDITOR

    --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---                                
    --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
     */
    
    // Shortcuts for better readability
    var frontModel = cardView.frontView.model;
    var backModel = cardView.backView.model;

    var appearance = editor.createWidget( 'Group', {
        label : 'Card Appearance'
    } );

    appearance.createWidget( 'Border radius', 'NumberedSlider', {
        model : cardModel,
        name  : 'borderRadius'
    } );

    // Front folder
    var frontFolder = appearance.createWidget( 'Group', { label: 'Front side' } );

    var frontFolderBackgroundColor = frontFolder.createWidget( 'Group', { label: 'Background Color' } );
    frontFolderBackgroundColor.createWidget( '', 'Color', { model : frontModel, name  : 'backgroundColor' } );
    frontFolderBackgroundColor.close();

    // Back folder
    var backFolder = appearance.createWidget( 'Group', { label: 'Back side' } );
    backFolder.close().desactivate();

    var backFolderBackgroundColor = backFolder.createWidget( 'Group', { label: 'Background Color' } );
    backFolderBackgroundColor.createWidget( '', 'Color', { model : backModel, name  : 'backgroundColor' } );
    backFolderBackgroundColor.close();

    var backFolderTitle = backFolder.createWidget( 'Group', { label: 'Title' });

    var backFolderTitlePosition = backFolderTitle.createWidget( 'Group', { label: 'Position' });
    backFolderTitlePosition.createWidget( 'ToggleSwitch', { label: 'Draggable', model : backModel.get('title').position, name: 'free' } )
    backFolderTitlePosition.close();

    var backFolderName = backFolderTitle.createWidget( 'Group', { label: 'Name' });
    backFolderName.createWidget( 'Opacity', 'NumberedSlider', { model : backModel.get('title').name, name  : 'opacity' } );
    backFolderName.createWidget( 'Font size', 'NumberedSlider', { model : backModel.get('title').name, name  : 'fontSize' } );
    backFolderName.createWidget( 'Letter spacing', 'NumberedSlider', { model : backModel.get('title').name, name  : 'letterSpacing' } );
    backFolderName.createWidget( 'ToggleSwitch', { label: 'Bold', model : backModel.get('title').name, name: 'bold' } );
    backFolderName.createWidget( 'ToggleSwitch', { label: 'Italic', model : backModel.get('title').name, name: 'italic' } );
    backFolderName.createWidget( 'Text Color', 'Color', { model : backModel.get('title').name, name  : 'textColor' } );
    backFolderName.close();

    var backFolderRole = backFolderTitle.createWidget( 'Group', { label: 'Role' });
    backFolderRole.createWidget( 'Opacity', 'NumberedSlider', { model : backModel.get('title').role, name  : 'opacity' } );
    backFolderRole.createWidget( 'Font size', 'NumberedSlider', { model : backModel.get('title').role, name  : 'fontSize' } );
    backFolderRole.createWidget( 'Letter spacing', 'NumberedSlider', { model : backModel.get('title').role, name  : 'letterSpacing' } );
    backFolderRole.createWidget( 'ToggleSwitch', { label: 'Bold', model : backModel.get('title').role, name: 'bold' } )
    backFolderRole.createWidget( 'ToggleSwitch', { label: 'Italic', model : backModel.get('title').role, name: 'italic' } )
    backFolderRole.createWidget( 'Text Color', 'Color', { model : backModel.get('title').role, name : 'textColor' } );
    backFolderRole.close();

    $('html').addClass('ready');

    setTimeout( function(){ cardView.initEvents(); }, 0 )

} );

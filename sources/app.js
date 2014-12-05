/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function ( Backbone, $, editor ) {

    var Card = Backbone.Model.extend( {

        defaults : {
            radius : 10,
            Fullname : {
                X: 50,
                Y: 200,
                Fontsize: 30,
                Font: 'Lato',
                Color: {
                    r: 0.10980392156862735,
                    g: 0.6666666666666665,
                    b: 0.8509803921568627
                },
                Textval: 'Mickael Couzinet'
            },
            Job : {
                X: 70,
                Y: 240,
                Fontsize: 20,
                Font: 'Lato',
                Color: {
                    r: 0.1,
                    g: 0.1,
                    b: 0.1
                },
                Textval: 'Full stack developper'
            },
            Address : {
                X: 370,
                Y: 230,
                Fontsize: 15,
                Font: 'Lato',
                Color: {
                    r: 0.1,
                    g: 0.1,
                    b: 0.1
                },
                Textval: '15 rue jules ferry'
            },
            Mail : {
                X: 370,
                Y: 210,
                Fontsize: 15,
                Font: 'Lato',
                Color: {
                    r: 0.10980392156862735,
                    g: 0.6666666666666665,
                    b: 0.8509803921568627
                },
                Textval: 'mcouzinet@gmail.com'
            }
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'uploadSelectEvent', this.onFilePick, this );
            this.model.on( 'change:Job' , this.onJobChange, this);
            this.model.on( 'change:Fullname' , this.onFullnameChange, this);
            this.model.on( 'change:Address' , this.onAddressChange, this);
            this.model.on( 'change:Mail' , this.onMailChange, this);
        },

        render : function ( ) {
            this.onRadiusChange( );
            this.onJobChange();
            this.onFullnameChange();
            this.onAddressChange();
            this.onMailChange();
        },

        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },

        onFilePick : function (file) {
            if( FileReader ){
                var target = this.$el;
                var fReader = new FileReader();
                fReader.readAsDataURL(file);
                fReader.onloadend = function (e) {
                    target.css( 'background-image', 'url("' + e.target.result + '")');
                }  
            }
        },

        onJobChange : function ( ) {
            var Job = this.model.get( 'Job' );
            console.log(Job.Color);
            this.$el.find('.job').css({
                'left': Job.X,
                'top': Job.Y,
                'font-size': Job.Fontsize,
                'font-family': Job.Font,
                'color': this._toHex(Job.Color)
            }).html(Job.Textval);
        },

        onFullnameChange : function ( ) {
            var Fullname = this.model.get( 'Fullname' );
            this.$el.find('.name').css({
                'left': Fullname.X,
                'top': Fullname.Y,
                'font-size': Fullname.Fontsize,
                'font-family': Fullname.Font,
                'color': this._toHex(Fullname.Color )
            }).html(Fullname.Textval);
        },

        onAddressChange : function ( ) {
            var Address = this.model.get( 'Address' );
            this.$el.find('.address').css({
                'left': Address.X,
                'top': Address.Y,
                'font-size': Address.Fontsize,
                'font-family': Address.Font,
                'color': this._toHex(Address.Color )
            }).html(Address.Textval);
        },

        onMailChange : function ( ) {
            var Mail = this.model.get( 'Mail' );
            this.$el.find('.mail').css({
                'left': Mail.X,
                'top': Mail.Y,
                'font-size': Mail.Fontsize,
                'font-family': Mail.Font,
                'color': this._toHex(Mail.Color )
            }).html(Mail.Textval);
        },

        _toHex : function (rgb) {
            var rounded = {
                r: rgb.r * 255,
                g: rgb.g * 255,
                b: rgb.b * 255
            };
            return hex = '#' + ( 16777216 | rounded.b | ( rounded.g << 8 ) | ( rounded.r << 16 ) ).toString( 16 ).substr( 1 );
        }

    } );

    // --- --- --- --- --- --- --- --- ---

    var card = new Card( );
    var view = new View( { model : card, el : $( '.card' ) } );

    view.render( );

    // --- --- --- --- --- --- --- --- ---



    var appearance = editor.createWidget( 'Group', {
        label : 'Card Appearance'
    } );

    appearance.createWidget( 'Border radius', 'NumberedSlider', {
        model   : card,
        name    : 'radius',
        maximum : 50
    } );

    appearance.createWidget( 'Background image', 'FilePicker', {
        model : card,
        name  : 'backgroundImage',
        text  : 'Select Background image'
    } );

    var Fullname = editor.createWidget( 'Group', {
        label : 'Fullname',
        opened : false
    } );

    Fullname.createWidget( 'Fullname' , 'CustomText', {
        model: card,
        name: 'Fullname'
    } );

    var Job = editor.createWidget( 'Group', {
        label : 'Job',
        opened : false
    } );

    Job.createWidget( 'Job' , 'CustomText', {
        model: card,
        name: 'Job'
    } );
 
    var Address = editor.createWidget( 'Group', {
        label : 'Address',
        opened : false
    } );

    Address.createWidget( 'Address' , 'CustomText', {
        model: card,
        name: 'Address'
    } );

    var Mail = editor.createWidget( 'Group', {
        label : 'Mail',
        opened : false
    } );

    Mail.createWidget( 'Mail' , 'CustomText', {
        model: card,
        name: 'Mail'
    } );

} );

/*global define*/

define([

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function (Backbone, $, editor) {

    var Card = Backbone.Model.extend({

        defaults: {
            radius: 10,
            firstname: 'Thang',
            lastname: 'NGUYEN',
            title: 'genius',
            test: 10,
            textColor: {
                r: 1,
                g: 1,
                b: 1
            },
            background: '',
            templateStyle: '1'
        }

    });

    var View = Backbone.View.extend({

        initialize: function () {
            this.model.on('change:radius', this.onRadiusChange, this);
            this.model.on('change:firstname', this.onNameChange, this);
            this.model.on('change:lastname', this.onNameChange, this);
            this.model.on('change:title', this.onTitleChange, this);
            this.model.on('change:textColor', this.onTextColorChange, this);
            this.model.on('change:background', this.onBGImageChange, this);
            this.model.on('change:templateStyle', this.onTemplateChange, this);
            this.model.on('uploadSelectEvent', this.getImage, this);
        },

        render: function () {
            this.onRadiusChange();
            this.onBGImageChange();
            var variables = {
                firstname: this.model.get('firstname'),
                lastname: this.model.get('lastname'),
                title: this.model.get('title')
            };
            console.log($("#user_data").html())
            // Compile the template using underscore
            var template = _.template($("#user_data").html(), variables);
            // Load the compiled HTML into the Backbone "el"
            this.$el.html(template);

        },
        onTemplateChange: function () {
            var templateStyle = this.model.get('templateStyle');
            switch (templateStyle) {
                case '1':
                    $('#user_text').css('float', 'left')
                    $('#user_text').css('text-align', 'left')
                    $('#user_text').css('width', '70%');
                    $('#user_text').css('height', '85%');
                    $('#logo').css('float', 'right')
                    $('#logo').css('width', '150px');
                    $('#logo').css('height', '150px');
                    break;
                case '2':
                    $('#user_text').css('float', 'right')
                    $('#user_text').css('text-align', 'right')
                    $('#user_text').css('width', '70%');
                    $('#user_text').css('height', '85%');
                    $('#logo').css('float', 'left')
                    $('#logo').css('width', '150px');
                    $('#logo').css('height', '150px');
                    break;
                 case '3':
                    $('#user_text').css('float', 'left');
                    $('#user_text').css('text-align', 'left');
                    $('#user_text').css('font-size', '20px');
                    $('#user_text').css('padding-top', '50px');
                    $('#user_text').css('width', '50%');
                    $('#user_text').css('height', '85%');
                    $('#logo').css('float', 'right')
                    $('#logo').css('width', '200px');
                    $('#logo').css('height', '200px');
                    break; 
                default:
                    this.$el.css('background-image', 'none');
            }
        },
        onBGImageChange: function () {
            var background = this.model.get('background');
            switch (background) {
                case 'STARS':
                    this.$el.css('background-image', 'url("sources/background/plus_fav.png")');
                    break;
                case 'BUBBLES':
                    this.$el.css('background-image', 'url("sources/background/bubbles.ico")');
                    break;
                default:
                    this.$el.css('background-image', 'none');
            }
        },
        onRadiusChange: function () {
            this.$el.css('border-radius', this.model.get('radius'));
        },

        onNameChange: function () {
            document.getElementById('name').innerHTML = this.model.get('firstname') + ' ' + this.model.get('lastname')
        },
        onTitleChange: function () {
            $('#title').html(this.model.get('title'))
        },

        onTextColorChange: function () {
            var titleColor = this.model.get('textColor');
            var r = parseInt(titleColor.r * 255);
            var g = parseInt(titleColor.g * 255);
            var b = parseInt(titleColor.b * 255);
            $('#card').css('color', "rgb(" + r + "," + g + "," + b + ")")
        },

        getImage: function () {
            var fileObj = document.getElementsByClassName('file')[0];
            var fileDisplayArea = document.getElementById('logo');
            var file = fileObj.files[0];
            console.log(file)
            //if (file.type.match(textType)) {
            var reader = new FileReader();
            reader.addEventListener("load", function () {
                fileDisplayArea.src = reader.result;
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            };
            //}

        }

    });

    // --- --- --- --- --- --- --- --- ---

    var card = new Card();
    var view = new View({ model: card, el: $('.card') });

    view.render();

    // --- --- --- --- --- --- --- --- ---

    var appearance = editor.createWidget('Group', {
        label: 'Card Appearance'
    });

    appearance.createWidget('Border radius', 'NumberedSlider', {
        model: card,
        name: 'radius'
    });
    appearance.createWidget('firstname', 'Input', {
        model: card,
        name: 'firstname'
    });
    appearance.createWidget('lastane', 'Input', {
        model: card,
        name: 'lastname'
    });
    appearance.createWidget('title', 'Input', {
        model: card,
        name: 'title'
    });
    var Template = appearance.createWidget('Horizontal');
    Template.createWidget('Label', {
        content: 'Template:',
        classname: 'setting'
    });
    Template.createWidget('Select', {
        model: card,
        name: 'templateStyle',
        allowEmpty: false,
        options: {
            '1': 'Template 1',
            '2': 'Template 2',
            '3': 'Template 3'
        }
    });
    var backgroundSelect = appearance.createWidget('Horizontal');
    backgroundSelect.createWidget('Label', {
        content: 'Background:',
        classname: 'setting'
    });
    backgroundSelect.createWidget('Select', {
        model: card,
        name: 'background',
        allowEmpty: false,
        options: {
            'BUBBLES': 'Bubbles',
            'STARS': 'Stars',
            'NONE': 'None'
        }
    });
    appearance.createWidget('title color', 'Color', {
        model: card,
        name: 'textColor'
    });

    appearance.createWidget('logo', 'FilePicker', {
        model: card,
        name: 'logo'
    });


});

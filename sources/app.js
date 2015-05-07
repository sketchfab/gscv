/*global define*/

define([

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function(Backbone, $, editor) {

    var Card = Backbone.Model.extend({

        defaults: {
            cardBorderRadius: 10,
            cardBorder: 1,
            cardColor: '#000000',

            name: 'Gabriel Vergnaud',
            nameColor: '#ffffff',
            nameFontSize: 15,

            job: 'Developer',
            jobColor: '#ffffff',
            jobFontSize: 15
        }

    });

    var View = Backbone.View.extend({

        initialize: function() {
            this.model.on('change:cardBorderRadius', this.onCardBorderRadiusChange, this);
            this.model.on('change:cardBorder', this.onCardBorderChange, this);
            this.model.on('change:cardColor', this.onCardColorChange, this);

            this.model.on('change:name', this.onNameChange, this);
            this.model.on('change:name-color', this.onNameColorChange, this);
            this.model.on('change:nameFontSize', this.onNameFontSizeChange, this);

            this.model.on('change:job', this.onJobChange, this);
            this.model.on('change:job-color', this.onJobColorChange, this);
            this.model.on('change:jobFontSize', this.onJobFontSizeChange, this);
        },

        render: function() {
            this.onCardBorderRadiusChange();
            this.onCardBorderChange();
            this.onCardColorChange();

            this.onNameChange();
            this.onNameColorChange();
            this.onNameFontSizeChange();

            this.onJobChange();
            this.onJobColorChange();
            this.onJobFontSizeChange();
        },


        onCardBorderRadiusChange: function() {
            this.$el.css('border-radius', this.model.get('cardBorderRadius'));
        },

        onCardColorChange: function() {
            this.$el.css('background-color', this.model.get('cardColor'));
        },


        onNameChange: function() {
            this.$('.name').html(this.model.get('name'));
        },

        onNameColorChange: function() {
            this.$('.name').css('color', this.model.get('name-color'));
        },

        onNameFontSizeChange: function(){
            this.$('.name').css('font-size', this.model.get('nameFontSize') + 'px');
        },

        onJobChange: function() {
            this.$('.job').html(this.model.get('job'));
        },

        onJobColorChange: function() {
            this.$('.job').css('color', this.model.get('job-color'));
        },

        onJobFontSizeChange: function(){
            this.$('.job').css('font-size', this.model.get('jobFontSize') + 'px');
        }

    });

    // --- --- --- --- --- --- --- --- ---

    var card = new Card();
    var view = new View({
        model: card,
        el: $('.card')
    });

    view.render();

    // --- --- --- --- --- --- --- --- ---
    // CARD Appearance

    var appearance = editor.createWidget('Group', {
        label: 'Card Appearance'
    });

    appearance.createWidget('Border radius', 'NumberedSlider', {
        model: card,
        name: 'cardBorderRadius'
    });

    appearance.createWidget('Background Color', 'Color', {
        model: card,
        name: 'cardColor'
    });

    // --- --- --- --- --- --- --- --- ---
    // Card Content
    var content = editor.createWidget('Group', {
        label: 'Card Content',
        opened: false
    });
    //name
    content.createWidget('Name', 'TextInput', {
        model: card,
        name: 'name',
        placeholder: 'Dave Loper'
    });

    content.createWidget('Name Font Size', 'NumberedSlider', {
        model: card,
        name: 'nameFontSize'
    });

    content.createWidget('Name Color', 'Color', {
        model: card,
        name: 'name-color'
    });

    // job
    content.createWidget('Job', 'TextInput', {
        model: card,
        name: 'job',
        placeholder: 'Front End Magician'
    });

    content.createWidget('Job Font Size', 'NumberedSlider', {
        model: card,
        name: 'jobFontSize'
    });

    content.createWidget('Job Color', 'Color', {
        model: card,
        name: 'job-color'
    });

});

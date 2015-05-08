/*global define*/

define([

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function(Backbone, $, editor) {

    var Card = Backbone.Model.extend({

        defaults: {
            cardColor: '#171717',
            cardBorderRadius: 20,
            cardBorderSize: 10,
            cardBorderColor: '#3389B6',
            backgroundImage: '',

            name: 'Dave Loper',
            nameColor: '#ffffff',
            nameFontFamily: 'Arial',
            nameFontSize: 40,
            nameTop: 81,
            nameLeft: 94,

            job: 'Front End Magician',
            jobColor: '#83B5C3',
            jobFontSize: 23,
            jobFontFamily: 'Arial',
            jobTop: 176,
            jobLeft: 208
        }

    });

    var View = Backbone.View.extend({

        $name: this.$('.name'),
        $job: this.$('.job'),

        initialize: function() {

            if(localStorage.getItem('card-app'))
                this.model.set( JSON.parse( localStorage.getItem('card-app') ) );

            this.model.on('change', this.onChange, this);
            this.model.on('change:cardBorderRadius', this.onCardBorderRadiusChange, this);
            this.model.on('change:cardBorderSize', this.onCardBorderSizeChange, this);
            this.model.on('change:cardBorderColor', this.onCardBorderColorChange, this);
            this.model.on('change:cardColor', this.onCardColorChange, this);
            this.model.on('change:backgroundImage', this.onBackgroundImageChange, this);

            this.model.on('change:name', this.onNameChange, this);
            this.model.on('change:nameColor', this.onNameColorChange, this);
            this.model.on('change:nameFontSize', this.onNameFontSizeChange, this);
            this.model.on('change:nameFontFamily', this.onNameFontFamilyChange, this);
            this.model.on('change:nameTop', this.onNameTopChange, this);
            this.model.on('change:nameLeft', this.onNameLeftChange, this);

            this.model.on('change:job', this.onJobChange, this);
            this.model.on('change:jobColor', this.onJobColorChange, this);
            this.model.on('change:jobFontSize', this.onJobFontSizeChange, this);
            this.model.on('change:jobFontFamily', this.onJobFontFamilyChange, this);
            this.model.on('change:jobTop', this.onJobTopChange, this);
            this.model.on('change:jobLeft', this.onJobLeftChange, this);
        },

        render: function() {
            this.onCardBorderRadiusChange();
            this.onCardBorderSizeChange();
            this.onCardBorderColorChange();
            this.onCardColorChange();
            this.onBackgroundImageChange();

            this.onNameChange();
            this.onNameColorChange();
            this.onNameFontSizeChange();
            this.onNameFontFamilyChange();
            this.onNameTopChange();
            this.onNameLeftChange();

            this.onJobChange();
            this.onJobColorChange();
            this.onJobFontSizeChange();
            this.onJobFontFamilyChange();
            this.onJobTopChange();
            this.onJobLeftChange();
        },

        onChange: function(){
            localStorage.setItem( 'card-app', JSON.stringify( this.model.toJSON() ) );
        },

        // Card
        onCardBorderRadiusChange: function() {
            this.$el.css('border-radius', this.model.get('cardBorderRadius'));
        },

        onCardColorChange: function() {
            this.$el.css('background-color', this.model.get('cardColor'));
        },

        onCardBorderSizeChange: function() {
            this.$el.css('border-width', this.model.get('cardBorderSize') + 'px');
        },

        onCardBorderColorChange: function() {
            this.$el.css('border-color', this.model.get('cardBorderColor'));
        },

        onBackgroundImageChange: function(){
            if(this.model.get('backgroundImage')){
                this.$('img.background')
                    .attr( 'src', 'sources/images/' + this.model.get('backgroundImage') )
                    .removeClass( 'hidden' );
            }
            else{
                this.$('img.background')
                    .attr( 'src', '' )
                    .addClass( 'hidden' );
            }
        },

        // Name
        onNameChange: function() {
            this.$name.html(this.model.get('name'));
        },

        onNameColorChange: function() {
            this.$name.css('color', this.model.get('nameColor'));
        },

        onNameFontSizeChange: function(){
            this.$name.css('font-size', this.model.get('nameFontSize') + 'px');
        },

        onNameFontFamilyChange: function(){
            this.$name.css('font-family', this.model.get('nameFontFamily'));
        },

        onNameTopChange: function(){
            this.$name.css('top', this.model.get('nameTop') + 'px');
        },

        onNameLeftChange: function(){
            this.$name.css('left', this.model.get('nameLeft') + 'px');
        },

        // Job
        onJobChange: function() {
            this.$job.html(this.model.get('job'));
        },

        onJobColorChange: function() {
            this.$job.css('color', this.model.get('jobColor'));
        },

        onJobFontSizeChange: function(){
            this.$job.css('font-size', this.model.get('jobFontSize') + 'px');
        },

        onJobFontFamilyChange: function(){
            this.$job.css('font-family', this.model.get('jobFontFamily'));
        },

        onJobTopChange: function(){
            this.$job.css('top', this.model.get('jobTop') + 'px');
        },

        onJobLeftChange: function(){
            this.$job.css('left', this.model.get('jobLeft') + 'px');
        },

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

    appearance.createWidget('Background Color', 'Color', {
        model: card,
        name: 'cardColor'
    });

    appearance.createWidget('Border radius', 'NumberedSlider', {
        model: card,
        name: 'cardBorderRadius'
    });

    appearance.createWidget('Border Size', 'NumberedSlider', {
        model: card,
        name: 'cardBorderSize'
    });

    appearance.createWidget('Border Color', 'Color', {
        model: card,
        name: 'cardBorderColor'
    });

    appearance.createWidget('Background Image', 'Upload', {
        model: card,
        name: 'backgroundImage'
    });

    // --- --- --- --- --- --- --- --- ---
    // Name appearance
    var name = editor.createWidget('Group', {
        label: 'Name Appearance',
        opened: false
    });

    name.createWidget('Name', 'TextInput', {
        model: card,
        name: 'name',
        placeholder: 'Dave Loper'
    });

    name.createWidget('Name Font Size', 'NumberedSlider', {
        model: card,
        name: 'nameFontSize'
    });

    name.createWidget('Name Font Family', 'Select', {
        model: card,
        name: 'nameFontFamily',
        options: [
            'Arial',
            'Times New Roman',
            'Chopin',
            'UniSans',
            'HoneyScript',
            'Helvetica'
        ]
    });

    name.createWidget('Name Color', 'Color', {
        model: card,
        name: 'nameColor'
    });

    name.createWidget('Name Left Position', 'NumberedSlider', {
        model: card,
        name: 'nameLeft',
        maximum: 550
    });

    name.createWidget('Name Top Position', 'NumberedSlider', {
        model: card,
        name: 'nameTop',
        maximum: 300
    });

    // job
    var job = editor.createWidget('Group', {
        label: 'Job Appearance',
        opened: false
    });

    job.createWidget('Job', 'TextInput', {
        model: card,
        name: 'job',
        placeholder: 'Front End Magician'
    });

    job.createWidget('Job Font Size', 'NumberedSlider', {
        model: card,
        name: 'jobFontSize'
    });

    job.createWidget('Job Font Family', 'Select', {
        model: card,
        name: 'jobFontFamily',
        options: [
            'Arial',
            'Times New Roman',
            'Chopin',
            'UniSans',
            'HoneyScript',
            'Helvetica'
        ]
    });

    job.createWidget('Job Color', 'Color', {
        model: card,
        name: 'jobColor'
    });

    job.createWidget('Job Left Position', 'NumberedSlider', {
        model: card,
        name: 'jobLeft',
        maximum: 550
    });

    job.createWidget('Job Top Position', 'NumberedSlider', {
        model: card,
        name: 'jobTop',
        maximum: 300
    });

});

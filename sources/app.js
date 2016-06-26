/*global define*/

define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'editor',
    'customWidget/Text',
    'customWidget/saveToLocal',

], function ( Backbone, $, editor, TextWidget, SaveToLocalWidget ) {

    // read and write to local storage
    // This could be indexed db or a ws
    function readCardDataFromLocalStorage(){
      return JSON.parse(localStorage.getItem('sketch:settings'));
    }
    function saveCardDataToLocalStorage(jsonToSave){
      jsonToSave.localSaved =  true;
      localStorage.setItem('sketch:settings',JSON.stringify(jsonToSave));
    }

    // Just to have non empty defaults
    var PIERRE_DEFAULTS = {
      radius: 7,
      orientation: 0,
      name: 'Pierre Besson',
      job: 'Bientôt chez sketchfab',
      localSaved: true
    };

    var Card = Backbone.Model.extend( {
        initialize(){
          this.on('change', this._localSyncOnChange, this);
          this.on('load:github', this._onLoadGithub, this);
        },
        defaults : _.extend({
            radius : 10,
            orientation: 0,
            // Identity defaults
            name: '',
            job: '',
            localSaved: true
        }, PIERRE_DEFAULTS),
        _onLoadGithub: function onLoadGithub(model){
          fetch(`/api/profile/${this.get('github')}`)
              .then(r => r.json())
              .then(d => this.set('githubProfile', d));
        },
        _localSyncOnChange: function onModelChange(model){
          if(model.changedAttributes().hasOwnProperty('localSaved') === false && model.get('localSaved') === true){
              model.set('localSaved', false);
          }
        }

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:orientation', this.onOrientationChange, this );
            this.model.on( 'change:theme', this.onThemeChange, this );
            this.model.on( 'change:name', this.render, this );
            this.model.on( 'change:job', this.render, this );
            this.model.on( 'change:githubProfile', this.render, this );
            this.model.on( 'change:photo', this.render, this );
        },
        _renderGithub: function renderGithub(github){
          return github ? `<div style='display:flex; justify-content:space-around; align-items:center'>
              <i class='fa fa-github'></i>
              <p><a href='https://github.com/${github.name}'>@${github.name}</a></p>
              <p>${github.repo}</p>
            </div>`: 'No github profile';
        },
        _renderPhoto: function renderPhoto(photoName){
          switch(photoName){
            case 'vader':
              return "<img height='65%' style='display: flex;' src='https://media.giphy.com/media/wmJqYd1NA2CU8/giphy.gif' />";
            case 'luke':
              return "<img height='65%' style='display: flex;' src='https://media.giphy.com/media/6aR8pvL7Y7BLy/giphy.gif'/>"
            default:
              return "<img height='65%' style='display: flex;' src='https://media.giphy.com/media/mbUuykVh3yTRe/giphy.gif' />";
          }

        },
        render : function ( ) {
            // I'd rather use templating on this view because it gets informations
            // from all the wiget
            // An maintaining its rendering from sevral model property is mode readable with a render.
            // Even if this is maybe not the most optimal way.
            // I use ES2015 string interpolation to build the template, it could be a function.
            this.$el.html(`
              <div class='name'>${this.model.get('name')}</div>
              <div class='job'>${this.model.get('job')}</div>
              ${this._renderGithub(this.model.get('githubProfile'))}
              ${this._renderPhoto(this.model.get('photo'))}
            `);

            this.onRadiusChange( );
            this.onOrientationChange();
            this.onThemeChange();
        },
        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
        },
        onOrientationChange: function onOrientationChange(){
          this.$el.css( 'transform', `rotate(${this.model.get( 'orientation' )}deg)`);
        },
        onThemeChange: function onThemeChange(){
          console.log('theme', this.model.get('theme'))
          this.$el.attr('class', `card ${this.model.get('theme')}`)
        }
    } );

    // --- --- --- --- --- --- --- --- ---

    var card = new Card( readCardDataFromLocalStorage() );
    var view = new View( { model : card, el : $( '.card' ) } );

    view.render( );

    // --- --- --- --- --- --- --- --- ---
    // Settings

    var settings = editor.createWidget('Group', {label: 'Settings'});
    settings.createWidget('Save', SaveToLocalWidget, {
      model: card,
      name: 'localSaved',
      saveToLocal: saveCardDataToLocalStorage,
      getFromLocal: readCardDataFromLocalStorage
    });
    // Appearance
    var appearance = editor.createWidget( 'Group', {
        label : 'Card Appearance'
    } );

    appearance.createWidget( 'Border radius', 'NumberedSlider', {
        model : card,
        name  : 'radius'
    } );
    appearance.createWidget( 'Rotation', 'NumberedSlider', {
        model : card,
        name  : 'orientation',
        maximum: 360
    } );
    appearance.createWidget( 'Theme', 'Select', {
        model : card,
        name  : 'theme',
        options: ['dark', 'light', 'default']
    } );


    // Identity
    var identity = editor.createWidget('Group', {
      label: 'Identity'
    })
    identity.createWidget( 'Nom', TextWidget , {
        model : card,
        name  : 'name'
    } );
    identity.createWidget( 'Job', TextWidget , {
        model : card,
        name  : 'job'
    } );
    identity.createWidget( 'Github', TextWidget , {
        model : card,
        name  : 'github',
        placeholder: 'fill your profile'
    } );
    identity.createWidget( '', 'Button' , {
        model : card,
        text: 'Load profile',
        event: 'load:github'
    } );
    identity.createWidget('photo', 'Select', {
      model: card,
      name: 'photo',
      options: ['vader', 'kylo ren', 'luke']
    })

} );

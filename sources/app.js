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
      name: 'Pierre Besson',
      job: 'Bientôt chez sketchfab',
      localSaved: true
    };

    var Card = Backbone.Model.extend( {
        initialize(){
          this.on('change', function onModelChange(model){
            if(model.changedAttributes().hasOwnProperty('localSaved') === false && model.get('localSaved') === true){
                model.set('localSaved', false);
            }
          })
        },
        defaults : _.extend({
            radius : 10,
            // Identity defaults
            name: '',
            job: '',
            localSaved: true
        }, PIERRE_DEFAULTS)

    } );

    var View = Backbone.View.extend( {

        initialize : function ( ) {
            this.model.on( 'change:radius', this.onRadiusChange, this );
            this.model.on( 'change:name', this.render, this );
            this.model.on( 'change:job', this.render, this );

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
            `);

            this.onRadiusChange( );
        },
        onRadiusChange : function ( ) {
            this.$el.css( 'border-radius', this.model.get( 'radius' ) );
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


} );

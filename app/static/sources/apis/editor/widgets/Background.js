define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Horizontal',
    'apis/editor/widgets/FilePicker'

], function ( Backbone, $, _, HorizontalWidget, FilePickerWidget ) {

    'use strict';

    return HorizontalWidget.extend( {

        el: [ '<div class="widget background-widget flex">',
              '</div>'
            ].join( '' ),

        initialize: function ( options ) {
            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name : ''

            }, options );

            this.backgroundUrl;

            HorizontalWidget.prototype.initialize.call( this, options );

            this.backgroundPicker  = this.createWidget( 'FilePicker', {selectEvent: 'change:background', text: 'upload background'} );
            this.backgroundPicker.model.on('change:background', this.onChangePicker, this);

            this.checkboxWidget  = this.createWidget( 'ToggleSwitch', {default: true, name: 'checkbox'} );
            this.checkboxWidget.model.on('change:checkbox', this.checkboxState, this);

            this.$el.append(this.backgroundPicker.$el);
            this.$el.append(this.checkboxWidget.$el);
        },

        checkboxState: function ( e ) {

            this.changeBackground(e.get('checkbox'));

    },

        changeBackground : function (state) {

            if (state)
                this.model.set({ background : this.backgroundUrl });
            else
                this.model.set({background: ''});

        },

        onChangePicker: function ( e ) {

            var reader = new FileReader(e);

            reader.readAsDataURL(e);

            reader.onloadend = function () {
                this.backgroundUrl = reader.result;
                this.changeBackground(true);
                this.checkboxWidget.model.set({checkbox: true});
            }.bind(this);

            reader.onerror = function(err) {
                console.log(err);
            };

        }

    } );

} );

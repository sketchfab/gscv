define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Horizontal',
    'apis/editor/widgets/FilePicker'

], function ( Backbone, $, _, HorizontalWidget, FilePickerWidget ) {

    'use strict';

    return HorizontalWidget.extend( {

        el: [ '<div class="widget avatar-widget flex">',
              '</div>'
            ].join( '' ),

        initialize: function ( options ) {
            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name : ''

            }, options );

            this.avatarUrl;

            HorizontalWidget.prototype.initialize.call( this, options );

            this.avatarPicker  = this.createWidget( 'FilePicker', {selectEvent: 'change:avatar', text: 'upload avatar'} );
            this.avatarPicker.model.on('change:avatar', this.onChangePicker, this);

            this.checkboxWidget  = this.createWidget( 'ToggleSwitch', {default: true, name: 'checkbox'} );
            this.checkboxWidget.model.on('change:checkbox', this.checkboxState, this);

            this.$el.append(this.avatarPicker.$el);
            this.$el.append(this.checkboxWidget.$el);
        },

        checkboxState: function ( e ) {

            this.changeAvatar(e.get('checkbox'));

    },

        changeAvatar : function (state) {

            if (state)
                this.model.set({ avatar : this.avatarUrl });
            else
                this.model.set({avatar: ''});

        },

        onChangePicker: function ( e ) {

            var reader = new FileReader(e);

            reader.readAsDataURL(e);

            reader.onloadend = function () {
                this.avatarUrl = reader.result;
                this.changeAvatar(true);
                this.checkboxWidget.model.set({checkbox: true});
            }.bind(this);

            reader.onerror = function(err) {
                console.log(err);
            };

        }

    } );

} );

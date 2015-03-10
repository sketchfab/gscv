define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Horizontal',
    'apis/editor/widgets/Button'

], function ( Backbone, $, _, HorizontalWidget, FilePickerWidget ) {

    'use strict';

    return HorizontalWidget.extend( {

        el: [ '<div class="widget save-widget flex">',
              '     <input class="input-text flex-4" type="text" name="text" value="">',
              '     </input>',
              '</div>'
            ].join( '' ),

        events: _.extend( {}, HorizontalWidget.prototype.events, {
            'change .input-text'            : 'changeText'
        } ),

        initialize: function ( options ) {
            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name : ''

            }, options );

            HorizontalWidget.prototype.initialize.call( this, options );

            this.loadButton  = this.createWidget( 'Button', {text: 'Save'} );
            this.loadButton.model.on('click', this.onClickSave, this);

            this.$el.append(this.loadButton.$el);
        },

        onClickSave: function () {

            if (this.model.get('title')) {

                $.ajax({
                    url: 'cards/' + this.model.get('title'),
                    success: function (data, status) {
                        this.onPutRequest()
                    }.bind(this),
                    error: function () {
                        this.onPostRequest()
                    }.bind(this)
                })


            }

        },

        onPutRequest: function () {
            var dataForm = {
                title: this.model.get('title'),
                color: this.model.get('color'),
                background: this.model.get('background'),
                avatar: this.model.get('avatar'),
                radius: this.model.get('radius')
            };

            $.ajax({
                type: 'PUT',
                url: 'cards/' + this.model.get('title'),
                dataType: "json",
                data: dataForm,
                complete: function (data, status) {
                    console.log('changed!', status);
                }
            });
        },

        onPostRequest: function () {
            $.post(
                'cards/',
                this.model.attributes,
                function (data, status) {
                    console.log('saved!', status);
                }
            );
        },

        changeText: function ( e ) {
            e.preventDefault();

            this.model.set({title: e.target.value});
        }

    } );

} );

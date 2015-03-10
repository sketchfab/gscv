define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Horizontal',
    'apis/editor/widgets/Button'

], function ( Backbone, $, _, HorizontalWidget, FilePickerWidget ) {

    'use strict';

    return HorizontalWidget.extend( {

        el: [ '<div class="widget load-widget flex">',
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

            this.titleToGet = '';

            this.loadButton  = this.createWidget( 'Button', {text: 'Load'} );
            this.loadButton.model.on('click', this.onClickLoad, this);

            this.$el.append(this.loadButton.$el);
        },

        onClickLoad: function () {

            if (this.titleToGet) {
                $.get(
                    'cards/' + this.titleToGet,
                    function (data, status) {
                        console.log('data', data, status)
                        this.model.set(data);
                    }.bind(this)
                );
            }

        },

        changeText: function ( e ) {
            e.preventDefault();

            this.titleToGet = e.target.value;

        }

    } );

} );

define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',
    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend({
    	el: [ '<div class="widget input-widget">',
    		'		<input class="input" type="text"/>',
    		'	</div>'
    	].join( '' ),

    	events: _.extend({}, Widget.prototype.events, {
    		'change .input': 'keyUpEvenement'
    	}),

    	initialize: function( options ){
    		options = _.defaults( options || {}, {
    			
    			model: new Backbone.Model(),
    			name: 'value',

    			content: '',
    			className: '',
    		}, options);

    		Widget.prototype.initialize.call(this, options);

    		if(typeof this.get() === 'undefined'){
    			this.set(this.options.content);
    		}

    		if ( typeof this.options.className ){
    			this.$('.input').addClass(this.options.className);
    		}
    	},
    	render: function(){
    		this.$('.input').html( this.get() );
    	},
    	keyUpEvenement: function(event){
    		var value = $(event.currentTarget).val();
    		this.set(value);
    		this.change(value);
    	}
    });
});
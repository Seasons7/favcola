ig.module(
	'game.entities.colabox'
)
.requires(
	'game.entities.cola',
	'impact.entity'
)
.defines(function(){

EntityColabox = ig.Entity.extend({

	size: {x: 16, y: 16},
	num:0,
	_wmScalable: true,
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255, 255, 0, 0.5)',
	
	init: function( x, y, settings ) {

		if( settings.num ) {
			this.num = settings.num;
		}
		this.parent( x, y, settings );
	},
	
    triggeredBy: function( entity , trigger ) {

		for(;this.num>0;this.num--) {
			
			var vx1 = Math.random().map(0,1,-140,140);
			var vy1 = Math.random().map(0,1,-120,-120);
			ig.game.spawnEntity( EntityCola, 
				this.pos.x, 
				this.pos.y, {vx:vx1,vy:vy1} );
		}
		this.kill();
    },

	update:function() {
		
		/* Updateを空で定義することでコリジョンを固定する */
		/* this.parent()が呼ばれてしまうと、コリジョンが重力に従って落下してしまう */
		/* this.parent();は呼び出さないこと */
	}
	
});

});


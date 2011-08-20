ig.module(
	'game.entities.retry'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityRetry = ig.Entity.extend({

	size: {x: 16, y: 16},
	font: new ig.Font( 'media/04b03.font.png' ),
	num:0,
	levelName:null,
	
	_wmScalable: true,
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255, 255, 0, 0.5)',
	
	init: function( x, y, settings ) {

		if( settings.levelname ) {
			this.levelName = settings.levelname;
		}
		this.parent( x, y, settings );
	},
	
    triggeredBy: function( entity , trigger ) {

		this.num = entity.colanum;
		ig.game.setGameOver(ig.global[this.levelName]);
    },
});

});

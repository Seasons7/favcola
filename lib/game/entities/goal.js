ig.module(
	'game.entities.goal'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityGoal = ig.Entity.extend({

	size: {x: 16, y: 16},
	
	_wmScalable: true,
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255, 0, 0, 0.5)',
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NEVER,
	
	nextLevel:null,
	
	init: function( x, y, settings ) {
		
		if( settings.nextLevel ) {
			this.nextLevel = settings.nextLevel;
		}
		this.parent( x, y, settings );
	},
	
	check: function( other ) {
	},

    triggeredBy: function( entity , trigger ) {

        ig.game.loadNextLevel( ig.global[this.nextLevel] );
    },
	
});

});

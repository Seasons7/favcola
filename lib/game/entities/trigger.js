ig.module(
	'game.entities.trigger'
)
.requires(
	'impact.entity',
	'game.entities.player',
	'game.levels.stage1'
)
.defines(function(){

EntityTrigger = ig.Entity.extend({
	
	size: {x: 16, y: 16},
	
	_wmScalable: true,
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(196, 255, 0, 0.7)',
	
	target: null,
	delay: -1,
	delayTimer: null,
	canFire: true,
	
	playerPrevPosY:0,
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NEVER,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.playerPrevPosY = -1;
	},
	
	updatePosition: function( x,y ) {
		
		this.pos.y = y;
	},
	
	check: function( other ) {

        if( typeof(this.target) == 'object' )  {

            for( var t in this.target ) {
				
                var ent = ig.game.getEntityByName( this.target[t] );
                if( ent && typeof(ent.triggeredBy) == 'function' ) {
	
					ig.log( 'trigger' );
					ig.mark( 'trigger' , 'trigger OK' );
                    ent.triggeredBy( other , this );
                }
            }
        }
	},
	
	update: function(){
    }
});

});

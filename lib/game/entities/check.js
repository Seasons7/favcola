ig.module(
	'game.entities.check'
)
.requires(
	'impact.entity',
	'game.entities.trigger'
)
.defines(function(){

EntityCheck = ig.Entity.extend({

	size: {x: 16, y: 16},
	
	_wmScalable: true,
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(0, 255, 0, 0.5)',
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NEVER,
	
	init: function( x, y, settings ) {

		this.parent( x, y, settings );
	},

	check: function( other ) {
		
        if( typeof(this.target) == 'object' )  {
            for( var t in this.target ) {
	
                var ent = ig.game.getEntityByName( this.target[t] );

                if( ent && typeof(ent.updatePosition) == 'function' ) {
	
					if( ent instanceof EntityTrigger ) {
						
						ent.updatePosition(0,this.pos.y+180);
						other.scrOffsetY = this.pos.y+48;
						this.kill();
					}
                }
            }
        }
	},

	update: function(){
    }
});

});

ig.module(
	'game.entities.particle'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityParticle = ig.Entity.extend({
	size: {x: 4, y: 4},
	offset: {x: 0, y: 0},
	maxVel: {x: 160, y: 160},
	minBounceVelocity: 0,
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	
	lifetime: 5,
	fadetime: 1,
	bounciness: 0.6,
	friction: {x:20, y: 0},
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		var vx = this.vel.x;
		this.vel.x = (Math.random() * 2 - 1) * vx;
		this.vel.y = Math.random() * -(this.vel.y -20)* Math.cos(Math.abs(this.vel.x)/vx) - 20;
		
		this.currentAnim.flip.x = (Math.random() > 0.5);
		this.currentAnim.flip.y = (Math.random() > 0.5);
		this.currentAnim.gotoRandomFrame();
		this.idleTimer = new ig.Timer();
	},
	
	
	update: function() {
		if( this.idleTimer.delta() > this.lifetime ) {
			this.kill();
			return;
		}
		this.currentAnim.alpha = this.idleTimer.delta().map(
			this.lifetime - this.fadetime, this.lifetime,
			1, 0
		);
		this.parent();
	}
});


});

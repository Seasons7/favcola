ig.module(
	'game.entities.cola'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityCola = ig.Entity.extend({
	
	// The players (collision) size is a bit smaller than the animation
	// frames, so we have to move the collision box a bit (offset)
	size:   {x: 6, y:12},
	offset: {x: 5, y: 2},
	friction: {x:20, y: 20},
	
	type: ig.Entity.TYPE.B, // Player friendly group
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.LITE,
	bounciness:0.7,
	
	animSheet: new ig.AnimationSheet( 'media/cola.png', 16, 16 ),	
	hitSE: new ig.Sound('media/se/cola.ogg'),
    animTimer: null,

	init: function( x, y, settings ) {

        this.animTimer = new ig.Timer();
		this.parent( x, y, settings );		
		
		if( settings.vx && settings.vy ) {
			this.vel.x = settings.vx;
			this.vel.y = settings.vy;
		}
		this.pos.x = x;
		this.pos.y = y;
		
		// Add the animations
		this.addAnim( 'idle', 1, [0] );
        this.animTimer.set( 0.5 );
	},

    animationJump: function() {		

        this.vel.y -= 50;
    },

	update: function() {

        if( this.vel.y < 0 ) {
        }
        else if( this.vel.y > 0 ) { 
	
        } else {
        }

        if( this.animTimer.delta() >= 0.5 ) {
            this.animTimer.set( 0.5 );
            this.animationJump();
        }
		this.parent();
	},

    check: function( other ) {
        
        if( other instanceof EntityPlayer ) {

            other.colanum += 1;
            this.hitSE.play();
            this.kill();
        }
    }

});

});


ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({
	
	// The players (collision) size is a bit smaller than the animation
	// frames, so we have to move the collision box a bit (offset)
	size: {x: 12, y:10},
	offset: {x: 4, y: 6},
	
	maxVel: {x: 100, y: 200},
	friction: {x: 700, y: 0},
	
	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,
    colanum:0,
	scrOffsetY:0,
	
	animSheet: new ig.AnimationSheet( 'media/player.png', 16, 16 ),	
	jumpSE: new ig.Sound('media/se/jump.ogg'),
	slideSE: new ig.Sound('media/se/fail.ogg'),
	
	// These are our own properties. They are not defined in the base
	// ig.Entity class. We just use them internally for the Player
	flip: false,
	velGround: 60,
	accelGround: 100,
	accelAir: 140,
	jump: 200,
	health: 10,
    highJumpTimer: null,
    canHighJump: false,
    wantsJump: false,
    wasStanding: false,

	init: function( x, y, settings ) {

        this.highJumpTimer = new ig.Timer();
		this.parent( x, y, settings );
		
		// Add the animations
		this.addAnim( 'idle', 0.5, [0,1,2,1] );
		this.addAnim( 'run', 0.2, [0,1,2,1] );
		this.addAnim( 'jump', 0.3, [6,7,8] );
		this.addAnim( 'damage', 0.2, [3] );
		this.scrOffsetY = this.pos.y;
	},
	
	update: function() {

		// move left or right
		var accel = this.standing ? this.accelGround:this.accelAir;
		
		if( ig.input.state('left') ) {
			this.accel.x = -accel;
			this.flip = true;
		}
		else if( ig.input.state('right') ) {
			this.accel.x = accel;
			this.flip = false;
		}
		else {
			this.accel.x = 0;
		}
		
        this.wantsJump = this.wantsJump || ig.input.pressed('jump');
        if( 
			this.standing && (
				ig.input.pressed('jump') ||
				(!this.wasStanding && this.wantsJump && ig.input.state('jump'))
			)
        ) {

			this.wantsJump  = false;
			this.canHighJump = true;
			this.highJumpTimer.set(0.14);
			this.vel.y = -this.jump/6;

            this.jumpSE.play();

        } else if( this.canHighJump ) {

			var d = this.highJumpTimer.delta();
			if( ig.input.state('jump') ) {
				var f = Math.max(0,d > 0 ? ig.system.tick - d : ig.system.tick);
				this.vel.y -= this.jump * f * 6.0;
			}
			else {
				this.canHighJump = false;
			}
			if( d > 0 ) {
				this.canHighJump = false;
			}
        }
        this.wasStanding = this.standing;
		
		// shoot
		if( ig.input.pressed('shoot') ) {
			//ig.game.spawnEntity( EntitySlimeGrenade, this.pos.x, this.pos.y, {flip:this.flip} );
		}
		
		// set the current animation, based on the player's speed
		if( this.vel.y < 0 ) {
            this.currentAnim.angle += 0.2;
			this.currentAnim = this.anims.jump;
		}
		else if( this.vel.y > 0 ) {
            this.currentAnim.angle += 0.1;
			this.currentAnim = this.anims.jump;
		}
		else if( this.vel.x != 0 ) {
            this.currentAnim.angle = 0.0;
			this.currentAnim = this.anims.run;
		}
		else {
            this.currentAnim.angle = 0.0;
			this.currentAnim = this.anims.idle;
		}
		
		this.currentAnim.flip.x = this.flip;
		
		// move!
		this.parent();
	},

	/*
    handleMovementTrace: function( res ) {
		// 一定の速度で地面にぶつかった時滑らせる
        if( res.collision.y && this.vel.y > 200 ) {
	
            this.slideSE.play();
        }
        this.parent(res); 
    },
	*/

/*
    collideWith: function( other , axis ) {

        this.parent( other , axis );
    }
*/
});

});


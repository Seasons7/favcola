ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.debug.debug', // デバッグモジュールを有効にする時
	
	'game.entities.player',
	'game.entities.cola',
	'game.entities.retry',
	'game.entities.trigger',
	'game.entities.check',
	'game.entities.goal',
	'game.entities.colabox',
	'game.levels.stage1',
	'game.levels.stage2'
)
.defines(function(){
		
FavCola = ig.Game.extend({
	
	gravity: 300, // All entities are affected by this
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	mode:0,
	levelCount:0,
	clearColor: '#0d0c0b',
	nextLevel:null,
	
	init: function() {

		// キー操作
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.UP_ARROW, 'jump' );
		
		ig.input.bind( ig.KEY.X, 'next' );
		
		this.mode = FavCola.MODE.GAME;
        // レベル読み込み
		this.loadLevel( LevelStage1 );
	},
	
	update: function() {		

        // スクロール処理
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			if( ig.ua.mobile ) {
				
				var scrx = 0;
				var scry = 0;
				scrx = player.pos.x - ig.system.width/2;
				if( player.pos.y < player.scrOffsetY ) {
				
					scry = player.pos.y - ig.system.height/2;
				} else {
				
					scry = player.scrOffsetY - ig.system.height/2;
				}
				this.setScreenPos(scrx,scry);
			} else {
				
				this.screen.x = player.pos.x - ig.system.width/2;
				if( player.pos.y < player.scrOffsetY ) {
				
					this.screen.y = player.pos.y - ig.system.height/2;
				} else {
				
					this.screen.y = player.scrOffsetY - ig.system.height/2;
				}
			}
		}
		// Update all entities and BackgroundMaps
		this.parent();
	},
	
	run : function() {
		
		if( this.mode == FavCola.MODE.GAME ) {
			this.update();
			this.draw();
			
		} else if ( this.mode == FavCola.MODE.STATUS ) {
			this.showStatus();
		} else if ( this.mode == FavCola.MODE.FAIL ) {
			this.showGameOver();
		} else if ( this.mode == FavCola.MODE.CLEAR ) {
			this.showClear();
		}
	},
	
	loadNextLevel: function( nextLevel ) {
		
		this.levelCount++;
		this.nextLevel = nextLevel;
		this.mode = FavCola.MODE.STATUS;
	},
	
	setGameOver: function( nextLevel ) {
		
		this.nextLevel = nextLevel;
		this.mode = FavCola.MODE.FAIL;
	},
	
	showStatus: function() {
		
		if( ig.input.pressed('next') ) {
			
			if( this.levelCount == 2 ) {
				
				this.mode = FavCola.MODE.CLEAR;
			} else {
				this.loadLevel( this.nextLevel );
				this.mode = FavCola.MODE.GAME;
			}
			return;
		}
		
		var mv = ig.ua.mobile ? 20 : 0;
		ig.system.clear( this.clearColor );
		
		var player = this.getEntitiesByType( EntityPlayer )[0];
		
		this.font.draw( 'Stage Complete!', ig.system.width/2, 20, ig.Font.ALIGN.CENTER );
		this.font.draw( 'COLA NUM : ', 50-mv, 56 );
		this.font.draw( player.colanum, 108-mv, 56 );
		this.font.draw( 'Press X Key to Proceed', ig.system.width/2, 140, ig.Font.ALIGN.CENTER );
	},
	
	showClear: function() {
		
		var mv = ig.ua.mobile ? 20 : 0;
		ig.system.clear( this.clearColor );
		
		this.font.draw( 'All Stage Complete!', ig.system.width/2, 70 , ig.Font.ALIGN.CENTER );
		this.font.draw( 'Congratulations!!', ig.system.width/2, 90 , ig.Font.ALIGN.CENTER);
	},
	
	showGameOver: function() {
		
		ig.system.clear( this.clearColor );
		
		var player = this.getEntitiesByType( EntityPlayer )[0];
		this.font.draw( 'GAME OVER!! COLA : ' + player.colanum , 38, 76 );
		this.font.draw( 'Press X Key to Retry' , 30, 104 );
		
		if( ig.input.pressed('next') ) {
			ig.game.loadLevel( this.nextLevel );
			this.mode = FavCola.MODE.GAME;
		}
	},
	
	draw: function() {
		
		// Draw all entities and BackgroundMaps
		this.parent();
		
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			this.font.draw( 'GET COLA:' + player.colanum , 2, 2 );
		}
	},	
});

FavCola.MODE = {
	GAME: 1,
	STATS: 2,
	FAIL: 3,
	CLEAR: 4
};

// Start the Game with 60fps, a resolution of 240x160, scaled
// up by a factor of 2
if( ig.ua.mobile ) {	
	ig.Sound.use = [ig.Sound.FORMAT.CAF];
} else {
	ig.Sound.use = [ig.Sound.FORMAT.OGG];
}
ig.main( '#canvas', FavCola, 60, 160, 240, 2 );

});

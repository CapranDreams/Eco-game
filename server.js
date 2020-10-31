const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();

express.static.mime.define({
    'text/html': ['php']
});

app.use(express.static(__dirname));

const server = http.createServer(app);
const io = socketio(server);

var custom_id = 1;
io.engine.generateId = (req) => {
	return "id_" + custom_id++; // custom id must be unique
}

function checkPips(p1,p2,p3,p4) {
	var sum_animals = [0,0,0,0,0];
	for (var a=0; a<5; a++) {if (p1==a+1) {sum_animals[a]++;}}
	for (var a=0; a<5; a++) {if (p2==a+1) {sum_animals[a]++;}}
	for (var a=0; a<5; a++) {if (p3==a+1) {sum_animals[a]++;}}
	for (var a=0; a<5; a++) {if (p4==a+1) {sum_animals[a]++;}}
	return sum_animals;
}

class tile {
	constructor() {
		//biome_1, biome_2, x, y, rotation, animal_options, animal_occupy, player_owner
		this.biome_1 = -1;
		this.biome_2 = -1;
		this.x = -1;
		this.y = -1;
		this.rotation = 0;
		this.animal_options = [];
		this.animal_occupy = -1;
		this.player_owner = -1;
	}
	addAnimalIfTile(tileMatch, animal) {
		if (this.tileEquals(tileMatch)) {
			this.animal_options = [-1,-1,-1];
			this.animal_occupy = animal;
		}
	}
	tileEquals(tile2) {
		if (this.x == tile2.x && this.y == tile2.y) {
			return true;
		}
		return false;
	}
	createTile(x,y,b1,b2,rot,a1,a2,a3) {
		this.biome_1 = b1;
		this.biome_2 = b2;
		this.x = x;
		this.y = y;
		this.rotation = rot;
		this.animal_options = [a1,a2,a3];
	}
	generate() {
		// Generate biomes for tile
		this.biome_1 = Math.floor(Math.random()*5);		 		// integer from 0 to 4
		this.biome_2 = Math.floor(Math.random()*5);
		
		// allow keystones (biome_1 = biome_2) to be generated but at reduced odds
		if(this.biome_1 == this.biome_2) {
			this.biome_2 = Math.floor(Math.random()*5);
		}
		
		// Generate potential animal inhabitants
		var number_of_animals = 1;
		if(this.biome_1 != this.biome_2) {						// not a keystone
			number_of_animals = Math.floor(Math.random()*2)+2;	// integer from 2 to 3
		}
		
		this.animal_options = [];
		for(var i=0; i<number_of_animals; i++) {
			// Generate unique accepted animal
			var newAnimalOption = Math.floor(Math.random()*5)+1; 	// integer from 1 to 5
			while(this.animal_options.includes(newAnimalOption)) {
				newAnimalOption = Math.floor(Math.random()*5)+1;
			}
			this.animal_options.push(newAnimalOption);
		}
		while (this.animal_options.length < 3) {
			this.animal_options.push(-1);
		}
		
		this.x = -1;
		this.y = -1;
		this.rotation = 0;
		this.player_owner = -1;
		this.animal_occupy = -1;		
	}
	canLive(tile, animal) {
		return tile.animal_options.includes(animal);
	}
	rotate(rot) {
		// Discrete rotations of 60 degrees are enumerated 0-5
		this.rotation = rot;
	}
	isEmpty() {
		return (this.biome_1 == -1 || this.biome_2 == -1);
	}
	setTile(biome_1, biome_2, x, y, rotation, animal_options, animal_occupy, player_owner) {
		this.biome_1 = biome1;
		this.biome_2 = biome2;
		this.x = x;
		this.y = y;
		this.rotation = rotation;
		this.animal_options = animal_options;
		this.animal_occupy = animal_occupy;
		this.player_owner = player_owner;
	}
	addAnimal(a) {
		// does not perform checking!
		this.animal_occupy = a;
	}
	getBiomes() {
		return [this.biome_1, this.biome_2];
	}
	getAnimals() {
		return this.animal_options;
	}
}

class tilemap {
	constructor() {
		this.team = -1;
		this.map = [];
	}
	
	clearMap() {
		this.map = [];
	}
	addTile(tile) {
		this.map.push(tile);
	}
	addAnimal(tile, animal) {
		if(tile.canLive(animal) && (tile.animal_occupy == -1)) {
			tile.animal_occupy = animal;
		}
	}
	getTile(r,c) {
		// return the tile at these coordinates
		for(var t in this.map) {
			if(this.map[t].x == r && this.map[t].y == c) {
				return this.map[t];
			}
		}
		return this.map[0];	// not useful...
	}
}

class pool {
	constructor() {
		this.tilePairs = [];
	}
	
	getPool() {
		return this.tilePairs;
	}
	addPair() {
		var newTile = new tile();
		newTile.generate();
		var newAnimal = Math.floor(Math.random()*5)+1; 
		var newPair = [newTile, newAnimal];
		this.tilePairs[0] = newPair;
		this.consolidate();
	}
	fillPairs() {
		for(var i=0; i<4; i++) {
			var newTile = new tile();
			newTile.generate();
			var newAnimal = Math.floor(Math.random()*5)+1; 
			var newPair = [newTile, newAnimal];
			this.tilePairs[i] = newPair;
		}
	}
	resetPairs() {
		var nullTile = new tile();
		this.tilePairs = [[nullTile,-1],[nullTile,-1],[nullTile,-1],[nullTile,-1]];
	}
	clearPair(index) {
		var nullTile = new tile();
		this.tilePairs[index] = [nullTile, -1];
		this.consolidate();
	}
	drawTile(index) {
		var getTile = this.tilePairs[index];
		this.clearPairs[index];
		return getTile[0];
	}
	drawAnimal(index) {
		var getTile = this.tilePairs[index];
		this.clearPairs[index];
		return getTile[1];
	}
	drawPair(index) {
		var getTile = this.tilePairs[index];
		this.clearPairs[index];
		this.consolidate;
		return getTile;
	}
	consolidate() {
		var nullTile = new tile();
		if(this.tilePairs[3][0].isEmpty() || this.tilePairs[3][1] == -1) {
			if(!this.tilePairs[2][0].isEmpty() && this.tilePairs[2][0] != -1) {
				this.tilePairs[3] = this.tilePairs[2];
				this.tilePairs[2] = [nullTile,-1];
			}
			else if(!this.tilePairs[1][0].isEmpty() && this.tilePairs[1][0] != -1) {
				this.tilePairs[3] = this.tilePairs[1];
				this.tilePairs[2] = [nullTile,-1];
				this.tilePairs[1] = [nullTile,-1];
			}
			else if(!this.tilePairs[0][0].isEmpty() && this.tilePairs[0][0] != -1) {
				this.tilePairs[3] = this.tilePairs[0];
				this.tilePairs[2] = [nullTile,-1];
				this.tilePairs[1] = [nullTile,-1];
				this.tilePairs[0] = [nullTile,-1];
			}
		}
		if(this.tilePairs[2][0].isEmpty() || this.tilePairs[2][1] == -1) {
			if(!this.tilePairs[1][0].isEmpty() && this.tilePairs[1][0] != -1) {
				this.tilePairs[2] = this.tilePairs[1];
				this.tilePairs[1] = [nullTile,-1];
			}
			else if(!this.tilePairs[0][0].isEmpty() && this.tilePairs[0][0] != -1) {
				this.tilePairs[2] = this.tilePairs[0];
				this.tilePairs[1] = [nullTile,-1];
				this.tilePairs[0] = [nullTile,-1];
			}
		}
		if(this.tilePairs[1][0].isEmpty() || this.tilePairs[1][1] == -1) {
			if(!this.tilePairs[0][0].isEmpty() && this.tilePairs[0][0] != -1) {
				this.tilePairs[1] = this.tilePairs[0];
			}
		}
		if(this.tilePairs[0][0].isEmpty() || this.tilePairs[0][1] == -1) {
			this.tilePairs[0] = [nullTile,-1];
		}
		
		
		if (this.tilePairs[2][0].getBiomes()==this.tilePairs[3][0].getBiomes()){
			this.clearPair(2);
			this.addPair();
			this.consolidate();
		}
		if ((this.tilePairs[1][0].getBiomes()==this.tilePairs[2][0].getBiomes()) || (this.tilePairs[1][0].getBiomes()==this.tilePairs[3][0].getBiomes()) ){
			this.clearPair(1);
			this.addPair();
			this.consolidate();
		}
		while ((this.tilePairs[0][0].getBiomes()==this.tilePairs[1][0].getBiomes()) || (this.tilePairs[0][0].getBiomes()==this.tilePairs[2][0].getBiomes()) || (this.tilePairs[0][0].getBiomes()==this.tilePairs[3][0].getBiomes())){
			this.clearPair(0);
			this.addPair();
		}
		
		var pip_list = [this.tilePairs[0][1], this.tilePairs[1][1], this.tilePairs[2][1], this.tilePairs[3][1]];
		
		for (var i=0; i<4; i++) {
			var cnt = 0;
			for (var j=0; j<4; j++) {
				if (pip_list[j] == pip_list[i]) {
					cnt+=1;
				}
			}
			if (cnt >= 3) {
				this.fillPairs();
			}
		}
	}
}

class game {
	
	constructor() {
		console.log('initializing game class');
		this.status_game = 0;
			// 0: Waiting for player
			// 1: New game
			// 2: Game over
		this.current_turn = 0;
		this.player_list = [-1,-1,-1,-1,-1,-1,-1,-1];
		this.score_list = [0,0,0,0,0,0,0,0];
		this.score_rules = [-1,-1,-1,-1,-1];
		
		this.tilemap_1 = new tilemap();
		this.tilemap_1.team = 1;
		this.tilemap_1.clearMap();
		this.tilemap_2 = new tilemap();
		this.tilemap_2.team = 2;
		this.tilemap_2.clearMap();
		this.tilemap_3 = new tilemap();
		this.tilemap_3.team = 3;
		this.tilemap_3.clearMap();
		this.tilemap_4 = new tilemap();
		this.tilemap_4.team = 4;
		this.tilemap_4.clearMap();
		this.tilemap_5 = new tilemap();
		this.tilemap_5.team = 4;
		this.tilemap_5.clearMap();
		this.tilemap_6 = new tilemap();
		this.tilemap_6.team = 4;
		this.tilemap_6.clearMap();
		this.tilemap_7 = new tilemap();
		this.tilemap_7.team = 4;
		this.tilemap_7.clearMap();
		this.tilemap_8 = new tilemap();
		this.tilemap_8.team = 4;
		this.tilemap_8.clearMap();
	
		this.pair_pool = new pool();
		this.pair_pool.resetPairs();
		this.pair_pool.fillPairs();
	}
	
	nextOpenSlot() {
		for(var i=0; i<8; i++) {
			if(this.player_list[i] == -1) {
				return i;
			}
		}
		return -1;
	}
	newGame() {
		this.status_game = 0;
		this.current_turn = 0;
		this.player_list = [-1,-1,-1,-1,-1,-1,-1,-1];
		this.score_list = [0,0,0,0,0,0,0,0];
		
		this.tilemap_1.clearMap();
		this.tilemap_2.clearMap();
		this.tilemap_3.clearMap();
		this.tilemap_4.clearMap();
		this.tilemap_5.clearMap();
		this.tilemap_6.clearMap();
		this.tilemap_7.clearMap();
		this.tilemap_8.clearMap();
		
		console.log('newgame');
	}
	getTeam(team) {
		switch(team) {
			case 0: return "GREEN";
			case 1: return "YELLOW";
			case 2: return "MAGENTA";
			case 3: return "CYAN";
			case 4: return "TEAL";
			case 5: return "SALMON";
			case 6: return "PURPLE";
			case 7: return "LIME";
			default: return "INVALID";
		}
	}
	get_tilemap_by_team(team) {
		switch(team) {
			case 0: return this.tilemap_1;
			case 1: return this.tilemap_2;
			case 2: return this.tilemap_3;
			case 3: return this.tilemap_4;
			case 4: return this.tilemap_5;
			case 5: return this.tilemap_6;
			case 6: return this.tilemap_7;
			case 7: return this.tilemap_8;
			default: return "INVALID";
		}
	}
}

var turn_counter = 0;
var team_counter = 0;
var allow_next_turn = false;
var GAME = new game();
var NUM_BEAR_SCORE_CARDS = 3;
var NUM_WOLF_SCORE_CARDS = 3;
var NUM_DEER_SCORE_CARDS = 3;
var NUM_EAGLE_SCORE_CARDS = 3;
var NUM_FISH_SCORE_CARDS = 3;
var num_player_game = 0;

io.on('connection', function(sock){
	console.log('new connection attempt: '.concat(sock.id));
	var newPlayerSlot = GAME.nextOpenSlot();
	console.log('next available slot = '.concat(newPlayerSlot));
	GAME.player_list[newPlayerSlot] = sock.id;
	if(newPlayerSlot != -1) {console.log('new player joined '+newPlayerSlot+' from id '+sock.id);}
	else {console.log('not enough slots for player to join');}
	
	io.to(sock.id).emit('giveid', sock.id, newPlayerSlot);
	
	// Update screen to existing game
	//GAME.emitFrame();
	
	
	
	
	
	sock.on('getframe', (player) => {
		console.log("["+player+"] request frame");
	});
	
	sock.on('getpool', (player) => {
		console.log("["+player+"] request pool");
		/*
		GAME.pair_pool.resetPairs();
		GAME.pair_pool.fillPairs();
		
		var fullPool = GAME.pair_pool.getPool();
		//console.log(fullPool);
		
		var t1b = fullPool[0][0].getBiomes();
		var t1a = fullPool[0][0].getAnimals();
		var t1c = fullPool[0][1];
		var p1 = t1b.concat(t1a);
		p1.push(t1c);
		console.log(p1);
		
		var t2b = fullPool[1][0].getBiomes();
		var t2a = fullPool[1][0].getAnimals();
		var t2c = fullPool[1][1];
		var p2 = t2b.concat(t2a);
		p2.push(t2c);
		console.log(p2);
		
		var t3b = fullPool[2][0].getBiomes();
		var t3a = fullPool[2][0].getAnimals();
		var t3c = fullPool[2][1];
		var p3 = t3b.concat(t3a);
		p3.push(t3c);
		console.log(p3);
		
		var t4b = fullPool[3][0].getBiomes();
		var t4a = fullPool[3][0].getAnimals();
		var t4c = fullPool[3][1];
		var p4 = t4b.concat(t4a);
		p4.push(t4c);
		console.log(p4);
		*/
		
		io.emit('send_pool', GAME.pair_pool.tilePairs[0],GAME.pair_pool.tilePairs[1],GAME.pair_pool.tilePairs[2],GAME.pair_pool.tilePairs[3]);
	});
	
	sock.on('newgame', (player, num_players_for_game) => {
		console.log(player.concat(" requests new game for ").concat(num_players_for_game).concat(" players"));
		
		GAME.current_turn = 0;
		GAME.player_list = [-1,-1,-1,-1,-1,-1,-1,-1];
		GAME.score_list = [0,0,0,0,0,0,0,0];
		
		GAME.score_rules[0] = Math.floor(Math.random()*NUM_BEAR_SCORE_CARDS);
		GAME.score_rules[1] = Math.floor(Math.random()*NUM_WOLF_SCORE_CARDS);
		GAME.score_rules[2] = Math.floor(Math.random()*NUM_DEER_SCORE_CARDS);
		GAME.score_rules[3] = Math.floor(Math.random()*NUM_EAGLE_SCORE_CARDS);
		GAME.score_rules[4] = Math.floor(Math.random()*NUM_FISH_SCORE_CARDS);
		console.log('SCORE CARDS: ' + GAME.score_rules);
		io.emit('use_score_rules', GAME.score_rules[0],GAME.score_rules[1],GAME.score_rules[2],GAME.score_rules[3],GAME.score_rules[4]);
		
		num_player_game = num_players_for_game;
		
		// Clear all board maps
		GAME.tilemap_1.clearMap();
		GAME.tilemap_2.clearMap();
		GAME.tilemap_3.clearMap();
		GAME.tilemap_4.clearMap();
		GAME.tilemap_5.clearMap();
		GAME.tilemap_6.clearMap();
		GAME.tilemap_7.clearMap();
		GAME.tilemap_8.clearMap();
		
		// Generate new pool of tile + animal pairs
		GAME.pair_pool.resetPairs();
		GAME.pair_pool.fillPairs();
		
		var fullPool = GAME.pair_pool.getPool();
		
		var t1b = fullPool[0][0].getBiomes();
		var t1a = fullPool[0][0].getAnimals();
		var t1c = fullPool[0][1];
		
		var t2b = fullPool[1][0].getBiomes();
		var t2a = fullPool[1][0].getAnimals();
		var t2c = fullPool[1][1];
		
		var t3b = fullPool[2][0].getBiomes();
		var t3a = fullPool[2][0].getAnimals();
		var t3c = fullPool[2][1];
		
		var t4b = fullPool[3][0].getBiomes();
		var t4a = fullPool[3][0].getAnimals();
		var t4c = fullPool[3][1];
		
		//var sum_animals = checkPips(t1c,t2c,t3c,t4c);
				
		var p1 = t1b.concat(t1a);
		p1.push(t1c);
		console.log(p1);
		
		var p2 = t2b.concat(t2a);
		p2.push(t2c);
		console.log(p2);
		
		var p3 = t3b.concat(t3a);
		p3.push(t3c);
		console.log(p3);
		
		var p4 = t4b.concat(t4a);
		p4.push(t4c);
		console.log(p4);
		
		io.emit('send_pool', p1,p2,p3,p4);
		
		
		// Create new board for each player
		for (var ini_team=0; ini_team<=num_player_game; ini_team++) {
			var st1 = new tile();
			var st2 = new tile();
			var st3 = new tile();
			
			st1.generate();
			st1.x = 0;
			st1.y = 0;
			st1.biome_2 = st1.biome_1;	// first tile is a keystone
			st1.animal_options = [st1.animal_options[0],-1,-1];
			var start_1 = [st1.getBiomes()[0], st1.getBiomes()[1], st1.getAnimals()[0], st1.getAnimals()[1], st1.getAnimals()[2]];
			st2.generate();
			st2.x = 0;
			st2.y = 1;
			while (st2.biome_1 == st2.biome_2) {	// must not be a keystone
				st2.generate();
			}
			var start_2 = [st2.getBiomes()[0], st2.getBiomes()[1], st2.getAnimals()[0], st2.getAnimals()[1], st2.getAnimals()[2]];
			st3.generate();
			st3.x = -1;
			st3.y = 1;
			while (st3.biome_1 == st3.biome_2) {	// must not be a keystone
				st3.generate();
			}
			var start_3 = [st3.getBiomes()[0], st3.getBiomes()[1], st3.getAnimals()[0], st3.getAnimals()[1], st3.getAnimals()[2]];
			
			
			// add tiles to appropriate tilemap
			switch (ini_team) {
				case 1:
					GAME.tilemap_1.addTile(st1);
					GAME.tilemap_1.addTile(st2);
					GAME.tilemap_1.addTile(st3);
					break;
				case 2: 
					GAME.tilemap_2.addTile(st1);
					GAME.tilemap_2.addTile(st2);
					GAME.tilemap_2.addTile(st3);
					break;
				case 3:
					GAME.tilemap_3.addTile(st1);
					GAME.tilemap_3.addTile(st2);
					GAME.tilemap_3.addTile(st3);
					break;
				case 4: 
					GAME.tilemap_4.addTile(st1);
					GAME.tilemap_4.addTile(st2);
					GAME.tilemap_4.addTile(st3);
					break;
				case 5:
					GAME.tilemap_5.addTile(st1);
					GAME.tilemap_5.addTile(st2);
					GAME.tilemap_5.addTile(st3);
					break;
				case 6: 
					GAME.tilemap_6.addTile(st1);
					GAME.tilemap_6.addTile(st2);
					GAME.tilemap_6.addTile(st3);
					break;
				case 7: 
					GAME.tilemap_7.addTile(st1);
					GAME.tilemap_7.addTile(st2);
					GAME.tilemap_7.addTile(st3);
					break;
				case 8: 
					GAME.tilemap_8.addTile(st1);
					GAME.tilemap_8.addTile(st2);
					GAME.tilemap_8.addTile(st3);
					break;
			}
			
			
			//console.log(start_1);
			//console.log(start_2);
			//console.log(start_3);
			io.emit('send_starter_tiles', ini_team, start_1,start_2,start_3);
		}
		//console.log(GAME.tilemap_1.map[0]);
				
		console.log('BEGIN >>> TEAM COUNTER: '+team_counter+'. TURN #: '+turn_counter);
		team_counter = 0;
		turn_counter = 0;
		io.emit('turn', team_counter, turn_counter);
		
	});
	
	
		
	sock.on('place_pair', (player, pair_num, r_tile, c_tile, rot, b1, b2, a1, a2, a3, r_a, c_a, a) => {
		// Signifies end of turn for that player
		
		// The tile taken
		console.log('['+player+'] Picked tile #'+pair_num+' with biome1='+b1+', biome2='+b2+'. Potential pips='+a1+','+a2+','+a3+'. Paired with Animal '+a);
		GAME.pair_pool.clearPair(pair_num-1);
		GAME.pair_pool.consolidate();
		GAME.pair_pool.addPair();
		io.emit('send_pool', GAME.pair_pool.tilePairs[0],GAME.pair_pool.tilePairs[1],GAME.pair_pool.tilePairs[2],GAME.pair_pool.tilePairs[3]);
		
		
		// The tile placed
		console.log('['+player+'] Placed tile ['+b1+':'+b2+'] @ r'+r_tile+':c'+c_tile+' with rotation '+rot);
		var newTile = new tile();
		newTile.createTile(r_tile,c_tile,parseInt(b1),parseInt(b2),rot,a1,a2,a3);
		
		// add tiles to appropriate tilemap
		switch (player) {
			case 1:
				GAME.tilemap_1.map.push(newTile);
				break;
			case 2: 
				GAME.tilemap_2.map.push(newTile);
				break;
			case 3:
				GAME.tilemap_3.map.push(newTile);
				break;
			case 4: 
				GAME.tilemap_4.map.push(newTile);
				break;
			case 5:
				GAME.tilemap_5.map.push(newTile);
				break;
			case 6: 
				GAME.tilemap_6.map.push(newTile);
				break;
			case 7: 
				GAME.tilemap_7.map.push(newTile);
				break;
			case 8: 
				GAME.tilemap_8.map.push(newTile);
				break;
		}
		
		// The animal placed (or sacrificed)
		if (a != -2) {
			console.log('['+player+'] Placed animal '+a+' @ r'+r_a+':c'+c_a);
			
			var tempTile = new tile();
			tempTile.createTile(r_a,c_a,-1,-1,-1,-1,-1,-1);
			
			var biomes_placed = [];
			switch (player) {
				case 1:
					//GAME.tilemap_1.map.push(newTile);
					GAME.tilemap_1.map.forEach(element => element.addAnimalIfTile(tempTile, a));
					biomes_placed = GAME.tilemap_1.getTile(r_a,c_a).getBiomes();
					break;
				case 2:
					//GAME.tilemap_2.map.push(newTile);
					GAME.tilemap_2.map.forEach(element => element.addAnimalIfTile(tempTile, a));
					biomes_placed = GAME.tilemap_2.getTile(r_a,c_a).getBiomes();
					break;
				case 3:
					//GAME.tilemap_3.map.push(newTile);
					GAME.tilemap_3.map.forEach(element => element.addAnimalIfTile(tempTile, a));
					biomes_placed = GAME.tilemap_3.getTile(r_a,c_a).getBiomes();
					break;
				case 4:
					//GAME.tilemap_4.map.push(newTile);
					GAME.tilemap_4.map.forEach(element => element.addAnimalIfTile(tempTile, a));
					biomes_placed = GAME.tilemap_4.getTile(r_a,c_a).getBiomes();
					break;
				case 5:
					//GAME.tilemap_5.map.push(newTile);
					GAME.tilemap_5.map.forEach(element => element.addAnimalIfTile(tempTile, a));
					biomes_placed = GAME.tilemap_5.getTile(r_a,c_a).getBiomes();
					break;
				case 6:
					//GAME.tilemap_6.map.push(newTile);
					GAME.tilemap_6.map.forEach(element => element.addAnimalIfTile(tempTile, a));
					biomes_placed = GAME.tilemap_6.getTile(r_a,c_a).getBiomes();
					break;
				case 7:
					//GAME.tilemap_7.map.push(newTile);
					GAME.tilemap_7.map.forEach(element => element.addAnimalIfTile(tempTile, a));
					biomes_placed = GAME.tilemap_7.getTile(r_a,c_a).getBiomes();
					break;
				case 8:
					//GAME.tilemap_8.map.push(newTile);
					GAME.tilemap_8.map.forEach(element => element.addAnimalIfTile(tempTile, a));
					biomes_placed = GAME.tilemap_8.getTile(r_a,c_a).getBiomes();
					break;
			}
			
			// if completed keystone
			if (biomes_placed[0] == biomes_placed[1]) {
				console.log('['+player+'] Completed keystone tile');
				GAME.score_list[player-1] += 2;
				io.emit('update_score', GAME.score_list);
			}
			
		}
		else {
			console.log('['+player+'] Sacrificed animal');
			GAME.score_list[player-1] += 2;
			io.emit('update_score', GAME.score_list);
		}
		
		
		
		allow_next_turn = true;
		console.log("end turn");
		
		team_counter++;
		if (team_counter >= num_player_game) {
			team_counter = 0;
			turn_counter++;
		}
		
		if (turn_counter<20) {
			
			console.log('TEAM COUNTER: '+team_counter+'. TURN #: '+turn_counter);
			io.emit('turn', team_counter, turn_counter);
			
			io.emit('frame', GAME.get_tilemap_by_team(team_counter));
			console.log(GAME.tilemap_1.map.length);
			for (var v=0; v<GAME.tilemap_1.map.length; v++) {
				console.log(GAME.tilemap_1.map[v]);
			}
			
			
		}
		else {
			console.log('--- GAME OVER ---');
			io.emit('end_game', GAME.score_list);
		}
		
	});
	
});



server.on('error', (err) => {
	console.error('Server error:', err);
});

server.listen(8180, () => {
	console.log('Eco started on 8180');
});
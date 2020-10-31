var largeTextSize = false;

window.onkeydown = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 77) { // m key
        if (!debugMode) {
			document.getElementById('debug_container').style.visibility = 'visible';
		}
		else {
			document.getElementById('debug_container').style.visibility = 'hidden';
		}
		debugMode = !debugMode;
    } 
};

function debug(s) {
	document.getElementById("debug").innerHTML = s;
}
function msg(s) {
	document.getElementById("msg").innerHTML = s;
}
function msg_color(c) {
    switch (c) {
        case 0:     // unassigned
            document.getElementById("msg").style.backgroundColor = '#e2ebc5';
            break;
        case 1:     // your turn
            document.getElementById("msg").style.backgroundColor = '#15a110';
            break;
        case 2:     // waiting for turn
            document.getElementById("msg").style.backgroundColor = '#d1986f';
            break;
        case 3:     // place animal
            document.getElementById("msg").style.backgroundColor = '#2f9fa3';
            break;
        case 9:     // Game over
            document.getElementById("msg").style.backgroundColor = '#c93267';
            break;
		default:    // normal
            document.getElementById("msg").style.backgroundColor = '#e2ebc5';
    }
}

function numToAnimalPath(n) {
	var res = "src/blank.png";
	switch (parseInt(n)) {
		case 1: res = "src/pip_bear.png"; break;
		case 2: res = "src/pip_wolf.png"; break;
		case 3: res = "src/pip_deer.png"; break;
		case 4: res = "src/pip_eagle.png"; break;
		case 5: res = "src/pip_fish.png"; break;
	}
    return res;
}

function score_info(id) {
    document.getElementById(id).style.visibility = "visible";
}
function score_info_close(id) {document.getElementById(id).style.visibility = "hidden";}

function numToPipString(n) {
	switch (n) {
		case 1: return "src/pip_bear.png";
		case 2: return "src/pip_wolf.png"; 
		case 3: return "src/pip_deer.png"; 
		case 4: return "src/pip_eagle.png"; 
		case 5: return "src/pip_fish.png";
		default: return "src/blank.png"
	}
}
function set_pool(p1, p2, p3, p4) {
    //debug(p1);
    
	document.getElementById("tile_deck_1").src="src/tileset/".concat(p1[0].biome_1.toString()).concat(p1[0].biome_2.toString()).concat(".png");
	document.getElementById("animal_deck_1a").src=numToPipString(p1[0].animal_options[0]);
	document.getElementById("animal_deck_1b").src=numToPipString(p1[0].animal_options[1]);
	document.getElementById("animal_deck_1c").src=numToPipString(p1[0].animal_options[2]);
	document.getElementById("pip_deck_1").src=numToAnimalPath(p1[1]);
    
	document.getElementById("tile_deck_2").src="src/tileset/".concat(p2[0].biome_1.toString()).concat(p2[0].biome_2.toString()).concat(".png");
	document.getElementById("animal_deck_2a").src=numToPipString(p2[0].animal_options[0]);
	document.getElementById("animal_deck_2b").src=numToPipString(p2[0].animal_options[1]);
	document.getElementById("animal_deck_2c").src=numToPipString(p2[0].animal_options[2]);
	document.getElementById("pip_deck_2").src=numToAnimalPath(p2[1]);
    
	document.getElementById("tile_deck_3").src="src/tileset/".concat(p3[0].biome_1.toString()).concat(p3[0].biome_2.toString()).concat(".png");
	document.getElementById("animal_deck_3a").src=numToPipString(p3[0].animal_options[0]);
	document.getElementById("animal_deck_3b").src=numToPipString(p3[0].animal_options[1]);
	document.getElementById("animal_deck_3c").src=numToPipString(p3[0].animal_options[2]);
	document.getElementById("pip_deck_3").src=numToAnimalPath(p3[1]);
    
	document.getElementById("tile_deck_4").src="src/tileset/".concat(p4[0].biome_1.toString()).concat(p4[0].biome_2.toString()).concat(".png");
	document.getElementById("animal_deck_4a").src=numToPipString(p4[0].animal_options[0]);
	document.getElementById("animal_deck_4b").src=numToPipString(p4[0].animal_options[1]);
	document.getElementById("animal_deck_4c").src=numToPipString(p4[0].animal_options[2]);
	document.getElementById("pip_deck_4").src=numToAnimalPath(p4[1]);
    
}
function set_pair(pair_num) {
	var biome1 = Math.floor(Math.random() * 5);
	var biome2 = Math.floor(Math.random() * 5);
	document.getElementById("tile_deck_".concat(pair_num.toString())).src="src/tileset/".concat(biome1.toString()).concat(biome2.toString()).concat(".png");
	
	var animal1 = Math.floor(Math.random()*5)+1;
	var animal2 = Math.floor(Math.random()*5)+1;
	while (animal1 == animal2) {
		animal2 = Math.floor(Math.random()*5)+1;
	}
	var animal3 = Math.floor(Math.random()*5)+1;
	if (animal1 == animal3 || animal2 == animal3) {
		animal3 = -1;
	}
	
	var animalName = "";
	switch (animal1) {
		case 1: animalName = "src/pip_bear.png"; break;
		case 2: animalName = "src/pip_wolf.png"; break;
		case 3: animalName = "src/pip_deer.png"; break;
		case 4: animalName = "src/pip_eagle.png"; break;
		case 5: animalName = "src/pip_fish.png"; break;
	}
	document.getElementById("animal_deck_".concat(pair_num.toString()).concat("a")).src=animalName;
	
	if (animal2 != -1) {
		switch (animal2) {
			case 1: animalName = "src/pip_bear.png"; break;
			case 2: animalName = "src/pip_wolf.png"; break;
			case 3: animalName = "src/pip_deer.png"; break;
			case 4: animalName = "src/pip_eagle.png"; break;
			case 5: animalName = "src/pip_fish.png"; break;
		}
		document.getElementById("animal_deck_".concat(pair_num.toString()).concat("b")).style.visibility = "visible";
		document.getElementById("animal_deck_".concat(pair_num.toString()).concat("b")).src=animalName;
		
		if (animal3 != -1) {
			switch (animal3) {
				case 1: animalName = "src/pip_bear.png"; break;
				case 2: animalName = "src/pip_wolf.png"; break;
				case 3: animalName = "src/pip_deer.png"; break;
				case 4: animalName = "src/pip_eagle.png"; break;
				case 5: animalName = "src/pip_fish.png"; break;
			}
			document.getElementById("animal_deck_".concat(pair_num.toString()).concat("c")).style.visibility = "visible";
			document.getElementById("animal_deck_".concat(pair_num.toString()).concat("c")).src=animalName;
		}
		else {
			document.getElementById("animal_deck_".concat(pair_num.toString()).concat("c")).style.visibility = "hidden";
		}
	}
	else {
		document.getElementById("animal_deck_".concat(pair_num.toString()).concat("b")).style.visibility = "hidden";
		document.getElementById("animal_deck_".concat(pair_num.toString()).concat("c")).style.visibility = "hidden";
	}
	
	var pip = Math.floor(Math.random() * 5)+1;
	switch (pip) {
		case 1: animalName = "src/pip_bear.png"; break;
		case 2: animalName = "src/pip_wolf.png"; break;
		case 3: animalName = "src/pip_deer.png"; break;
		case 4: animalName = "src/pip_eagle.png"; break;
		case 5: animalName = "src/pip_fish.png"; break;
	}
	document.getElementById("pip_deck_".concat(pair_num.toString())).src=animalName;
}

function setPairSelect(p1,p2,p3,p4) {
	if (p1) {document.getElementById("deck_pair_1").style = "background: #".concat(themeColor).concat(";");}
	else {document.getElementById("deck_pair_1").style = "background: #1c1f11;";}
	if (p2) {document.getElementById("deck_pair_2").style = "background: #".concat(themeColor).concat(";");}
	else {document.getElementById("deck_pair_2").style = "background: #1c1f11;";}
	if (p3) {document.getElementById("deck_pair_3").style = "background: #".concat(themeColor).concat(";");}
	else {document.getElementById("deck_pair_3").style = "background: #1c1f11;";}
	if (p4) {document.getElementById("deck_pair_4").style = "background: #".concat(themeColor).concat(";");}
	else {document.getElementById("deck_pair_4").style = "background: #1c1f11;";}
}
function pair_select(pair_num) {
	if (!global_enable_animal_placement && global_allow_tile_select) {
		if (document.contains(document.getElementById(global_id_preview))) {
            document.getElementById(global_id_preview).remove();
        }
            
		for (var i=1; i<5; i++) {
			var elem = document.getElementById("deck_pair_".concat(i.toString()));
			if (i==pair_num) {
				elem.style = "background: #a6d402;";
			}
			else {
				elem.style = "background: #1c1f11;";
			}
		}
		
		var t = document.getElementById("tile_deck_" + pair_num.toString()).src;
		var b1 = t.substring(t.length-6, t.length-5);
		var b2 = t.substring(t.length-5, t.length-4);
		
		t = document.getElementById("animal_deck_" + pair_num.toString() + "a").src;
		var a1 = t.substring(t.length-9, t.length-4).replace("_","");
		var a1i = -1;
		if (a1 == "bear") 			{a1i = 1;}
		else if (a1 == "wolf") 	{a1i = 2;}
		else if (a1 == "deer") 	{a1i = 3;}
		else if (a1 == "eagle") 	{a1i = 4;}
		else if (a1 == "fish") 	{a1i = 5;}
		
		t = document.getElementById("animal_deck_" + pair_num.toString() + "b").src;
		var a2 = t.substring(t.length-9, t.length-4).replace("_","");
		var a2i = -1;
		if (a2 == "bear") 			{a2i = 1;}
		else if (a2 == "wolf") 	{a2i = 2;}
		else if (a2 == "deer") 	{a2i = 3;}
		else if (a2 == "eagle") 	{a2i = 4;}
		else if (a2 == "fish") 	{a2i = 5;}
		
		t = document.getElementById("animal_deck_" + pair_num.toString() + "c").src;
		var a3 = t.substring(t.length-9, t.length-4).replace("_","");
		var a3i = -1;
		if (a3 == "bear") 			{a3i = 1;}
		else if (a3 == "wolf") 	{a3i = 2;}
		else if (a3 == "deer") 	{a3i = 3;}
		else if (a3 == "eagle") 	{a3i = 4;}
		else if (a3 == "fish") 	{a3i = 5;}
		
		global_sel_biome1 = b1;
		global_sel_biome2 = b2;
		global_sel_rot = 0;
		global_sel_a1 = a1i;
		global_sel_a2 = a2i;
		global_sel_a3 = a3i;
		//debug("a="+a1i+"  b="+a2i+"  c="+a3i);
		
		t = document.getElementById("pip_deck_" + pair_num.toString()).src;
		var a = t.substring(t.length-9, t.length-4).replace("_","");
		var ai = -1;
		if (a == "bear") 		{ai = 1;}
		else if (a == "wolf") 	{ai = 2;}
		else if (a == "deer") 	{ai = 3;}
		else if (a == "eagle") 	{ai = 4;}
		else if (a == "fish") 	{ai = 5;}
		
		global_sel_animal = ai;
		
		global_pair_num = pair_num;
		global_enable_tile_placement = true;
		//debug("place away!");
        document.getElementById('submit_tile').style.visibility = "visible";
        document.getElementById('rotate_cw').style.visibility = "visible";
        document.getElementById('rotate_ccw').style.visibility = "visible";
		
	}
}

function clearMap() {
	document.getElementById('tilebag').innerHTML = '';
}
function init_map(p1,p2,p3) {
    clearMap();
	init_hex(0,0);
	init_hex(0,1);
	init_hex(-1,1);
	set_tile(0,0,p1[0],p1[1],0,p1[2],p1[3],p1[4]);
	set_tile(0,1,p2[0],p2[1],0,p2[2],p2[3],p2[4]);
	set_tile(-1,1,p3[0],p3[1],0,p3[2],p3[3],p3[4]);
}

function init_hex(row, col) {
	var src = "src/hex_border.png";
	var img_class = "tile";
	var id = "r".concat(row.toString()).concat("c").concat(col.toString());
	var dx = 7;
	var dy = dx*Math.sqrt(3)/2;
	var xpos = row*dx + col*dx/2;
	var ypos = col*dy;
	var style = 'right:' + xpos.toString() + 'vw; top:' + ypos.toString() + 'vw;';
	var fun = 'placeTile('+row+","+col+')';
	
	var innerHTML = '<img src="'+src+'" class="'+img_class+'" id="'+id+'" style="'+style+'" onclick="'+fun+'" >';
	document.getElementById('tilebag').innerHTML += innerHTML;
}

function get_tile(r,c) {
	var id = "r".concat(row.toString()).concat("c").concat(col.toString());
	var elem = document.getElementById(id);
	var name = elem.src;
	return [parseInt(name.substring(name.length-6, name.length-5)), parseInt(name.substring(name.length-5, name.length-6))];
}
function get_pips(r,c) {
	var id = "pip_r" + r.toString() + "c" + c.toString() + "_a";
	var a = document.getElementById(id).src.substring(name.length-9, name.length-4).replace("_","");
	var ai = -1;
	if (a == "bear") 		{ai = 1;}
	else if (a == "wolf") 	{ai = 2;}
	else if (a == "deer") 	{ai = 3;}
	else if (a == "eagle") {ai = 4;}
	else if (a == "fish") 	{ai = 5;}
	
	var a1 = document.getElementById(id+"1").src.substring(name.length-9, name.length-4).replace("_","");
	var a1i = -1;
	if (a1 == "bear") 			{a1i = 1;}
	else if (a1 == "wolf") 	{a1i = 2;}
	else if (a1 == "deer") 	{a1i = 3;}
	else if (a1 == "eagle") 	{a1i = 4;}
	else if (a1 == "fish") 	{a1i = 5;}
	
	var a2 = document.getElementById(id+"2").src.substring(name.length-9, name.length-4).replace("_","");
	var a2i = -1;
	if (a2 == "bear") 			{a2i = 1;}
	else if (a2 == "wolf") 	{a2i = 2;}
	else if (a2 == "deer") 	{a2i = 3;}
	else if (a2 == "eagle") 	{a2i = 4;}
	else if (a2 == "fish") 	{a2i = 5;}
	
	var a3 = document.getElementById(id+"3").src.substring(name.length-9, name.length-4).replace("_","");
	var a3i = -1;
	if (a3 == "bear") 			{a3i = 1;}
	else if (a3 == "wolf") 	{a3i = 2;}
	else if (a3 == "deer") 	{a3i = 3;}
	else if (a3 == "eagle") 	{a3i = 4;}
	else if (a3 == "fish") 	{a3i = 5;}
	
	return[ai,a1i,a2i,a3i];
}

function placeTile(r,c) {
	if (global_enable_tile_placement) {
		//debug("placement");
		global_sel_row = r;
		global_sel_col = c;
		previewTile();
	}
	
	
}
function previewTile() {
	var r = global_sel_row;
	var c = global_sel_col;
	if (document.contains(document.getElementById(global_id_preview))) {
		document.getElementById(global_id_preview).remove();
	}
	
	var id = "r" + r.toString() + "c" + c.toString();
	var checkstring = document.getElementById(id).src;
	checkstring = checkstring.substring(checkstring.length-10,checkstring.length-4);
	if (checkstring == "border" || rotateBypass) {
		rotateBypass = false;
		var src = "src/tileset/".concat(global_sel_biome1.toString()).concat(global_sel_biome2.toString()).concat(".png");
		var img_class = "tile_preview preview rotate" + global_sel_rot;
		id = "r" + r.toString() + "c" + c.toString() + "_preview";
		var dx = 7;
		var dy = dx*Math.sqrt(3)/2;
		var xpos = r*dx + c*dx/2;
		var ypos = c*dy;
		var style = 'right:' + xpos.toString() + 'vw; top:' + ypos.toString() + 'vw; z-index:100;';
		
		var line = '<img src="'+src+'" class="'+img_class+'" id="'+id+'" style="'+style+'" >';
		document.getElementById('tilebag').innerHTML += line;
		
		global_id_preview = id;
		global_enable_rotation_placement = true;
		global_tile_placed = true;
		
	}
}

function rotate(drot) {
	if (global_enable_rotation_placement) {
		var element = document.getElementById(global_id_preview);
		if (element.classList.contains("rotate"+global_sel_rot.toString())) {
			element.classList.remove("rotate"+global_sel_rot.toString());
		}
		global_sel_rot += drot;
		if (global_sel_rot == 6) {
			global_sel_rot = 0;
		}
		if (global_sel_rot == -1) {
			global_sel_rot = 5;
		}
		element.classList.add("rotate"+global_sel_rot.toString());
		//debug(element.classList);
		rotateBypass = true;
		previewTile();
	}
	
}
function submit_tile() {
	if (global_enable_tile_placement && global_tile_placed) {
		
		set_tile(global_sel_row, global_sel_col, global_sel_biome1, global_sel_biome2, global_sel_rot, global_sel_a1, global_sel_a2, global_sel_a3);
		document.getElementById(global_id_preview).remove();
		
		msg("Place Animal Token");
        msg_color(3);
		global_enable_tile_placement = false;
		global_tile_placed = false;
		global_enable_animal_placement = true;
		global_enable_rotation_placement = false;
		global_allow_tile_select = false;
        document.getElementById('submit_tile').style.visibility = "hidden";
        document.getElementById('rotate_cw').style.visibility = "hidden";
        document.getElementById('rotate_ccw').style.visibility = "hidden";
        document.getElementById('sacrifice_animal').style.visibility = "visible";
		
	}
}
function sacrifice_animal() {
	if (global_enable_animal_placement) {
		global_sel_animal = -2;
        global_enable_animal_placement = false;
        document.getElementById('sacrifice_animal').style.visibility = "hidden";
		socket.emit('sacrifice_animal', my_team);
        end_turn();
        msg("Wait for next turn...");
        msg_color(2);
	}
}
function place_animal(r,c) {
	
	if (global_enable_animal_placement) {
        document.getElementById('sacrifice_animal').style.visibility = "hidden";
		
		//var id = "r"+r.toString()+"c"+c.toString();
		//elem = document.getElementById(id);
		
		
		var id = "pip_r" + r.toString() + "c" + c.toString() + "_a";
		
		var a1i = -1;
		if (document.getElementById(id.concat("1"))) {
			var elem_a1 = document.getElementById(id.concat("1")).src;
			var a1 = elem_a1.substring(elem_a1.length-9, elem_a1.length-4).replace("_","");
			if (a1 == "bear") 			{a1i = 1;}
			else if (a1 == "wolf") 		{a1i = 2;}
			else if (a1 == "deer") 		{a1i = 3;}
			else if (a1 == "eagle") 	{a1i = 4;}
			else if (a1 == "fish") 		{a1i = 5;}
		
			var a2i = -1;
			if (document.getElementById(id.concat("2"))) {
				var elem_a2 = document.getElementById(id.concat("2")).src;
				var a2 = elem_a2.substring(elem_a2.length-9, elem_a2.length-4).replace("_","");
				if (a2 == "bear") 			{a2i = 1;}
				else if (a2 == "wolf") 		{a2i = 2;}
				else if (a2 == "deer") 		{a2i = 3;}
				else if (a2 == "eagle") 	{a2i = 4;}
				else if (a2 == "fish") 		{a2i = 5;}
			}
			else {a2i==-1;}
			
			var a3i = -1;
			if (document.getElementById(id.concat("3"))) {
				var elem_a3 = document.getElementById(id.concat("3")).src;
				var a3 = elem_a3.substring(elem_a3.length-9, elem_a3.length-4).replace("_","");
				if (a3 == "bear") 			{a3i = 1;}
				else if (a3 == "wolf") 		{a3i = 2;}
				else if (a3 == "deer") 		{a3i = 3;}
				else if (a3 == "eagle") 	{a3i = 4;}
				else if (a3 == "fish") 		{a3i = 5;}
			}
			else {a3i==-1;}
			
			var arr = [a1i,a2i,a3i];
			
			//debug(global_sel_animal+" ?in "+arr);
			if (arr.includes(global_sel_animal)) {
				//debug("success: value "+global_sel_animal+" in "+arr);
				if (document.getElementById(id.concat("1"))) {document.getElementById(id.concat("1")).remove();}
				if (document.getElementById(id.concat("2"))) {document.getElementById(id.concat("2")).remove();}
				if (document.getElementById(id.concat("3"))) {document.getElementById(id.concat("3")).remove();}
				
				
				
				// larger pip on tile
				var large_pip = document.createElement("img");
				switch (global_sel_animal) {
					case 1: large_pip.setAttribute("src", "src/pip_bear.png"); break;
					case 2: large_pip.setAttribute("src", "src/pip_wolf.png"); break;
					case 3: large_pip.setAttribute("src", "src/pip_deer.png"); break;
					case 4: large_pip.setAttribute("src", "src/pip_eagle.png"); break;
					case 5: large_pip.setAttribute("src", "src/pip_fish.png"); break;
				}
				large_pip.setAttribute("class", "pip_map_placed");
				large_pip.setAttribute("id", "pip_r"+r.toString()+"c"+c.toString()+"_a_placed");
				var dx = 7;
				var dy = dx*Math.sqrt(3)/2;
				var xpos = r*dx + c*dx/2;
				var ypos = c*dy;
				var style = 'right:' + (xpos+1.7).toString() + 'vw; top:' + (ypos+2.2).toString() + 'vw;';
				large_pip.setAttribute("style", style);
				//large_pip.setAttribute('onclick', '');
				document.getElementById("tilebag").appendChild(large_pip);
				
				global_a_row = r;
				global_a_col = c;
				
				global_enable_animal_placement = false;
				end_turn();
				msg("Wait for next turn...");
                msg_color(2);
			}
			else {
				debug("ERR: value "+global_sel_animal+" not in "+arr);
			}
		
		}
		else { // else the possible pips are already removed, ignore this target tile (it is already taken)
			
		}
		
		
	}
}

function end_turn() {
    setPairSelect(0,0,0,0);
	var animal = [global_a_row, global_a_col, global_sel_animal];
	var tile = [global_sel_row, global_sel_col, global_sel_rot, global_sel_biome1, global_sel_biome2, global_sel_a1, global_sel_a2, global_sel_a3];
	var pool = [my_id, global_pair_num];
	var emit_str = pool.concat(tile).concat(animal);
	//debug(emit_str);
	//socket.emit('place_pair', emit_str);
	
	// your turn is over at this point (!!)
    if (global_sel_animal != -2) {
		emit_turn(my_team, global_pair_num, global_sel_row, global_sel_col, global_sel_rot, global_sel_biome1, global_sel_biome2, global_sel_a1, global_sel_a2, global_sel_a3, global_a_row, global_a_col, global_sel_animal);
	}
    else {  // sacrificed animal (no special handling for now)
        emit_turn(my_team, global_pair_num, global_sel_row, global_sel_col, global_sel_rot, global_sel_biome1, global_sel_biome2, global_sel_a1, global_sel_a2, global_sel_a3, global_a_row, global_a_col, global_sel_animal);
    }
	

	
	// reset selection variables
	global_sel_row = -1;
	global_sel_col = -1;
	global_sel_biome1 = -1;
	global_sel_biome2 = -1;
	global_sel_rot = -1;
	global_sel_a1 = -1;
	global_sel_a2 = -1;
	global_sel_a3 = -1;
	global_sel_animal = -1;
	global_a_row = -1;
	global_a_col = -1;
	global_pair_num = -1;
	global_allow_tile_select = false;
	global_enable_tile_placement = false;
	global_tile_placed = false;
	global_enable_animal_placement = false;
	global_enable_rotation_placement = false;
	global_id_preview = "preview";
	rotateBypass = false;
	
}

function set_tile(r,c,b1,b2,rot,a1,a2,a3) {
	var id = "r".concat(r.toString()).concat("c").concat(c.toString());
	if (!elementExists(id)) {
		init_hex(r,c);
	}
	
	
	
	var element = document.getElementById(id);
	element.src="src/tileset/".concat(b1.toString()).concat(b2.toString()).concat(".png");
	element.setAttribute('onclick', 'place_animal('+r.toString()+','+c.toString()+')');
	//element.setAttribute('usemap', '#imgmap_'+r.toString()+c.toString());
	element.classList.add("rotate".concat(rot.toString()));
	
	//var elem_map = document.createElement("map");
	//elem_map.setAttribute("name", '#imgmap_'+r.toString()+c.toString());
	//elem_map.innerHTML= '<area target="_self" onclick="place_animal('+r.toString()+','+c.toString()+')" coords="199,460,399,346,397,114,201,0,0,115,-1,346" shape="poly">';
	//<map name="image-map"><area target="_self" onclick="" coords="199,460,399,346,397,114,201,0,0,115,-1,346" shape="poly"></map>
	//imageMapResize(elem_map.getAttribute("name"));
	
	// pip 1
	var elem = document.createElement("img");
	switch (a1) {
		case 1: elem.setAttribute("src", "src/pip_bear.png"); break;
		case 2: elem.setAttribute("src", "src/pip_wolf.png"); break;
		case 3: elem.setAttribute("src", "src/pip_deer.png"); break;
		case 4: elem.setAttribute("src", "src/pip_eagle.png"); break;
		case 5: elem.setAttribute("src", "src/pip_fish.png"); break;
	}
	elem.setAttribute("class", "pip_map");
	elem.setAttribute("id", "pip_r"+r.toString()+"c"+c.toString()+"_a1");
	var dx = 7;
	var dy = dx*Math.sqrt(3)/2;
	var xpos = r*dx + c*dx/2;
	var ypos = c*dy;
	var style = 'right:' + (xpos+2.625).toString() + 'vw; top:' + (ypos+2.3).toString() + 'vw;';
	elem.setAttribute("style", style);
	elem.setAttribute('onclick', 'place_animal('+r.toString()+','+c.toString()+')');
	document.getElementById("tilebag").appendChild(elem);
	
	
	// pip 2
	if (a2 > 0) {
		elem = document.createElement("img");
		switch (a2) {
			case 1: elem.setAttribute("src", "src/pip_bear.png"); break;
			case 2: elem.setAttribute("src", "src/pip_wolf.png"); break;
			case 3: elem.setAttribute("src", "src/pip_deer.png"); break;
			case 4: elem.setAttribute("src", "src/pip_eagle.png"); break;
			case 5: elem.setAttribute("src", "src/pip_fish.png"); break;
		}
		elem.setAttribute("class", "pip_map");
		elem.setAttribute("id", "pip_r"+r.toString()+"c"+c.toString()+"_a2");
		xpos = r*dx + c*dx/2;
		ypos = c*dy;
		style = 'right:' + (xpos+3.5).toString() + 'vw; top:' + (ypos+3.8).toString() + 'vw;';
		elem.setAttribute("style", style);
		elem.setAttribute('onclick', 'place_animal('+r.toString()+','+c.toString()+')');
		document.getElementById("tilebag").appendChild(elem);
	}
	
	
	// pip 3
	if (a3 > 0) {
		elem = document.createElement("img");
		switch (a3) {
			case 1: elem.setAttribute("src", "src/pip_bear.png"); break;
			case 2: elem.setAttribute("src", "src/pip_wolf.png"); break;
			case 3: elem.setAttribute("src", "src/pip_deer.png"); break;
			case 4: elem.setAttribute("src", "src/pip_eagle.png"); break;
			case 5: elem.setAttribute("src", "src/pip_fish.png"); break;
		}
		elem.setAttribute("class", "pip_map");
		elem.setAttribute("id", "pip_r"+r.toString()+"c"+c.toString()+"_a3");
		xpos = r*dx + c*dx/2;
		ypos = c*dy;
		style = 'right:' + (xpos+1.75).toString() + 'vw; top:' + (ypos+3.8).toString() + 'vw;';
		elem.setAttribute("style", style);
		elem.setAttribute('onclick', 'place_animal('+r.toString()+','+c.toString()+')');
		document.getElementById("tilebag").appendChild(elem);
	}
	
	// create neighbors
	createNeighbors(r,c);
}
function createNeighbors(r,c) {
	var nr = r+1;
	var nc = c-1;
	id = "r".concat(nr.toString()).concat("c").concat(nc.toString());
	if (!elementExists(id)) {
		init_hex(nr,nc);
	}
	
	nr = r;
	nc = c-1;
	id = "r".concat(nr.toString()).concat("c").concat(nc.toString());
	if (!elementExists(id)) {
		init_hex(nr,nc);
	}
	
	nr = r-1;
	nc = c;
	id = "r".concat(nr.toString()).concat("c").concat(nc.toString());
	if (!elementExists(id)) {
		init_hex(nr,nc);
	}
	
	nr = r-1;
	nc = c+1;
	id = "r".concat(nr.toString()).concat("c").concat(nc.toString());
	if (!elementExists(id)) {
		init_hex(nr,nc);
	}
	
	nr = r+1;
	nc = c;
	id = "r".concat(nr.toString()).concat("c").concat(nc.toString());
	if (!elementExists(id)) {
		init_hex(nr,nc);
	}
	
	nr = r;
	nc = c+1;
	id = "r".concat(nr.toString()).concat("c").concat(nc.toString());
	if (!elementExists(id)) {
		init_hex(nr,nc);
	}
}

function elementExists(elemName) {
	var element =  document.getElementById(elemName);
	return (typeof(element) != 'undefined' && element != null);
}


function chooseTeam(teamnum) {
	var c = "#ccc";
	switch (teamnum) {
		case 1: c = '#46c902'; break;
		case 2: c = '#c69006'; break;
		case 3: c = '#760046'; break;
		case 4: c = '#09a8ad'; break;
		case 5: c = '#1bb57f'; break;
		case 6: c = '#f0463a'; break;
		case 7: c = '#5614fa'; break;
		case 8: c = '#bede0b'; break;
	}
	document.getElementById('left').style.backgroundColor  = c;
	document.getElementById('right').style.backgroundColor  = c;
	document.getElementById('bottom').style.backgroundColor  = c;
	document.getElementById('top').style.backgroundColor  = c;
	my_team = teamnum;
	themeColor = c;
	document.getElementById('id').innerHTML = "ID: ".concat(my_id).concat(" (team: ").concat(my_team).concat(")");
    
    hideGameMenu();
}


var mem_scores = [0,0,0,0,0,0,0,0];
function showScore(scores) {
    mem_scores = scores;
	document.getElementById('1_score').innerHTML = scores[0];
	document.getElementById('2_score').innerHTML = scores[1];
	document.getElementById('3_score').innerHTML = scores[2];
	document.getElementById('4_score').innerHTML = scores[3];
	document.getElementById('5_score').innerHTML = scores[4];
	document.getElementById('6_score').innerHTML = scores[5];
	document.getElementById('7_score').innerHTML = scores[6];
	document.getElementById('8_score').innerHTML = scores[7];
    
}
function indicateTurn(id) {
    switch (id) {
		case 0:
            document.getElementById('1_score').innerHTML = "<u>".concat(mem_scores[0].toString()).concat("</u>");
            break;
		case 1:
            document.getElementById('2_score').innerHTML = "<u>".concat(mem_scores[1].toString()).concat("</u>");
            break;
		case 2:
            document.getElementById('3_score').innerHTML = "<u>".concat(mem_scores[2].toString()).concat("</u>");
            break;
		case 3:
            document.getElementById('4_score').innerHTML = "<u>".concat(mem_scores[3].toString()).concat("</u>");
            break;
		case 4:
            document.getElementById('5_score').innerHTML = "<u>".concat(mem_scores[4].toString()).concat("</u>");
            break;
		case 5:
            document.getElementById('6_score').innerHTML = "<u>".concat(mem_scores[5].toString()).concat("</u>");
            break;
		case 6:
            document.getElementById('7_score').innerHTML = "<u>".concat(mem_scores[6].toString()).concat("</u>");
            break;
		case 7:
            document.getElementById('8_score').innerHTML = "<u>".concat(mem_scores[7].toString()).concat("</u>");
            break;
            
	}
}

function toggleTextSize() {
        
    var ele_bear_info = document.getElementById('bearscoring_info');
    var ele_bear = document.getElementById('bearscoring');
    var ele_wolf_info = document.getElementById('wolfscoring_info');
    var ele_wolf = document.getElementById('wolfscoring');
    var ele_deer_info = document.getElementById('deerscoring_info');
    var ele_deer = document.getElementById('deerscoring');
    var ele_eagle_info = document.getElementById('eaglescoring_info');
    var ele_eagle = document.getElementById('eaglescoring');
    var ele_fish_info = document.getElementById('fishscoring_info');
    var ele_fish = document.getElementById('fishscoring');
    
	if (largeTextSize) {
        largeTextSize = !largeTextSize;
		// make small again
        document.getElementById('enlargetext').innerHTML = "Enable larger text";
        
        ele_bear_info.style = "font-size:1vh; width=25vh; height=10vh; top=5vh;";
        ele_bear.style = "top:5vh;";
        
        ele_wolf_info.style = "font-size:1vh; width:25vh; height:10vh; top:16vh;";
        ele_wolf.style = "top:16vh;";
        
        ele_deer_info.style = "font-size:1vh; width:25vh; height:10vh; top:27vh;";
        ele_deer.style = "top:27vh;";
        
        ele_eagle_info.style = "font-size:1vh; width:25vh; height:10vh; top:38vh;";
        ele_eagle.style = "top:38vh;";
        
        ele_fish_info.style = "font-size:1vh; width:25vh; height:10vh; top:49vh;";
        ele_fish.style = "top:49vh;";
        //debug("smol");
	}
    else {
        largeTextSize = !largeTextSize;
        // make big
        document.getElementById('enlargetext').innerHTML = "Disable larger text";
        
        ele_bear_info.style = "position:fixed; font-size:1.6vh; width:38vh; height:17vh; top:5vh;";
        ele_bear.style = "position:fixed; top:5vh;";
        
        ele_wolf_info.style = "position:fixed; font-size:1.6vh; width:38vh; height:17vh; top:23vh;";
        ele_wolf.style = "position:fixed; top:23vh;";
        
        ele_deer_info.style = "position:fixed; font-size:1.6vh; width:38vh; height:17vh; top:41vh;";
        ele_deer.style = "position:fixed; top:41vh;";
        
        ele_eagle_info.style = "position:fixed; font-size:1.6vh; width:38vh; height:17vh; top:59vh;";
        ele_eagle.style = "position:fixed; top:59vh;";
        
        ele_fish_info.style = "position:fixed; font-size:1.6vh; width:38vh; height:17vh; top:77vh;";
        ele_fish.style = "position:fixed; top:77vh;";
        //debug("biyg");        
    }
}


function renderTile(tile) {
    debug("testing point");
    debug(tile.animal_options[0]);
    
    // Tile
    set_tile(tile.x,tile.y,tile.biome_1,tile.biome_2,tile.rotation,tile.animal_options[0],tile.animal_options[1],tile.animal_options[2]);
    
    // Animal
    if (tile.animal_occupy > 0) {
        var large_pip = document.createElement("img");
        switch (tile.animal_occupy) {
            case 1: large_pip.setAttribute("src", "src/pip_bear.png"); break;
            case 2: large_pip.setAttribute("src", "src/pip_wolf.png"); break;
            case 3: large_pip.setAttribute("src", "src/pip_deer.png"); break;
            case 4: large_pip.setAttribute("src", "src/pip_eagle.png"); break;
            case 5: large_pip.setAttribute("src", "src/pip_fish.png"); break;
        }
        large_pip.setAttribute("class", "pip_map_placed");
        large_pip.setAttribute("id", "pip_r"+tile.x.toString()+"c"+tile.y.toString()+"_a_placed");
        var dx = 7;
        var dy = dx*Math.sqrt(3)/2;
        var xpos = tile.x*dx + tile.y*dx/2;
        var ypos = tile.y*dy;
        var style = 'right:' + (xpos+1.7).toString() + 'vw; top:' + (ypos+2.2).toString() + 'vw;';
        large_pip.setAttribute("style", style);
        document.getElementById("tilebag").appendChild(large_pip);
    }
    //debug("finish r".concat(tile.x.toString()).concat("c").concat(tile.y.toString()));
}

function drawTilemap(tilemap) {
    clearMap();
    var debug_string = '';
	for (var t=0; t<tilemap.length; t++) {
        var tile = tilemap[t];
        debug_string = debug_string.concat(" [").concat(tile.x.toString()).concat(",").concat(tile.y.toString()).concat(",").concat(tile.biome_1.toString()).concat(",").concat(tile.biome_2.toString()).concat(",").concat(tile.rotation.toString()).concat(",").concat(tile.animal_options[0].toString()).concat(",").concat(tile.animal_options[1].toString()).concat(",").concat(tile.animal_options[2].toString()).concat(",").concat("]");
        
		renderTile(tilemap[t]);
	}
    debug(debug_string);
}

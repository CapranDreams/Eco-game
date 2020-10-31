var socket = io();



//socket.emit('hello', "testtest");
//socket.emit('newgame', "newgame");




function hideGameMenu() {
	document.getElementById('newgame1').style.visibility = "hidden";
	document.getElementById('newgame2').style.visibility = "hidden";
	document.getElementById('newgame3').style.visibility = "hidden";
	document.getElementById('newgame4').style.visibility = "hidden";
	document.getElementById('newgame5').style.visibility = "hidden";
	document.getElementById('newgame6').style.visibility = "hidden";
	document.getElementById('newgame7').style.visibility = "hidden";
	document.getElementById('newgame8').style.visibility = "hidden";
	document.getElementById('chooseTeam1').style.visibility = "hidden";
	document.getElementById('chooseTeam2').style.visibility = "hidden";
	document.getElementById('chooseTeam3').style.visibility = "hidden";
	document.getElementById('chooseTeam4').style.visibility = "hidden";
	document.getElementById('chooseTeam5').style.visibility = "hidden";
	document.getElementById('chooseTeam6').style.visibility = "hidden";
	document.getElementById('chooseTeam7').style.visibility = "hidden";
	document.getElementById('chooseTeam8').style.visibility = "hidden";
	document.getElementById('enlargetext').style.visibility = "hidden";
	document.getElementById('gamesettingsclose').style.visibility = "hidden";
	document.getElementById('gamesettingsdiv').style.visibility = "hidden";
	document.getElementById('config_game').style.visibility = "visible";
	document.getElementById('choose_team_label').style.visibility = "hidden";
}
function showGameMenu() {
	document.getElementById('gamesettingsdiv').style.visibility = "visible";
	document.getElementById('gamesettingsclose').style.visibility = "visible";
	document.getElementById('enlargetext').style.visibility = "visible";
	if (my_team == 1) {
		document.getElementById('newgame1').style.visibility = "visible";
		document.getElementById('newgame2').style.visibility = "visible";
		document.getElementById('newgame3').style.visibility = "visible";
		document.getElementById('newgame4').style.visibility = "visible";
		document.getElementById('newgame5').style.visibility = "visible";
		document.getElementById('newgame6').style.visibility = "visible";
		document.getElementById('newgame7').style.visibility = "visible";
		document.getElementById('newgame8').style.visibility = "visible";
	}
	else {
		document.getElementById('choose_team_label').style.visibility = "visible";
	}
	document.getElementById('chooseTeam1').style.visibility = "visible";
	document.getElementById('chooseTeam2').style.visibility = "visible";
	document.getElementById('chooseTeam3').style.visibility = "visible";
	document.getElementById('chooseTeam4').style.visibility = "visible";
	document.getElementById('chooseTeam5').style.visibility = "visible";
	document.getElementById('chooseTeam6').style.visibility = "visible";
	document.getElementById('chooseTeam7').style.visibility = "visible";
	document.getElementById('chooseTeam8').style.visibility = "visible";
	document.getElementById('config_game').style.visibility = "hidden";
}
function newGame(player_count) {
	//init_map();
	msg("Wait for turn...");
    msg_color(2);
	hideGameMenu();
	socket.emit('newgame', my_id, player_count);
}

function newTurn() {
	msg("Select a tile");
    msg_color(1);
	socket.emit('getpool', my_id);
}

socket.on('connect', () => {
	document.getElementById('id').innerHTML = "ID: ".concat(my_id).concat("(").concat(my_team).concat(")");
});

socket.on('giveid', (id, team) => {
	my_id = id;
	//my_team = team;
	document.getElementById('id').innerHTML = "ID: ".concat(my_id).concat(" (team: ").concat(my_team).concat(")");
    //debug("new id assigned");
});

socket.on('send_pool', (p1, p2, p3, p4) => {
    //debug("pool 1: ".concat(p1));
    set_pool(p1,p2,p3,p4);
});

socket.on('send_starter_tiles', (team, p1, p2, p3) => {
	if (team == my_team) {
		//debug("starting tile 1: ".concat(p1));
		init_map(p1,p2,p3);
		msg('Wait for turn...');
        msg_color(2);
	}
});

socket.on('turn', (id, turnnum) => {
	if((my_team-1) == id) {
        global_allow_tile_select = true;
		turns_remaining = 20 - turnnum;
        document.getElementById('tiles_remaining').innerHTML = 'Tiles Remaining: '.concat(turns_remaining);
        msg("Your turn! Pick pair");
        msg_color(1);
    }
	indicateTurn(id);
	//debug(id);
});

socket.on('use_score_rules', (a, b, c, d, e) => {
	//debug(a.toString().concat(b.toString()).concat(c.toString()).concat(d.toString()).concat(e.toString()));
	var beartext = 'Err: invalid score card selection.';
    switch (a) {
		case 0:
            beartext = `
                <h4 style="margin:0.25vw">Pairs of Bears</h4>
                <p style="margin-left:0.4vw">Must be pairs (no more, no less)</p>
                <table style="width:100%">
                    <tr>
                        <th>Pairs</th>
                        <td>1</td> 
                        <td>2</td> 
                        <td>3</td> 
                        <td>4</td> 
                        <td>5+</td> 
                    </tr>
                    <tr>
                        <th>VP</th>
                        <td>4</td>
                        <td>12</td>
                        <td>24</td>
                        <td>40</td>
                        <td>60</td>
                    </tr>
                </table>
                `; 
            break;
        case 1:
            beartext = `
                <h4 style="margin:0.25vw">Ursa Commune</h4>
                <p style="margin-left:0.4vw">10VP per group of exactly 3 bears (no more)</p>
                `; 
            break;
        case 2:
            beartext = `
                <h4 style="margin:0.25vw">Goldilocks Zone</h4>
                <p style="margin-left:0.4vw">+1 VP per adjacent bear</p>
                <p style="margin-left:0.4vw"><strong>-2</strong> VP per adjacent wolf</p>
                <p style="margin-left:0.4vw">+2 VP per adjacent fish</p>
                `; 
            break;
	}
	document.getElementById('bearscoring_info').innerHTML = beartext;
	
    
	var wolftext = 'Err: invalid score card selection.';
    switch (b) {
		case 0:
            wolftext = `
                <h4 style="margin:0.25vw">Diverse Hunting</h4>
                <p style="margin-left:0.4vw">1 VP per non-wolf animal adjacent to each wolf</p>
            `; 
            break;
		case 1:
            wolftext = `
                <h4 style="margin:0.25vw">Healthy Meals</h4>
                <p style="margin-left:0.4vw">1 VP per unique animal adjacent to each wolf</p>
            `; 
            break;
		case 2:
            wolftext = `
                <h4 style="margin:0.25vw">Horns of Plenty</h4>
                <p style="margin-left:0.4vw">10 VP per wolf with 3 adjascent deer</p>
            `; 
            break;
	}
	document.getElementById('wolfscoring_info').innerHTML = wolftext;
	
    
    var deertext = 'Err: invalid score card selection.';
    switch (c) {
		case 0:
            deertext = `
            <h4 style="margin:0.25vw">Quad-Prong</h4>
            <p style="margin-left:0.4vw">   each single deer worth 2VP</br>
                                            each double deer worth 5VP</br>
                                            each triple deer worth 10VP</br>
                                            each quad deer worth 18VP</p>
            `; 
            break;
		case 1:
            deertext = `
            <h4 style="margin:0.25vw">Stomping Line</h4>
            <p style="margin-left:0.4vw">VP based on length of deer chain</p>
            <table style="width:100%">
                <tr>
                    <th>Length</th>
                    <td>1</td> 
                    <td>2</td> 
                    <td>3</td> 
                    <td>4</td> 
                    <td>5</td> 
                    <td>6+</td> 
                </tr>
                <tr>
                    <th>VP</th>
                    <td>2</td>
                    <td>5</td>
                    <td>9</td>
                    <td>13</td>
                    <td>18</td>
                    <td>24</td>
                </tr>
            </table>
            `; 
            break;
		case 2:
            deertext = `
            <h4 style="margin:0.25vw">Prismatic Antlers</h4>
            <p style="margin-left:0.4vw">VP based on matched shape</p>
            <table style="width:100%">
                <tr>
                    <th>Shape</th>
                    <td>dot</td> 
                    <td>line</td> 
                    <td>triangle</td> 
                    <td>diamond</td> 
                    <td>hexagon</td> 
                </tr>
                <tr>
                    <th>VP</th>
                    <td>2</td>
                    <td>5</td>
                    <td>10</td>
                    <td>16</td>
                    <td>30</td>
                </tr>
            </table>
            `; 
            break;
	}
	document.getElementById('deerscoring_info').innerHTML = deertext;
	
    
    var eagletext = 'Err: invalid score card selection.';
    switch (d) {
		case 0:
            eagletext = `
            <h4 style="margin:0.25vw">Competitive Skies</h4>
            <p style="margin-left:0.4vw">Number of eagles without eagle neighbors</p>
            <table style="width:100%">
                <tr>
                    <th>Eagles</th>
                    <td>1</td> 
                    <td>2</td> 
                    <td>3</td> 
                    <td>4</td> 
                    <td>5</td> 
                    <td>6</td> 
                    <td>7</td> 
                    <td>8+</td> 
                </tr>
                <tr>
                    <th>VP</th>
                    <td>2</td>
                    <td>5</td>
                    <td>8</td>
                    <td>11</td>
                    <td>14</td> 
                    <td>19</td> 
                    <td>26</td> 
                    <td>32</td> 
                </tr>
            </table>
            `; 
            break;
		case 1:
            eagletext = `
            <h4 style="margin:0.25vw">Talon Maneuver</h4>
            <p style="margin-left:0.4vw">Chain of eagles spaced exactly 2 hex apart</p>
            <table style="width:100%">
                <tr>
                    <th>#</th>
                    <td>1</td> 
                    <td>2</td> 
                    <td>3</td> 
                    <td>4</td> 
                    <td>5</td> 
                    <td>6</td> 
                    <td>7</td> 
                    <td>8+</td> 
                </tr>
                <tr>
                    <th>VP</th>
                    <td>2</td>
                    <td>5</td>
                    <td>9</td>
                    <td>12</td>
                    <td>17</td> 
                    <td>24</td> 
                    <td>30</td> 
                    <td>42</td> 
                </tr>
            </table>
            `; 
            break;
		case 2:
            eagletext = `
            <h4 style="margin:0.25vw">Easy Prey</h4>
            <p style="margin-left:0.4vw">1 VP per adjacent wetland, water, or plains</p>
            `; 
            break;
	}
	document.getElementById('eaglescoring_info').innerHTML = eagletext;
	
    
    var fishtext = 'Err: invalid score card selection.';
    switch (e) {
		case 0:
            fishtext = `
            <h4 style="margin:0.25vw">Salmon Run</h4>
            <p style="margin-left:0.4vw">Fish is at most adjacent to 2 other fish or chain is broken</p>
            <table style="width:100%">
                <tr>
                    <th>Chain</th>
                    <td>1</td> 
                    <td>2</td> 
                    <td>3</td> 
                    <td>4</td> 
                    <td>5</td> 
                    <td>6</td> 
                    <td>7+</td> 
                </tr>
                <tr>
                    <th>VP</th>
                    <td>2</td>
                    <td>4</td>
                    <td>9</td>
                    <td>14</td>
                    <td>20</td>
                    <td>27</td>
                    <td>35</td>
                </tr>
            </table>
            `; 
            break;
		case 1:
            fishtext = `
            <h4 style="margin:0.25vw">Salmon Run (variant)</h4>
            <p style="margin-left:0.4vw">Fish is at most adjacent to 2 other fish or chain is broken</p>
            <table style="width:100%">
                <tr>
                    <th>Chain</th>
                    <td>1</td> 
                    <td>2</td> 
                    <td>3</td> 
                    <td>4+</td> 
                </tr>
                <tr>
                    <th>VP</th>
                    <td>2</td>
                    <td>4</td>
                    <td>9</td>
                    <td>15</td>
                </tr>
            </table>
            `; 
            break;
		case 2:
            fishtext = `
            <h4 style="margin:0.25vw">Ice-fishing</h4>
            <p style="margin-left:0.4vw">+2 VP per adjacent mountain</p>
            <p style="margin-left:0.4vw">+1 VP per fish in water or swamp</p>
            <p style="margin-left:0.4vw"><strong>-1</strong> VP per adjacent fish</p>
            `; 
            break;
	}
	document.getElementById('fishscoring_info').innerHTML = fishtext;
});

socket.on('update_score', (scores) => {
	showScore(scores);
});


socket.on('end_game', (final_scores) => {
	showScore(final_scores);
	msg("GAME OVER");
	msg_color(9);
});

function setRemaining(turns) {
	turns_remaining = turns;
	document.getElementById('tiles_remaining').innerHTML = 'Tiles Remaining: '.concat(turns_remaining);
}


function reconnect(arg) {
	msg("Refresh Webpage (ctrl + r)");
	msg_color(0);
}
socket.on('reconnect', reconnect);


function emit_turn(player, pair_num, r_tile, c_tile, rot, b1, b2, a1, a2, a3, r_a, c_a, a) {
	socket.emit("place_pair", player, pair_num, r_tile, c_tile, rot, b1, b2, a1, a2, a3, r_a, c_a, a);
}


socket.on('frame', (tilemap_frame) => {
	//var frame_team = tilemap_frame.team;
	var frame_map = tilemap_frame.map;
    //drawTilemap(frame_map);
});


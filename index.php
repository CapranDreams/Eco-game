<!DOCTYPE html>
<html lang="en">
<head>
    <title>Eco</title>
    <link type="text/css" rel="stylesheet" href="styles/main.css">

    <script>
        var global_sel_row = -1;
        var global_sel_col = -1;
        var global_sel_biome1 = -1;
        var global_sel_biome2 = -1;
        var global_sel_rot = -1;
        var global_sel_a1 = -1;
        var global_sel_a2 = -1;
        var global_sel_a3 = -1;
        var global_sel_animal = -1;
        var global_a_row = -1;
        var global_a_col = -1;
        var global_pair_num = -1;
        var global_allow_tile_select = false;
        var global_enable_tile_placement = false;
        var global_tile_placed = false;
        var global_enable_animal_placement = false;
        var global_enable_rotation_placement = false;
        var global_id_preview = "preview";
        var rotateBypass = false;
        var my_id = -1;
        var my_team = -1;
        var turns_remaining = -1;
        var num_player_game = 0;
        var debugMode = false;
        var themeColor = '#ccc';
        var NUM_BEAR_SCORE_CARDS = 3;
        var NUM_WOLF_SCORE_CARDS = 3;
        var NUM_DEER_SCORE_CARDS = 3;
        var NUM_EAGLE_SCORE_CARDS = 3;
        var NUM_FISH_SCORE_CARDS = 3;
    </script>
    <script src="/socket.io/socket.io.js"></script>
    <script src="client.js"></script>
    <script src="support.js"></script>
	<!-- <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> -->
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js"></script>
</head>
<body>
	
	<div id="left" style="background:#ccc"></div>
	<div id="right" style="background:#ccc"></div>
	<div id="top" style="background:#ccc"></div>
	<div id="bottom" style="background:#ccc"></div>

	<button id="rulebook" class="rulebook"><a href="#modal">Rules Book</a></button>
    <div id="modal">
        <div class="modal-content">
            <div class="header"><span class="left_justified modal_title">Game Instructions:<a class="right_justified close_btn" href="#">Close Link</a></span></div>
            <div class="modal_body">
                <img src="src/instructions.png" class="img_right" style="width:100%;"/>
            </div>
        </div>
        <div class="overlay"></div>
    </div>
    
    <button id="config_game" class="config_game" onclick="showGameMenu()">Game</button>
    <div class='gamesettingsdiv' id='gamesettingsdiv'>
        <button id="gamesettingsclose" class="close_tab" onclick="hideGameMenu()">X</button>
        <button id="newgame1" class="newgame1" onclick="newGame(1)">New 1 Player Game</button>
        <button id="newgame2" class="newgame2" onclick="newGame(2)">New 2 Player Game</button>
        <button id="newgame3" class="newgame3" onclick="newGame(3)">New 3 Player Game</button>
        <button id="newgame4" class="newgame4" onclick="newGame(4)">New 4 Player Game</button>
        <button id="newgame5" class="newgame5" onclick="newGame(5)">New 5 Player Game</button>
        <button id="newgame6" class="newgame6" onclick="newGame(6)">New 6 Player Game</button>
        <button id="newgame7" class="newgame7" onclick="newGame(7)">New 7 Player Game</button>
        <button id="newgame8" class="newgame8" onclick="newGame(8)">New 8 Player Game</button>
        <span id="choose_team_label" class="choose_team_label">Choose Team:</span>
        <button id="chooseTeam1" class="chooseTeam1" onclick="chooseTeam(1)">1</button>	
        <button id="chooseTeam2" class="chooseTeam2" onclick="chooseTeam(2)">2</button>	
        <button id="chooseTeam3" class="chooseTeam3" onclick="chooseTeam(3)">3</button>	
        <button id="chooseTeam4" class="chooseTeam4" onclick="chooseTeam(4)">4</button>	
        <button id="chooseTeam5" class="chooseTeam5" onclick="chooseTeam(5)">5</button>	
        <button id="chooseTeam6" class="chooseTeam6" onclick="chooseTeam(6)">6</button>	
        <button id="chooseTeam7" class="chooseTeam7" onclick="chooseTeam(7)">7</button>	
        <button id="chooseTeam8" class="chooseTeam8" onclick="chooseTeam(8)">8</button>	
        <button id="enlargetext" class="enlargetext" onclick="toggleTextSize()">Enable larger text</button>
    </div>
    <div id="id" class="player_id">connect for ID...</div>
	
	<div class="scoreboard">
		<span style="color:#c9c2c0;">Scores:</span>
		<span style="color:#46c902;" id="1_score">0</span>
		<span style="color:#c69006;" id="2_score">0</span>
		<span style="color:#a60046;" id="3_score">0</span>
		<span style="color:#09a8ad;" id="4_score">0</span>
		<span style="color:#1bb57f;" id="5_score">0</span>
		<span style="color:#f0463a;" id="6_score">0</span>
		<span style="color:#5614fa;" id="7_score">0</span>
		<span style="color:#bede0b;" id="8_score">0</span>
	</div>
    
    <div class="tiles_remaining" id="tiles_remaining_box">
        <span id="tiles_remaining">Tiles Remaining: 20</span>
    </div>
    <div class="debug" id="debug_container" >
        <span id="debug">...</span>
    </div>
    <div>
        <span class="msg" id="msg">Press New Game</span>
    </div>
	
	<div class="deck">
        <div>
            <span class="deck_pair_1" id="deck_pair_1" onclick="pair_select(1)"></span>
            <img src="src/tileset/01.png" class="tile_deck" id="tile_deck_1" onclick="pair_select(1)"/>
            <img src="src/pip_eagle.png" class="tile_deck" id="animal_deck_1a" onclick="pair_select(1)"/>
            <img src="src/pip_bear.png" class="tile_deck" id="animal_deck_1b" onclick="pair_select(1)"/>
            <img src="src/pip_fish.png" class="tile_deck" id="animal_deck_1c" onclick="pair_select(1)"/>
            <img src="src/pip_eagle.png" class="pip_deck" id="pip_deck_1" onclick="pair_select(1)"/>
        </div>
		<div>
            <span class="deck_pair_2" id="deck_pair_2" onclick="pair_select(2)"></span>
            <img src="src/tileset/40.png" class="tile_deck" id="tile_deck_2" onclick="pair_select(2)"/>
            <img src="src/pip_deer.png" class="tile_deck" id="animal_deck_2a" onclick="pair_select(2)"/>
            <img src="src/pip_bear.png" class="tile_deck" id="animal_deck_2b" onclick="pair_select(2)"/>
            <img src="src/blank.png" class="tile_deck" id="animal_deck_2c" onclick="pair_select(2)"/>
            <img src="src/pip_fish.png" class="pip_deck" id="pip_deck_2" onclick="pair_select(2)"/>
        </div>
		<div>
            <span class="deck_pair_3" id="deck_pair_3" onclick="pair_select(3)"></span>
            <img src="src/tileset/23.png" class="tile_deck" id="tile_deck_3" onclick="pair_select(3)"/>
            <img src="src/pip_eagle.png" class="tile_deck" id="animal_deck_3a" onclick="pair_select(3)"/>
            <img src="src/pip_deer.png" class="tile_deck" id="animal_deck_3b" onclick="pair_select(3)"/>
            <img src="src/blank.png" class="tile_deck" id="animal_deck_3c" onclick="pair_select(3)"/>
            <img src="src/pip_deer.png" class="pip_deck" id="pip_deck_3" onclick="pair_select(3)"/>
        </div>
		<div>
            <span class="deck_pair_4" id="deck_pair_4" onclick="pair_select(4)"></span>
            <img src="src/tileset/31.png" class="tile_deck" id="tile_deck_4" onclick="pair_select(4)"/>
            <img src="src/pip_deer.png" class="tile_deck" id="animal_deck_4a" onclick="pair_select(4)"/>
            <img src="src/pip_bear.png" class="tile_deck" id="animal_deck_4b" onclick="pair_select(4)"/>
            <img src="src/pip_wolf.png" class="tile_deck" id="animal_deck_4c" onclick="pair_select(4)"/>
            <img src="src/pip_wolf.png" class="pip_deck" id="pip_deck_4" onclick="pair_select(4)"/>
        </div>
	</div>
    
	<button id="rotate_cw" class="rotation_cw" onclick="rotate(1)">
        <img class="img_rotate" src='src/CW.png' />
    </button>	
	<button id="rotate_ccw" class="rotation_ccw" onclick="rotate(-1)">
        <img class="img_rotate" src='src/CCW.png' />
    </button>
	<button id="submit_tile" class="submit_tile" onclick="submit_tile()">SUBMIT TILE</button>	
	<button id="sacrifice_animal" class="sacrifice_animal" onclick="sacrifice_animal()">SACRIFICE ANIMAL</button>	
			
	<div class="tile-grid">
		<div id="draggable" class="ui-widget-content">
			<div class="tilebg" id="tilebag">
                
			</div>
		</div>
	</div>
    <script>$( function() { $( "#draggable" ).draggable(); } );</script>
	
	<div>
        <div id="bearscoring" class="bearscoring" onclick="score_info('bearscoring_info')"></div>
        <div id="bearscoring_info" class="bearscoring_info" onclick="score_info_close('bearscoring_info')"></div>
                                
		<div id="wolfscoring" class="wolfscoring" onclick="score_info('wolfscoring_info')"></div>
        <div id="wolfscoring_info" class="wolfscoring_info" onclick="score_info_close('wolfscoring_info')"></div>
        
		<div id="deerscoring" class="deerscoring" onclick="score_info('deerscoring_info')"></div>
        <div id="deerscoring_info" class="deerscoring_info" onclick="score_info_close('deerscoring_info')"></div>
        
		<div id="eaglescoring" class="eaglescoring" onclick="score_info('eaglescoring_info')"></div>
        <div id="eaglescoring_info" class="eaglescoring_info" onclick="score_info_close('eaglescoring_info')"></div>
        
		<div id="fishscoring" class="fishscoring" onclick="score_info('fishscoring_info')"></div>
        <div id="fishscoring_info" class="fishscoring_info" onclick="score_info_close('fishscoring_info')"></div>
	</div>
    
    
	
</body>
</html>
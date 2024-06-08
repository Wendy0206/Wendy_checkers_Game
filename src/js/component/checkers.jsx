
import React from "react";
import { useState, useEffect } from "react";



export const Checkers = () => {
  const [countMove, setCountMove] = useState(0);
  const [boardValue, setBoardValue] = useState([]);
  const [potentialMove, setPotentialMove] = useState({});
  const [playerScore, setPlayerScore] = useState({ player: 0, playerM: 0, player2: 0, player2M: 0 });
  const [lastRecord, setLastRecord] = useState({});

  useEffect(() => {

    initialize_board();

  }, []);


  const initialize_board = () => {

    // since an array  by default start at 0, I add a dummy object at index 0 so we can actually start at 1 to match the board movement. I also add the first one
    let reset_board = [{ classN: 'dark_brown', i: 0, checker: 'O' }, { classN: 'dark_brown', type: true, position: 1, checker: 'O', id: 'C1' }];
    for (let i = 2; i < 65; i++) {
      let newObj = {};
      //   initialize the object with the empty square
      newObj.type = false;
      newObj.checker = '';
      newObj.id = 'C' + i;
      if (reset_board[i - 1].classN == 'dark_brown') {
        // the checkers board seems to be an alternate series at first sight, you have it like black, white,black, white... but with one particularity 
        //every row should start with the end of the row above, that's why I use the Modulo 8 since it is a  8x8 board, therefore the index of the square at the end modulo 8 will always be 0. 


        if ((i - 1) % 8 == 0) {
          newObj.classN = 'dark_brown';
          newObj.type = true;
          if (i < 24) {
            newObj.checker = 'O';
          }
          if (i > 40) {
            newObj.checker = 'X';
          }

        }

        else {
          newObj.classN = 'light_brown';
        }
      }

      else {

        if ((i - 1) % 8 == 0) {
          newObj.classN = 'light_brown';
        }
        else {
          newObj.classN = 'dark_brown';
          newObj.type = true;
          if (i < 24) {
            newObj.checker = 'O';
          }
          if (i > 40) {
            newObj.checker = 'X';
          }

        }

      }

      newObj.position = i;
      reset_board.push(newObj);

    }

    setBoardValue(reset_board);
    setCountMove(0);
    let player_score_obj = { player: 0, playerM: 0, player2: 0, player2M: 0 };
    setPlayerScore(player_score_obj);


  }


  function remove_highlight() {

    let all_sqr = document.querySelectorAll('.possible_move');
    if (all_sqr) {
      for (let i = 0; i < all_sqr.length; i++) {
        all_sqr[i].classList.remove('possible_move');
      }
    }

    let all_current = document.querySelectorAll('.theBoard>div');
    if (all_current) {
      for (let i = 0; i < all_current.length; i++) {
        all_current[i].classList.remove('current_move');
      }
    }

  }

  const get_board_record = () => {
    let boardSNapshot = boardValue.map((elm) => elm);
    sessionStorage.setItem('undoboard', JSON.stringify(boardSNapshot));
  }



  function check_whos_playing(board) {

    if (countMove % 2== 0) {

      if (boardValue[board.position].checker.charAt(0) == 'O' || ( potentialMove.current && boardValue[potentialMove.current].checker.charAt(0)=='O')) {

          Move_cell(board);
      }
      else {
        var clear_potential_move = {};
    setPotentialMove(clear_potential_move);
    remove_highlight();
        alert('it is not your turn player X');
      }
    }

    else {
      if (boardValue[board.position].checker.charAt(0) == 'X' ||  (potentialMove.current && boardValue[potentialMove.current].checker.charAt(0)=='X') ) {

            Move_cell(board)
      }
      else {
        var clear_potential_move = {};
    setPotentialMove(clear_potential_move);
    remove_highlight();
        alert('it is not your turn player O');
      }

    }

  }

  function jump_move(board) {
   
    // below we get the current record for the undo function before we change it
    setLastRecord(playerScore);

    // below we clone the board to make the changes
    let clone_board = [...boardValue];

    // set the new record for our dashboard
    var clone_player_score = { player: playerScore.player, playerM: playerScore.playerM, player2: playerScore.player2, player2M: playerScore.player2M };
    let which_score = 0; // 1 or 2 or 3 depends on the move

    // below we check if this was a jump or double jump to also remove the piece(s) we jump and add score to the player

    if (potentialMove.thirdl == board.position) {
      clone_board[potentialMove.jumpl].checker = '';
      which_score = 1;
    }

    else if (potentialMove.thirdr == board.position) {
      clone_board[potentialMove.jumpr].checker = '';
      which_score = 1;
    }

    else if (potentialMove.fourthl == board.position) {
      clone_board[potentialMove.jumpl].checker = '';
      clone_board[potentialMove.jump2l].checker = '';
      which_score = 2;
    }

    else if (potentialMove.fourthr == board.position) {
      clone_board[potentialMove.jumpr].checker = '';
      clone_board[potentialMove.jump2r].checker = '';
      which_score = 2;
    }

    else if (potentialMove.fourthld == board.position) {
      clone_board[potentialMove.jumpl].checker = '';
      clone_board[potentialMove.jump2ld].checker = '';
      which_score = 2;

    }
    else if (potentialMove.fourthlu == board.position) {
      clone_board[potentialMove.jumpl].checker = '';
      clone_board[potentialMove.jump2lu].checker = '';
      which_score = 2;
    }

    else if (potentialMove.fourthrd == board.position) {
      clone_board[potentialMove.jumpr].checker = '';
      clone_board[potentialMove.jump2rd].checker = '';
      which_score = 2;
    }

    else if (potentialMove.fourthru == board.position) {
      clone_board[potentialMove.jumpr].checker = '';
      clone_board[potentialMove.jump2ru].checker = '';
      which_score = 2;
    }


    if (board.position == potentialMove.bthirdl) {
      clone_board[potentialMove.bjumpl].checker = '';
      which_score = 1;
    }

    else if (board.position == potentialMove.bthirdr) {
      clone_board[potentialMove.bjumpr].checker = '';
      which_score = 1;
    }

    else if (board.position == potentialMove.bfourthl) {
      clone_board[potentialMove.bjumpl].checker = '';
      clone_board[potentialMove.bjump2l].checker = '';
      which_score = 2;
    }

    else if (board.position == potentialMove.bfourthr) {
      clone_board[potentialMove.bjumpr].checker = '';
      clone_board[potentialMove.bjump2r].checker = '';
      which_score = 2;
    }

    else if (board.position == potentialMove.bfourthld) {
      clone_board[potentialMove.bjumpl].checker = '';
      clone_board[potentialMove.bjump2ld].checker = '';
      which_score = 2;
    }

    else if (board.position == potentialMove.bfourthlu) {
      clone_board[potentialMove.bjumpl].checker = '';
      clone_board[potentialMove.bjump2lu].checker = '';
      which_score = 2;
    }

    else if (board.position == potentialMove.bfourthrd) {
      clone_board[potentialMove.bjumpr].checker = '';
      clone_board[potentialMove.bjump2rd].checker = '';
      which_score = 2;
    }

    else if (board.position == potentialMove.bfourthru) {
      clone_board[potentialMove.bjumpr].checker = '';
      clone_board[potentialMove.bjump2ru].checker = '';
      which_score = 2;
    }


    // below we check the player and move the piece from its initial to its final position
    if (boardValue[potentialMove.current].checker.charAt(0) == 'O') {

      // where you land
      clone_board[board.position].checker = 'O';
      if (boardValue[potentialMove.current].checker=="OK") { clone_board[board.position].checker = 'OK' };

      // here we check if you land on the first line to become a king
      if (board.position == 64 || board.position == 62 || board.position == 60 || board.position == 58) { clone_board[board.position].checker = 'OK'; }

      // we increment move for our dashboard
      clone_player_score.playerM++;

      // and here we add the score
      clone_player_score.player = playerScore.player + which_score;
    } else if (boardValue[potentialMove.current].checker.charAt(0) == 'X') {

      // where you land
      clone_board[board.position].checker = 'X';
      if (boardValue[potentialMove.current].checker=="XK") { clone_board[board.position].checker = 'XK' };

      // here we check if you land on the first line to become a king
      if (board.position == 1 || board.position == 3 || board.position == 5 || board.position == 7) { clone_board[board.position].checker = 'XK'; }

      // we increment move for our dashboard
      clone_player_score.player2M++;

      // and here we add the score
      clone_player_score.player2 = playerScore.player2 + which_score;
    }


    // clear where you come from
    clone_board[potentialMove.current].checker = '';

    // set the new board position
    setBoardValue(clone_board);
    // set the new player score 
    setPlayerScore(clone_player_score);

    // we count each moves which we use later to know whos playing, first player gets odd and second player gets even number
    setCountMove(countMove + 1);

    // reset the potential move obj
    var clear_potential_move = {};
    setPotentialMove(clear_potential_move);
    return;

    // here the jump_move function ends
  }



  function Move_cell(board) {

    // below we remove the potential css class that highlights the move
    remove_highlight();

    const potentialPositions = [
      potentialMove.firstl,
      potentialMove.firstr,
      potentialMove.bfirstl,
      potentialMove.bfirstr,
      potentialMove.thirdl,
      potentialMove.thirdr,
      potentialMove.fourthl,
      potentialMove.fourthr,
      potentialMove.fourthld,
      potentialMove.fourthlu,
      potentialMove.fourthrd,
      potentialMove.fourthru,
     potentialMove.bfirstl,
     potentialMove.bfirstr,
     potentialMove.bbfirstl,
     potentialMove.bbfirstr,
     potentialMove.bthirdl,
     potentialMove.bthirdr,
     potentialMove.bfourthl,
     potentialMove.bfourthr,
     potentialMove.bfourthld,
     potentialMove.bfourthlu,
     potentialMove.bfourthrd,
     potentialMove.bfourthru,
   
  ];
  
    // check if this move is the result of a potential clean move or an attempt to jump your opponent piece
    if (potentialPositions.includes(board.position)) {
      jump_move(board);
      return;
    }else{
      var clear_potential_move = {};
      setPotentialMove(clear_potential_move);
    }



    // if it wasn't potential move taking place so the player is checking if he/she can move
    if (boardValue[board.position].checker) {
    
      let current_spot = '#C' + board.position;
      let this_spot = document.querySelector(current_spot);
      this_spot.classList.add('current_move');


      if (boardValue[board.position].checker == 'O') {
        let opponent = 'X';
        first_player_check_move(board, opponent);
      }

      else if (boardValue[board.position].checker == 'X') {
        let opponent = 'O';
        second_player_check_move(board, opponent);
      }
      else if (boardValue[board.position].checker == 'XK' || boardValue[board.position].checker == 'OK') {
        king_check_move(board);
      }

    }

  }




  function first_player_check_move(board, opponent) {

    var clone_obj = { current: board.position };

    // check if you have your first clean move
    if (boardValue[board.position + 7] && boardValue[board.position + 7].checker == '' && boardValue[board.position + 7].type == true) {
      let nw_spot = board.position + 7;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');

      //this is where you land
      clone_obj.firstl = nw_spot;
    }

    // check if your first potential move is a game
    if (boardValue[board.position + 7] && boardValue[board.position + 7].checker.charAt(0) == opponent && boardValue[board.position + 14] && boardValue[board.position + 14].type && boardValue[board.position + 14].checker == '') {
      let nw_spot = board.position + 14;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');

      //this is where you land
      clone_obj.thirdl = nw_spot;
      // this is the piece you jump
      clone_obj.jumpl = board.position + 7;
    }


    // check if your first potential move is a double game
    if (boardValue[board.position + 7] && boardValue[board.position + 7].checker.charAt(0) == opponent && boardValue[board.position + 14] && boardValue[board.position + 14].type && boardValue[board.position + 14].checker == '' && boardValue[board.position + 21] && boardValue[board.position + 21].checker.charAt(0) == opponent && boardValue[board.position + 28] && boardValue[board.position + 28].checker == '' && boardValue[board.position + 28].type) {
      let new_spot = board.position + 28;
      let get_id = '#C' + new_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');

      //this is where you land
      clone_obj.fourthl = new_spot;
      // this is the piece you jump
      clone_obj.jump2l = board.position + 21;
    }

    // check if your first potential move is a double  game down
    if (boardValue[board.position + 7] && boardValue[board.position + 7].checker.charAt(0) == opponent && boardValue[board.position + 14] && boardValue[board.position + 14].type && boardValue[board.position + 14].checker == '' && boardValue[board.position + 23] && boardValue[board.position + 23].checker.charAt(0) == opponent && boardValue[board.position + 32] && boardValue[board.position + 32].checker == '' && boardValue[board.position + 32].type) {
      let nw_spot = board.position + 32;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');

      // this is where you land
      clone_obj.fourthld = nw_spot;
      // this is the piece you jump
      clone_obj.jump2ld = board.position + 23;
    }


    // check if your first potential move is a double up game
    if (boardValue[board.position + 7] && boardValue[board.position + 7].checker.charAt(0) == opponent && boardValue[board.position + 14] && boardValue[board.position + 14].checker == '' && boardValue[board.position + 5] && boardValue[board.position + 5].checker.charAt(0) == opponent && boardValue[board.position - 4] && boardValue[board.position - 4].checker == '' && boardValue[board.position - 4].type) {
      let nw_spot = board.position - 4;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');

      // this is where you land
      clone_obj.fourthlu = nw_spot;
      // this is the piece you jump
      clone_obj.jump2lu = board.position + 5;
    }


    // now we're going to check the right side

    // check if you have a second clean move
    if (boardValue[board.position + 9] && boardValue[board.position + 9].checker == '' && boardValue[board.position + 9].type) {
      let new_spot = board.position + 9;
      let get_id = '#C' + new_spot;
      let second_spot = document.querySelector(get_id);
      second_spot.classList.add('possible_move');
      clone_obj.firstr = new_spot;

    }

    // check if your second move is a potential game
    if (boardValue[board.position + 9] && boardValue[board.position + 9].checker.charAt(0) == opponent && boardValue[board.position + 18] && boardValue[board.position + 18].checker == '') {
      let nw_spot = board.position + 18;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');

      clone_obj.thirdr = nw_spot;
      clone_obj.jumpr = board.position + 9;
    }

    // check if your first potential move is a double game
    if (boardValue[board.position + 9] && boardValue[board.position + 9].checker.charAt(0) == opponent && boardValue[board.position + 18] && boardValue[board.position + 18].checker == '' && boardValue[board.position + 27] && boardValue[board.position + 27].checker.charAt(0) == opponent && boardValue[board.position + 36] && boardValue[board.position + 36].checker == '' && boardValue[board.position + 36].type) {
      let nw_spot = board.position + 36;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');

      // this is where you land
      clone_obj.fourthr = nw_spot;
      // this is the piece you jump
      clone_obj.jump2r = board.position + 27;
    }


    // check if your first potential move is a double game down
    if (boardValue[board.position + 9] && boardValue[board.position + 9].checker.charAt(0) == opponent && boardValue[board.position + 18] && boardValue[board.position + 18].checker == '' && boardValue[board.position + 25] && boardValue[board.position + 25].checker.charAt(0) == opponent && boardValue[board.position + 32] && boardValue[board.position + 32].checker == '') {
      let nw_spot = board.position + 32;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');

      // this is where you land
      clone_obj.fourthrd = nw_spot;
      // this is where you jump
      clone_obj.jump2rd = board.position + 25;
    }

    // check if your first potential move is a double game up
    if (boardValue[board.position + 9] && boardValue[board.position + 9].checker.charAt(0) == opponent && boardValue[board.position + 18] && boardValue[board.position + 18].checker == '' && boardValue[board.position + 11].checker.charAt(0) == opponent && boardValue[board.position + 4].checker == '' && boardValue[board.position + 4].type == true) {
      let nw_spot = board.position + 4;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');

      // this is where you land
      clone_obj.fourthru = nw_spot;
      // this is where you jump
      clone_obj.jump2ru = board.position + 11;
    }

    setPotentialMove(clone_obj);
    get_board_record();
    console.log('this is the potential move in our state : ', clone_obj);
    return clone_obj;

  }


  function second_player_check_move(board, opponent) {

    var clone_obj = { current: board.position }

    // check if our first move is clean
    if (boardValue[board.position - 7] && boardValue[board.position - 7].checker == '' && boardValue[board.position - 7].type == true) {
      let new_spot = board.position - 7;
      let get_id = '#C' + new_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      clone_obj.bfirstr = new_spot;
    }


    // check if your first potential move is a game
    if (boardValue[board.position - 7] && boardValue[board.position - 7].checker.charAt(0) == opponent && boardValue[board.position - 14] && boardValue[board.position - 14].type && boardValue[board.position - 14].checker == '') {
      let new_spot = board.position - 14;
      let get_id = '#C' + new_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');

      // this is where you land
      clone_obj.bthirdr = new_spot;
      // this is the piece you're jumping
      clone_obj.bjumpr = board.position - 7;
    }


    // check if your first potential move is a double game
    if (boardValue[board.position - 7] && boardValue[board.position - 7].checker.charAt(0) == opponent && boardValue[board.position - 14] && boardValue[board.position - 14].type && boardValue[board.position - 14].checker == '' && boardValue[board.position - 21] && boardValue[board.position - 21].checker.charAt(0) == opponent && boardValue[board.position - 28] && boardValue[board.position - 28].checker == '' && boardValue[board.position - 28].type) {
      let new_spot = board.position - 28;
      let get_id = '#C' + new_spot;
      let second_spot = document.querySelector(get_id);
      second_spot.classList.add('possible_move');
      // this is where you land
      clone_obj.bfourthr = new_spot;
      // this is the piece you jump
      clone_obj.bjump2r = board.position - 21;
    }

    // check if your first potential move is a double game up
    if (boardValue[board.position - 7] && boardValue[board.position - 7].checker.charAt(0) == opponent && boardValue[board.position - 14] && boardValue[board.position - 14].checker == '' && boardValue[board.position - 23] && boardValue[board.position - 23].type && boardValue[board.position - 23].checker.charAt(0) == opponent && boardValue[board.position - 32] && boardValue[board.position - 32].checker == '') {
      let new_spot = board.position - 32;
      let get_id = '#C' + new_spot;
      let second_spot = document.querySelector(get_id);
      second_spot.classList.add('possible_move');
      // this is where you land
      clone_obj.bfourthru = new_spot;
      // this is the piece you jump
      clone_obj.bjump2ru = board.position - 23;
    }

    // check if your first potential move is a double game down
    if (boardValue[board.position - 7] && boardValue[board.position - 7].checker.charAt(0) == opponent && boardValue[board.position - 14] && boardValue[board.position - 14].checker == '' && boardValue[board.position - 5] && boardValue[board.position - 5].checker.charAt(0) == opponent && boardValue[board.position + 4] && boardValue[board.position + 4].checker == '' && boardValue[board.position + 4].type) {
      let nw_spot = board.position + 4;
      let get_id = '#C' + nw_spot;
      let second_spot = document.querySelector(get_id);
      second_spot.classList.add('possible_move');
      // this is where you land
      clone_obj.bfourthrd = nw_spot;
      // this is the piece you jupm
      clone_obj.bjump2rd = board.position - 5;
    }

    // check your second potential move is clean
    if (boardValue[board.position - 9] && boardValue[board.position - 9].checker == '' && boardValue[board.position - 9].type) {
      let nw_spot = board.position - 9;
      let get_id = '#C' + nw_spot;
      let second_spot = document.querySelector(get_id);
      second_spot.classList.add('possible_move');

      // this is where you land
      clone_obj.bfirstl = nw_spot;
    }


    // check if your second potential move is a game
    if (boardValue[board.position - 9] && boardValue[board.position - 9].checker.charAt(0) == opponent && boardValue[board.position - 18] && boardValue[board.position - 18].checker == '' && boardValue[board.position - 18] && boardValue[board.position - 18].type) {
      let nw_spot = board.position - 18;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      // this is where you land
      clone_obj.bthirdl = nw_spot;
      // this is the piece you jump
      clone_obj.bjumpl = board.position - 9;
    }

    // check if your second potential move is a double game
    if (boardValue[board.position - 9] && boardValue[board.position - 9].checker.charAt(0) == opponent && boardValue[board.position - 18] && boardValue[board.position - 18].checker == '' && boardValue[board.position - 27] && boardValue[board.position - 27].checker.charAt(0) == opponent && boardValue[board.position - 36] && boardValue[board.position - 36].checker == '' && boardValue[board.position - 36].type) {

      let nw_spot = board.position - 36;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      clone_obj.bfourthl = nw_spot;
      clone_obj.bjump2l = board.position - 27;
    }


    // check if your second potential move is a double game UP
    if (boardValue[board.position - 9] && boardValue[board.position - 9].checker.charAt(0) == opponent && boardValue[board.position - 18] && boardValue[board.position - 18].type && boardValue[board.position - 18].checker == '' && boardValue[board.position - 25] && boardValue[board.position - 25].type && boardValue[board.position - 25].checker.charAt(0) == opponent && boardValue[board.position - 32] && boardValue[board.position - 32].type && boardValue[board.position - 32].checker == '') {
      let nw_spot = board.position - 32;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      // this is where you land
      clone_obj.bfourthlu = nw_spot;
      // this is the piece you jump
      clone_obj.bjump2lu = board.position - 25;
    }

    // check if your second potential move is a double game Down
    if (boardValue[board.position - 9] && boardValue[board.position - 9].checker.charAt(0) == opponent && boardValue[board.position - 18] && boardValue[board.position - 18] && boardValue[board.position - 18].checker == '' && boardValue[board.position - 11].checker.charAt(0) == opponent && boardValue[board.position - 4].checker == '' && boardValue[board.position - 4].type == true) {
      let nw_spot = board.position - 4;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      // this is where you land
      clone_obj.bfourthld = nw_spot;
      //this is the piece you jump
      clone_obj.bjump2ld = board.position - 11;
    }
    setPotentialMove(clone_obj);
    get_board_record();
    console.log('this is the potential move in our state : ', clone_obj);

    return clone_obj;
  }


  function king_check_move(board) {

    var clone_obj = { current: board.position };

    let opponent = 'X';
    if (board.checker.charAt(0) == 'X') {
      opponent = 'O';
    }

    let forward_potential = first_player_check_move(board, opponent);
    let backward_potential = second_player_check_move(board, opponent);
    let all_potential_move = { ...forward_potential, ...backward_potential };


    setPotentialMove(all_potential_move);
    get_board_record();
    console.log('this is the potential move in for this king: ', all_potential_move);

  }



  function undo_function() {

    // we check the countMove to make sure we don't do anything if you haven't done anything yet. 
    if (countMove > 0) {
      // an undo basically sets the the game back by one move, to do this we set the Boardvalue with the undoBoardValue.
      let previous_board = JSON.parse(sessionStorage.getItem('undoboard'));
      setBoardValue(previous_board);
      setPlayerScore(lastRecord);
      setCountMove(countMove - 1);
      let clear_potential_move = {};
      setPotentialMove(clear_potential_move);
    }

  }

  return (
    <div className="container d-flex pt-5">
      <div className="theBoard"  >

        {boardValue.slice(1).map((board, ind) =>
          // icon for king move <i class="fa-solid fa-crown"></i>
          <div key={ind} className={board.classN} id={board.id} onClick={(e) => check_whos_playing(board)}><span><p>{board.checker}</p> <i className={board.checker == 'O' ? "fa-solid fa-spider fa-2xl" : board.checker == 'X' ? "fa-solid fa-mosquito fa-2xl text-dark" : board.checker == 'XK' ? "fa-solid fa-crown fa-2xl black_king" : board.checker == 'OK' ? "fa-solid fa-chess-queen fa-2xl" : " "}></i></span></div>
        )}
      </div>

      <div className="score_board" >
        <div className="score_div">
          <h5> Player 1 : {playerScore.player}<br />
            Move: {playerScore.playerM}<br /><br />
            Player 2 : {playerScore.player2}<br />
            Move: {playerScore.player2M}<br /><br /><br />
            Total Move : {countMove}
          </h5>
        </div>

        <button className="btn btn-secondary mt-3 p-3" onClick={() => undo_function()}><i className="fa-solid fa-arrow-rotate-left fa-2xl"></i></button><br />
        <button className="btn btn-danger mt-3 p-3" onClick={() => {
          remove_highlight();
          setPotentialMove({});
          initialize_board();
        }}><h5>Start over</h5></button>

      </div>

    </div>

  );

};



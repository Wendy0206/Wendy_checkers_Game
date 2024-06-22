
import React from "react";
import { useState, useEffect, useRef } from "react";



export const Checkers = () => {
  const [countMove, setCountMove] = useState(0);
  const [boardValue, setBoardValue] = useState([]);
  const undoBoard = useRef(new Array());
  const potentialMove = useRef({});
  const [playerScore, setPlayerScore] = useState({ player: 0, playerM: 0, player2: 0, player2M: 0 });
  const [lastRecord, setLastRecord] = useState({});
  const two_player = useRef(false);


  useEffect(() => {
    initialize_board();
  }, []);

  useEffect(() => {
    if (countMove % 2 == 1 && !two_player.current) {
      setTimeout(function () {
        computer_play();
        setCountMove(countMove + 1);
      }, 700);
    }
  }, [countMove]);



  const initialize_board = () => {

    // since an array  by default start at 0, I add a dummy object at index 0 so we can actually start at 1 to match the board movement. I also add the first one
    let reset_board = [{ dummy: '' }, { type: true, checker: 'O', id: 'C1', classN: 'dark_brown', position: 1 }];
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
          if (i < 24 ) {
            newObj.checker = 'O';
          }
          if (i > 40 ) {
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
          if (i < 24 ) {
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


  const remove_highlight = () => {

    let all_sqr = document.querySelectorAll('.possible_move');
    if (all_sqr) {
      all_sqr.forEach((elm)=>
        elm.classList.remove('possible_move'))  
    }

    let all_current = document.querySelectorAll('.theBoard>div');
    if (all_current) {
      all_current.forEach((elm)=>
        elm.classList.remove('current_move')
      )}
}

  const activate_two_player_mode = (e) => {
    if (e.target.checked) {
      two_player.current = true;
    }
    else {
      two_player.current = false;
    }

    remove_highlight();
    potentialMove.current = {};
    // undoBoard.current = {};
    initialize_board();
  }


  const check_whos_playing = (pos) => {

    if (boardValue[potentialMove.current.current]) {
      var check = boardValue[potentialMove.current.current].checker.charAt(0) == 'X' ? true : false;
      var check2 = boardValue[potentialMove.current.current].checker.charAt(0) == 'O' ? true : false;
    }

    if (countMove % 2 == 0) {
      if (boardValue[pos].checker.charAt(0) == 'X' || check) {
        Move_cell(pos)
      }
      else {
        potentialMove.current = {};
        remove_highlight();
        alert('it is not your turn');
      }

    }

    else {
      if (boardValue[pos].checker.charAt(0) == 'O' || check2) {
        Move_cell(pos);
      }
      else {
        potentialMove.current = {};
        remove_highlight();
        alert('it is not your turn');
      }

    }

  }

  const computer_play = () => {

    let first_player = boardValue.filter((b) => b.checker?.charAt(0) === "O");
    let all_king = boardValue.filter((b) => b.checker === "OK");
    let final = {};
    let test = -1;

    if (first_player) {
      // check the potential of each piece then move the one with the highest potential
      first_player.forEach((elm) => {
        let response = first_player_check_move(elm.position, 'X');
        if (response.size > test) {
          final = { ...response };
          test = response.size;
        }
      })
    }

    if (all_king) {
      all_king.forEach((elm) => {
        let response = second_player_check_move(elm.position, 'X');
        if (response.size >= test) {
          final = { ...response };
          test = response.size;
        }
      })
    }


    let next_spot = [];

    remove_highlight();
    if (final.size == 2) {

      if (final.fourthl) {
        next_spot.push(final.fourthl);
      }
      if (final.fourthr) {
        next_spot.push(final.fourthr);
      }
      if (final.bfourthl) {
        next_spot.push(final.bfourthl);
      }
      if (final.bfourthr) {
        next_spot.push(final.bfourthr);
      }

      if (final.fourthld) {
        next_spot.push(final.fourthld);
      }
      if (final.fourthlu) {
        next_spot.push(final.fourthlu);
      }
      if (final.bfourthld) {
        next_spot.push(final.bfourthld);
      }
      if (final.bfourthlu) {
        next_spot.push(final.bfourthlu);
      }

      if (final.fourthrd) {
        next_spot.push(final.fourthrd);
      }

      if (final.fourthru) {
        next_spot.push(final.fourthru);
      }


      if (final.bfourthrd) {
        next_spot.push(final.fourthrd);
      }

      if (final.bfourthru) {
        next_spot.push(final.bfourthru);
      }


    } else if (final.size == 1) {

      // check the possible jump first
      if (final.thirdl) {
        next_spot.push(final.thirdl);
      }
      if (final.thirdr) {
        next_spot.push(final.thirdr);
      }

      if (final.bthirdl) {
        next_spot.push(final.bthirdl);
      }
      if (final.bthirdr) {
        next_spot.push(final.bthirdr);
      }

    }
    else if (final.size == 0) {
      if (final.firstl) {
        next_spot.push(final.firstl);
      }
      if (final.firstr) {
        next_spot.push(final.firstr);
      }

      if (final.bfirstl) {
        next_spot.push(final.bfirstl);
      }
      if (final.bfirstr) {
        next_spot.push(final.bfirstr);
      }


    }
    // console.log('this is the potential move of our computer : ', final);
    // console.log('this is what we got in next_spot : ', next_spot);
    potentialMove.current = { ...final };
    let random_index = next_spot[Math.floor(Math.random() * next_spot.length)];
    jump_move(boardValue[random_index].position);

  }


  const jump_move = (pos) => {
    let move = { ...potentialMove.current };

    //below we get the current record for the undoconst before we change it
    setLastRecord(playerScore);

    // below we clone the board to make the changes
    let clone_board = [...boardValue];

    // set the new record for our dashboard
    var clone_player_score = { player: playerScore.player, playerM: playerScore.playerM, player2: playerScore.player2, player2M: playerScore.player2M };
    let which_score = 0; // 1 or 2 or 3 depends on the move

    // below we check if this was a jump or double jump to also remove the piece(s) we jump and adjust score 


    if (move.size == 3) {

      if (move.fourthl == pos) {
        clone_board[move.jumpl].checker = '';
        clone_board[move.jump2l].checker = '';
        which_score = 3;
      }

      else if (move.fourthr == pos) {
        clone_board[move.jumpr].checker = '';
        clone_board[move.jump2r].checker = '';
        which_score = 3;
      }

      else if (move.fourthld == pos) {
        clone_board[move.jumpl].checker = '';
        clone_board[move.jump2ld].checker = '';
        which_score = 3;

      }
    }

    else if (move.size == 2) {

      if (move.fourthl == pos) {
        clone_board[move.jumpl].checker = '';
        clone_board[move.jump2l].checker = '';
        which_score = 2;
      }

      else if (move.fourthr == pos) {
        clone_board[move.jumpr].checker = '';
        clone_board[move.jump2r].checker = '';
        which_score = 2;
      }

      else if (move.fourthld == pos) {
        clone_board[move.jumpl].checker = '';
        clone_board[move.jump2ld].checker = '';
        which_score = 2;

      }
      else if (move.fourthlu == pos) {
        clone_board[move.jumpl].checker = '';
        clone_board[move.jump2lu].checker = '';
        which_score = 2;
      }

      else if (move.fourthrd == pos) {
        clone_board[move.jumpr].checker = '';
        clone_board[move.jump2rd].checker = '';
        which_score = 2;
      }

      else if (move.fourthru == pos) {
        clone_board[move.jumpr].checker = '';
        clone_board[move.jump2ru].checker = '';
        which_score = 2;
      }

      else if (move.bfourthl == pos) {
        clone_board[move.bjumpl].checker = '';
        clone_board[move.bjump2l].checker = '';
        which_score = 2;
      }

      else if (move.bfourthr == pos) {
        clone_board[move.bjumpr].checker = '';
        clone_board[move.bjump2r].checker = '';
        which_score = 2;
      }

      else if (move.bfourthld == pos) {
        clone_board[move.bjumpl].checker = '';
        clone_board[move.bjump2ld].checker = '';
        which_score = 2;
      }

      else if (move.bfourthlu == pos) {
        clone_board[move.bjumpl].checker = '';
        clone_board[move.bjump2lu].checker = '';
        which_score = 2;
      }

      else if (move.bfourthrd == pos) {
        clone_board[move.bjumpr].checker = '';
        clone_board[move.bjump2rd].checker = '';
        which_score = 2;
      }

      else if (move.bfourthru == pos) {
        clone_board[move.bjumpr].checker = '';
        clone_board[move.bjump2ru].checker = '';
        which_score = 2;
      }
    }

    else if (move.size == 1) {

      if (move.thirdl == pos) {
        clone_board[move.jumpl].checker = '';
        which_score = 1;
      }

      else if (move.thirdr == pos) {
        clone_board[move.jumpr].checker = '';
        which_score = 1;
      }

      if (move.bthirdl == pos) {
        clone_board[move.bjumpl].checker = '';
        which_score = 1;
      }

      else if (move.bthirdr == pos) {
        clone_board[move.bjumpr].checker = '';
        which_score = 1;
      }
    }



    // below we check the player and move the piece from its initial to its final position
    if (boardValue[move.current].checker.charAt(0) == 'O') {



      // where you land
      clone_board[pos].checker = boardValue[move.current].checker == "O" ? "O" : "OK";

      // here we check if you land on the first line to become a king
      if (pos == 64 || pos == 62 || pos == 60 || pos == 58) { clone_board[pos].checker = 'OK'; }

      // we increment move for our dashboard
      clone_player_score.playerM++;

      // and here we add the score
      clone_player_score.player = playerScore.player + which_score;

    } else if (boardValue[move.current].checker.charAt(0) == 'X') {

      // where you land
      clone_board[pos].checker = boardValue[move.current].checker == "X" ? "X" : "XK";

      // here we check if you land on the first line to become a king
      if (pos == 1 || pos == 3 || pos == 5 || pos == 7) { clone_board[pos].checker = 'XK'; }

      // we increment move for our dashboard
      clone_player_score.player2M++;

      // and here we add the score
      clone_player_score.player2 = playerScore.player2 + which_score;
    }

    if (clone_player_score.player > 11 || clone_player_score.player2 > 11) {
      const dialog = document.getElementById('modal_dialog');
      dialog.showModal();
    }

    // clear where you come from
    clone_board[move.current].checker = '';

    // set the new board position
    setBoardValue(clone_board);
    // set the new player score 
    setPlayerScore(clone_player_score);

    // we count each moves which we use later to know whos playing, first player gets odd and second player gets even number
    setCountMove(countMove + 1);

    // reset the potential move obj for our player
    potentialMove.current = {};

    return;
    // here the jump_move function ends
  }


  const Move_cell = (pos) => {

    // below we remove the potential css class that highlights the move
    remove_highlight();

    const potentialPositions = [
      potentialMove.current.firstl,
      potentialMove.current.firstr,
      potentialMove.current.bfirstl,
      potentialMove.current.bfirstr,
      potentialMove.current.thirdl,
      potentialMove.current.thirdr,
      potentialMove.current.fourthl,
      potentialMove.current.fourthr,
      potentialMove.current.fourthld,
      potentialMove.current.fourthlu,
      potentialMove.current.fourthrd,
      potentialMove.current.fourthru,
      potentialMove.current.bfirstl,
      potentialMove.current.bfirstr,
      potentialMove.current.bfirstl,
      potentialMove.current.bfirstr,
      potentialMove.current.bthirdl,
      potentialMove.current.bthirdr,
      potentialMove.current.bfourthl,
      potentialMove.current.bfourthr,
      potentialMove.current.bfourthld,
      potentialMove.current.bfourthlu,
      potentialMove.current.bfourthrd,
      potentialMove.current.bfourthru,

    ];


    // check if this move is the result of a potential clean move or an attempt to jump your opponent piece
    if (potentialPositions.includes(pos)) {
      jump_move(pos);
      return;
    }

    // if it wasn't potential move taking place so the player is checking if he/she can move
    if (boardValue[pos].checker) {

      let current_spot = '#C' + pos;
      let this_spot = document.querySelector(current_spot);
      this_spot.classList.add('current_move');

      if (boardValue[pos].checker == 'O') {
        let opponent = 'X';
        first_player_check_move(pos, opponent);
      }

      else if (boardValue[pos].checker == 'X') {
        let opponent = 'O';
        second_player_check_move(pos, opponent);
      }
      else if (boardValue[pos].checker == 'XK' || boardValue[pos].checker == 'OK') {
        king_check_move(pos);
      }

    }

  }


  const first_player_check_move = (pos, opponent) => {

    var clone_obj = { current: pos };
    let pos4, pos4p, pos5, pos7, pos9, pos14, pos11, pos18, pos21, pos27, pos28, pos25, pos23, pos32, pos36 = false;

    if (boardValue[pos - 4] && boardValue[pos - 4].type) { pos4 = true; }
    if (boardValue[pos + 4] && boardValue[pos + 4].type) { pos4p = true; }

    if (boardValue[pos + 5] && boardValue[pos + 5].type) { pos5 = true; }
    if (boardValue[pos + 7] && boardValue[pos + 7].type) { pos7 = true; }
    if (boardValue[pos + 9] && boardValue[pos + 9].type) { pos9 = true; }
    if (boardValue[pos + 11] && boardValue[pos + 11].type) { pos11 = true; }

    if (boardValue[pos + 14] && boardValue[pos + 14].type && boardValue[pos + 14].checker == '') { pos14 = true; }
    if (boardValue[pos + 18] && boardValue[pos + 18].type && boardValue[pos + 18].checker == '') { pos18 = true; }

    if (boardValue[pos + 21] && boardValue[pos + 21].type) { pos21 = true; }
    if (boardValue[pos + 23] && boardValue[pos + 23].type) { pos23 = true; }
    if (boardValue[pos + 25] && boardValue[pos + 25].type) { pos25 = true; }
    if (boardValue[pos + 27] && boardValue[pos + 27].type) { pos27 = true; }

    if (boardValue[pos + 28] && boardValue[pos + 28].type && boardValue[pos + 28].checker == '') { pos28 = true; }

    if (boardValue[pos + 32] && boardValue[pos + 32].type) { pos32 = true; }
    if (boardValue[pos + 36] && boardValue[pos + 36].type && boardValue[pos + 36].checker == '') { pos36 = true; }


    if (pos7 || pos9) {

      // check if you have your first clean move
      if (pos7 && boardValue[pos + 7].checker == '') {
        let nw_spot = pos + 7;
        let get_id = '#C' + nw_spot;
        let first_spot = document.querySelector(get_id);
        first_spot.classList.add('possible_move');

        //this is where you land
        clone_obj.firstl = nw_spot;

        clone_obj.size = 0;
      }

      // check if you have a second clean move
      if (pos9 && boardValue[pos + 9].checker == '') {
        let new_spot = pos + 9;
        let get_id = '#C' + new_spot;
        let second_spot = document.querySelector(get_id);
        second_spot.classList.add('possible_move');
        clone_obj.firstr = new_spot;

        clone_obj.size = 0;

      }


      // check if your first potential move is a game
      if (pos7 && boardValue[pos + 7].checker.charAt(0) == opponent && pos14) {
        let nw_spot = pos + 14;
        let get_id = '#C' + nw_spot;
        let first_spot = document.querySelector(get_id);
        first_spot.classList.add('possible_move');

        //this is where you land
        clone_obj.thirdl = nw_spot;
        // this is the piece you jump
        clone_obj.jumpl = pos + 7;

        clone_obj.size = 1;
      }


      // check if your second move is a potential game
      if (pos9 && boardValue[pos + 9].checker.charAt(0) == opponent && pos18) {
        let nw_spot = pos + 18;
        let get_id = '#C' + nw_spot;
        let first_spot = document.querySelector(get_id);
        first_spot.classList.add('possible_move');

        // this is where you land
        clone_obj.thirdr = nw_spot;
        // this is the piece you jump
        clone_obj.jumpr = pos + 9;

        clone_obj.size = 1;
      }

      if (pos14) {
        // check if your first potential move is a double game
        if (pos7 && boardValue[pos + 7].checker.charAt(0) == opponent && pos21 && boardValue[pos + 21].checker.charAt(0) == opponent && pos28) {
          let new_spot = pos + 28;
          let get_id = '#C' + new_spot;
          let first_spot = document.querySelector(get_id);
          first_spot.classList.add('possible_move');

          //this is where you land
          clone_obj.fourthl = new_spot;
          // this is the piece you jump
          clone_obj.jump2l = pos + 21;

          clone_obj.size = 2;
        }

        // check if your first potential move is a double  game down
        if (pos7 && boardValue[pos + 7].checker.charAt(0) == opponent && pos23 && boardValue[pos + 23].checker.charAt(0) == opponent && pos32 && boardValue[pos + 32].checker == '') {
          let nw_spot = pos + 32;
          let get_id = '#C' + nw_spot;
          let first_spot = document.querySelector(get_id);
          first_spot.classList.add('possible_move');

          // this is where you land
          clone_obj.fourthld = nw_spot;
          // this is the piece you jump
          clone_obj.jump2ld = pos + 23;

          clone_obj.size = 2;
        }



        // check if your first potential move is a double up game
        if (pos7 && boardValue[pos + 7].checker.charAt(0) == opponent && pos5 && boardValue[pos + 5].checker.charAt(0) == opponent && pos4 && boardValue[pos - 4].checker == '') {
          let nw_spot = pos - 4;
          let get_id = '#C' + nw_spot;
          let first_spot = document.querySelector(get_id);
          first_spot.classList.add('possible_move');

          // this is where you land
          clone_obj.fourthlu = nw_spot;
          // this is the piece you jump
          clone_obj.jump2lu = pos + 5;

          clone_obj.size = 2;
        }
      }

      // now we're going to check the right side double
      if (pos18) {

        // check if your first potential move is a double game
        if (pos9 && boardValue[pos + 9].checker.charAt(0) == opponent && pos27 && boardValue[pos + 27].checker.charAt(0) == opponent && pos36) {
          let nw_spot = pos + 36;
          let get_id = '#C' + nw_spot;
          let first_spot = document.querySelector(get_id);
          first_spot.classList.add('possible_move');

          // this is where you land
          clone_obj.fourthr = nw_spot;
          // this is the piece you jump
          clone_obj.jump2r = pos + 27;

          clone_obj.size = 2;
        }


        // check if your first potential move is a double game down
        if (pos9 && boardValue[pos + 9].checker.charAt(0) == opponent && pos25 && boardValue[pos + 25].checker.charAt(0) == opponent && pos32 && boardValue[pos + 32].checker == '') {
          let nw_spot = pos + 32;
          let get_id = '#C' + nw_spot;
          let first_spot = document.querySelector(get_id);
          first_spot.classList.add('possible_move');

          // this is where you land
          clone_obj.fourthrd = nw_spot;
          // this is where you jump
          clone_obj.jump2rd = pos + 25;

          clone_obj.size = 2;
        }

        // check if your first potential move is a double game up
        if (pos9 && boardValue[pos + 9].checker.charAt(0) == opponent && pos11 && boardValue[pos + 11].checker.charAt(0) == opponent && pos4p && boardValue[pos + 4].checker == '') {
          let nw_spot = pos + 4;
          let get_id = '#C' + nw_spot;
          let first_spot = document.querySelector(get_id);
          first_spot.classList.add('possible_move');

          // this is where you land
          clone_obj.fourthru = nw_spot;
          // this is where you jump
          clone_obj.jump2ru = pos + 11;

          clone_obj.size = 2;

        }
      }

    }
    potentialMove.current = { ...clone_obj };

    return clone_obj;

  }


  const second_player_check_move = (pos, opponent) => {

    var clone_obj = { current: pos };
    let pos4, pos4p, pos7, pos9, pos14, pos18, pos21, pos27, pos28, pos25, pos23, pos32, pos36 = false;

    if (boardValue[pos - 4] && boardValue[pos - 4].type) { pos4 = true; }
    if (boardValue[pos + 4] && boardValue[pos + 4].type) { pos4p = true; }
    if (boardValue[pos - 7] && boardValue[pos - 7].type) { pos7 = true; }
    if (boardValue[pos - 9] && boardValue[pos - 9].type) { pos9 = true; }
    if (boardValue[pos - 18] && boardValue[pos - 18].type) { pos18 = true; }
    if (boardValue[pos - 14] && boardValue[pos - 14].type) { pos14 = true; }
    if (boardValue[pos - 21] && boardValue[pos - 21].type) { pos21 = true; }
    if (boardValue[pos - 28] && boardValue[pos - 28].type) { pos28 = true; }
    if (boardValue[pos - 25] && boardValue[pos - 25].type) { pos25 = true; }
    if (boardValue[pos - 27] && boardValue[pos - 27].type) { pos27 = true; }
    if (boardValue[pos - 23] && boardValue[pos - 23].type) { pos23 = true; }
    if (boardValue[pos - 28] && boardValue[pos - 28].type) { pos28 = true; }
    if (boardValue[pos - 32] && boardValue[pos - 32].type) { pos32 = true; }
    if (boardValue[pos - 36] && boardValue[pos - 36].type) { pos36 = true; }

    if (pos7 || pos9) {
      // check if our first move is clean
      if (pos7 && boardValue[pos - 7].checker == '') {
        let new_spot = pos - 7;
        let get_id = '#C' + new_spot;
        let first_spot = document.querySelector(get_id);
        first_spot.classList.add('possible_move');
        clone_obj.bfirstr = new_spot;

        clone_obj.size = 0;
      }

      // check your second potential move is clean
      if (pos9 && boardValue[pos - 9].checker == '') {
        let nw_spot = pos - 9;
        let get_id = '#C' + nw_spot;
        let second_spot = document.querySelector(get_id);
        second_spot.classList.add('possible_move');

        // this is where you land
        clone_obj.bfirstl = nw_spot;

        clone_obj.size = 0;
      }


      // check if your first potential move is a game
      if (pos7 && boardValue[pos - 7].checker.charAt(0) == opponent && pos14 && boardValue[pos - 14].checker == '') {
        let new_spot = pos - 14;
        let get_id = '#C' + new_spot;
        let first_spot = document.querySelector(get_id);
        first_spot.classList.add('possible_move');

        // this is where you land
        clone_obj.bthirdr = new_spot;
        // this is the piece you're jumping
        clone_obj.bjumpr = pos - 7;

        clone_obj.size = 1;
      }

      // check if your second potential move is a game
      if (pos9 && boardValue[pos - 9].checker.charAt(0) == opponent && pos18 && boardValue[pos - 18].checker == '') {
        let nw_spot = pos - 18;
        let get_id = '#C' + nw_spot;
        let first_spot = document.querySelector(get_id);
        first_spot.classList.add('possible_move');
        // this is where you land
        clone_obj.bthirdl = nw_spot;
        // this is the piece you jump
        clone_obj.bjumpl = pos - 9;

        clone_obj.size = 1;
      }


      if (pos14) {

        // check if your first potential move is a double game
        if (pos7 && boardValue[pos - 7].checker.charAt(0) == opponent && boardValue[pos - 14].checker == '' && pos21 && boardValue[pos - 21].checker.charAt(0) == opponent && pos28 && boardValue[pos - 28].checker == '') {
          let new_spot = pos - 28;
          let get_id = '#C' + new_spot;
          let second_spot = document.querySelector(get_id);
          second_spot.classList.add('possible_move');
          // this is where you land
          clone_obj.bfourthr = new_spot;
          // this is the piece you jump
          clone_obj.bjump2r = pos - 21;

          clone_obj.size = 2;
        }

        // check if your first potential move is a double game up
        if (pos7 && boardValue[pos - 7].checker.charAt(0) == opponent && boardValue[pos - 14].checker == '' && pos23 && boardValue[pos - 23].checker.charAt(0) == opponent && pos32 && boardValue[pos - 32].checker == '') {
          let new_spot = pos - 32;
          let get_id = '#C' + new_spot;
          let second_spot = document.querySelector(get_id);
          second_spot.classList.add('possible_move');
          // this is where you land
          clone_obj.bfourthru = new_spot;
          // this is the piece you jump
          clone_obj.bjump2ru = pos - 23;

          clone_obj.size = 2;
        }

        // check if your first potential move is a double game down
        if (pos7 && boardValue[pos - 7].checker.charAt(0) == opponent && boardValue[pos - 14].checker == '' && boardValue[pos - 5] && boardValue[pos - 5].checker.charAt(0) == opponent && pos4p && boardValue[pos + 4].checker == '') {
          let nw_spot = pos + 4;
          let get_id = '#C' + nw_spot;
          let second_spot = document.querySelector(get_id);
          second_spot.classList.add('possible_move');
          // this is where you land
          clone_obj.bfourthrd = nw_spot;
          // this is the piece you jupm
          clone_obj.bjump2rd = pos - 5;

          clone_obj.size = 2;
        }

      }


      if (pos18) {

        // check if your second potential move is a double game
        if (pos9 && boardValue[pos - 9].checker.charAt(0) == opponent && boardValue[pos - 18].checker == '' && pos27 && boardValue[pos - 27].checker.charAt(0) == opponent && pos36 && boardValue[pos - 36].checker == '') {
          let nw_spot = pos - 36;
          let get_id = '#C' + nw_spot;
          let first_spot = document.querySelector(get_id);
          first_spot.classList.add('possible_move');
          clone_obj.bfourthl = nw_spot;
          clone_obj.bjump2l = pos - 27;

          clone_obj.size = 2;
        }


        // check if your second potential move is a double game UP
        if (pos9 && boardValue[pos - 9].checker.charAt(0) == opponent && boardValue[pos - 18].checker == '' && pos25 && boardValue[pos - 25].checker.charAt(0) == opponent && pos32 && boardValue[pos - 32].checker == '') {
          let nw_spot = pos - 32;
          let get_id = '#C' + nw_spot;
          let first_spot = document.querySelector(get_id);
          first_spot.classList.add('possible_move');
          // this is where you land
          clone_obj.bfourthlu = nw_spot;
          // this is the piece you jump
          clone_obj.bjump2lu = pos - 25;

          clone_obj.size = 2;
        }

        // check if your second potential move is a double game Down
        if (pos9 && boardValue[pos - 9].checker.charAt(0) == opponent && boardValue[pos - 18].checker == '' && boardValue[pos - 11].checker.charAt(0) == opponent && pos4 && boardValue[pos - 4].checker == '') {
          let nw_spot = pos - 4;
          let get_id = '#C' + nw_spot;
          let first_spot = document.querySelector(get_id);
          first_spot.classList.add('possible_move');
          // this is where you land
          clone_obj.bfourthld = nw_spot;
          //this is the piece you jump
          clone_obj.bjump2ld = pos - 11;

          clone_obj.size = 2;
        }
      }
    }
    potentialMove.current = { ...clone_obj };
    return clone_obj;
  }

  const king_check_move = (pos) => {
    //let pos = board.position;
    let opponent = 'X';
    if (boardValue[pos].checker.charAt(0) == 'X') {
      opponent = 'O';
    }
    let forward_potential = first_player_check_move(pos, opponent);
    let backward_potential = second_player_check_move(pos, opponent);

    let best_size=backward_potential.size;
    if(forward_potential.size>backward_potential.size){ best_size= forward_potential.size}
    let clone_obj = { ...forward_potential, ...backward_potential };
    clone_obj.size=best_size;
    potentialMove.current = { ...clone_obj };

  }

  // this function is yet to be completed, we set the button to display none 
  // const undo_function = () => {

  //   // we check the countMove to make sure we don't do anything if you haven't done anything yet. 
  //   if (countMove > 0) {

  //     // an undo basically sets the the game back by one move, to do this we set the Boardvalue with the undoBoardValue.
  //    let get_record= [...undoBoard.current[countMove-1]];
  //     setBoardValue(get_record);
  //     setPlayerScore(lastRecord);
  //     setCountMove(countMove - 1);

  //     potentialMove.current = {};
  //   }

  // }


  return (
    <div className="container_div">
      <h1 className="">Checkers</h1>
      <div className="board_dash_div">
        <div className="theBoard"  >
          {boardValue.slice(1).map((board, ind) =>
            <div key={ind} className={board.classN} id={board.id} onClick={(e) => check_whos_playing(board.position)}><span> <i className={board.checker == 'O' ? "fa-solid fa-spider fa-rotate-180 fa-2xl" : board.checker == 'X' ? "fa-solid fa-mosquito fa-2xl text-dark" : board.checker == 'XK' ? "fa-solid fa-crown fa-2xl black_king" : board.checker == 'OK' ? "fa-solid fa-chess-queen fa-2xl" : " "}></i></span></div>
          )}
        </div>

        <div className="score_board" >
          <div className="score_div">
            <h4> Player 1 : {playerScore.player}  </h4>
            <h4> Move: {playerScore.playerM} </h4>
            <h4>  Player 2 : {playerScore.player2}<br />
              Move: {playerScore.player2M}<br /><br />
              Total Move : {countMove}
            </h4>
          </div>
          <div className="side_feature" >
            <button className="btn btn-secondary mt-3 p-3 d-none" onClick={() => undo_function()}><i className="fa-solid fa-arrow-rotate-left fa-xl"></i></button><br />

            <div className="form-check form-switch form-check-inline ">
              <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={(e) => activate_two_player_mode(e)} />
              <label className="form-check-label" for="flexSwitchCheckDefault"> Two player</label>
            </div>

            <button className="btn btn-danger mt-3 p-3" onClick={() => {
              remove_highlight();
              potentialMove.current = {};
              undoBoard.current = {};
              initialize_board();
            }}><h5>Start over</h5></button>

          </div>

        </div>
      </div>


      <dialog id="modal_dialog" className="rounded dialog_margin">

        <div className="modal-content">
          <div className="modal-body">
            <p>Congratulations!!!  <i className={playerScore.player2 > 11 ? "fa-solid fa-mosquito" : "fa-solid fa-mosquito"}></i> wins !!! </p>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" style={{ fontFamily: "arial" }} onClick={() => {
              initialize_board();
              potentialMove.current = {};
              const dialog = document.getElementById('modal_dialog');

              dialog.close();
            }}>Close</button>
          </div>

        </div>

      </dialog>

    </div>

  );

};




import React from "react";
import { useState, useEffect } from "react";



export const Checkers = () => {
  const [countMove, setCountMove] = useState(0);
  const [undoBoardValue, setUndoBoardValue] = useState([]);

  const [boardValue, setBoardValue] = useState([]);
  const [potentialMove, setPotentialMove] = useState({ first: null, second: null, third: null, fourth:null, fifth:null, jump:null, jump2:null, jump3D:null, jump3U:null,  current: null });
  const [playerScore, setPlayerScore] = useState({ player: 0, playerM: 0, player2: 0, player2M: 0 });
  const [lastRecord, setLastRecord] = useState({});

  useEffect(() => {

    initialize_board();

  }, []);


  const initialize_board = () => {

// since an array start by default at 0, I ad a dummy object at index 0 so we can actually start at 1 to match the board movement. I also add the first one one
    let reset_board = [{ classN: 'dark_brown', i: 0, checker: 'O' }, { classN: 'dark_brown', type: true, position: 1, checker: 'O', id: 'C1' }];
    for (let i = 2; i < 65; i++) {
      let newObj = {};
      newObj.type = false;
      newObj.checker = '';
      newObj.id = 'C' + i;
      if (reset_board[i - 1].classN == 'dark_brown') {

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



// function check_whos_playing(board){

//   if(playerScore.playerM==playerScore.player2M){
//     if(boardValue[board.position].checker=='X' || potentialMove.current){
//  Move_cell(board);
//     }
//     }
  
//     else{
//       if(boardValue[board.position].checker=='O' || potentialMove.current){
//      Move_cell(board)
//       } 
  
//     }
  
// }



  function Move_cell(board) {
    // below we remove the potential css class that highlights your move
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

 


    // check if this move is the result of a potential clean move or an attempt to jump your opponent piece
    if (board.position == potentialMove.first || board.position == potentialMove.second || board.position == potentialMove.third ||  board.position == potentialMove.fourth) {
      // below we get the current record for the undo function before we change it
      setLastRecord(playerScore);
    
      // below we clone the board to make the changes
      let clone_board = [...boardValue];

      // below we check the player
      if (boardValue[potentialMove.current].checker == 'O') {
        // below we remove the piece in its previous position in put in the new spot
        clone_board[board.position].checker = 'O';
        clone_board[potentialMove.current].checker = '';

        // set the new record for the dashboard
        var clone_player_score = { player: playerScore.player, playerM: playerScore.playerM + 1, player2: playerScore.player2, player2M: playerScore.player2M };

        // below we check if this was a jump to also remove the piece we jump and a 1 score to the player
             if (potentialMove.third) {
          clone_board[potentialMove.jump].checker = '';
          clone_player_score.player = playerScore.player + 1;
        }

        if (potentialMove.fourth) {
          clone_board[potentialMove.jump2].checker = '';
          clone_player_score.player2 ++;
        }

      }

      // if it's the second player we do the same thing
      else {
        var clone_player_score = { player: playerScore.player, playerM: playerScore.playerM, player2: playerScore.player2, player2M: playerScore.player2M + 1 };
        clone_board[board.position].checker = 'X';
        clone_board[potentialMove.current].checker = '';
       
        // below we check if this was a jump to also remove the piece we jump and a 1 score to our second player
        if (potentialMove.third) {
          clone_board[potentialMove.jump].checker = '';
          clone_player_score.player2 = playerScore.player2 + 1;
        }

        if (potentialMove.fourth) {
          clone_board[potentialMove.jump2].checker = '';
          clone_player_score.player2 ++;
        }

      }

      setBoardValue(clone_board);
      setPlayerScore(clone_player_score);
      setCountMove(countMove + 1);
      var clear_potential_move = { first: null, second: null, third: null, fourth:null, jump:null, jump2:null, current: null };
      setPotentialMove(clear_potential_move);
      // console.log('this is our player score after move :', clone_player_score);
      return;

    }

    if (boardValue[board.position].checker) {
     
      if (boardValue[board.position].checker == 'O') {

        first_player_check_move(board);
      }

      else {
        second_player_check_move(board);
      }

    }
  }





  function first_player_check_move(board) {
    // ne= North East, nw= North West, sw = South West, se= South East
    var clone_obj = { first: null, second: null, third: null, fourth:null, fifth:null, jump:null, jump2:null, jump3D:null, jump3U:null,  current: board.position };

    // check if you have your first clean move
    if (boardValue[board.position + 7].checker == '' && boardValue[board.position + 7].type == true) {
      let nw_spot = board.position + 7;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      clone_obj.first = nw_spot;
    }

    // check if your first potential move is a game
    if (boardValue[board.position + 7].checker == 'X' && boardValue[board.position + 14].checker == '') {
      let nw_spot = board.position + 14;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      clone_obj.third = nw_spot;
      clone_obj.jump = board.position + 7;
    }


       // check if your first potential move is a double game
       if (boardValue[board.position + 7].checker == 'X' && boardValue[board.position + 14].checker =='' && boardValue[board.position + 21].checker =='X' && boardValue[board.position + 28].checker =='' ) {
        let nw_spot = board.position + 28;
        let get_id = '#C' + nw_spot;
        let first_spot = document.querySelector(get_id);
        first_spot.classList.add('possible_move');
        clone_obj.fourth = nw_spot;
        clone_obj.jump2 = board.position + 21;
      }


  // check if your first potential move is a double  game down
  if (boardValue[board.position + 7].checker == 'X' && boardValue[board.position + 14].checker =='' && boardValue[board.position + 23].checker =='X' && boardValue[board.position + 32].checker =='' ) {
    let nw_spot = board.position + 32;
    let get_id = '#C' + nw_spot;
    let first_spot = document.querySelector(get_id);
    first_spot.classList.add('possible_move');
    clone_obj.fifth = nw_spot;
    clone_obj.jump3D = board.position + 23;
  }


    // check if your first potential move is a double up game
    if (boardValue[board.position + 7].checker == 'X' && boardValue[board.position + 14].checker =='' && boardValue[board.position + 5].checker =='X' && boardValue[board.position -4].checker =='' ) {
      let nw_spot = board.position -4;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      clone_obj.fifth = nw_spot;
      clone_obj.jump3U = board.position + 5;
    }
  

    // check if you have a second clean move
    if (boardValue[board.position + 9].checker == '' && boardValue[board.position + 9].type == true) {
      let ne_spot = board.position + 9;
      let get_id = '#C' + ne_spot;
      let second_spot = document.querySelector(get_id);
      second_spot.classList.add('possible_move');
      let current_spot = '#C' + board.position;
      let this_spot = document.querySelector(current_spot);
      this_spot.classList.add('current_move');
      clone_obj.second = ne_spot;

    }

    // check if your second move is a potential game
    if (boardValue[board.position + 9].checker == 'X' && boardValue[board.position + 18].checker == '') {
      let nw_spot = board.position + 18;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      clone_obj.third = nw_spot;
      clone_obj.jump = board.position + 9;
    }
    
       // check if your first potential move is a double game
       if (boardValue[board.position + 9].checker == 'X' && boardValue[board.position + 18].checker =='' && boardValue[board.position + 27].checker =='X' && boardValue[board.position + 36].checker =='' ) { 
        let nw_spot = board.position + 36;
        let get_id = '#C' + nw_spot;
        let first_spot = document.querySelector(get_id);
        first_spot.classList.add('possible_move');
        clone_obj.fourth = nw_spot;
        clone_obj.jump2 = board.position + 27;
      }


     // check if your first potential move is a triple game
     if (boardValue[board.position + 9].checker == 'X' && boardValue[board.position + 18].checker =='' && boardValue[board.position + 25].checker =='X' && boardValue[board.position + 32].checker =='' ) { 
      let nw_spot = board.position + 32;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      clone_obj.fth = nw_spot;
      clone_obj.jump3 = board.position + 25;
    }


    setPotentialMove(clone_obj);
    console.log('this is the potential move in our state : ', clone_obj);

  }


  function second_player_check_move(board) {

    // ne= North East, nw= North West, sw = South West, se= South East
    var clone_obj = { first: null, second: null, thirdr: null, thirdl: null, fourth7l:null,fourth7r:null, fifth:null, jumpr:null,jumpl:null, jump2r:null,jump2l:null, jump2Dl:null, jump2Ur:null,  jump9D:null, jump9U:null, sixth:null,  current: board.position };

    // check if our first move is clean
    if (boardValue[board.position - 7].checker == '' && boardValue[board.position - 7].type == true) {
      let new_spot = board.position - 7;
      let get_id = '#C' + new_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      clone_obj.first = new_spot;
      let current_spot = '#C' + board.position;
      let this_spot = document.querySelector(current_spot);
      this_spot.classList.add('current_move');
    }


    // check if your first potential move is a game
    if (boardValue[board.position - 7].checker == 'O' && boardValue[board.position - 14].checker == '' && boardValue[board.position - 14].type == true) {
      let new_spot = board.position - 14;
      let get_id = '#C' + new_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      clone_obj.thirdr = new_spot;
      clone_obj.jumpr = board.position - 7;
      let current_spot = '#C' + board.position;
      let this_spot = document.querySelector(current_spot);
      this_spot.classList.add('current_move');
    }


    // check if your first potential move is a double game
    if (boardValue[board.position - 7].checker == 'O' && boardValue[board.position - 14].checker =='' && boardValue[board.position - 21].checker =='O' && boardValue[board.position - 28].checker =='' ) {  
      let new_spot = board.position - 28;
      let get_id = '#C' + new_spot;
      let second_spot = document.querySelector(get_id);
      second_spot.classList.add('possible_move');
      clone_obj.fourth7r = new_spot;
      clone_obj.jump2r = board.position - 21;
    }

       // check if your first potential move is a double game up
    if (boardValue[board.position - 7].checker == 'O' && boardValue[board.position - 14].checker =='' && boardValue[board.position - 23].checker =='O' && boardValue[board.position - 32].checker =='' ) {  
      let new_spot = board.position - 32;
      let get_id = '#C' + new_spot;
      let second_spot = document.querySelector(get_id);
      second_spot.classList.add('possible_move');
      clone_obj.fifth = new_spot;
      clone_obj.jump2R = board.position - 23;
    }

       // check if your first potential move is a double game down
       if (boardValue[board.position - 7].checker == 'O' && boardValue[board.position - 14].checker =='' && boardValue[board.position - 5].checker =='O' && boardValue[board.position + 4].checker =='' ) {  
        let nw_spot = board.position +4;
        let get_id = '#C' + nw_spot;
        let second_spot = document.querySelector(get_id);
        second_spot.classList.add('possible_move');
        clone_obj.sixth = nw_spot;
        clone_obj.jump7D = board.position - 23;
      }



    // check your second potential move
    if (boardValue[board.position - 9].checker == '' && boardValue[board.position - 9].type == true) {
      let nw_spot = board.position - 9;
      let get_id = '#C' + nw_spot;
      let second_spot = document.querySelector(get_id);
      second_spot.classList.add('possible_move');
      let current_spot = '#C' + board.position;
      let this_spot = document.querySelector(current_spot);
      this_spot.classList.add('current_move');
      clone_obj.second = nw_spot;
    }


    // check if your second potential move is a game
    if (boardValue[board.position - 9].checker == 'O' && boardValue[board.position - 18].checker == '' && boardValue[board.position - 18].type == true) {
      let nw_spot = board.position - 18;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      clone_obj.thirdl = nw_spot;
      clone_obj.jump = board.position - 9;
    }

    // check if your second potential move is a double game
    if (boardValue[board.position - 9].checker == 'O' && boardValue[board.position - 18].checker =='' && boardValue[board.position - 27].checker =='O' && boardValue[board.position - 36].checker =='' ) { 
      let nw_spot = board.position - 36;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      clone_obj.fourthr = nw_spot;
      clone_obj.jump2 = board.position - 27;
    }

    
    // check if your second potential move is a double game UP
    if (boardValue[board.position - 9].checker == 'O' && boardValue[board.position - 18].checker =='' && boardValue[board.position - 25].checker =='O' && boardValue[board.position - 32].checker ==''  && boardValue[board.position - 32].type ==true) { 
      let nw_spot = board.position - 32;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      clone_obj.eight = nw_spot;
      clone_obj.jump9U = board.position - 27;
    }

   // check if your second potential move is a double game Down
   if (boardValue[board.position - 9].checker == 'O' && boardValue[board.position - 18].checker =='' && boardValue[board.position - 11].checker =='O' && boardValue[board.position - 4].checker ==''  && boardValue[board.position - 4].type ==true) { 
    let nw_spot = board.position - 32;
    let get_id = '#C' + nw_spot;
    let first_spot = document.querySelector(get_id);
    first_spot.classList.add('possible_move');
    clone_obj.eight = nw_spot;
    clone_obj.jump9D = board.position - 27;
  }




    setPotentialMove(clone_obj);
    console.log('this is the potential move in our state : ', clone_obj);

  }



  function undo_function() {
    // setBoardValue(undoBoardValue);
    setPlayerScore(lastRecord);

    if (countMove > 0) {
      console.log('this is the previous record : ', boardValue)
      console.log('this is the previous record : '. undoBoardValue)

    }

  }

  function reset_board_function() {
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

    initialize_board();

  }


  return (

    <div className="container d-flex pt-5">
      <div className="theBoard"  >

        {boardValue.slice(1).map((board, ind) =>
          <div key={ind} className={board.classN} id={board.id} onClick={(e) => Move_cell(board)}><span>{board.checker}  {board.position}</span></div>

        )}

      </div>

      <div >
        <div className="score_div">
          <h5> Player 1 : {playerScore.player}<br />
            Move: {playerScore.playerM}<br /><br />
            Player 2 : {playerScore.player2}<br />
            Move: {playerScore.player2M}<br /><br /><br />
            Total Move : {countMove}


          </h5>

        </div>

        <button className="btn btn-secondary mt-3 p-3" onClick={() => undo_function()}><i class="fa-solid fa-arrow-rotate-left fa-2xl"></i></button><br />
        <button className="btn btn-danger mt-3 p-3" onClick={() => reset_board_function()}><h5>Start over</h5></button>

      </div>



    </div>

  );

};



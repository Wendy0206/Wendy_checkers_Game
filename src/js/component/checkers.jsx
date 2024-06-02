
import React from "react";
import { useState, useEffect } from "react";



export const Checkers = () => {
  const [countMove, setCountMove] = useState(0);
  const [undoBoardValue, setUndoBoardValue] = useState([]);

  const [boardValue, setBoardValue] = useState([]);
  const [potentialMove, setPotentialMove] = useState({firstl: null, firstr: null, thirdr: null, thirdl: null, jumpr:null,jumpl:null, fourthl:null,fourthr:null,jump2r:null,jump2l:null, fourthlu:null, fourthld:null,fourthru:null, fourthrd:null,  jump2ld:null, jump2lu:null,  jump2rd:null, jump2ru:null,  current: null });

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

function remove_highlight(){

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

const get_board_record=()=>{
  let boardSNapshot= boardValue.map((elm)=>elm);

sessionStorage.setItem('undoboard', JSON.stringify(boardSNapshot));
console.log('this is our board value before this move : ', boardSNapshot);
}


  function Move_cell(board) {
    // below we remove the potential css class that highlights your move
remove_highlight();


    // check if this move is the result of a potential clean move or an attempt to jump your opponent piece
    if (board.position == potentialMove.firstr || board.position == potentialMove.firstl || board.position == potentialMove.thirdr ||  board.position == potentialMove.thirdl || board.position == potentialMove.fourthl || board.position == potentialMove.fourthr || board.position == potentialMove.fourthld || board.position == potentialMove.fourthlu || board.position == potentialMove.fourthrd || board.position == potentialMove.fourthru) {
      // below we get the current record for the undo function before we change it
      setLastRecord(playerScore);
      let clone_board = [...boardValue];
      // below we clone the board to make the changes
  

           // set the new record for our dashboard
      var clone_player_score = { player: playerScore.player, playerM: playerScore.playerM, player2: playerScore.player2, player2M: playerScore.player2M };


       let which_player=false;
       let which_score=0;
      // below we check the player and move the piece from its initial spot to its final
      if (boardValue[potentialMove.current].checker == 'O') {
        // below we remove the piece in its previous position in put in the new spot
        clone_board[board.position].checker = 'O';
        clone_board[potentialMove.current].checker = '';
       clone_player_score.playerM++;
       which_player=true;
      
      }else {
        clone_board[board.position].checker = 'X';
        clone_board[potentialMove.current].checker = '';
        clone_player_score.player2M++;
      }

       
        // below we check if this was a jump or double jump to also remove the piece we jump and add 1 score to the player
             if (potentialMove.thirdl == board.position) {
          clone_board[potentialMove.jumpl].checker = '';
          clone_player_score.player = playerScore.player + 1;
          which_score=1;
        }
       else if (potentialMove.thirdr == board.position) {
          clone_board[potentialMove.jumpr].checker = '';
          clone_player_score.player = playerScore.player + 1;
          which_score=1;
        }

      else  if (potentialMove.fourthl == board.position) {
        clone_board[potentialMove.jumpl].checker = '';
          clone_board[potentialMove.jump2l].checker = '';
          which_score=2;
        }

      else  if (potentialMove.fourthr == board.position) {
        clone_board[potentialMove.jumpr].checker = '';
          clone_board[potentialMove.jump2r].checker = '';
          which_score=2;
        }

      else  if (potentialMove.fourthld == board.position) {
        clone_board[potentialMove.jumpl].checker = '';
        clone_board[potentialMove.jump2ld].checker = '';
        which_score=2;
          
        }
      else  if (potentialMove.fourthlu == board.position) {
        clone_board[potentialMove.jumpl].checker = '';
          clone_board[potentialMove.jump2lu].checker = '';
          which_score=2;
        }
        

     else if (potentialMove.fourthrd == board.position) {
      clone_board[potentialMove.jumpr].checker = '';
          clone_board[potentialMove.jump2rd].checker = '';
          which_score=2;
        }
        
     else   if (potentialMove.fourthru == board.position) {
      clone_board[potentialMove.jumpr].checker = '';
          clone_board[potentialMove.jump2ru].checker = '';
          which_score=2;
        }
    
        if(which_player){
          clone_player_score.player=clone_player_score.player+ which_score;
        }
        else{
          clone_player_score.player2=clone_player_score.player2+ which_score;
        }

      setBoardValue(clone_board);
      setPlayerScore(clone_player_score);
      setCountMove(countMove + 1);

      // reset the potential move obj
      var clear_potential_move= {firstl: null, firstr: null, thirdr: null, thirdl: null, jumpr:null,jumpl:null, fourthl:null,fourthr:null,jump2r:null,jump2l:null, fourthlu:null, fourthld:null,fourthru:null, fourthrd:null,  jump2ld:null, jump2lu:null,  jump2rd:null, jump2ru:null,  current: null };
      setPotentialMove(clear_potential_move);
       return;
      }


    // it wasn't potential move taking place so the player is checking if he/she can move
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
   
    var clone_obj = { firstl: null, firstr: null, thirdr: null, thirdl: null, jumpr:null,jumpl:null, fourthl:null,fourthr:null,jump2r:null,jump2l:null, fourthlu:null, fourthld:null,fourthru:null, fourthrd:null,  jump2ld:null, jump2lu:null,  jump2rd:null, jump2ru:null,  current: board.position };

  
    // check if you have your first clean move
    if (boardValue[board.position + 7].checker == '' && boardValue[board.position + 7].type == true) {
      let nw_spot = board.position + 7;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      clone_obj.firstl = nw_spot;
    }

    // check if your first potential move is a game
    if (boardValue[board.position + 7].checker == 'X' && boardValue[board.position + 14].checker == '') {
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
       if (boardValue[board.position + 7].checker == 'X' && boardValue[board.position + 14].checker =='' && boardValue[board.position + 21].checker =='X' && boardValue[board.position + 28].checker =='' ) {
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
  if (boardValue[board.position + 7].checker == 'X' && boardValue[board.position + 14].checker =='' && boardValue[board.position + 23].checker =='X' && boardValue[board.position + 32].checker =='' && boardValue[board.position + 32].type ==true ) {
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
    if (boardValue[board.position + 7].checker == 'X' && boardValue[board.position + 14].checker =='' && boardValue[board.position + 5].checker =='X' && boardValue[board.position -4].checker =='' ) {
      let nw_spot = board.position -4;
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
    if (boardValue[board.position + 9].checker == '' && boardValue[board.position + 9].type) {
      let new_spot = board.position + 9;
      let get_id = '#C' + new_spot;
      let second_spot = document.querySelector(get_id);
      second_spot.classList.add('possible_move');
      let current_spot = '#C' + board.position;
      let this_spot = document.querySelector(current_spot);
      this_spot.classList.add('current_move');
      clone_obj.firstr = new_spot;

    }

    // check if your second move is a potential game
    if (boardValue[board.position + 9].checker == 'X' && boardValue[board.position + 18].checker == '' && boardValue[board.position + 18].type) {
      let nw_spot = board.position + 18;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      clone_obj.thirdr = nw_spot;
      clone_obj.jumpr = board.position + 9;
    }
    
       // check if your first potential move is a double game
       if (boardValue[board.position + 9].checker == 'X' && boardValue[board.position + 18].checker =='' && boardValue[board.position + 27].checker =='X' && boardValue[board.position + 36].checker =='' && boardValue[board.position + 36].type ) { 
        let nw_spot = board.position + 36;
        let get_id = '#C' + nw_spot;
        let first_spot = document.querySelector(get_id);
        first_spot.classList.add('possible_move');
        // this is you land
        clone_obj.fourthr = nw_spot;
        // this is the piece you jump
        clone_obj.jump2r = board.position + 27;
      }


     // check if your first potential move is a double game down
     if (boardValue[board.position + 9].checker == 'X' && boardValue[board.position + 18].checker =='' && boardValue[board.position + 25].checker =='X' && boardValue[board.position + 32].checker =='' && boardValue[board.position + 32].type ) { 
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
     if (boardValue[board.position + 9].checker == 'X' && boardValue[board.position + 18].checker =='' && boardValue[board.position + 11].checker =='X' && boardValue[board.position + 4].checker =='' && boardValue[board.position + 4].type == true) { 
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

  }


  function second_player_check_move(board) {

    var clone_obj = { firstl: null, firstr: null, thirdr: null, thirdl: null, jumpr:null,jumpl:null, fourthl:null,fourthr:null,jump2r:null,jump2l:null, fourthlu:null, fourthld:null,fourthru:null, fourthrd:null,  jump2ld:null, jump2lu:null,  jump2rd:null, jump2ru:null,  current: board.position };

    // check if our first move is clean
    if (boardValue[board.position - 7].checker == '' && boardValue[board.position - 7].type == true) {
      let new_spot = board.position - 7;
      let get_id = '#C' + new_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      clone_obj.firstr = new_spot;

      //highight the current piece you wan to move
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

   
      let current_spot = '#C' + board.position;
      let this_spot = document.querySelector(current_spot);
      this_spot.classList.add('current_move');

         // this is where you land
         clone_obj.thirdr = new_spot;
         // this is the piece you're jumping
         clone_obj.jumpr = board.position - 7;
    }


    // check if your first potential move is a double game
    if (boardValue[board.position - 7].checker == 'O' && boardValue[board.position - 14].checker =='' && boardValue[board.position - 21].checker =='O' && boardValue[board.position - 28].checker =='' ) {  
      let new_spot = board.position - 28;
      let get_id = '#C' + new_spot;
      let second_spot = document.querySelector(get_id);
      second_spot.classList.add('possible_move');
      // this is where you land
      clone_obj.fourthr = new_spot;
      // this is the piece you jump
      clone_obj.jump2r = board.position - 21;
    }

       // check if your first potential move is a double game up
    if (boardValue[board.position - 7].checker == 'O' && boardValue[board.position - 14].checker =='' && boardValue[board.position - 23].checker =='O' && boardValue[board.position - 32].checker =='' && boardValue[board.position - 32].type ==true ) {  
      let new_spot = board.position - 32;
      let get_id = '#C' + new_spot;
      let second_spot = document.querySelector(get_id);
      second_spot.classList.add('possible_move');
      // this is where you land
      clone_obj.fourthru = new_spot;
      // this is the piece you jump
      clone_obj.jump2ru = board.position - 23;
    }

       // check if your first potential move is a double game down
       if (boardValue[board.position - 7].checker == 'O' && boardValue[board.position - 14].checker =='' && boardValue[board.position - 5].checker =='O' && boardValue[board.position + 4].checker =='' ) {  
        let nw_spot = board.position +4;
        let get_id = '#C' + nw_spot;
        let second_spot = document.querySelector(get_id);
        second_spot.classList.add('possible_move');
         // this is where you land
        clone_obj.fourthrd = nw_spot;
        // this is the piece you jupm
        clone_obj.jump2rd = board.position - 5;
      }



    // check your second potential move is clean
    if (boardValue[board.position - 9].checker == '' && boardValue[board.position - 9].type == true) {
      let nw_spot = board.position - 9;
      let get_id = '#C' + nw_spot;
      let second_spot = document.querySelector(get_id);
      second_spot.classList.add('possible_move');
      let current_spot = '#C' + board.position;
      let this_spot = document.querySelector(current_spot);
      this_spot.classList.add('current_move');
      // this is where you land
      clone_obj.firstl = nw_spot;
    }


    // check if your second potential move is a game
    if (boardValue[board.position - 9].checker == 'O' && boardValue[board.position - 18].checker == '' && boardValue[board.position - 18].type == true) {
      let nw_spot = board.position - 18;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      // this is where you land
      clone_obj.thirdl = nw_spot;
      // this is the piece you jump
      clone_obj.jumpl = board.position - 9;
    }

    // check if your second potential move is a double game
    if (boardValue[board.position - 9].checker == 'O' && boardValue[board.position - 18].checker =='' && boardValue[board.position - 27].checker =='O' && boardValue[board.position - 36].checker =='' ) { 
      let nw_spot = board.position - 36;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      clone_obj.fourthl = nw_spot;
      clone_obj.jump2l = board.position - 27;
    }

    
    // check if your second potential move is a double game UP
    if (boardValue[board.position - 9].checker == 'O' && boardValue[board.position - 18].checker =='' && boardValue[board.position - 25].checker =='O' && boardValue[board.position - 32].checker ==''  && boardValue[board.position - 32].type ==true) { 
      let nw_spot = board.position - 32;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      // this is where you land
      clone_obj.fourthlu = nw_spot;
      // this is the piece you jump
      clone_obj.jump2lu = board.position - 25;
    }

   // check if your second potential move is a double game Down
   if (boardValue[board.position - 9].checker == 'O' && boardValue[board.position - 18].checker =='' && boardValue[board.position - 11].checker =='O' && boardValue[board.position - 4].checker ==''  && boardValue[board.position - 4].type ==true) { 
    let nw_spot = board.position - 4;
    let get_id = '#C' + nw_spot;
    let first_spot = document.querySelector(get_id);
    first_spot.classList.add('possible_move');
      // this is where you land
    clone_obj.fourthld = nw_spot;
      //this is the piece you jump
    clone_obj.jump2ld = board.position - 11;
  }
    setPotentialMove(clone_obj);
    get_board_record();
    console.log('this is the potential move in our state : ', clone_obj);
  }



  function undo_function() {
    
// we check the countMove to make sure we don't do anything if you haven't done anything yet. 
    if (countMove > 0) {
// an undo basically sets the the game back by one move, to do this we set the Boardvalue with the undoBoardValue.
let previous_board= sessionStorage.getItem('undoboard');
setBoardValue(previous_board);
    setPlayerScore(lastRecord);
    let clear_potential_move= {firstl: null, firstr: null, thirdr: null, thirdl: null, jumpr:null,jumpl:null, fourthl:null,fourthr:null,jump2r:null,jump2l:null, fourthlu:null, fourthld:null,fourthru:null, fourthrd:null,  jump2ld:null, jump2lu:null,  jump2rd:null, jump2ru:null,  current: null };
    setPotentialMove(clear_potential_move);
      console.log('this is the previous record : ', boardValue)
      console.log('this is the previous record : '. undoBoardValue)
    }

  }

  function reset_board_function() {
    remove_highlight();
    initialize_board();
  }

  return (
    <div className="container d-flex pt-5">
      <div className="theBoard"  >

        {boardValue.slice(1).map((board, ind) =>
          <div key={ind} className={board.classN} id={board.id} onClick={(e) => Move_cell(board)}><span>{board.checker}</span></div>

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



import { element } from "prop-types";
import React from "react";
import { useState, useEffect } from "react";



export const Checkers= ()=> {
    const [countMove, setCountMove] = useState(1);
    const [boardValue ,setBoardValue ]= useState([]);
    const [potentialMove, setPotentialMove]= useState({first:null, second:null, current: null});

    useEffect(()=>{

initialize_board();

},[]);


const initialize_board= ()=>{

  let reset_board=[{classN: 'dark_brown', i:0,checker:'O'}, {classN: 'dark_brown', type:true, position:1 , checker:'O', id: 'C1'}];
   
  for (let i=2; i<65;i++){
    let newObj={};
newObj.type=false;
newObj.checker='';
newObj.id='T'+i;
  if(reset_board[i-1].classN=='dark_brown'){

if((i-1)%8==0){
  newObj.classN='dark_brown';
  newObj.id='C'+i;
  newObj.type=true;
  if(i<24){
    newObj.checker='O';
  }
  if(i>40){
    newObj.checker='X';
  }
  
}

else{
  newObj.classN='light_brown';
}
    }

    else{

      if((i-1)%8==0){
        newObj.classN='light_brown';
      }
      else{
        newObj.classN='dark_brown';
        newObj.id='C'+i;
        newObj.type=true;
        if(i<24){
          newObj.checker='O';
        }
        if(i>40){
          newObj.checker='X';
        }
        
      }
      
    }


newObj.position=i; 
reset_board.push(newObj);

  }  

  console.log(reset_board)  
setBoardValue(reset_board);


}



      
          
function Move_cell (board){
let all_sqr=document.querySelectorAll('.possible_move');
if(all_sqr){
  for(let i=0; i<all_sqr.length; i++){
    all_sqr[i].classList.remove('possible_move');
  } 
}

let all_current=document.querySelectorAll('.theBoard>div');
if(all_current){
  for(let i=0; i<all_current.length; i++){
    all_current[i].classList.remove('current_move');
   
  } 
}


if(board.position==potentialMove.first || board.position==potentialMove.second){

if(boardValue[potentialMove.current].checker=='O'){
  let clone_board= [...boardValue];
  clone_board[board.position].checker='O';
  clone_board[potentialMove.current].checker='';
  setBoardValue(clone_board);
 

}else{
  let clone_board= [...boardValue];
  clone_board[board.position].checker='X';
  clone_board[potentialMove.current].checker='';
  setBoardValue(clone_board);
 

}
var clone_obj= {first:null, second:null, current:null};
setPotentialMove(clone_obj);
return;
}


if(boardValue[board.position].checker){
if(boardValue[board.position].checker=='O'){

first_player_check_move(board);
}

else{
  second_player_check_move(board);
}

}
}


// if(countMove%2==0){
// if(boardValue[board.position].checker=='O'){
// first_player(board);
// }
// }

// else{
//   if(boardValue[board.position].checker=='X'){
//  second_player(board);
//   }

// }


   
function first_player_check_move(board){
// ne= North East, nw= North West, sw = South West, se= South East
  var clone_obj= {first:null, second:null, current: board.position};

  if(boardValue[board.position+7].checker=='' && boardValue[board.position+7].type==true){
    let nw_spot=board.position+7;
    let get_id='#C'+nw_spot;
  let first_spot= document.querySelector(get_id);
  first_spot.classList.add('possible_move');
  clone_obj.first=nw_spot;
  }
  
  
  if(boardValue[board.position+9].checker=='' && boardValue[board.position+9].type==true){
    let ne_spot=board.position+9;
    let get_id='#C'+ne_spot;
    let second_spot= document.querySelector(get_id);
    second_spot.classList.add('possible_move');
    let current_spot='#C'+board.position;
    let this_spot= document.querySelector(current_spot);
    this_spot.classList.add('current_move');
   clone_obj.second=ne_spot;
  
  }
  
  setPotentialMove(clone_obj);
  console.log('this is the potential move in our state : ', clone_obj);
  
    }



function second_player_check_move(board){

    // ne= North East, nw= North West, sw = South West, se= South East
   
    var clone_obj= {first:null, second:null, current: board.position};
  
  if(boardValue[board.position-7].checker=='' && boardValue[board.position-7].type==true){
    let ne_spot=board.position-7;
    let get_id='#C'+ne_spot;
  let first_spot= document.querySelector(get_id);
  first_spot.classList.add('possible_move');
  clone_obj.first=ne_spot;
  }
  
  
  if(boardValue[board.position-9].checker=='' && boardValue[board.position-9].type==true){
    let nw_spot=board.position-9;
    let get_id='#C'+nw_spot;
  
    let second_spot= document.querySelector(get_id);
    second_spot.classList.add('possible_move');
    let current_spot='#C'+board.position;
    let this_spot= document.querySelector(current_spot);
    this_spot.classList.add('current_move');
   clone_obj.second=nw_spot;
  
  }
  
  
  setPotentialMove(clone_obj);
  console.log('this is the potential move in our state : ', clone_obj);

  
}




	return	(


        <div class="container">
         <div class="theBoard"  >

         {boardValue.slice(1).map((board,ind)=>
 <div key={ind} class={board.classN} id={board.id} onClick={(e)=>Move_cell(board, e)}><span>{board.checker}</span></div>

)}
     
       </div>


  
</div>

    );
	
};



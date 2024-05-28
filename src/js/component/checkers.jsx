import { element } from "prop-types";
import React from "react";
import { useState, useEffect } from "react";



export const Checkers= ()=> {
     const [countMove, setCountMove] = useState(1);
    const [boardValue ,setBoardValue ]= useState([]);
      const [potentialMove, setPotentialMove]= useState([]);

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


if(countMove%2==0){
if(boardValue[board.position].checker==''){

}
}
else{
  if(boardValue[board.position].checker==''){

  }

}

  if(boardValue[board.position].checker){
  // ne= North East, nw= North West, sw = South West, se= South East
 

if(boardValue[board.position+7].checker=='' && boardValue[board.position+7].type==true){
  let nw_spot=board.position+7;
  let get_id='#C'+nw_spot;
let first_spot= document.querySelector(get_id);
first_spot.classList.add('possible_move');

}

if( boardValue[board.position+9].checker=='' && boardValue[board.position+9].type==true){
  let ne_spot=board.position+9;
  let get_id='#C'+ne_spot;
  let second_spot= document.querySelector(get_id);
  second_spot.classList.add('possible_move');
  let current_spot='#C'+board.position;
  let this_spot= document.querySelector(current_spot);
  this_spot.classList.add('current_move');
}





  }
  
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



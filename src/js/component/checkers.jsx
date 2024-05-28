import { element } from "prop-types";
import React from "react";
import { useState, useEffect } from "react";



export const Checkers= ()=> {
     const [countMove, setCountMove] = useState(0);
    const [boardValue ,setBoardValue ]= useState([]);
      

    useEffect(()=>{
    let reset_board=[{classN: 'dark_brown', i:0,checker:'O'}, {classN: 'dark_brown', i:1,checker:'O'}];
   
  for (let i=2; i<65;i++){
    let newObj={};


  if(reset_board[i-1].classN=='dark_brown')
    {
if((i-1)%8==0){
  newObj.classN='dark_brown';
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

  
setBoardValue(reset_board);

},[]);
      
          
function Move_cell (position){
  if(boardValue[position].checker){


  }
}
 
   

	return	(

        <div class="container">
         <div class="theBoard"  >

         {boardValue.slice(1).map((board)=>
 <div class={board.classN} ><span onClick={()=>Move_cell(board.position)}>{board.checker}</span></div>

)}
     
       </div>


  
</div>

    );
	
};



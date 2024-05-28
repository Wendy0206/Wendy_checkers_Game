import { element } from "prop-types";
import React from "react";
import { useState, useEffect } from "react";



export const Checkers= ()=> {
     const [countMove, setCountMove] = useState(0);
    const [boardValue ,setBoardValue ]= useState([]);
      

    useEffect(()=>{
    let reset_board=[];
  for (let i=1; i<65;i++){
   let newObj={};
   if (i%2!=0){
    newObj.classN='dark_brown';
    if((i-1)%2!=0)
      {
        newObj.classN='dark_brown';
      }
    newObj.classN='dark_brown';
   }

else{
  newObj.classN='light_brown';
}
newObj.position=i; 
reset_board.push(newObj);

  }  
setBoardValue(reset_board);


},[countMove]);
      
          
function Move_cell (index){
}
 
   

	return	(

        <div class="container">

         <div class="theBoard"  >

         {boardValue.map((board)=>
 <div class={board.classN} ><span onClick={()=>Move_cell(board.position)}></span></div>

)}
     
       </div>

  
        <div class="button_div" >
	
</div> 
  
</div>

    );
	
};



import { element } from "prop-types";
import React from "react";
import { useState, useEffect } from "react";


//create your first component
export const TicTacToe= ()=> {
    const [boardValue, setBoardValue] = useState(['','','','','','','','','']);
    const [countMove, setCountMove] = useState(0);
    const [MoveSymbol, setMoveSymbol] = useState(0);
    const [cellStatus, setCellStatus] = useState([0,0,0,0,0,0,0,0,0]);
let arrayStatus=[0,0,0,0,0,0,0,0,0];
 // let arrayValue=['','','','','','','','',''];
    useEffect(()=>{


},[]);

function Move_c11 (index){

// verify the statusof the cell
    if(cellStatus[index]==1)
    {
      alert('You cant play again here');
        
    }
    else{
        arrayStatus[index]=1;
        setCellStatus(arrayStatus);
        console.log(cellStatus);
       
        if(countMove%2!=0){
        setMoveSymbol('O');
      //   arrayValue[index]='o';
     //  setBoardValue(boardValue.map((ind,element)=>ind==index? 'O':element));
          //  setBoardValue([]);
            console.log(index);
            //console.log(boardValue);


        }
        if(countMove%2==0){
            setMoveSymbol('X');
           //  setBoardValue(boardValue.map((ind,element)=>ind==2? 'X': element));
           // console.log(boardValue);
            console.log(index);
           
        }
        setCountMove(countMove+1);
       
       
    }


} 

	return	(
        <div class="container">
       <div className="theBoard">
        <div className="c1 white" ><span onClick={()=>Move_c11(0)}>{boardValue[0]}</span></div>
        <div className="c12 black" ><span onClick={()=>Move_c11(1)}>{boardValue[1]}</span></div>
        <div className="c13 white"><span onClick={()=>Move_c11(2)}>{boardValue[2]}</span></div>
        <div className="c21 black"><span onClick={()=>Move_c11(3)}>{boardValue[3]}</span></div>
        <div className="c22 white"><span onClick={()=>Move_c11(4)}>{boardValue[4]}</span></div>
        <div className="c23 black"><span onClick={()=>Move_c11(5)}>{boardValue[5]}</span></div>
        <div className="c31 white"><span onClick={()=>Move_c11(6)}>{boardValue[6]}</span></div>
        <div className="c32 black"><span onClick={()=>Move_c11(7)}>{boardValue[7]}</span></div>
        <div className="c33 white"><span onClick={()=>Move_c11(8)}>{boardValue[8]}</span></div>

       </div>
  
</div>
    );
	
};

// export default TimeCount;


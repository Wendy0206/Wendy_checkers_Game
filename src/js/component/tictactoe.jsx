import React from "react";
import { useState, useEffect } from "react";


//create your first component
export const TicTacToe= ()=> {
    const [boardPosition, setBoardPosition] = useState(['','','','','','','','','']);
    const [boardValue, setBoard] = useState([0,0,0,0,0,0,0,0,0]);
    const [countMove, setCountMove] = useState(0);
    const [MoveSymbol, setMoveSymbol] = useState(0);
    const [cellStattus, setCellStatus] = useState(0);
let arrayPo=[];
    useEffect(()=>{
setBoardPosition(['','','','','','','','','']);

},[]);

function Move_c11 (index){
setCountMove(countMove+1);
if(countMove%2!=0){
setMoveSymbol('o');
}
if(countMove%2==0){
    setMoveSymbol('x');
}
arrayPo[index]=
setBoardPosition([index]);


console.log('This is the  cell '+index+' that just moved');

} 

	return	(
        <div class="container">
       <div className="theBoard">
        <div className="c1 white"><span onClick={()=>Move_c11(1)} ></span></div>
        <div className="c12 black"><span onClick={()=>Move_c11(2)} >naknk</span></div>
        <div className="c13 white"><span onClick={()=>Move_c11(3)}>efnwenf</span></div>
        <div className="c21 black"><span onClick={()=>Move_c11(4)}>wkefwek</span></div>
        <div className="c22 white"><span onClick={()=>Move_c11(5)}>qekfek</span></div>
        <div className="c23 black"><span onClick={()=>Move_c11(6)}>efnkfn</span></div>
        <div className="c31 white"><span onClick={()=>Move_c11(7)}>kdfnwek</span></div>
        <div className="c32 black"><span onClick={()=>Move_c11(8)}>qekfnk</span></div>
        <div className="c33 white"><span onClick={()=>Move_c11(9)}>kfneef</span></div>

       </div>
  
</div>
    );
	
};

// export default TimeCount;


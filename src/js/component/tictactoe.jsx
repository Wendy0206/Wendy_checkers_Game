import { element } from "prop-types";
import React from "react";
import { useState, useEffect } from "react";


//create your first component
export const TicTacToe= ()=> {
    const [boardValue, setBoardValue] = useState(['','','','','','','','','']);
    const [countMove, setCountMove] = useState(0);
    const [cellStatus, setCellStatus] = useState([2,2,2,2,2,2,2,2,2]);
   
    let interval;

    useEffect(()=>{
      
      let verticalW= boardValue[0]+boardValue[1]+boardValue[2];
      let verticalW2=  boardValue[3]+boardValue[4]+boardValue[5];
      let verticalW3=  boardValue[6]+boardValue[7]+boardValue[8];
      let horizontalW= boardValue[0]+boardValue[3]+boardValue[6];
      let horizontalW2=  boardValue[1]+boardValue[4]+boardValue[7];
      let horizontalW3=  boardValue[2]+boardValue[5]+boardValue[8];
      let diagonal=  boardValue[0]+boardValue[4]+boardValue[8];
      let diagonal2=  boardValue[2]+boardValue[4]+boardValue[6];

 
    if(countMove>4 && (verticalW=='XXX' || verticalW2=='XXX' || verticalW3=='XXX' || horizontalW=='XXX' || horizontalW2=='XXX' || horizontalW3=='XXX' || diagonal=='XXX'|| diagonal2=='XXX')){
    
        alert('Someone wins');
        setCountMove(0);
        setCellStatus(cellStatus.map((element,ind)=>(ind==ind)? 2 : element));
        setBoardValue(boardValue.map((element,ind)=> (ind==ind)? '': element));  
}
if(countMove>4 && (verticalW=='OOO' || verticalW2=='OOO' || verticalW3=='OOO' || horizontalW=='OOO' || horizontalW2=='OOO' || horizontalW3=='OOO' || diagonal=='OOO'|| diagonal2=='OOO')){
    
    alert('Someone wins');
    setCellStatus(cellStatus.map((element,ind)=>(ind==ind)? 2 : element));
    setBoardValue(boardValue.map((element,ind)=> (ind==ind)? '': element));  
}



return ()=>{
clearInterval(interval);
}
},[countMove]);


function Move_cell (index){

// verify the status of the cell
    if(cellStatus[index]==1 || cellStatus[index]==0 )
    {
      alert('You cant play here again');
      
        
    }

    else{
        
       
     
        if(countMove%2!=0){
       
      //   arrayValue[index]='o';
      setCellStatus(cellStatus.map((element,ind)=>(ind==index)? 0 : element));
      setBoardValue(boardValue.map((element,ind)=>ind==index? 'O': element));
    
        }

        if(countMove%2==0){
          
            setCellStatus(cellStatus.map((element,ind)=>(ind==index)? 1 : element));
            setBoardValue(boardValue.map((element,ind)=> (ind==index)? 'X': element));   
        }
        setCountMove(countMove+1);

    }

    let newArr=[1,1,1];
 
  
//    if(cellStatus.slice(0,3)===newArr){
//        alert('you win');
//  }
  


} 

	return	(
        <div class="container">
       <div className="theBoard">
        <div className="c1 white" ><span onClick={()=>Move_cell(0)}>{boardValue[0]}</span></div>
        <div className="c12 black" ><span onClick={()=>Move_cell(1)}>{boardValue[1]}</span></div>
        <div className="c13 white"><span onClick={()=>Move_cell(2)}>{boardValue[2]}</span></div>
        <div className="c21 black"><span onClick={()=>Move_cell(3)}>{boardValue[3]}</span></div>
        <div className="c22 white"><span onClick={()=>Move_cell(4)}>{boardValue[4]}</span></div>
        <div className="c23 black"><span onClick={()=>Move_cell(5)}>{boardValue[5]}</span></div>
        <div className="c31 white"><span onClick={()=>Move_cell(6)}>{boardValue[6]}</span></div>
        <div className="c32 black"><span onClick={()=>Move_cell(7)}>{boardValue[7]}</span></div>
        <div className="c33 white"><span onClick={()=>Move_cell(8)}>{boardValue[8]}</span></div>

       </div>
  
</div>
    );
	
};

// export default TimeCount;


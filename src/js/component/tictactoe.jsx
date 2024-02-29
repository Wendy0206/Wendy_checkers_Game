import { element } from "prop-types";
import React from "react";
import { useState, useEffect } from "react";
import Win from '../../img/Win.gif'


//create your first component
export const TicTacToe= ()=> {
    const [boardValue, setBoardValue] = useState(['','','','','','','','','']);
    const [countMove, setCountMove] = useState(0);
    const [cellStatus, setCellStatus] = useState([2,2,2,2,2,2,2,2,2]);
    const [winnerE, setWinnerE] = useState('visible');
    const [winnerF, setWinnerF] = useState('hidden');
    const [player, setPlayer] = useState(['Player 1'],['Player 2']);
    const [finalplayer, setFinalPlayer] = useState(['']);

    useEffect(()=>{
      
      let verticalW= boardValue[0]+boardValue[1]+boardValue[2];
      let verticalW2=  boardValue[3]+boardValue[4]+boardValue[5];
      let verticalW3=  boardValue[6]+boardValue[7]+boardValue[8];
      let horizontalW= boardValue[0]+boardValue[3]+boardValue[6];
      let horizontalW2=  boardValue[1]+boardValue[4]+boardValue[7];
      let horizontalW3=  boardValue[2]+boardValue[5]+boardValue[8];
      let diagonal=  boardValue[0]+boardValue[4]+boardValue[8];
      let diagonal2=  boardValue[2]+boardValue[4]+boardValue[6];

      if(countMove==1){

        let new1=prompt("Please tell us who is playing right now");
          setPlayer(player.map((element,ind)=>ind==0? new1: element));
           }
           if(countMove==2){
             let new2=prompt("Please tell us who is playing right now");
               setPlayer(player.map((element,ind)=>ind==1? new2: element));
                }

    if(countMove>4 && (verticalW=='XXX' || verticalW2=='XXX' || verticalW3=='XXX' || horizontalW=='XXX' || horizontalW2=='XXX' || horizontalW3=='XXX' || diagonal=='XXX'|| diagonal2=='XXX')){
    
       // alert('You win');
        setCountMove(0);
        setFinalPlayer(player[0]);
        setCellStatus(cellStatus.map((element,ind)=>(ind==ind)? 2 : element));
        setBoardValue(boardValue.map((element,ind)=> (ind==ind)? '': element));  
        setWinnerE('hidden');
        setWinnerF('visible');
      
}
else if(countMove>4 && (verticalW=='OOO' || verticalW2=='OOO' || verticalW3=='OOO' || horizontalW=='OOO' || horizontalW2=='OOO' || horizontalW3=='OOO' || diagonal=='OOO'|| diagonal2=='OOO')){
    
  //  alert('Someone wins');
    setCountMove(0);
    setCellStatus(cellStatus.map((element,ind)=>(ind==ind)? 2 : element));
    setBoardValue(boardValue.map((element,ind)=> (ind==ind)? '': element));  
    setWinnerE('hidden');
   setWinnerF('visible');
   setFinalPlayer(player[1]);
}
else if(countMove==9){
  
    setCellStatus(cellStatus.map((element,ind)=>(ind==ind)? 2 : element));
    setBoardValue(boardValue.map((element,ind)=> (ind==ind)? '': element)); 
    setWinnerE('none');
    setWinnerF('flex');
}




},[countMove]);

function Reset_board (){
    setWinnerE('visible');
    setWinnerF('hidden');

}
          
          


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
       <div className="theBoard" style={{visibility: winnerE}} >
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

       <div className="img_div" style={{visibility: winnerF}} >
       <h1>{finalplayer} has won</h1>
		<img src={Win} alt="test image"/>
		</div>

        <div className="button_div" >
		<button type="button" class="btn btn-info" onClick={()=>Reset_board()}>Start Over</button>
		</div>
  
</div>
    );
	
};

// export default TimeCount;


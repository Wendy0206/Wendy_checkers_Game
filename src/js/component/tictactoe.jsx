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
    const [playerName, setPlayerName] = useState('hidden');
    const [player, setPlayer] = useState(['','']);
    const [finalplayer, setFinalPlayer] = useState('');
    const [roundCount, setRoundCount] = useState('');
    

    useEffect(()=>{
    



},[countMove]);
      
          
function Move_cell (index){

// verify the status of the cell
    if(cellStatus[index]==1 || cellStatus[index]==0 )
    {
      alert('You cant play here again');
      
        
    }

    else{
        
        if(countMove%2!=0){
       
      setCellStatus(cellStatus.map((element,ind)=>(ind==index)? 0 : element));
      setBoardValue(boardValue.map((element,ind)=>ind==index? 'O': element));
    
        }

        if(countMove%2==0){
          
            setCellStatus(cellStatus.map((element,ind)=>(ind==index)? 1 : element));
            setBoardValue(boardValue.map((element,ind)=> (ind==index)? 'X': element));   
        }
        setCountMove(countMove+1);

    }
  }

   
function reset_board (){
  setWinnerE('visible');
  setWinnerF('hidden');
  

}

function reset_player (){

}
  
   

	return	(
        <div class="container">
         <div class="theBoard" style={{visibility: winnerE}} >
     
         <div class=" black" ><span onClick={()=>Move_cell(1)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(2)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(3)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(4)}></span></div>
    
        <div class=" black"><span onClick={()=>Move_cell(5)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(6)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(7)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(8)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(9)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(10)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(11)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(12)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(13)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(14)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(15)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(16)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(17)}></span></div>
    
        <div class="white"><span onClick={()=>Move_cell(18)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(19)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(20)}></span></div>
        <div class=" black" ><span onClick={()=>Move_cell(21)}></span></div>
        <div class=" white" ><span onClick={()=>Move_cell(22)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(23)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(24)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(25)}></span></div>
    
        <div class=" black"><span onClick={()=>Move_cell(26)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(27)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(28)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(29)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(30)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(31)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(32)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(33)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(34)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(35)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(36)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(37)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(38)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(39)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(40)}></span></div>
        <div class=" white" ><span onClick={()=>Move_cell(41)}></span></div>
        <div class=" black" ><span onClick={()=>Move_cell(42)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(43)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(44)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(45)}></span></div>
    
        <div class=" black"><span onClick={()=>Move_cell(46)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(47)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(48)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(49)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(50)}></span></div>
       
        <div class=" black"><span onClick={()=>Move_cell(51)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(52)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(53)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(54)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(55)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(56)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(57)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(58)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(59)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(60)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(61)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(62)}></span></div>
        <div class=" white"><span onClick={()=>Move_cell(63)}></span></div>
        <div class=" black"><span onClick={()=>Move_cell(64)}></span></div>
       </div>

    

        <div class="button_div" >
		{/* <button type="button " class="btn btn-info bg-success" onClick={()=>reset_board()}>Lets play again</button>
    <button type="button " class="btn btn-info bg-secondary" onClick={()=>reset_player()}>Play With someone else</button>
		*/}

</div> 
  
</div>
    );
	
};


// export default TimeCount;


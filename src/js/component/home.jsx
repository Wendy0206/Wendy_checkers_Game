import React from "react";
import { TicTacToe } from "./tictactoe";
//include images into your bundle


//create your first component
const Home = () => {
	return (
		<div className="text-center">
		<TicTacToe/>
		</div>
	);
};

export default Home;

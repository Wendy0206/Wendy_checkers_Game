import React from "react";
import { Checkers } from "./checkers";
//include images into your bundle


//create your first component
const Home = () => {
	return (
		<div className="text-center">
		<Checkers/>
		</div>
	);
};

export default Home;

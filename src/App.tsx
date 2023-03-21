import React from "react";
import "./App.css";
import {Menu} from "./Components/Menu/menu";
import "./styles/normalize.scss"
import Header from "./Components/Header/header";
import {AppRoutes} from "./Routes/appRoutes";
import {Footer} from "./Components/Footer/footer";

function App() {
	return (
		<React.Fragment>
			<Menu/>
			<Header/>
			<AppRoutes/>
			<Footer/>
		</React.Fragment>
	);
}

export default App;

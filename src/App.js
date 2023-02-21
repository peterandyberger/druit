import React, {Fragment} from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../src/App.css";
import {MAINPAGE} from "./pages/mainPage";

class App extends React.Component {
	render() {
		return (
			<Router>
				<Fragment>
				<Routes>
					<Route exact path='/'>
						<Route exact path='/' element={<MAINPAGE/>}/>
					</Route>
				</Routes>
				</Fragment>
			</Router>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		visModal: state.visModal,
		flights: state.flights,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		// addFlights: (payload) => dispatch(addFlights(payload)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
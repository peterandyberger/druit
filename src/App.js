import React, {Fragment} from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../src/App.css";
import MAINPAGE from "./pages/mainPage";
import { addTypes, addNames } from "./redux/actions";

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
		types: state.types,
    names: state.names,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addTypes: (payload) => dispatch(addTypes(payload)),
    addNames: (payload) => dispatch(addNames(payload)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
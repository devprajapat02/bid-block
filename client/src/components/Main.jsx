import React from 'react'
import ItemsDashboard from "./ItemsDashboard";
import ItemPage from "./ItemPage";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const getDisplay = (display) => {

	return(
	<BrowserRouter>
		<Switch>
			<Route path="/" component={ItemsDashboard} />
			<Route path="/item/:id" component={ItemPage} />
		</Switch>
	</BrowserRouter>
	)

	switch (display) {
		case "Dashboard":
			return <ItemsDashboard />
		case "ItemPage":
			return <ItemPage />
		default:
			return <ItemsDashboard />
	}
}

export default function Main() {
	
	const {display} = useSelector(state => state.custom)

	
  return (
		<>
			{getDisplay(display)}
		</>
	)
}

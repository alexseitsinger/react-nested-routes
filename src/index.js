import React from "react"
import { Route, Switch } from "react-router-dom"
import _ from "underscore"


function addRoutes(
	children,
	Component,
	basePath,
	mainRoutes,
	modalRoutes
){
	React.Children.forEach(children, (child) => {
		var childPath = child.props.path
		if(!childPath.startsWith(basePath)){
			childPath = `${basePath}/${childPath}`.replace(/(\/)\/+/g, "$1")
		}
		if(childPath === "/*"){
			childPath = "*"
		}
		const childRoute = (
			<Route
				key={"childRoute" + _.uniqueId()}
				path={childPath}
				exact
				component={child.props.component}
			/>
		)
		if(child.props.modal){
			modalRoutes.push(childRoute)
			mainRoutes.push(
				<Route
					key={"mainRoute" + _.uniqueId()}
					path={childPath}
					exact
					component={Component}
				/>
			)
		}
		else {
			mainRoutes.push(childRoute)
		}
		addRoutes(
			child.props.children,
			child.props.component,
			childPath,
			mainRoutes,
			modalRoutes
		)
	})
}

function makeRoutes(tree){
	const root = React.Children.only(tree)
	const { children, component, path } = root.props
	const indexRoute = (
		<Route
			key={"indexRoute" + _.uniqueId()}
			path={path}
			exact
			component={component}
		/>
	)
	const mainRoutes = [ indexRoute ]
	const modalRoutes = []
	addRoutes(
		children,
		component,
		path,
		mainRoutes,
		modalRoutes
	)
	mainRoutes.forEach((route, i) => {
		if(route.props.path === "*"){
			// move the wildcard route to the last position.
			mainRoutes.push(mainRoutes.splice(i, 1)[0])
		}
	})
	return {
		mainRoutes: mainRoutes,
		modalRoutes: modalRoutes,
	}
}

export default (tree) => {
	const { mainRoutes, modalRoutes } = makeRoutes(tree)
	return (
		<React.Fragment>
			<Switch>
				{mainRoutes}
			</Switch>
			{modalRoutes}
		</React.Fragment>
	)
}

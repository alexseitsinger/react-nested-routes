import "core-js/stable"
import React from "react"
// import { Route, Switch } from "react-router"
import _ from "underscore"

function addRoutes(
	Route,
	basePath,
	Component,
	children,
	routeProps,
	mainRoutes,
	modalRoutes
){
	children.forEach((arr) => {
		var childPath = arr[0]
		if(!childPath.startsWith(basePath)){
			childPath = `${basePath}/${childPath}`.replace(/(\/)\/+/g, "$1")
		}
		if(childPath === "/*"){
			childPath = "*"
		}
		const ChildComponent = arr[1]
		var modal
		var children
		if(arr.length === 4){
			modal = arr[2]
			children = arr[3]
		}
		else if (arr.length === 3){
			if(_.isBoolean(arr[2])){
				modal = arr[2]
				children = []
			}
			else if (_.isArray(arr[2])){
				modal = false
				children = arr[2]
			}
		}
		else {
			modal = false
			children = []
		}
		const childRoute = (
			<Route
				key={"childRoute" + _.uniqueId()}
				path={childPath}
				exact
				render={(props) => {
					return <ChildComponent {...routeProps} {...props}/>
				}}
			/>
		)
		if(modal){
			modalRoutes.push(childRoute)
			mainRoutes.push(
				<Route
					key={"mainRoute" + _.uniqueId()}
					path={childPath}
					exact
					render={(props) => {
						return <Component {...routeProps} {...props}/>
					}}
				/>
			)
		}
		else {
			mainRoutes.push(childRoute)
		}
		addRoutes(
			Route,
			childPath,
			ChildComponent,
			children,
			routeProps,
			mainRoutes,
			modalRoutes
		)
	})
}

function makeRoutes(Route, arr, routeProps){
	const root = arr[0]
	const path = root[0]
	const Component = root[1]
	const children = root[2]
	const mainRoutes = [
		<Route
			key={"indexRoute" + _.uniqueId()}
			path={path}
			exact
			render={(props) => {
				return <Component {...routeProps} {...props}/>
			}}
		/>
	]
	const modalRoutes = []
	addRoutes(
		Route,
		path,
		Component,
		children,
		routeProps,
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

// ***NOTE***
// Since React-Router & React-Router-DOM use a context object.
// Using this package multiple times uses multiple context objects
// and therefore causes React to throw an invariant error when
// attempting to mix them. As a result, we (sadly) have to pass the
// components we want to use (Route, Switch) from the calling scope
// in order to ensure we use the same context. It's also important to
// avoid using these components (Route, Switch) outside of a router in
// our calling scope too. As a result, we have t pass an array of 'routes'
// to dynamically generate them at runtime. The component that this
// function generates should be the single component used in a route
// inside the <App/> component.
/**
 * @name createRoutes
 * @description Creates a Routes component for the root route.
 * @param {Function} Switch The react-router Switch component.
 * @param {Function} Route The react-router Route component.
 * @param {Array} arr An array of (nested) route definitions.
 * @returns {Function} A functional component to use as the root Route.
 * @example
 * import React from "react"
 * import { Route, Switch } from "react-router"
 * import createRoutes from "@alexseitsinger/react-nested-routes"
 *
 * import App from "./app"
 * import IndexPage from "./pages/landing"
 * import AboutPage from "./pages/about"
 * import NotFoundPage from "./pages/not-found"
 *
 * const Routes = createRoutes(Switch, Route, [
 *   ["/", IndexPage, [
 *     ["/about", AboutPage],
 *     ["*", NotFoundPage],
 *   ]]
 * ])
 *
 * export default (
 *   <App>
 *     <Route component={Routes}/>
 *   </App>
 * )
 */
export default (Switch, Route, arr) => (props) => {
    const { mainRoutes, modalRoutes } = makeRoutes(Route, arr, props)
    return (
        <React.Fragment>
            <Switch>
                {mainRoutes}
            </Switch>
            {modalRoutes}
        </React.Fragment>
    )
}

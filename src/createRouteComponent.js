import React from "react"

import { generateRoutes } from "./generateRoutes"

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
 * @description Creates a Routes component for the root route.
 * @param {Object} config An object of route configurations. 
 * @returns {Function} A Route component to use as the root route.
 * @example
 * import React from "react"
 * import { Route, Switch } from "react-router"
 * import { RootRoute }  from "@alexseitsinger/react-nested-routes"
 *
 * import App from "./app"
 * import IndexPage from "./pages/landing"
 * import AboutPage from "./pages/about"
 * import AboutTeamModalPage from "./pages/about-team-modal"
 * import ContactPage from "./pages/contact"
 * import NotFoundPage from "./pages/not-found"
 *
 * export default (
 *   <Router>
 *     <App>
 *       <RootRoute 
 *         config={{
 *           path: "/",
 *           component: IndexPage,
 *           routes: [
 *             { path: "about", component: AboutPage, routes: [
 *               { path: "team", component: AboutTeamModalPage, modal: true },
 *             ]},
 *             { path: "contact", component: ContactPage },
 *             { path: "*", component: NotFoundPage },
 *           ]
 *         }}
 *       />
 *     </App>
 *   </Router>
 * )
 */
export function createRouteComponent({ Switch, Route, config }) {
  return function RouteComponent(rootProps) {
    const { mainRoutes, modalRoutes } = generateRoutes({ config, rootProps, Route })
    return (
      <React.Fragment>
        <Switch>
          {mainRoutes}
        </Switch>
        {modalRoutes}
      </React.Fragment>
    )
  }
}

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
 * @description Creates a stateless functional component for use in the root route. Routes that are marked with `modal: true` are rendered WITH their parent route component.
 * @param {Object} config An object of route configurations. 
 * @returns {Function} A stateless functional component to be used in the root route.
 * @example
 * import React from "react"
 * import { Router, Route, Switch } from "react-router"
 * import { createRouteComponent }  from "@alexseitsinger/react-nested-routes"
 *
 * import LandingPage from "./pages/landing"
 * import AboutPage from "./pages/about"
 * import AboutModalPage from "./pages/about-modal"
 * import NotFoundPage from "./pages/not-found"
 *
 * const config = {
 *   path: "/",
 *   Component: LandingPage,
 *   routes: [
 *     {path: "*", Component: NotFoundPage},
 *     {path: "about", Component: AboutPage, routes: [
 *       {path: "modal", Component: AboutModalPage, modal: true},
 *     ]}
 *   ]
 * }
 *
 * function App(props) {
 *   const RouteComponent = createRouteComponent({ Switch, Route, config })
 *   return (
 *     <Router>
 *       <Layout>
 *         <Route component={RouteComponent} />
 *       </Layout>
 *     </Router>
 *   )
 * }
 *
 * export default App
 */
export function createRouteComponent({ Switch, Route, config, reportRoutes = false }) {
  return function RouteComponent(rootProps) {
    const { mainRoutes, modalRoutes } = generateRoutes({ config, rootProps, Route })
    if(reportRoutes === true){
      const mainRoutePaths = mainRoutes.map((route, i) => {
        const number = (i + 1)
        const path = route.props.path
        const exact = route.props.exact ? route.props.exact : false
        return `${number}) ${path}, ${exact}`
      }).join("\n  ")
      const modalRoutePaths = modalRoutes.map((route, i) => {
        const number = (i + 1)
        const path = route.props.path
        const exact = route.props.exact ? route.props.exact : false
        return `${number}) ${path}, ${exact}`
      }).join("\n  ")
      const message = [
        "[react-nested-routes]",
        "Main Routes",
        ("  " + (mainRoutePaths.length ? mainRoutePaths : "None")),
        "Modal Routes",
        ("  " + (modalRoutePaths.length ? modalRoutePaths : "None")),
      ].join("\n")
      console.log(message)
    }
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

import React from "react"

import { composeRoute } from "./composeRoute"

export function updateRoutes({
  config: { 
    path, 
    Component, 
    routes, 
    modal = false, 
    exact = true 
  },
  rootProps, 
  mainRoutes, 
  modalRoutes, 
  Route
}) {
  // Add the index route
  if(path === "/"){
    mainRoutes.push(composeRoute({ path, Component, rootProps, exact, Route }))
  }

  // If there are no subroutes, return.
  if(!routes || !routes.length) {
    return
  }

  // If there are sub-routes, iterate over them, and add any we find.
  routes.forEach((route) => {
    // Normalize the path
    var routePath = route.path
    if(!routePath.startsWith(path)){
      // Replace multiple slashes with one.
      routePath = `/${path}/${routePath}`.replace(/(\/)\/+/g, "$1")
    }
    // If it's a wildcard path, fix it.
		if(routePath === "/*"){
			routePath = "*"
    }

    // If its a modal route, create it. 
    // Them, add a corresponding main route.
    // Oterhwise, just make a main route.
    if(route.modal && route.modal === true) {
      modalRoutes.push(composeRoute({
        path: routePath,
        Component: route.Component,
        rootProps,
        exact: true,
        Route,
      }))
      mainRoutes.push(composeRoute({
        path: routePath,
        Component, 
        rootProps,
        exact: true,
        Route,
      }))
    }
    else {
      mainRoutes.push(composeRoute({
        path: routePath,
        Component: route.Component,
        rootProps,
        exact: routePath === "*" ? false : true,
        Route,
      }))
    }
    // Repeat this process for each route object also.
    updateRoutes({ config: route,  rootProps, mainRoutes, modalRoutes, Route })
	})
}


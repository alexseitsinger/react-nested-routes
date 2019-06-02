import React from "react"
import _ from "underscore"

export function composeRoute({ path, Component, rootProps, exact = true, Route }) {
  return (
    <Route
      key={"route" + _.uniqueId()}
      path={path} 
      exact={exact}
      render={(routeProps) => <Component {...rootProps} {...routeProps} />} 
    />  
  )
}

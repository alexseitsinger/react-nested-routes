# React Nested Routes

## Description

Allows routes that are nested. Returns a component that should be used on a single master route in the app. Each route specified can set a flag that it is a modal, which will cause it to create two routes: one inside a switch and one outside a switch. This allows two routes with the same URL to be rendered simultaneously (allowing for modal routes to show). The route inside the switch will use the parent route component. The one outside the switch will use the modal component. This allows for modals that can be viewed and referenced by a URL.

## Usage

```javascript
// app.js
import React from "react"
import { Route } from "react-router"

import Routes from "./routes"

const App = () = (
	<div>
		<Route component={Routes}/>
	</div>
)

export default App
```

```javascript
// routes.js
import React from "react"
import { Route, Switch } from "react-router"
import createRoutes from "@alexseitsinger/react-nested-routes"

import LandingPage from "./pages/landing"
import AboutPage from "./pages/about"
import ServicesPage from "./pages/service"
import ServiceOneModalPage from "./pages/service-one-modal"
import ServiceTwoModalPage from "./pages/service-two-modal"
import NotFoundPage from "./pages/not-found"

export default createRoutes(Switch, Route, [
	["/", LandingPage, [
		["/about", AboutPage],
		["/services", ServicesPage, [
			["/service-1", ServiceOneModalPage, true],
			["/service-2", ServiceTwoModalPage, true],
		]],
		["*", NotFoundPage]
	]]
])
```

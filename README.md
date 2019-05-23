<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

# React Nested Routes

### Table of Contents

- [Description][1]
- [Installation][2]
- [Methods][3]
  - [createRoutes][4]
    - [Parameters][5]
    - [Examples][6]
    

## Description

Allows routes that are nested. Returns a component that should be used on a single master route in the app. Each route specified can set a flag that it is a modal, which will cause it to create two routes: one inside a switch and one outside a switch. This allows two routes with the same URL to be rendered simultaneously (allowing for modal routes to show). The route inside the switch will use the parent route component. The one outside the switch will use the modal component. This allows for modals that can be viewed and referenced by a URL.

## Installation

```
npm -i @alexseitsinger/react-nested-routes
```

## Methods

### createRoutes

#### Parameters

- `Switch` **Component** The react-router Switch component.
- `Route` **Component** The react-router Route component.
- `arr` **[Array][7]** An array of (nested) route definitions.

#### Examples

```javascript
import React from "react"
import { Route, Switch } from "react-router"
import createRoutes from "@alexseitsinger/react-nested-routes"

import App from "./app"
import IndexPage from "./pages/landing"
import AboutPage from "./pages/about"
import NotFoundPage from "./pages/not-found"

const Routes = createRoutes(Switch, Route, [
  ["/", IndexPage, [
    ["/about", AboutPage],
    ["*", NotFoundPage],
  ]]
])

export default (
  <App>
    <Route component={Routes}/>
  </App>
)
```

Returns **[Function][8]** A functional component to use as the root Route.

[1]: #description

[2]: #installation

[3]: #methods

[4]: #createroutes

[5]: #parameters

[6]: #examples

[7]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[8]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

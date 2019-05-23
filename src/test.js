import React from "react"
import { MemoryRouter, Switch, Route } from "react-router"
import createRoutes from "./index"

const setup = (initialPath, Routes) => mount(
	<MemoryRouter initialEntries={[initialPath]}>
		<Route component={Routes}/>
	</MemoryRouter>
)

const About = () => <div>About</div>
const Index = () => <div>Index</div>
const NotFound = () => <div>Not Found</div>

describe("<Routes/>", () => {
    it("renders index", () => {
        const initialPath = "/"
        const Routes = createRoutes(Switch, Route, [
            ["/", Index, [
                ["/about", About],
            ]]
        ])
        const wrapper = setup(initialPath, Routes)
		expect(wrapper.find(Index)).toHaveLength(1)
	})
	// it("renders about", () => {
	// 	const wrapper = setup("/about", (
	// 		<Routes>
	// 			<Route path={"/"} component={Index}>
	// 				<Route path={"/about"} component={About}/>
	// 			</Route>
	// 		</Routes>
	// 	))
	// 	expect(wrapper.find(About)).toHaveLength(1)
	// })
	// it("renders wildcard for unmatching paths", () => {
	// 	const wrapper = setup("/fdsafsdfadsfsd", (
	// 		<Routes>
	// 			<Route path={"/"} component={Index}>
	// 				<Route path={"/about"} component={About}/>
	// 				<Route path={"*"} component={NotFound}/>
	// 			</Route>
	// 		</Routes>
	// 	))
	// 	expect(wrapper.find(NotFound)).toHaveLength(1)
	// })
})

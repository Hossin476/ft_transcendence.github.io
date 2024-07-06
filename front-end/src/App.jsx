
import LayoutOne from "./Layouts/LayoutOne"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Dashboard from "./Pages/Dashboard"
import ManageFriends from "./Pages/ManageFriends"
function App() {
  

  return (
    <BrowserRouter>
		<Routes>
			<Route element={<LayoutOne/>}>
					<Route path="/example1" element={<></>}/>
					<Route path="/dashboard" element={<Dashboard/>}/>
					<Route path="/managefriends" element={<ManageFriends/>}/>
					{/* <Route path="/example" element={} */}
					/* here u w will add ur page component that has the friends bar */
			</Route>
		</Routes>
    </BrowserRouter>
  )
}


export default App

import {Routes,Route} from "react-router-dom"
import User from "./pages/User"
import Host from "./pages/Host"
import HostDashboard from "./pages/HostDashboard"
import UserDashboard from "./pages/UserDashboard"
import LandingPage from "./pages/landing-page"
import FeaturesPage from "./pages/features-page"
import PricingPage from "./pages/pricing-page"
import DocsPage from "./pages/docs-page"

function App() {
  
  return (
    <>
    <Routes>
      <Route path="/user" element=<User/>/>
      <Route path="/host" element=<Host/>/>
      <Route path="/userDashboard" element=<UserDashboard/>/>
      <Route path="/hostDashboard" element=<HostDashboard/>/>
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path="/features" element={<FeaturesPage/>}></Route>
      <Route path="/pricing" element={<PricingPage/>}></Route>
      <Route path="/docsPage" element={<DocsPage/>}></Route>
    </Routes>
      
    </>
  )
}

export default App

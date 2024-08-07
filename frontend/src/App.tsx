import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Landing } from './pages/Landing'
import { Dashboard } from './pages/Dashboard'
import { PostCreation } from './pages/PostCreation'
import { Postsview } from './pages/PostsView'
import { SearchBar } from './components/SearchBar'
import { TagsRender } from './pages/TagsPage'


function App() {
  
  return (
    
    // <div>
    //   <SignIn></SignIn>
      
      
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/SignIn" element={<SignIn></SignIn>}></Route>
        <Route path="/SignUp" element={<SignUp></SignUp>}></Route>
        <Route path="/Search" element={<SearchBar></SearchBar>}></Route>
        <Route path="/" element={<Landing></Landing>}></Route>
        <Route path="/Dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/PostCreation" element={<PostCreation></PostCreation>}></Route>
        <Route path="/PostsView" element={<Postsview></Postsview>}></Route>
        <Route path='/AddInterests' element={<TagsRender></TagsRender>}></Route> 
      </Routes>
    </BrowserRouter>
  )
}






export default App

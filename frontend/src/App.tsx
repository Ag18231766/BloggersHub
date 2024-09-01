import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Landing } from './pages/Landing'
import { PostCreation } from './pages/PostCreation'
import { SearchBar } from './components/SearchBar'
import { Tags } from './pages/Tags'
import { Blog } from './pages/Blog'
import MobSearch from './pages/MobSearch'




function App() {
  

  return (

    <BrowserRouter>

      <Routes>
        <Route path="/SignIn" element={<SignIn></SignIn>}></Route>
        <Route path="/SignUp" element={<SignUp></SignUp>}></Route>
        <Route path="/Search" element={<SearchBar></SearchBar>}></Route>
        <Route path="/" element={<Landing></Landing>}></Route>
        <Route path="/PostCreation/:username/:id" element={<PostCreation></PostCreation>}></Route>
        <Route path="/PostCreation/:username/:id/?edit" element={<PostCreation></PostCreation>}></Route>
        <Route path="/Search/?title" element={<SearchBar></SearchBar>}></Route>
        <Route path="/MobSearch" element={<MobSearch></MobSearch>}></Route>
        <Route path="/:id" element={<Blog></Blog>}></Route>
        <Route path='/AddInterests' element={<Tags></Tags>}></Route> 
      </Routes>
    </BrowserRouter>
  )
}






export default App

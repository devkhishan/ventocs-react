import Collections from './components/Collections' 
import NFTGrid from './components/NFTGrid'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Thread from './components/Thread'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
function App() {
  return (
    <>
    <Header />
      <NavBar />
    <Router>
      
      <Routes>
        <Route path="/" element={<Thread />}/>
        <Route path="/Collections" element={<NFTGrid/>} />
        
      </Routes>
    </Router>
    </>
  )
}

export default App

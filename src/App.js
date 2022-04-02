
import './App.css';
import React, {useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



const App = ()=>{
  let apikey=process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0)

    return (
      <>

      <BrowserRouter>
      
      <div>
      <LoadingBar
        color='#f11946'
        progress={progress}
      
      />
        <Navbar/>
        
        <Routes>
          <Route path="/health" element={<News setProgress={setProgress} apikey={apikey} key="health" pageSize={5} country='in' category='health'/>} />
          <Route path="/science" element={<News setProgress={setProgress} apikey={apikey} key="science" pageSize={5} country='in' category='science'/>} />
          <Route path="/sports" element={<News setProgress={setProgress} apikey={apikey} key="sports" pageSize={5} country='in' category='sports'/>} />
          <Route path="/technology" element={<News setProgress={setProgress} apikey={apikey} key="technology" pageSize={5} country='in' category='technology'/>} />
          <Route path="/business" element={<News setProgress={setProgress} apikey={apikey} key="business" pageSize={5} country='in' category='business'/>} />
          <Route path="/entertainment" element={<News setProgress={setProgress} apikey={apikey} key="entertainment" pageSize={5} country='in' category='entertainment'/>} />
          <Route path="/" element={<News setProgress={setProgress} apikey={apikey} key="general" pageSize={5} country='in' category='general'/>} />

        </Routes>
      </div>
      
      </BrowserRouter>
      
     
      
    

      </>
    )
  }

  export default App



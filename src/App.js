
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


export default class App extends Component {
  apikey=process.env.REACT_APP_NEWS_API

  state={
    progress:0,

  }

  setProgress=(progress)=>{

    this.setState({progress:progress})

  }

  
  render() {
    
    
    return (

      <BrowserRouter>
      
      <div>
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      
      />
        <Navbar/>
        <Routes>
          <Route path="/health" element={<News setProgress={this.setProgress} apikey={this.apikey} key="health" pageSize={5} country='in' category='health'/>} />
          <Route path="/science" element={<News setProgress={this.setProgress} apikey={this.apikey} key="science" pageSize={5} country='in' category='science'/>} />
          <Route path="/sports" element={<News setProgress={this.setProgress} apikey={this.apikey} key="sports" pageSize={5} country='in' category='sports'/>} />
          <Route path="/technology" element={<News setProgress={this.setProgress} apikey={this.apikey} key="technology" pageSize={5} country='in' category='technology'/>} />
          <Route path="/business" element={<News setProgress={this.setProgress} apikey={this.apikey} key="business" pageSize={5} country='in' category='business'/>} />
          <Route path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" pageSize={5} country='in' category='entertainment'/>} />
          <Route path="/" element={<News setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize={5} country='in' category='general'/>} />

        </Routes>
      </div>
      
      </BrowserRouter>
    

   
    )
  }
}


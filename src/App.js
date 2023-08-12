import './App.css';
import React, { Component, useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { useEffect } from 'react';
import{
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"
import LoadingBar from "react-top-loading-bar"

const App = ()=>{
  const pageSize=10;

  const [searchMsg, setSearchMsg] = useState("");
  const [progress, setProgress] = useState(0);

  const handleSearchMsg = (msg)=>{setSearchMsg(msg);}
    return (
      <div>
        <Router>
          <Navbar callback = {handleSearchMsg}/>
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
            <Routes>
                <Route path="/" element={<News setProgress={setProgress}  key ="general" pageSize={pageSize} country="in" category="general"/>}></Route>
                <Route path="/business" element={<News setProgress={setProgress}  key ="business" pageSize={pageSize} country="in" category="business"/>}></Route>
                <Route path="/entertainment" element={<News setProgress={setProgress}  key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>}></Route>
                <Route path="/general" element={<News setProgress={setProgress}  key="general" pageSize={pageSize} country="in" category="general"/>}></Route>
                <Route path="/health" element={<News setProgress={setProgress}  key ="health"  pageSize={pageSize} country="in" category="health"/>}></Route>
                <Route path="/science" element={<News setProgress={setProgress}  key ="science" pageSize={pageSize} country="in" category="science"/>}></Route>
                <Route path="/sports" element={<News setProgress={setProgress}  key ="sports" pageSize={pageSize} country="in" category="sports"/>}></Route>
                <Route path={`/${searchMsg}`} element={<News setProgress={setProgress}  key ="technology" pageSize={pageSize} search={searchMsg}/>}></Route>

            </Routes>
        </Router>
      </div>
    )
  
}

export default App;

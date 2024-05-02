// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import React, { useState } from 'react'
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import{
  BrowserRouter as Router,
  Routes,
  Route, 
} from "react-router-dom";
  
const App = () => {  
  const pageSize = 5;
  // apiKey = process.env.REACT_APP_NEWS_API;

  // state = {
  //   progress:0
  // }

  const [progress, setProgress] = useState(0);
  
  // setProgress (progress:progress);


 
     return (
      <div>
        <Router>

         <Navbar/> 
        <LoadingBar
        color='#f11946'
        progress={progress} 
        />

         <Routes>
          {/* console.log("router"); */}
          <Route exact path="/home" element={<News setProgress = {setProgress} key="General" pageSize={ pageSize} country="in" category="General" />}/>
          <Route exact path="/Business" element={<News setProgress = { setProgress} key="Business" pageSize={ pageSize} country="in" category="Business" />}/>
          <Route exact path="/Entertainment" element={<News setProgress = { setProgress} key="Entertainment" pageSize={ pageSize} country="in" category="Entertainment" />}/>
          <Route exact path="/General" element={<News setProgress = { setProgress} key="General" pageSize={ pageSize} country="in" category="General" />}/>
          <Route exact path="/Health" element={<News setProgress = { setProgress} key="Health" pageSize={ pageSize} country="in" category="Health" />}/>
          <Route exact path="/Science" element={<News setProgress = { setProgress} key="Science" pageSize={ pageSize} country="in" category="Science" />}/>
          <Route exact path="/Sports" element={<News setProgress = { setProgress} key="Sports" pageSize={ pageSize} country="in" category="Sports" />}/>
          <Route exact path="/Technology" element={<News setProgress = { setProgress} key="Technology" pageSize={ pageSize} country="in" category="Technology" />}/>

         </Routes>

        </Router>
      </div>
     )
   
 }
 export default App

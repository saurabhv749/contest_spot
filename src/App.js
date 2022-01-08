import './App.css';
import React from 'react'
import PlateformEvents from './components/PlateformEvents';
import { useEffect, useState } from 'react';

function App() {

  const [data,setData] = useState(null)
  const [current, setCurrent] = useState(null)
  const [isVisible,setIsVisible]  = useState(true)
  const [optVisible,setOptVisible] = useState(true)
  const favUrl = 'https://firebasestorage.googleapis.com/v0/b/grabby-ef028.appspot.com/o/cbimage.png?alt=media&token=4d79fe20-c30c-4e2d-bfe1-cb7d64eead1d'

  useEffect(()=>{
    fetch('https://scrapii.saurabhv749.repl.co/api/contests')
    .then(res=>res.json())
    .then(result=>{
      if(result.status==='success'){
        setData(result.competitions)
        logMe('fav')
      }
    })
    .catch(console.log())
  }, [])
  
  useEffect(() => {   
    window.addEventListener("scroll",handleSettings);
    return () => 
       window.removeEventListener("scroll",handleSettings); 
  }, [])

  function handleSettings() {
    let heightToHideFrom = 500;
    const winScroll = document.body.scrollTop || 
        document.documentElement.scrollTop;
       
    if (winScroll > heightToHideFrom) { 
       isVisible &&      // to limit setting state only the first time         
         setIsVisible(false);
    } else {
         setIsVisible(true);
    } 
  }

  function logMe(src){
    if(src==='fav'){

      let favs = localStorage.getItem('favorites'),
      source_logo  =  favUrl

      if(favs){
        let existing = JSON.parse(favs)
            setCurrent({source:'FAVORITES',source_logo,events:existing})
          }else
          setCurrent({source:'FAVORITES',source_logo,events:[]})
          toggleOptions()
          return
    }

    let newCurrent = data.find(x=>x.source===src)
    setCurrent(newCurrent)
    toggleOptions()
  }

  function hideModel(){
    document.querySelector('.info-model').style.transform = `translate(0, -1000px)`
  }

  function toggleOptions() {
    let el = document.querySelector('.preferences-options')
    let settings = document.querySelector('#settings')

    if (optVisible) {
      el.style.transform = 'translateX(1000px)'
      setOptVisible(false)
      settings.style.transform = 'rotate(-40deg)'
    } else {
      el.style.transform = 'translateX(0)'
      setOptVisible(true)
      settings.style.transform = 'rotate(40deg)'

    }

  }


  return (<div className="parent-container">
    <div className="info-model" >
      <span id="model-message"></span>
    </div>

  <div className="plateform-events">
    {
     current &&  <PlateformEvents hideModel={hideModel}  comptData={current} />
      
    }
    </div>
    
    <div className='preferences-options'>
      <div className='option-container'>
          <div style={{background:'#000'}} title="favorites" className="bottom-nav" key={16} onClick={()=>logMe('fav')}>
            <img src={favUrl} style={{  height: '85px',width: '85px'}} alt="favorites" />
          </div>
          {
          data &&  data.map((s,i)=>{
              return <div className="bottom-nav" style={{background:s.color}} title={s.source} key={i} onClick={()=>logMe(s.source)}>
                <img src={s.source_logo} style={{ height: 80, width: 80, borderRadius: '50%' }} alt="plateform" />
                </div>
            })
          }
      </div>
    </div>
    {

      isVisible &&  <div  className='preferences'>
                        <img onClick={toggleOptions} id='settings' src='https://firebasestorage.googleapis.com/v0/b/grabby-ef028.appspot.com/o/settings.png?alt=media&token=948d2b81-3a11-4f6a-988b-ad81b4f559e7' alt='preferences' />
                      </div>

    }
   
  </div>)
}

export default App;

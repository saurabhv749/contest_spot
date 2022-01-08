import React,{useEffect, useState} from 'react'
import Event from './Event'
import './plateform.css'

const PlateformEvents = ({comptData,hideModel}) => {
    const [current,setCurrent] = useState('Live'),
    {source,source_logo,events,color} = comptData
    
    const [displayEvents,setDisplayEvents] = useState(events.filter(x=>x.isOngoing))
    
    function changeData(){
        let indicator = document.querySelector('#'+source)
      if(current==='Live'){
        setDisplayEvents(events.filter(x=>!x.isOngoing))
        indicator.style.transform =  'translate(100%,0)'
        setCurrent('Upcoming')
    }else{
        setDisplayEvents(events.filter(x=>x.isOngoing))
        indicator.style.transform =  'translate(0%,0)'
        setCurrent('Live')
      }
    }

    function changeEventData(){
        let indicator = document.querySelector('#'+source)

        setDisplayEvents(events.filter(x=>x.isOngoing))
        indicator.style.transform =  'translate(0%,0)'
        setCurrent('Live')
    }

    useEffect(changeEventData,[comptData])
    
    return (<div>
      <div className="plateform-container">
        <div className='platform-header'>
          <div className="plateform-info">
            <img className="plateform-logo" style={{borderColor:color}} src={source_logo} alt="plateform"/>
            <h2 className="plateform-name">{source}</h2>
          </div>
          <div className="slider" onClick={changeData}>
            <span id={source}  className="indicator">{current}</span>
          </div>
        </div>

      <div className="events-holder">
         {
            displayEvents && displayEvents.length===0 ? <div className="no-events"><p>No Events</p></div> : 
            displayEvents.map((d,i)=>{
                 return <Event hideModel={hideModel} color={color} key={i} eventInfo={d} />
             })
         }
      </div>
    
    </div> </div>);
}

export default PlateformEvents

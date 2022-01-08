import React from 'react'
import './event.css'

const Event = ({eventInfo,hideModel,color}) => {
    
    const {title,link,organization_url,date_info,type} = eventInfo

    function addToFav(){

        let favs = localStorage.getItem('favorites'),
        model = document.querySelector('.info-model'),
        msgContainer = document.querySelector('#model-message')
        if(favs){
            let existing = JSON.parse(favs),
            match = existing.find(x=>x.title===title)

            if(match){
                // remove
                existing = existing.filter(d=>d.title!==title)
                localStorage.setItem('favorites',JSON.stringify(existing))
                msgContainer.innerHTML = title+' \nRemoved'
                model.style.transform = `translateY(0)`
                model.style.background = `#ed6c02`
            }else{
                // add to fav
                existing.push(eventInfo)
                msgContainer.innerHTML= title+' \nAdded'
                model.style.transform = `translateY(0)`
                model.style.background = '#2e7d32'
                localStorage.setItem('favorites', JSON.stringify(existing))
            }
        } else {
            localStorage.setItem('favorites', JSON.stringify([eventInfo]))
            msgContainer.innerHTML= title+' \nAdded'
            model.style.transform = `translateY(0)`
            model.style.background = '#2e7d32'
        }
        // hide model
        setTimeout(hideModel,3000)
    }

    return (
        <div className="event-container" style={{background:color+'43'}}>
            <img className="org-img" src={organization_url} style={{borderColor:color}} alt="organization"></img>
            <span className="add-fav" style={{cursor:'pointer'}} onClick={addToFav}>💜</span>
            <div className="info">
                <h4>{title}</h4>
                <div className="event-nav">
                    <div className="event-date">
                        <p>Type: {type}</p>
                        <p>{date_info}</p>
                    </div>
                <div>
                    <a href={link} target="_blank" rel="noreferrer"><button  className="event-link">VISIT</button></a>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Event

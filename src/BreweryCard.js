import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faHeart } from "@fortawesome/free-solid-svg-icons";

const BreweryCard = (props) => {
  
  const { breweryName, breweryAddress, breweryCity, breweryState, breweryWebsite, isLiked, handleLike, index} = props

  const handleUrlClick = () => {
    window.open(breweryWebsite, "_blank");
  };

  return (
    <div id='brewery-card'>
      <iframe style={{ width: "100%", height: "150px", border: 'none', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)'}} src={breweryWebsite} title={breweryName}></iframe>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <h3>{breweryName}</h3>

        <div
        onClick={handleUrlClick}>
          <FontAwesomeIcon id='web-url' style={{color: 'blue', transition: '0.2s'}} icon={faLink} />
        </div>

        <div 
        key={index}
        onClick={handleLike}>
          <FontAwesomeIcon 
          id='heart-icon' 
          icon={faHeart} 
          style={{transition: '0.2s'}} 
          color={isLiked ? 'red' : 'white'}
          />
        </div>

      </div>

      <p id='brewery-info'>Location: {breweryAddress}, {breweryCity}, {breweryState}</p>
    </div>
  );
}

export default BreweryCard
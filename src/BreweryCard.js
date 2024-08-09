import React from 'react'

const BreweryCard = (props) => {
  
  const { breweryName, breweryAddress, breweryCity, breweryState, breweryWebsite} = props

  const handleCardClick = () => {
    window.open(breweryWebsite, "_blank");
  };

  return (
    <div id='brewery-card' onClick={handleCardClick}>
      <iframe style={{ width: "100%", height: "150px", border: 'none', borderRadius: '5px'}} src={breweryWebsite} title={breweryName}></iframe>
      <h3>{breweryName}</h3>
      <p id='brewery-info'>Location: {breweryAddress}, {breweryCity}, {breweryState}</p>
    </div>
  );
}

export default BreweryCard
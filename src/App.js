import axios from 'axios';
import React, {Component} from 'react';
import './App.css';
import BreweryCard from './BreweryCard';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breweryName: '',
      breweryAddress: '',
      breweryCity: '',
      breweryState: '',
      breweryWebsite: '',
      arrayOfBreweries: [],
      searchQueryCity: ''
    };
  }

  componentDidMount() {
    this.fetchRandomBreweries()
  }

  fetchRandomBreweries = () => {
    axios.get('https://api.openbrewerydb.org/breweries').then((res) => {
      const breweriesList = res.data
      this.setState({ arrayOfBreweries: breweriesList})
    })
  }

  fetchBreweriesByCity = (e) => {
    axios.get(`https://api.openbrewerydb.org/v1/breweries?by_city=${this.state.searchQueryCity}`).then((res) => {
      const breweriesList = res.data
      this.setState({arrayOfBreweries: breweriesList})
    })
  }


  handleSubmit = (e) => {
    e.preventDefault()
    if(this.state.searchQueryCity){
      this.fetchBreweriesByCity()
    } else {
      this.fetchRandomBreweries()
    }
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Breweries</h1>

          <form onSubmit={this.handleSubmit}>
            <input
              type='text'
              placeholder='City'
              onChange={(e) => this.setState({ searchQueryCity: e.target.value })}
            />
          </form>

          <ul>
            {this.state.arrayOfBreweries.length === 0 && <h2>No breweries found</h2>}
            {this.state.arrayOfBreweries.map((brewery, index) => (
              <BreweryCard
                key={index}
                breweryName={brewery.name}
                breweryAddress={brewery.street}
                breweryCity={brewery.city}
                breweryState={brewery.state}
                breweryWebsite={brewery.website_url}
              />
            ))}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;

import axios from "axios";
import React, { Component } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import BreweryCard from "./BreweryCard";
import MuiCardBrewery from "./MuiCardBrewery";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breweryName: "",
      breweryAddress: "",
      breweryCity: "",
      breweryState: "",
      breweryWebsite: "",
      arrayOfBreweries: [],
      searchQueryCity: "",
      isLiked: false,
      arrayOfLikes: [],
      };
  }

  componentDidMount() {
    this.fetchRandomBreweries();
  }

  fetchRandomBreweries = () => {
    axios.get("https://api.openbrewerydb.org/breweries").then((res) => {
      const breweriesList = res.data;
      this.setState({ arrayOfBreweries: breweriesList });
    });
  };

  fetchBreweriesByCity = (e) => {
    axios
      .get(
        `https://api.openbrewerydb.org/v1/breweries?by_city=${this.state.searchQueryCity}`,
      )
      .then((res) => {
        const breweriesList = res.data;
        this.setState({ arrayOfBreweries: breweriesList });
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.searchQueryCity) {
      this.fetchBreweriesByCity();
    } else {
      this.fetchRandomBreweries();
    }
  };

  handleLike = (index) => {
    this.setState({ isLiked: !this.state.isLiked });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Breweries</h1>

          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Search by city..."
              onChange={(e) =>
                this.setState({ searchQueryCity: e.target.value })
              }
            />
          </form>

        {this.state.arrayOfBreweries.map((brewery, index) => {
          return (
            <MuiCardBrewery 
              key={index}
              breweryName={brewery.name}
              breweryAddress={brewery.street}
              breweryCity={brewery.city}
              breweryState={brewery.state}
              breweryWebsite={brewery.website_url}
              handleLike={this.handleLike}
            />
          )
        })}
        </header>
      </div>
    );
  }
}

export default App;

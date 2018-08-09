import React, {Component} from 'react'

class filter extends Component {
  render() {
    return (
      <div>
        <h3>Filter Restaurants</h3>
        <div className="ui list">
          <div className="item">
            <select className="ui fluid dropdown">
              <option value="">Price</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
            </select>
          </div>
          <div className="item">
            <select className="ui fluid dropdown">
              <option value="">Cuisine Type</option>
              <option value="Chinese">Chinese</option>
              <option value="Deli">Deli</option>
              <option value="Hot Dogs">Hot Dogs</option>
              <option value="Italian">Italian</option>
              <option value="Ramen">Ramen</option>
              <option value="Seafood">Seafood</option>
              <option value="Steakhouse">Steakhouse</option>
            </select>
          </div>
          <div className="item">
            <select className="ui fluid dropdown">
              <option value="Default">Location</option>
              <option value="New York">New York</option>
            </select>
          </div>
        </div>
      </div>
    )
  }
}

export default filter

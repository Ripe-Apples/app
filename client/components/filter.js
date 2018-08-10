import React, {Component} from 'react'
import {List, Dropdown, ListItem} from 'semantic-ui-react'

class filter extends Component {
  render() {
    //Cuisines

    const chinese = 'Chinese',
      deli = 'Deli',
      italian = 'Italian',
      ramen = 'Ramen',
      seafood = 'Seafood',
      steakhouse = 'Steakhouse'

    //Locations

    const newYork = 'New York'

    const prices = [
      {text: '$', value: 1},
      {text: '$$', value: 2},
      {text: '$$$', value: 3},
      {text: '$$$$', value: 4}
    ]
    const cuisine = [
      {text: chinese, value: chinese},
      {text: deli, value: deli},
      {text: italian, value: italian},
      {text: ramen, value: ramen},
      {text: seafood, value: seafood},
      {text: steakhouse, value: steakhouse}
    ]
    const location = [
      {
        text: newYork,
        value: newYork
      }
    ]
    return (
      <React.Fragment>
        <List>
          <List.Header>Filter</List.Header>
          <List.Item>
            <Dropdown placeholder="Price" fluid selection options={prices} />
          </List.Item>
          <ListItem>
            <Dropdown placeholder="Cuisine" fluid selection options={cuisine} />
          </ListItem>
          <ListItem>
            <Dropdown
              placeholder="Location"
              fluid
              selection
              options={location}
            />
          </ListItem>
        </List>
      </React.Fragment>
    )
  }
}

export default filter

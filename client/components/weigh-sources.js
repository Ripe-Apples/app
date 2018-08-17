import React, {Component} from 'react'
import {List} from 'semantic-ui-react'
import WeightSourcesOption from './weigh-sources-option'

class weighSources extends Component {
  render() {
    const types = ['Yelp', 'Zomato', 'Google', 'Foursquare']
    return (
      <List>
        <List.Header>Weigh Sources</List.Header>
        {types.map(type => <WeightSourcesOption type={type} key={type} />)}
      </List>
    )
  }
}

export default weighSources

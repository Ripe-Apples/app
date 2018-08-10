import React from 'react'
import {connect} from 'react-redux'
import WeighSources from './weighSources'
import Filter from './filter'
import {Header, List} from 'semantic-ui-react'

const Options = () => (
  <React.Fragment>
    <Header as="h1">Advanced Options</Header>
    <List>
      <List.Item>
        <WeighSources />
      </List.Item>
      <List.Item>
        <Filter />
      </List.Item>
    </List>
  </React.Fragment>
)

const mapState = state => {}

const mapDispatch = dispatch => {}

export default connect()(Options)

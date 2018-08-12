import React, {Component} from 'react'
import {connect} from 'react-redux'
import WeighSources from './weigh-sources'
import Filter from './filter'
import {reset as resetWeights} from '../store/weighSources'
import {reset as resetFilters} from '../store/filters'
import {Header, List, Button} from 'semantic-ui-react'

class Options extends Component {
  constructor() {
    super()
    this.handleReset = this.handleReset.bind(this)
  }

  handleReset() {
    this.props.resetWeights()
    this.props.resetFilters()
  }

  render() {
    return (
      <div>
        <List>
          <List.Item>
            <div className="weigh-sources-flex">
              <Header as="h1">Advanced Options</Header>
              <div className="item-flex right">
                <div className="reset">
                  <Button
                    size="tiny"
                    negative
                    type="submit"
                    onClick={this.handleReset}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </List.Item>
          <List.Item>
            <WeighSources />
          </List.Item>
          <List.Item>
            <Filter />
          </List.Item>
        </List>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  resetWeights: () => dispatch(resetWeights()),
  resetFilters: () => dispatch(resetFilters())
})

export default connect(null, mapDispatch)(Options)

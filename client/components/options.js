import React from 'react'
import {connect} from 'react-redux'
import WeighSources from './weigh-sources'
import Filter from './filter'
import {Header, List, Button} from 'semantic-ui-react'

const Options = () => (
  <div>
    <List>
      <List.Item>
        <div className="weigh-sources-flex">
          <Header as="h1">Advanced Options</Header>
          <div className="item-flex right">
            <div className="reset">
              <Button size="tiny" negative type="submit">
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

export default connect()(Options)

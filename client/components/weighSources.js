import React, {Component} from 'react'
import {List, Button, Icon} from 'semantic-ui-react'

class weighSources extends Component {
  render() {
    return (
      <List>
        <List.Header>Weigh Sources</List.Header>
        <List.Item>
          <div className="weigh-sources-flex">
            <div className="item-flex">Yelp</div>
            <div className="item-flex right">
              <Button.Group>
                <Button>
                  <Icon name="minus" />
                </Button>
                <Button.Or text="5" />
                <Button positive>
                  <Icon name="plus" />
                </Button>
              </Button.Group>
            </div>
          </div>
        </List.Item>
        <List.Item>
          <div className="weigh-sources-flex">
            <div className="item-flex">Trip Advisor</div>
            <div className="item-flex right">
              <Button.Group>
                <Button>
                  <Icon name="minus" />
                </Button>
                <Button.Or text="5" />
                <Button positive>
                  <Icon name="plus" />
                </Button>
              </Button.Group>
            </div>
          </div>
        </List.Item>
        <List.Item>
          <div className="weigh-sources-flex">
            <div className="item-flex">Google</div>
            <div className="item-flex right">
              <Button.Group>
                <Button>
                  <Icon name="minus" />
                </Button>
                <Button.Or text="5" />
                <Button positive>
                  <Icon name="plus" />
                </Button>
              </Button.Group>
            </div>
          </div>
        </List.Item>
      </List>
    )
  }
}

export default weighSources

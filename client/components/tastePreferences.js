import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'

class TastePreferences extends Component {
  constructor() {
    super()
    this.state = {
      tastes: {
        Burger: {active: false, emoji: '🍔'},
        Pizza: {active: false, emoji: '🍕'},
        Salad: {active: false, emoji: '🥗'},
        Ramen: {active: false, emoji: '🍜'},
        Sushi: {active: false, emoji: '🍣'},
        Chinese: {active: false, emoji: '🥡'},
        Beer: {active: false, emoji: '🍺'}
      }
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClick(event) {
    this.setState({
      tastes: {
        ...this.state.tastes,
        [event.target.value]: {
          ...this.state.tastes[event.target.value],
          active: !this.state.tastes[event.target.value].active
        }
      }
    })
  }

  handleSubmit() {
    // SOME STUFF IN HERE
  }

  render() {
    let buttons = []

    for (let key in this.state.tastes) {
      if (this.state.tastes.hasOwnProperty(key)) {
        buttons.push({
          value: key,
          active: this.state.tastes[key].active,
          emoji: this.state.tastes[key].emoji
        })
      }
    }

    return (
      <div>
        {buttons.map((tasteObject, index) => {
          return (
            <Button
              toggle
              key={tasteObject.emoji}
              value={tasteObject.value}
              active={tasteObject.active}
              onClick={this.handleClick}
            >
              {tasteObject.emoji + tasteObject.value}
            </Button>
          )
        })}
        <Button onClick={this.handleSubmit}>Submit</Button>
      </div>
    )
  }
}

export default connect()(TastePreferences)

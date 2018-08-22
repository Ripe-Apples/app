import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Divider} from 'semantic-ui-react'
import axios from 'axios'
import {me} from '../store/user'

class TastePreferences extends Component {
  constructor() {
    super()
    this.state = {
      tastes: [
        {name: 'Burgers', active: false, emoji: '🍔'},
        {name: 'Pizza', active: false, emoji: '🍕'},
        {name: 'Salad', active: false, emoji: '🥗'},
        {name: 'Ramen', active: false, emoji: '🍜'},
        {name: 'Sushi Bars', active: false, emoji: '🍣'},
        {name: 'Chinese', active: false, emoji: '🥡'},
        {name: 'Bars', active: false, emoji: '🍺'},
        {name: 'Italian', active: false, emoji: '🍝'},
        {name: 'Mexican', active: false, emoji: '🌮'}
      ],
      disabled: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClick(event) {
    const tastes = this.state.tastes.map(tasteType => {
      if (tasteType.name === event.target.value) {
        return {
          ...tasteType,
          active: !tasteType.active
        }
      } else {
        return tasteType
      }
    })

    let disabled = tastes.some(taste => {
      return taste.active
    })

    this.setState({
      tastes,
      disabled
    })
  }

  async handleSubmit() {
    let cuisines = []
    this.state.tastes
      .filter(taste => {
        return taste.active
      })
      .forEach(taste => cuisines.push(taste.name))
    await axios.put('/api/users/likedCuisines', cuisines)
    await this.props.getMe()
    this.props.history.push('/recommendations')
  }

  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <p>
          Please select your favorite cuisines so we can curate restaurants for
          you.
        </p>
        {this.state.tastes.map(tasteObject => {
          return (
            <Button
              toggle
              key={tasteObject.name}
              value={tasteObject.name}
              active={tasteObject.active}
              onClick={this.handleClick}
            >
              {tasteObject.emoji + tasteObject.name}
            </Button>
          )
        })}
        <Divider hidden />
        <Button
          onClick={this.handleSubmit}
          color="orange"
          disabled={!this.state.disabled}
        >
          Submit
        </Button>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  getMe: () => dispatch(me())
})

export default connect(null, mapDispatch)(TastePreferences)

import React, {Component} from 'react'

class weighSources extends Component {
  constructor() {
    super()
    this.state = {
      yelpWeight: 5,
      tripAdvisorWeight: 5,
      googleWeight: 5
    }
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
  }

  handleIncrement(event) {
    let weight

    if (event.target.id === 'Yelp') {
      weight = 'yelpWeight'
    }
    if (event.target.id === 'Trip Advisor') {
      weight = 'tripAdvisorWeight'
    }
    if (event.target.id === 'Google') {
      weight = 'googleWeight'
    }

    const oldWeight = this.state[weight]
    if (oldWeight + 1 <= 10) {
      this.setState({[weight]: oldWeight + 1})
    }
  }

  handleDecrement(event) {
    let weight

    if (event.target.id === 'Yelp') {
      weight = 'yelpWeight'
    }
    if (event.target.id === 'Trip Advisor') {
      weight = 'tripAdvisorWeight'
    }
    if (event.target.id === 'Google') {
      weight = 'googleWeight'
    }

    const oldWeight = this.state[weight]
    if (oldWeight - 1 >= 0) {
      this.setState({[weight]: oldWeight - 1})
    }
  }

  render() {
    return (
      <div>
        <h3>Weigh Sources</h3>
        <div className="ui form">
          <div className="inline fields">
            <div className="eight wide field" style={{textAlign: 'right'}}>
              <label>Yelp</label>
            </div>
            <div className="eight wide field">
              <div className="ui buttons">
                <button
                  id="Yelp"
                  type="button"
                  className="ui button"
                  onClick={this.handleDecrement}
                >
                  <i id="Yelp" className="minus icon" />
                </button>
                <div
                  className="or"
                  data-text={this.state.yelpWeight.toString()}
                />
                <button
                  id="Yelp"
                  type="button"
                  className="ui positive button"
                  onClick={this.handleIncrement}
                >
                  <i id="Yelp" className="plus icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="ui form">
          <div className="inline fields">
            <div className="eight wide field">
              <label>Trip Advisor</label>
            </div>
            <div className="eight wide field">
              <div className="ui buttons">
                <button
                  id="Trip Advisor"
                  type="button"
                  className="ui button"
                  onClick={this.handleDecrement}
                >
                  <i id="Trip Advisor" className="minus icon" />
                </button>
                <div
                  className="or"
                  data-text={this.state.tripAdvisorWeight.toString()}
                />
                <button
                  id="Trip Advisor"
                  type="button"
                  className="ui positive button"
                  onClick={this.handleIncrement}
                >
                  <i id="Trip Advisor" className="plus icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="ui form">
          <div className="inline fields">
            <div className="eight wide field">
              <label>Google</label>
            </div>
            <div className="eight wide field">
              <div className="ui buttons">
                <button
                  id="Google"
                  type="button"
                  className="ui button"
                  onClick={this.handleDecrement}
                >
                  <i id="Google" className="minus icon" />
                </button>
                <div
                  className="or"
                  data-text={this.state.googleWeight.toString()}
                />
                <button
                  id="Google"
                  type="button"
                  className="ui positive button"
                  onClick={this.handleIncrement}
                >
                  <i id="Google" className="plus icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default weighSources

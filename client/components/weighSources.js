import React, {Component} from 'react'

class weighSources extends Component {
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
                <button type="button" className="ui button">
                  <i className="minus icon" />
                </button>
                <div className="or" data-text="5" />
                <button type="button" className="ui positive button">
                  <i className="plus icon" />
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
              <div className="ui icon buttons">
                <button type="button" className="ui button">
                  <i className="minus icon" />
                </button>
                <button type="button" className="ui button">
                  <i className="plus icon" />
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
              <div className="ui icon buttons">
                <button type="button" className="ui button">
                  <i className="minus icon" />
                </button>
                <button type="button" className="ui button">
                  <i className="plus icon" />
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

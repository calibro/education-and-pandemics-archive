import {Component} from 'react'
import './ResourceView.sass';
import Airtable from 'airtable'

export default class ResourceView extends Component {
  state = {
    resource: {}
  }
  componentDidMount() {
    var self = this
		var base = new Airtable({
			apiKey:process.env.REACT_APP_AIRTABLE_API_KEY
		}).base('appyRkLfkVtG84rMU');
    base('Data Sample').find(this.props.resourceId, function(err, record) {
      if (err) { console.error(err); return; }
      self.setState({
        resource: record
      })
    })
  }
  resourceMedia() {
    return <img src={this.state.resource.fields['Attachments'][0].url} alt={this.state.resource.fields['Title ID']}></img>
  }
  resourceInfo() {
    return <div className="resource-sideinfo">
              <div className="resource-title">
                {this.state.resource.fields['Title ID']}
                <div className="bookmark"></div>
              </div>
              <div className="resource-desc">
                {this.state.resource.fields['Summary (limit 500)']}
              </div>
              <div className="resource-metadata">
                {['Pandemics', 'Type_name', 'Themes_name', 'Tags', 'Country', 'City', 'Language', 'Credits', 'Created', 'Published', 'Archived', 'Contributor'].map(key => {
                  return <div className="meta-row" key={key}>
                    <div className="meta-title">{key}</div>
                    <div className="meta-value">{Array.isArray(this.state.resource.fields[key]) ? this.state.resource.fields[key].join(', ') : this.state.resource.fields[key]}</div>
                  </div>
                  }
                )}
              </div>

          </div>
  }

  render() {
    return this.state.resource.fields ? 
      (<div className="resource-view">
        <div className="resource-preview">
          {this.resourceMedia()}
        </div>
        <div className="resource-sideinfo-container">
          {this.resourceInfo()}
        </div>
      </div>)
    :
    (<div>Loading</div>)
  }
}
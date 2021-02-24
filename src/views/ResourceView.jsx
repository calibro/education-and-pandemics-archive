import {Component} from 'react'
import {Badge} from 'react-bootstrap'

export default class ResourceView extends Component {
  state = {
    resourceId: null
  }

  render() {
    let currentItem = this.props.item
    return currentItem ? (<div className="resource-view">
      <h1>{currentItem.fields.Title}</h1>
      <div className="summary">
        {currentItem.fields['Summary (limit 500)']}
      </div>
      <div className="contributor">Contributor: {currentItem.fields.Contributor}</div>
      <Badge variant="info">{currentItem.fields.Type}</Badge>

    </div>)
    :
    (<div>Loading</div>)
  }
}
import {Component} from 'react'
import {NavLink} from "react-router-dom"
import './ResourceCard.sass';

export default class ResourceCard extends Component {
  render() {
    return <NavLink to={"/resource/" + this.props.item.id} className="resource-card">
              {(this.props.item.fields.Attachments && this.props.item.fields.Attachments.length > 0)
                && <img src={this.props.item.fields.Attachments[0].url} />}
              <div className="card-title">{this.props.item.fields['Title ID']}</div>

              {this.props.item.fields.Pandemic_name && (
                  <div className="card-badge">{this.props.item.fields.Pandemic_name.join(',')}</div>
              )}
              
          </NavLink>
  }
}
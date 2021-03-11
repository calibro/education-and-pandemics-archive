import {Component} from 'react'
import {Card, Badge} from 'react-bootstrap'
import {NavLink} from "react-router-dom"

export default class ResourceCard extends Component {
  render() {
    return <NavLink to={"/resource/" + this.props.item.id}>
            <Card style={{ marginBottom: '10px', minHeight: '280px'}}>
              {(this.props.item.fields.Attachments && this.props.item.fields.Attachments.length > 0)
                && <Card.Img variant="top" src={this.props.item.fields.Attachments[0].url} />}
              <Card.Body>
                <Card.Title>{this.props.item.fields['Title ID']}</Card.Title>
                <Card.Text>
                </Card.Text>
                {this.props.item.fields.Type_name && this.props.item.fields.Type_name.map(type => (
                    <Badge variant="info">{type}</Badge>
                ))}
              
              </Card.Body>
            </Card>
          </NavLink>
  }
}
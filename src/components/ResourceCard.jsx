import {Component} from 'react'
import {Card, Badge} from 'react-bootstrap'
import {NavLink} from "react-router-dom"

export default class ResourceCard extends Component {
  render() {
    return <Card style={{ marginBottom: '20px' }}>
            <Badge variant="info">{this.props.item.fields.Type}</Badge>
            <Card.Body>
              <Card.Title>{this.props.item.fields.Title}</Card.Title>
              <Card.Text>
              </Card.Text>
              <NavLink to={"/resource/" + this.props.item.id}>Go to resource
              </NavLink>

            </Card.Body>
          </Card>
  }
}
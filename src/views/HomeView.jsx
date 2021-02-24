import {Component} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import ResourceCard from '../components/ResourceCard'

export default class HomeView extends Component {
  render() {
    return <Container>
              <Row xs={2} md={3} lg={4}>
                {this.props.archiveItems.map((item) => (
                  <Col key={item.id}>
                    <ResourceCard item={item}></ResourceCard>
                  </Col>
                ))}
              </Row>
            </Container>
  }
}
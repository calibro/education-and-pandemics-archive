import {Container, Row, Col} from 'react-bootstrap'
import ResourceCard from '../components/ResourceCard'

const ResourcesGrid = ({archiveItems}) => {

  return (
    <Container>
      <Row xs={2} md={3} lg={4}>
        {archiveItems.map((item) => (
          <Col key={item.id}>
            <ResourceCard item={item}></ResourceCard>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default ResourcesGrid

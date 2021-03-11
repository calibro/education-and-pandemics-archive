import {Component} from 'react'
import './HomeView.sass';
import {Container, Row, Col} from 'react-bootstrap'
import ResourceCard from '../components/ResourceCard'
import FilterSidebar from '../components/FilterSidebar'
import Airtable from 'airtable'

export default class HomeView extends Component {
  state = {
		archiveItems: []
	}
  componentDidMount() {
    var self = this
		var base = new Airtable({
			apiKey:process.env.REACT_APP_AIRTABLE_API_KEY
		}).base('appyRkLfkVtG84rMU');

    base('Data Sample').select({
        view: 'Grid view',
    }).firstPage(function(err, records) {
        if (err) { console.error(err); return; }
        self.setState({
					archiveItems: records
				});
    });
  }
  render() {
    return <div className="home-view">
            <div className="sidebar">
              <FilterSidebar filters={this.props.filters}></FilterSidebar>
            </div>
            <div className="main-content">
              <Container>
                <Row xs={2} md={3} lg={4}>
                  {this.state.archiveItems.map((item) => (
                    <Col key={item.id}>
                      <ResourceCard item={item}></ResourceCard>
                    </Col>
                  ))}
                </Row>
              </Container>
            </div>
          </div>
  }
}
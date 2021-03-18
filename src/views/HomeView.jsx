import {Component} from 'react'
import './HomeView.sass';
import {Container, Row, Col, Spinner} from 'react-bootstrap'
import ResourceCard from '../components/ResourceCard'
import FilterSidebar from '../components/FilterSidebar'
import Airtable from 'airtable'

export default class HomeView extends Component {
  state = {
		archiveItems: [],
    loading: false
	}
  componentDidMount() {
    this.fetchData()
  }
  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.params) !== JSON.stringify(this.props.params)) {
      this.fetchData()
    }
  }
  fetchData () {
    var self = this
    self.setState({
      loading: true
    });
		var base = new Airtable({
			apiKey:process.env.REACT_APP_AIRTABLE_API_KEY
		}).base('appyRkLfkVtG84rMU');

    let formulas = []

    this.props.params && Object.keys(this.props.params).forEach(paramKey => {
      let filterVal = Array.isArray(this.props.params[paramKey]) ? this.props.params[paramKey] : [this.props.params[paramKey]]
      formulas.push('OR(' + filterVal.map(v => '{' + paramKey + '}="'+v+'"').join(', ') +')')
    })
    let formula = formulas.length > 0 ? 'AND(' + formulas.join(', ') +')' : ''

    //OR(RECORD_ID() = ‘recRjdJSziwMjfhO8’, RECORD_ID() = ‘recdRonUzKAIMPOxb’)
    base('Data Sample').select({
        view: 'Grid view',
        filterByFormula: formula
    }).firstPage(function(err, records) {
        if (err) { console.error(err); return; }
        self.setState({
					archiveItems: records,
          loading: false
				});
    })
  }
  render() {
    return <div className="home-view">
            <div className="sidebar">
              <FilterSidebar filters={this.props.filters}></FilterSidebar>
            </div>
            <div className="main-content">
              {this.state.loading ? 
                <div className="loading"><Spinner animation="border" />Loading resources</div>
                  :
                <Container>
                  <Row xs={2} md={3} lg={4}>
                    {this.state.archiveItems.map((item) => (
                      <Col key={item.id}>
                        <ResourceCard item={item}></ResourceCard>
                      </Col>
                    ))}
                  </Row>
                </Container>
            }
            </div>
          </div>
  }
}
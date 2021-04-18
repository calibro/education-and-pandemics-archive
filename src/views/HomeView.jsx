import {Component} from 'react'
import './HomeView.sass';
import Airtable from 'airtable'
import {Link} from 'react-router-dom'
import ResourcesSlider from '../components/ResourcesSlider'

export default class HomeView extends Component {
  state = {
		archiveItems: [],
    loading: false
	}
  componentDidMount() {
    this.fetchData()
  }
  fetchData () {
    var self = this
    self.setState({
      loading: true
    });
		var base = new Airtable({
			apiKey:process.env.REACT_APP_AIRTABLE_API_KEY
		}).base('appyRkLfkVtG84rMU');

    //OR(RECORD_ID() = ‘recRjdJSziwMjfhO8’, RECORD_ID() = ‘recdRonUzKAIMPOxb’)
    base('Data Sample').select({
        view: 'Grid view',
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
            <div className="top-content">
              <div className="logo-block">
                <h1>Education & Pandemic <span>Archive</span></h1>
                Web Archive on Educations and Pandemics: Past and Present
              </div>
              <div className="about-block">
                Short introduction and mission web archive. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                <div className="home-links">
                    <Link to="/explore" className="home-link">Explore</Link>
                    <Link to="/about" className="home-link">About</Link>
                    <a href="#" className="home-link">Submit</a>
                </div>
              </div>
            </div>
            <div className="latest-content">
              <div className="latest-title">Latest updates</div>
              {
              (this.state.archiveItems.length >0 && !this.state.loading) ? <ResourcesSlider items={this.state.archiveItems}></ResourcesSlider> : null
              }
            </div>
          </div>
  }
}
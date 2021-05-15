import {Component} from 'react'
import './HomeView.sass';
import {base, MAIN_TABLE} from '../utils/airtable'
import {Link} from 'react-router-dom'
import ResourcesSlider from '../components/ResourcesSlider'
import {Spinner} from 'react-bootstrap'
import logo from '../assets/logoE&PA.svg';
import logoIsche from '../assets/logo_ische.svg';
import AnimatedLink from '../components/commons/AnimatedLink'

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

    //OR(RECORD_ID() = ‘recRjdJSziwMjfhO8’, RECORD_ID() = ‘recdRonUzKAIMPOxb’)
    base(MAIN_TABLE).select({
        maxRecords: 20,
        view: 'Table',
        filterByFormula: 'REGEX_MATCH({Status}, "Published")'
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
                <img src={logo} alt="logo" className="logo-img"/>
                <div className="subtitle">Web Archive on Educations and Pandemics: Past and Present</div>
              </div>
              <div className="about-block">
                <Link to="/explore" className="big-link"><AnimatedLink text="EXPLORE THE ARCHIVE"></AnimatedLink></Link>
                <Link to="/about" className="big-link"><AnimatedLink text="DISCOVER THE PROJECT"></AnimatedLink></Link>
                <a href="#" className="big-link"><AnimatedLink text="CONTRIBUTE TO THE ARCHIVE"></AnimatedLink></a>
              </div>
            </div>
            <div className="latest-content">
              <div className="latest-title">Latest updates</div>
              {this.state.loading ? 
                <div className="loading"><Spinner animation="border" />Loading resources</div>
                :
                (this.state.archiveItems.length > 0 ? 
                  <ResourcesSlider items={this.state.archiveItems} infinite={true}></ResourcesSlider>
                  : 
                  <div>No resources</div>
                )
              }
            </div>
            <div className="ische-credits">
             A project by <a href="https://www.ische.org/" target="_blank"><img src={logoIsche} alt="logo-ische" className="logo-ische"/></a>
            </div>
          </div>
  }
}

/*
<div className="about-block">
Short introduction and mission web archive. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                <div className="home-links">
                    <Link to="/explore" className="home-link">Explore</Link>
                    <Link to="/about" className="home-link">About</Link>
                    <a href="#" className="home-link">Submit</a>
                </div>
                </div>
  */
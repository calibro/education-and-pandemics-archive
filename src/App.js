import './App.sass';
import {Component} from 'react'
import HomeView from './views/HomeView'
import ResourceView from './views/ResourceView'
import ExploreView from './views/ExploreView'
import Header from './components/Header'

import qs from 'qs'

import Airtable from 'airtable'

import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import { QueryParamProvider } from 'use-query-params';

class App extends Component {
	state = {
		types: [],
    pandemics: [],
    languages: [],
    tags: [],
    countries: [],
    themes: [],
    cities: []
	}
  componentDidMount() {
    var self = this
		var base = new Airtable({
			apiKey:process.env.REACT_APP_AIRTABLE_API_KEY
		}).base('appyRkLfkVtG84rMU');

    base('Type list').select({
        view: 'Grid view',
        filterByFormula: '{Count}>0'
    }).firstPage(function(err, data) {
        if (err) { console.error(err); return; }
        self.setState({
					types: data
				});
    });
    base('Pandemic list').select({
        view: 'Grid view',
        filterByFormula: '{Count}>0'
    }).firstPage(function(err, data) {
        if (err) { console.error(err); return; }
        self.setState({
          pandemics: data
        });
    });
    base('Language list').select({
      view: 'Grid view',
      filterByFormula: '{Count}>0'
    }).firstPage(function(err, data) {
        if (err) { console.error(err); return; }
        self.setState({
          languages: data
        });
    });
    base('Tag list').select({
      view: 'Grid view',
      filterByFormula: '{Count}>0'
    }).firstPage(function(err, data) {
        if (err) { console.error(err); return; }
        self.setState({
          tags: data
        });
    });
    base('Countries List').select({
      view: 'Grid view',
      filterByFormula: '{Count}>0'
    }).firstPage(function(err, data) {
        if (err) { console.error(err); return; }
        self.setState({
          countries: data
        });
    });
    base('Themes list').select({
      view: 'Grid view',
      filterByFormula: '{Count}>0'
    }).firstPage(function(err, data) {
        if (err) { console.error(err); return; }
        self.setState({
          themes: data
        });
    });
    base('Location List').select({
      view: 'Grid view',
      filterByFormula: '{Count}>0'
    }).firstPage(function(err, data) {
        if (err) { console.error(err); return; }
        self.setState({
          cities: data
        });
    });
  }
  render() {
    return (
        <QueryParamProvider ReactRouterRoute={Route}>
          <div className="App">
            {
              this.props.location.pathname !=='/' ? <Header/>:null
            }
            <div className="app-content">
              <Switch>
                <Route exact path="/explore/resource/:resourceId" render={(props)=>{
                  return <ResourceView resourceId={props.match.params.resourceId}/>
                }} />
                <Route path="/explore" render={(props) => {
                    let urlParams = qs.parse(props.location.search.slice(1))
                    return  <ExploreView filters={this.state} params={urlParams}></ExploreView>
                  }}/>
                <Route path="/" render={() => {
                    return  <HomeView></HomeView>
                  }}/>
              </Switch>
            </div>
          </div>
        </QueryParamProvider>
    );
  }
}


export default withRouter(App);

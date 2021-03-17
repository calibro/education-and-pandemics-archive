import './App.sass';
import {Component} from 'react'
import HomeView from './views/HomeView'
import ResourceView from './views/ResourceView'
import qs from 'qs'

import Airtable from 'airtable'
import logo from './assets/logo.svg';

import {
  BrowserRouter as Router,
  Switch,
  Route,
	Link
} from "react-router-dom";

import { QueryParamProvider } from 'use-query-params';

class App extends Component {
	state = {
		types: [],
    pandemics: [],
    languages: [],
    tags: [],
    countries: []
	}
  componentDidMount() {
    var self = this
		var base = new Airtable({
			apiKey:process.env.REACT_APP_AIRTABLE_API_KEY
		}).base('appyRkLfkVtG84rMU');

    base('Type list').select({
        view: 'Grid view',
    }).firstPage(function(err, data) {
        if (err) { console.error(err); return; }
        self.setState({
					types: data
				});
    });
    base('Pandemic list').select({
        view: 'Grid view',
    }).firstPage(function(err, data) {
        if (err) { console.error(err); return; }
        self.setState({
          pandemics: data
        });
    });
    base('Language list').select({
      view: 'Grid view',
    }).firstPage(function(err, data) {
        if (err) { console.error(err); return; }
        self.setState({
          languages: data
        });
    });
    base('Tag list').select({
      view: 'Grid view',
    }).firstPage(function(err, data) {
        if (err) { console.error(err); return; }
        self.setState({
          tags: data
        });
    });
    base('Countries List').select({
      view: 'Grid view',
    }).firstPage(function(err, data) {
        if (err) { console.error(err); return; }
        self.setState({
          countries: data
        });
    });
  }
  render() {
    return (
			<Router>
        <QueryParamProvider ReactRouterRoute={Route}>
          <div className="App">
            <div className="header">
              <Link to="/"><img src={logo} alt="logo"/></Link>
            </div>
            <div className="app-content">
              <Switch>
                <Route exact path="/resource/:resourceId" render={(props)=>{
                  return <ResourceView resourceId={props.match.params.resourceId}/>
                }} />
                <Route path="/" render={(props) => {
                    let urlParams = qs.parse(props.location.search.slice(1))
                    return  <HomeView archiveItems={this.state.archiveItems} filters={this.state} params={urlParams}></HomeView>
                  }}/>
              </Switch>
            </div>
          </div>
        </QueryParamProvider>
			</Router>
    );
  }
}


export default App;

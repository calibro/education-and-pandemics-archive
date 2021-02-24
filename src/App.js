import './App.css';
import {Component} from 'react'
import HomeView from './views/HomeView'
import ResourceView from './views/ResourceView'

import Airtable from 'airtable'

import {
  BrowserRouter as Router,
  Switch,
  Route,
	Link
} from "react-router-dom";

class App extends Component {
	state = {
		archiveItems: []
	}
	componentDidMount() {
    var self = this

		var base = new Airtable({
			apiKey:process.env.REACT_APP_AIRTABLE_API_KEY
		}).base('appyRkLfkVtG84rMU');

    base('Data Sample').select({
        view: 'Grid view'
    }).firstPage(function(err, records) {
        if (err) { console.error(err); return; }
        self.setState({
					archiveItems: records
				});
    });
  }
  render() {
    return (
			<Router>
				<div className="App">
					<div className="header">
						<Link to="/">ISCHE Pandemic Archive</Link>
					</div>
					<div className="app-content">
						<Switch>
							<Route exact path="/resource/:resourceId" render={(props)=>{
								return <ResourceView item={this.state.archiveItems.find(el => el.id === props.match.params.resourceId)}/>
							}} />
							<Route path="/">
								<HomeView archiveItems={this.state.archiveItems}></HomeView>
							</Route>
						</Switch>
					</div>
				</div>
			</Router>

    );
  }
}


export default App;

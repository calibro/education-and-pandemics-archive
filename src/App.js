import "./App.sass";
import "./components/CustomSelect.sass";
import "mapbox-gl/dist/mapbox-gl.css";

import { Component } from "react";
import HomeView from "./views/HomeView";
import ResourceView from "./views/ResourceView";
import ExploreView from "./views/ExploreView";
import AboutView from "./views/AboutView";
import CollectionView from "./views/CollectionView";

import Header from "./components/Header";
import { CollectionProvider } from "./utils/collection";
import qs from "qs";
import { base } from "./utils/airtable";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";

class App extends Component {
  state = {
    types: [],
    pandemics: [],
    languages: [],
    tags: [],
    countries: [],
    themes: [],
    cities: [],
  };
  componentDidMount() {
    var self = this;

    base("Type list")
      .select({
        view: "Grid view",
        filterByFormula: "{Count}>0",
      })
      .firstPage(function (err, data) {
        if (err) {
          console.error(err);
          return;
        }
        self.setState({
          types: data,
        });
      });
    base("Pandemic list")
      .select({
        view: "Grid view",
        filterByFormula: "{Count}>0",
      })
      .firstPage(function (err, data) {
        if (err) {
          console.error(err);
          return;
        }
        self.setState({
          pandemics: data,
        });
      });
    base("Language list")
      .select({
        view: "Grid view",
        filterByFormula: "{Count}>0",
      })
      .firstPage(function (err, data) {
        if (err) {
          console.error(err);
          return;
        }
        self.setState({
          languages: data,
        });
      });
    base("Tag list")
      .select({
        view: "Grid view",
        filterByFormula: "{Count}>0",
      })
      .firstPage(function (err, data) {
        if (err) {
          console.error(err);
          return;
        }
        self.setState({
          tags: data,
        });
      });
    base("Countries List")
      .select({
        view: "Grid view",
        filterByFormula: "{Count}>0",
      })
      .firstPage(function (err, data) {
        if (err) {
          console.error(err);
          return;
        }
        self.setState({
          countries: data,
        });
      });
    base("Themes list")
      .select({
        view: "Grid view",
        filterByFormula: "{Count}>0",
      })
      .firstPage(function (err, data) {
        if (err) {
          console.error(err);
          return;
        }
        self.setState({
          themes: data,
        });
      });
    base("Location List")
      .select({
        view: "Grid view",
        filterByFormula: "{Count}>0",
      })
      .firstPage(function (err, data) {
        if (err) {
          console.error(err);
          return;
        }
        self.setState({
          cities: data,
        });
      });
  }
  render() {
    return (
      <QueryParamProvider ReactRouterRoute={Route}>
        <CollectionProvider>
          <div className="App d-flex flex-column">
            {this.props.location.pathname !== "/" ? <Header /> : null}
            <div className="app-content flex-grow-1 flex-shrink-1 overflow-hidden">
              <Switch>
                <Route
                  exact
                  path="/explore/resource/:resourceId"
                  render={(props) => {
                    return (
                      <ResourceView
                        resourceId={props.match.params.resourceId}
                      />
                    );
                  }}
                />
                <Route
                  path="/explore"
                  render={(props) => {
                    let urlParams = qs.parse(props.location.search.slice(1));
                    return (
                      <ExploreView
                        filters={this.state}
                        params={urlParams}
                      ></ExploreView>
                    );
                  }}
                />
                <Route
                  path="/about"
                  render={() => {
                    return <AboutView></AboutView>;
                  }}
                />
                <Route
                  path="/collection"
                  render={() => {
                    return <CollectionView></CollectionView>;
                  }}
                />
                <Route
                  exact
                  path="/"
                  render={() => {
                    return <HomeView></HomeView>;
                  }}
                />
                <Route path="/">
                  <Redirect to="/" />
                </Route>
              </Switch>
            </div>
          </div>
        </CollectionProvider>
      </QueryParamProvider>
    );
  }
}

export default withRouter(App);

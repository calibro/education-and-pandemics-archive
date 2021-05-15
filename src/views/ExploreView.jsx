import {Component} from 'react'
import './ExploreView.sass';
import {Spinner} from 'react-bootstrap'
import ResourcesGrid from '../components/ResourcesGrid'
import ResourcesList from '../components/ResourcesList'
import ResourcesMap from '../components/ResourcesMap'

import FilterSidebar from '../components/FilterSidebar'
import CurrentFiltersRecap from '../components/CurrentFiltersRecap'
import FilterSearch from '../components/FilterSearch'
import rectIcon from '../assets/rectangle.svg';
import rectIconActive from '../assets/rectangle-active.svg';
import listIcon from '../assets/list.svg';
import listIconActive from '../assets/list-active.svg';
import circleIcon from '../assets/circle.svg';
import circleIconActive from '../assets/circle-active.svg';
import moment from 'moment';

import {base, MAIN_TABLE} from '../utils/airtable'


export default class ExploreView extends Component {
  state = {
		archiveItems: [],
    loading: false,
    currentViewType: 'grid'
	}
  componentDidMount() {
    this.fetchData()
  }
  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.params) !== JSON.stringify(this.props.params)) {
      this.fetchData()
    }
  }
  setCurrentViewType(type) {
    this.setState({
      currentViewType: type
    })
  }
  fetchData () {
    var self = this
    self.setState({
      loading: true
    });

    let formulas = []

    this.props.params && Object.keys(this.props.params).forEach(paramKey => {
      if(paramKey === 'search') {
        formulas.push('OR(FIND(LOWER("'+ this.props.params[paramKey] + '"), LOWER({Summary (limit 500)})), '+
        'FIND(LOWER("'+ this.props.params[paramKey] + '"), LOWER({Title ID})))')

      } else if(paramKey === 'dateFrom' && moment(+this.props.params[paramKey]).isValid()) {
        formulas.push('OR(IS_AFTER({Production date}, "'+moment(+this.props.params[paramKey]).format('YYYY-MM-DD')+'"))')
      
      } else if(paramKey === 'dateTo' && moment(+this.props.params[paramKey]).isValid()) {
        formulas.push('OR(IS_BEFORE({Production date}, "'+moment(+this.props.params[paramKey]).format('YYYY-MM-DD')+'"))')
      
      } else {
        let filterVal = Array.isArray(this.props.params[paramKey]) ? this.props.params[paramKey] : [this.props.params[paramKey]]
        formulas.push('OR(' + filterVal.map(v => 'FIND("'+v+'",{' + paramKey + '})').join(', ') +')')
      }
    })
    formulas.push('REGEX_MATCH({Status}, "Published")')
    let formula = formulas.length > 0 ? 'AND(' + formulas.join(', ') +')' : ''
    
    let allRecords = []
    //OR(RECORD_ID() = ‘recRjdJSziwMjfhO8’, RECORD_ID() = ‘recdRonUzKAIMPOxb’)
    base(MAIN_TABLE).select({
        view: 'Table',
        filterByFormula: formula
    }).eachPage(function page(records, fetchNextPage) {
        allRecords = allRecords.concat(records)
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
        self.setState({
          loading: false,
          archiveItems: allRecords,
        })
    });
  }
  renderParamsRecap () {
    return Object.keys(this.props.params)
      .filter(filterKey => filterKey != 'search')
      .map(filterKey =>
        <CurrentFiltersRecap filterKey={filterKey}></CurrentFiltersRecap>
      )
  }
  renderCurrentViewType () {
    switch(this.state.currentViewType) {
      case 'grid':
        return <ResourcesGrid archiveItems={this.state.archiveItems}></ResourcesGrid>
      case 'list':
        return <ResourcesList archiveItems={this.state.archiveItems}></ResourcesList>
      case 'map':
        return <ResourcesMap archiveItems={this.state.archiveItems}></ResourcesMap>
      default:
        return <div></div>
    }
  }
  render() {
    return <div className="explore-view">
            <div className="sidebar">
              <FilterSidebar filters={this.props.filters}></FilterSidebar>
            </div>
            <div className="main-content">
              <div className="content-top-bar">
                <div className="results-count">Results: {this.state.archiveItems.length}</div>
                <div className="results-view-type">
                  <div className={`view-type grid`} onClick={() => this.setCurrentViewType('grid')} style={{ backgroundImage: this.state.currentViewType === 'grid' ? `url(${rectIconActive})`: `url(${rectIcon})` }}></div>
                  <div className={`view-type list`} onClick={() => this.setCurrentViewType('list')} style={{ backgroundImage: this.state.currentViewType === 'list' ? `url(${listIconActive})` : `url(${listIcon})`}}></div>
                  <div className={`view-type map`} onClick={() => this.setCurrentViewType('map')} style={{ backgroundImage: this.state.currentViewType === 'map' ? `url(${circleIconActive})` : `url(${circleIcon})`}}></div>
                </div>
                <div className="results-seach">
                  <FilterSearch></FilterSearch>
                </div>
              </div>
              <div className="content-filters-summary">
                {this.props.params && this.renderParamsRecap()}
              </div>
              {this.state.loading ? 
                <div className="loading"><Spinner animation="border" />Loading resources</div>
                  :
                  this.renderCurrentViewType()
            }
            </div>
          </div>
  }
}
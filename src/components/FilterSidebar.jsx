import {Component} from 'react'
import './FilterSidebar.sass';

import FilterBlock from './FilterBlock'

export default class ResourceCard extends Component {

  render() {
    return <div className="sidebar-container">
        <div className="filter-type">
            <FilterBlock blockTitle="Resource Type" filterName="Type" labelBy="Type" filterItems={this.props.filters.types}></FilterBlock>
        </div>
        <div className="filter-type">
            <FilterBlock blockTitle="Tags" filterName="Tags" labelBy="Tag" filterItems={this.props.filters.tags}></FilterBlock>
        </div>
      </div>
  }
}
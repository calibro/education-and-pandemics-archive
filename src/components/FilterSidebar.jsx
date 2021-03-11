import {Component} from 'react'
import './FilterSidebar.sass';

export default class ResourceCard extends Component {

  render() {
    return <div className="sidebar-container">
        <div className="filter-type">
            <div className="type-name">
            Pandemics:
            </div>
            {this.props.filters.pandemics.map((item) => (
              <div className="filter-item" key={item.id}>
                {item.fields.Name}
              </div>
            ))}
        </div>
        <div className="filter-type">
            <div className="type-name">
              Resource type:
            </div>
            {this.props.filters.types.map((type) => (
              <div className="filter-item" key={type.id}>
                {type.fields.Type}({type.fields['Count from datasample_copy']})
              </div>
            ))}
        </div>
        <div className="filter-type">
            <div className="type-name">
              Tags:
            </div>
            {this.props.filters.tags.map((tag) => (
              <div className="filter-item" key={tag.id}>
                {tag.fields.Maks}
              </div>
            ))}
        </div>
      </div>
  }
}
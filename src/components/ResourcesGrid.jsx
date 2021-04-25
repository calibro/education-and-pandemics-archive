import ResourceCard from '../components/ResourceCard'
import './ResourcesGrid.sass';

const ResourcesGrid = ({archiveItems}) => {

  return (
    <div className="resouce-grid-container">
      {archiveItems.map((item) => (
          <ResourceCard item={item} key={item.id}></ResourceCard>
      ))}
    </div>
  )
}

export default ResourcesGrid

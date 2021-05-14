import './ResourceExtendedInfo.sass';
import {useCollection} from '../utils/collection'
import moment from 'moment'

import collectionIconAdd from '../assets/collection-add.svg';
import collectionIconSaved from '../assets/collection-active.svg';

const ResourceExtendedInfo = ({resource}) => {

  let infoFields = [{
    field: 'Pandemic_name',
    label: 'Pandemic'
    },
    {
    field: 'Type_name',
    label: 'Type'
    },
    {
    field: 'Themes_name',
    label: 'Themes'
    },
    {
    field: 'Tags_name',
    label: 'Tags'
    },
    {
    field: 'Country_name',
    label: 'Country'
    },
    {
    field: 'Location_name',
    label: 'Location'
    },
    {
    field: 'Language_name',
    label: 'Language'
    },
    {
    field: 'Credits',
    label: 'Credits'
    },
    {
    field: 'Production date',
    label: 'Created',
    format: (v) => v ? moment(v, "YYYY-MM-DD").format('DD/MM/YYYY') : ''
    },
    {
    field: 'Publishing date',
    label: 'Published',
    format: (v) => v ? moment(v, "YYYY-MM-DD").format('DD/MM/YYYY') : ''
    },
    {
    field: 'Added in the archive (YYYY-MM-DD)',
    label: 'Archived',
    format: (v) => v ? moment(v, "YYYY-MM-DD").format('DD/MM/YYYY') : ''
    },
    {
    field: 'Contributor',
    label: 'Contributor'
    }]
  
  const CollectionAction = () => {
    const [collection, setCollection] = useCollection()
    
    const toggleFromCollection = () => {
      setCollection(c => {
        let collectionCopy = JSON.parse(JSON.stringify(c));

        if (collectionCopy.find(item => item.id == resource.id)) {
          collectionCopy.splice(collectionCopy.findIndex(item => item.id == resource.id), 1)
        } else {
          collectionCopy.push({
            id: resource.id,
            fields: resource.fields
          })
        }
        return collectionCopy
      })
    }
    const isInCollection = collection.find(item => item.id === resource.id)
    return <div className="collection-icon" 
                onClick={toggleFromCollection}
                style={{ backgroundImage: !isInCollection ? `url(${collectionIconAdd})`: `url(${collectionIconSaved})` }}>
            </div>
  }
  return <div className="resource-extended-info">
            <div className="resource-title">
              {resource.fields['Title ID']}
              <CollectionAction/>
            </div>
            <div className="resource-desc">
              {resource.fields['Summary (limit 500)']}
            </div>
            <div className="resource-metadata">
              {infoFields.map(info => {
                return <div className="meta-row" key={info.field}>
                  <div className="meta-title">{info.label}</div>
                  <div className="meta-value">{
                    info.format ? info.format(resource.fields[info.field]) : (
                      Array.isArray(resource.fields[info.field]) ? resource.fields[info.field].join(', ') : resource.fields[info.field]
                    )}
                  </div>
                </div>
                }
              )}
            </div>
            {resource.fields['URL'] && <div className="resource-source">
              <a class="animated-btn" href={resource.fields['URL']}>GO TO THE SOURCE
                <svg class="animated-btn-stroke" viewBox="0 0 215 62">
                  <use href="#line"></use>
                </svg>
                <svg class="animated-btn-stroke" viewBox="0 0 215 62">
                  <use href="#line"></use>
                </svg>
              </a>
            </div>
            }

        </div>
}


export default ResourceExtendedInfo
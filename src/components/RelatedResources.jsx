import React, { useEffect, useState } from "react";
import Airtable from 'airtable'
import ResourcesSlider from '../components/ResourcesSlider'

import Select from 'react-select'


const RelatedResources = ({resource}) => {
  const [relatedResources, setRelatedResources] = useState([]);

  const themesOptions = resource.fields ? resource.fields['Themes_name'].map(t => {
    return { value: t, label: t }
  }) : []

  const [activeThemeOption, setActiveThemeOption] = useState(themesOptions[0]);

  useEffect(() => {
    var base = new Airtable({
      apiKey:process.env.REACT_APP_AIRTABLE_API_KEY
    }).base('appyRkLfkVtG84rMU');

    base('Data Sample').select({
      view: 'Grid view',
      filterByFormula: 'AND(FIND("'+resource.fields['Type_name']+'",{Type}), FIND("'+activeThemeOption.value+'",{Themes}))'
    }).firstPage(function(err, records) {
        if (err) { console.error(err); return; }
        setRelatedResources(records)
    })
  }, [activeThemeOption])

  

  return (
    <div className="related-resources-panel">
      <div className="related-options">
        <span>Explore other</span><strong>{resource.fields['Type_name']}</strong><span>in theme</span>
        <Select classNamePrefix="custom-select" 
          options={themesOptions} 
          onChange={setActiveThemeOption}
          value={activeThemeOption}
          isSearchable={false}
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: '#F3EFE6',
              neutral0: '#FFFFF',
              primary25: '#FBFAF7'
            },
          })}/>
      </div>
      {relatedResources.length > 0 ? 
        <ResourcesSlider items={relatedResources}></ResourcesSlider> 
        : 
        <div>No related resources</div>
      }
    </div>
  )
}

export default RelatedResources
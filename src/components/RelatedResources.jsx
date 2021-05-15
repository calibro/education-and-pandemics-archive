import React, { useEffect, useState } from "react";

import {base, MAIN_TABLE} from '../utils/airtable'

import ResourcesSlider from '../components/ResourcesSlider'
import {Spinner} from 'react-bootstrap'

import Select from 'react-select'


const RelatedResources = ({resource}) => {
  const [relatedResources, setRelatedResources] = useState([]);
  const [loading, setLoading] = useState(false)

  const themesOptions = (resource.fields && resource.fields['Themes_name'])? resource.fields['Themes_name'].map(t => {
    return { value: t, label: t }
  }) : []

  const [activeThemeOption, setActiveThemeOption] = useState(themesOptions[0]);

  useEffect(() => {
    setLoading(true)

    let formula = ''
    if (activeThemeOption) {
      formula = 'AND(FIND("'+resource.fields['Type_name']+'",{Type}), FIND("'+activeThemeOption.value+'",{Themes}))'
    } else {
      formula = 'FIND("'+resource.fields['Type_name']+'",{Type})'
    }
    formula = 'AND(REGEX_MATCH({Status}, "Published"), '+ formula +')'
    
    base(MAIN_TABLE).select({
      view: 'Table',
      filterByFormula: formula
    }).firstPage(function(err, records) {
        if (err) { console.error(err); return; }
        setRelatedResources(records)
        setLoading(false)
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
      {loading ? 
        <div className="loading"><Spinner animation="border" />Loading resources</div>
      :
      (relatedResources.length > 0 ? 
        <ResourcesSlider items={relatedResources}></ResourcesSlider> 
        : 
        <div>No related resources</div>
      )
      }
    </div>
  )
}

export default RelatedResources
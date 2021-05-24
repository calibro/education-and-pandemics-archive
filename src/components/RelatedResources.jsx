import React, { useEffect, useState } from "react";

import { base, MAIN_TABLE } from "../utils/airtable";

import ResourcesSlider from "../components/ResourcesSlider";
import { Spinner } from "react-bootstrap";

import Select from "react-select";

const RelatedResources = ({ resource }) => {
  const [relatedResources, setRelatedResources] = useState([]);
  const [loading, setLoading] = useState(false);

  const themesOptions =
    resource.fields && resource.fields["Themes_name"]
      ? resource.fields["Themes_name"].map((t) => {
          return { value: t, label: t };
        })
      : [];

  const [typesOptions, setTypesOptions] = useState([]);

  if (typesOptions.length == 0) {
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
        setTypesOptions(
          data.map((r) => {
            return { value: r.fields["Type"], label: r.fields["Type"] };
          })
        );
      });
  }

  const [activeThemeOption, setActiveThemeOption] = useState(themesOptions[0]);
  const [activeTypeOption, setActiveTypeOption] = useState({
    value: resource.fields["Type_name"],
    label: resource.fields["Type_name"],
  });

  useEffect(() => {
    setLoading(true);

    let formula = "";
    if (activeThemeOption) {
      formula =
        'AND(FIND("' +
        activeTypeOption.value +
        '",{Type}), FIND("' +
        activeThemeOption.value +
        '",{Themes}))';
    } else {
      formula = 'FIND("' + activeTypeOption.value + '",{Type})';
    }
    formula = 'AND(REGEX_MATCH({Status}, "Published"), ' + formula + ")";

    base(MAIN_TABLE)
      .select({
        view: "Table",
        filterByFormula: formula,
      })
      .firstPage(function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        setRelatedResources(records);
        setLoading(false);
      });
  }, [activeThemeOption, activeTypeOption]);

  return (
    <div className="related-resources-panel">
      <div className="related-options d-flex flex-column flex-md-row">
        <span>Explore other</span>
        <Select
          classNamePrefix="custom-select"
          options={typesOptions}
          onChange={setActiveTypeOption}
          value={activeTypeOption}
          isSearchable={false}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#F3EFE6",
              neutral0: "#FFFFF",
              primary25: "#FBFAF7",
            },
          })}
        />
        <span>in theme</span>
        <Select
          classNamePrefix="custom-select"
          options={themesOptions}
          onChange={setActiveThemeOption}
          value={activeThemeOption}
          isSearchable={false}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#F3EFE6",
              neutral0: "#FFFFF",
              primary25: "#FBFAF7",
            },
          })}
        />
      </div>
      {loading ? (
        <div className="loading">
          <Spinner animation="border" />
          Loading resources
        </div>
      ) : relatedResources.length > 0 ? (
        <ResourcesSlider
          items={relatedResources}
          infinite={false}
        ></ResourcesSlider>
      ) : (
        <div>No related resources</div>
      )}
    </div>
  );
};

export default RelatedResources;

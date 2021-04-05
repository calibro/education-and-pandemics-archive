import * as React from 'react';
import Flicking from "@egjs/react-flicking";
import ResourceCard from './ResourceCard'
import './ResourcesSlider.sass';
 

const ResourcesSlider = ({items}) => {
  return (
      <div className="resource-slider">
        <div className="fade-left"></div>
        <Flicking
            tag = "div"
            viewportTag = "div"
            cameraTag = "div"
            classPrefix = "eg-flick"
            deceleration = {0.0075}
            horizontal = {true}
            circular = {true}
            infiniteThreshold = {0}
            lastIndex = {Infinity}
            threshold = {40}
            duration = {100}
            panelEffect = {x => 1 - Math.pow(1 - x, 3)}
            defaultIndex = {0}
            inputType = {["touch", "mouse"]}
            bounce = {10}
            autoResize = {false}
            zIndex = {2000}
            bound = {false}
            overflow = {false}
            hanger = {"50%"}
            gap = {0}
            moveType = {{type: "snap", count: 1}}
            collectStatistics = {true}
          >
            {items.map(item =>
              <ResourceCard item={item}></ResourceCard>
            )}
        </Flicking>
        <div className="fade-right"></div>
      </div>
      
  );
};

export default ResourcesSlider;
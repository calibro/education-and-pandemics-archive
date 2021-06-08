import ResourceCard from "../components/ResourceCard";
import "./ResourcesGrid.sass";

const ResourcesGrid = ({ archiveItems, tagField }) => {
  return (
    <div className="resouce-grid-container border-top border-dark">
      {archiveItems.map((item, i) => (
        <ResourceCard
          item={item}
          key={i + item.id}
          tagField={tagField}
        ></ResourceCard>
      ))}
    </div>
  );
};

export default ResourcesGrid;

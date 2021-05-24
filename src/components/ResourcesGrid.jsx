import ResourceCard from "../components/ResourceCard";
import "./ResourcesGrid.sass";

const ResourcesGrid = ({ archiveItems }) => {
  return (
    <div className="resouce-grid-container border-top border-dark">
      {archiveItems.map((item, i) => (
        <ResourceCard item={item} key={i + item.id}></ResourceCard>
      ))}
    </div>
  );
};

export default ResourcesGrid;

import "./AnimatedLink.sass";

const AnimatedLink = ({ text }) => {
  const lines = ["#line", "#line1", "#line1"];
  const randomLine = lines[Math.floor(Math.random() * lines.length)];

  return (
    <div className="animated-btn lead">
      {text}
      <svg
        className="animated-btn-stroke"
        width="100%"
        height="100%"
        viewBox="0 0 210 56"
      >
        <use href={randomLine}></use>
      </svg>
    </div>
  );
};

export default AnimatedLink;

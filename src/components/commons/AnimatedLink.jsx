import "./AnimatedLink.sass";

const AnimatedLink = ({ text }) => {
  return (
    <div className="animated-btn lead">
      {text}
      <svg className="animated-btn-stroke" viewBox="0 0 430 62">
        <use href="#line"></use>
      </svg>
      <svg className="animated-btn-stroke" viewBox="0 0 430 62">
        <use href="#line" transform="scale(2, 1)"></use>
      </svg>
    </div>
  );
};

export default AnimatedLink;

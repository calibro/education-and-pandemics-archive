import "./AnimatedLink.sass";

const AnimatedLink = ({ text }) => {
  const lines = ['#line', '#line1', '#line2']
  const randomLine = lines[Math.floor(Math.random()*lines.length)]

  return (
    <div className="animated-btn lead">
      {text}
      <svg className="animated-btn-stroke" viewBox="0 0 430 62">
        <use href={randomLine} transform="scale(2, 1)"></use>
      </svg>
    </div>
  );
};

export default AnimatedLink;

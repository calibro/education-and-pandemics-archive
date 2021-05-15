import './AnimatedLink.sass';

const AnimatedLink = ({text}) => {

  return (
    <a class="animated-btn" >{text}
      <svg class="animated-btn-stroke" viewBox="0 0 430 62">
        <use href="#line"></use>
      </svg>
      <svg class="animated-btn-stroke" viewBox="0 0 430 62">
        <use href="#line" transform="scale(2, 1)"></use>
      </svg>
    </a>
  )
}

export default AnimatedLink
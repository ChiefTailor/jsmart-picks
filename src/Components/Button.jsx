
const Button = () => {
  return (
    <>
      <button type="button" className="btn">
        <strong>Subscribe Now</strong>
        <div id="container-stars">
          <div id="stars" />
        </div>
        <div id="glow">
          <div className="circle" />
          <div className="circle" />
        </div>
      </button>
    </>
  );
}

export default Button;

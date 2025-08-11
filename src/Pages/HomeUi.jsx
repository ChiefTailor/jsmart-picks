const HomeUi = () => {
  return (
    <>
      <div className="loading ">
        <svg width="800px" height="100px" viewBox="0 0 800 100">
          <polyline
            points="0 50, 30 50, 50 20, 70 80, 90 30, 110 60, 130 10, 150 90, 170 40, 190 50, 210 50, 230 20, 250 80, 270 30, 290 60, 310 10, 330 90, 350 40"
            id="back"
          />
          <polyline
            points="0 50, 30 50, 50 20, 70 80, 90 30, 110 60, 130 10, 150 90, 170 40, 190 50, 210 50, 230 20, 250 80, 270 30, 290 60, 310 10, 330 90, 350 40, 370 50, 800 50"
            id="front"
          />
        </svg>
      </div>
    </>
  );
};
export default HomeUi;

/* eslint-disable react/prop-types */
import "./SingleCard.css";

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className={flipped ? "flipped" : ""}>
      <div className="card">
        <img
          className="front"
          src={card.src}
          alt="card front"
          onClick={handleClick}
        />
        <img
          className="back"
          src="/img/cover-1-01.png"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SingleCard;

import "./Scenario.css";
import challenge from "../img/challenge.png";

const Scenario = ({ name,description }) => {


  return (
    <div className="col-sm-12 col-md-6">
      <div className="overlap-container">
        <img src={challenge} className="img-fluid" alt="challenge" draggable="false" />
        <div className="overlap-text">
        <h3>{name}</h3>
        <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Scenario;

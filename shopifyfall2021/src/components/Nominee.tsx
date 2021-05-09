import "../styles/Nominee.css";

interface propData {
  title: string;
  year: string;
  poster: string;
}

const Nominee = ({ ...props }: propData) => {
  return (
    <div className="nominee">
      <h3> {props.title} </h3>
      <img className="moviePoster" src={props.poster} alt={props.title} />
      <p> {"(" + props.year + ")"} </p>
    </div>
  );
};

export default Nominee;

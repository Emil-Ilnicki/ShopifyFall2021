import "../styles/Movie.css";
import { useEffect, useState } from "react";
import { nominateMovie } from "../network/API";
import Cookies from "js-cookie";

interface propData {
  title: string;
  year: string;
  poster: string;
  nominated: boolean;
  numNominees: () => boolean;
}

const Movie = ({ ...props }: propData) => {
  const [btnState, setBtnState] = useState<boolean>(props.nominated);

  useEffect(() => {
    setBtnState(props.nominated);
  }, [props.nominated]);

  const nominate = async () => {
    if (props.numNominees()) {
      setBtnState(true);
      const res = await nominateMovie({
        UUID: Cookies.get("UUID"),
        title: props.title,
        year: props.year,
        poster: props.poster,
      });

      if (res.msg !== "success") {
        console.error("Could not nominate record");
      }
    } else {
      window.alert("You have nominated 5 movies");
    }
  };

  return (
    <div className="movie">
      <img className="moviePoster" src={props.poster} alt={props.title}></img>
      <p>{props.title + " (" + props.year + ")"}</p>
      <button
        className="nominateBtn primaryBtn"
        onClick={nominate}
        disabled={btnState}
      >
        {" "}
        Nominate{" "}
      </button>
    </div>
  );
};

export default Movie;

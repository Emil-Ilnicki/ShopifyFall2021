import React, { useState } from "react";
import { moviedatabasecall, getNominees } from "../network/API";
import "../styles/SearchBar.css";
import "../styles/MovieList.css";
import Movie from "../components/Movie";
import SkeletonMovie from "../components/SkeletonMovie";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Toast from "../components/Toast";

// // #5cb85c
// import successIcon from "../assets/check.svg";
// #d9534f
import errorIcon from "../assets/error.svg";
// // #5bc0de
// import infoIcon from "../assets/info.svg";
// // #f0ad4e
// import warningIcon from "../assets/warning.svg";

interface MovieData {
  Title: string;
  Year: string;
  Poster: string;
}

interface ToastStyle {
  title: string;
  description: string;
  backgroundColor: string;
  icon: string;
}

const MovieSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Array<MovieData>>([]);
  const [movieList, setMovieList] = useState<any>();
  const [changing, setChanging] = useState<boolean>(false);
  const [toastList, setToastList] = useState<Array<ToastStyle>>([]);
  var [numNominated, setNumNominated] = useState<number>(0);

  const loadNominees = async () => {
    const response = await getNominees({
      UUID: Cookies.get("UUID"),
    });
    setNumNominated(response.data.length);
    setMovieList(response.data.map((item: any) => item.title));
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (query === null || query === "" || query === undefined) {
      const toastProperties = {
        title: "Error",
        description: "Please enter a value",
        backgroundColor: "#d9534f",
        icon: errorIcon,
      };
      setToastList([...toastList, toastProperties]);
    } else {
      try {
        await loadNominees();
      } catch (err) {
        console.log(err);
      }
      const response = await moviedatabasecall(query);
      if (response.Error === "Too many results.") {
        const toastProperties = {
          title: "Error",
          description: "Too many results!",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        setToastList([...toastList, toastProperties]);
      } else if (response.Error === "Movie not found!") {
        const toastProperties = {
          title: "Error",
          description: "Invalid movie title!",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        };
        setToastList([...toastList, toastProperties]);
      } else {
        setMovies(response.Search as Array<MovieData>);
        setChanging(false);
      }
    }
  };

  const getIsNomiated = (title: string) => {
    const isNominated = movieList.includes(title) ? true : false;
    return isNominated;
  };

  const getNumNominees = () => {
    console.log(numNominated);
    if (numNominated > 4) {
      return false;
    } else {
      numNominated++;
      return true;
    }
  };

  return (
    <div>
      <Toast toastList={toastList} position={"bottomRight"} />
      <div className="searchBar">
        <form onSubmit={handleSubmit}>
          <label>
            {" "}
            <b>Movie Title</b>
          </label>
          <input
            className="movieSearch"
            type="text"
            placeholder="Enter in a movie title"
            onChange={(e) => {
              setChanging(true);
              setQuery(e.target.value);
            }}
          ></input>
          <button className="submitMovieBtn" type="submit">
            {" "}
            Submit{" "}
          </button>
        </form>
        <Link to="/nominees">
          <button className="submitMovieBtn">Nominees</button>
        </Link>
      </div>
      <div className="movieContainer">
        <label>
          {" "}
          <b>{`Results for "${query}"`} </b>
        </label>
        <div className="movieList">
          {changing
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i: number) => (
                <SkeletonMovie key={i}></SkeletonMovie>
              ))
            : movies.map((movie: MovieData, i: number) => (
                <div>
                  <Movie
                    key={movie.Title + i}
                    title={movie.Title}
                    year={movie.Year}
                    poster={movie.Poster}
                    nominated={getIsNomiated(movie.Title)}
                    numNominees={getNumNominees}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default MovieSearch;

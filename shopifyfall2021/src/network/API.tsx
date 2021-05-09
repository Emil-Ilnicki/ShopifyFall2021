const URL = "http://localhost:4000";
require("dotenv").config();

const defaultHeaders = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
};

export const moviedatabasecall = async (props: string) => {
  // PUT YOUR API KEY HERE
  return await fetch(
    `http://omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API}&type=movie&s=` +
      props
  )
    .then((res) => res.json())
    .then((data) => data);
};

export const nominateMovie = async (props: object) => {
  const requestOptions = {
    method: "POST",
    headers: defaultHeaders(),
    body: JSON.stringify(props),
  };

  return await fetch(`${URL}/api/nominate`, requestOptions)
    .then((res) => res.json())
    .then((data) => data);
};

export const deleteNominee = async (props: object) => {
  const requestOptions = {
    method: "POST",
    headers: defaultHeaders(),
    body: JSON.stringify(props),
  };

  return await fetch(`${URL}/api/delete`, requestOptions)
    .then((res) => res.json())
    .then((data) => data);
};

export const getNominees = async (UUID: object) => {
  const requestOptions = {
    method: "POST",
    headers: defaultHeaders(),
    body: JSON.stringify(UUID),
  };

  return await fetch(`${URL}/api/nominees`, requestOptions)
    .then((res) => res.json())
    .then((data) => data);
};

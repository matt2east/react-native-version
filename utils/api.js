async function getMoviesFromApi() {
  try {
    let response = await fetch(
      "https://facebook.github.io/react-native/movies.json"
    );
    let responseJson = await response.json();
    return responseJson.movies;
  } catch (error) {
    console.error(error);
  }
}

export default getMoviesFromApi;

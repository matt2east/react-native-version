// async function getMoviesFromApi() {
//   try {
//     let response = await fetch(
//       "https://facebook.github.io/react-native/movies.json"
//     );
//     let responseJson = await response.json();
//     return responseJson.movies;
//   } catch (error) {
//     console.error(error);
//   }
// }

// export default getMoviesFromApi;

import axios from "axios";

const fetchData = () => {
  const dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  const newdate = year + "-" + month + "-" + day;

  // const cityAndState = "Cedar Park, Texas";
  // const API_KEY = "5ce2cfacf40dc85add8e462b9c006165";

  const encodedURI = window.encodeURI(
    `http://www.airnowapi.org/aq/forecast/zipCode/?format=application/json&zipCode=78750&date=${newdate}&distance=25&API_KEY=98394834-0971-40F7-82FE-8752A5FA0D51`
    // `http://api.openweathermap.org/data/2.5/weather?q=${cityAndState}&type=accurate&APPID=${API_KEY}`
  );
  return axios.get(encodedURI).then(res => res.data);
};

export default fetchData;

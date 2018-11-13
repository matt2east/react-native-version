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

  const encodedURI = window.encodeURI(
    `http://www.airnowapi.org/aq/forecast/zipCode/?format=application/json&zipCode=78750&date=${newdate}&distance=25&API_KEY=98394834-0971-40F7-82FE-8752A5FA0D51`
  );
  return axios.get(encodedURI).then(res => res.data);
};

export default fetchData;

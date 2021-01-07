// this is a helper js doc
import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    // rgb: "rgb(204, 16, 52)",
    // half_op: "rgba(204, 16, 52, 0.5",
    multiplier: 800,
  },

  recovered: {
    hex: "#7dd71d",
    // rgb: "rgb(125, 215, 29)",
    // half_op: "rgba(125, 215, 29, 0.5",
    multiplier: 1200,
  },

  deaths: {
    hex: "#fb4443",
    // rgb: "rgb(251, 68, 67)",
    // half_op: "rgba(251, 68, 67, 0.5",
    multiplier: 2000,
  },
};

// we are going to take some data and cooy it into an array
export const sortData = (data) => {
  const sortedData = [...data];
  // sort is a very powerful function which , got the first one called a and 2nd
  // one called b and make comparison and it will sort these 2 based on the comparison
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1; //stands for false
    } else {
      return 1; //stands for true
    }
  });
  return sortedData;
};
// can be also write like this return sortedData.sort ((a,b) => (a.cases > b.cases ? -1 : 1));

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";
//   why there is no {}??????

// draw circles on the map with interactive tooltop
export const showDataOnMap = (
  data,
  casesType = "cases" //() means return????
) =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4} //slightly transparent
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

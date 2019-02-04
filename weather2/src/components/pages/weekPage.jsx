import React, { Component } from "react";
import http from "../services/httpService";
import apiKeys from "../../config/apiKeys.json";
import WeekUI from "./../ui/weekUi";
import animationService from "../services/animationService";

class WeekPage extends Component {
  state = {
    cities: ["Chicago", "London", "Joliet", "Rome", "Berlin"]
  };

  getWeather = async cities => {
    const type = 1;
    const length = cities.length;
    let fiveDay = [];
    for (let i = 0; i < length; i++) {
      const response = await http.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${
          cities[i]
        },us&mode=json&APPID=${apiKeys.openWeatherKey}`
      );
      if (response.status === 200) {
        let data = response.data;
        fiveDay = this.props.fiveDay;
        fiveDay.push(data);
      }
    }

    this.props.updateWeather(fiveDay, type);
    console.log("fiveDay", this.props.fiveDay);
  };
  //Does not display a value because it updates after it has rendered
  componentDidMount() {
    if (this.props.fiveDayPulled === false) {
      this.getWeather(this.state.cities);
    }
  }
  com;

  render() {
    return (
      <div>
        <WeekUI
          data={this.props.fiveDay}
          getWeather={this.getWeather}
          fiveDayPulled={this.props.fiveDayPulled}
        />
      </div>
    );
  }
}
export default WeekPage;

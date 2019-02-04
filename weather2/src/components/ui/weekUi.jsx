import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Skeleton, Switch, Card, Icon, Avatar, Layout } from "antd";
import animationService from "../services/animationService";
const { Header, Content, Footer } = Layout;
class WeekUI extends Component {
  constructor(props) {
    super(props);
    this.state = { loadingState: true };
    this.currentCity = [];
    this.myElements = {
      array: []
    };
    this.myTweens = [];
  }

  filterCities = item => {
    const result = item.filter(object => item.indexOf(object) % 8 == 0);
    this.currentCity = result;
  };
  splitDateAndTime = date => {
    const value = date.split(" ");
    return value[0];
  };
  createCurrentWeather = () => {
    const { data } = this.props;
    if (data[0] == undefined) {
      return (
        <Card
          key={1}
          title={data.name}
          loading={true}
          extra={<a href="#">More</a>}
          style={{ width: 300 }}
        >
          <p>Temperature: </p>
          <p>Humidity:</p>
          <p>Pressure:</p>
        </Card>
      );
    } else if (this.props.fiveDayPulled == true) {
      const weather = (
        <div>
          <h1>5-Day Forecast</h1>
          <div
            className="container"
            ref={div => this.myElements.array.push(div)}
          >
            {data.map(item => (
              <div key={item.city.name}>
                <div className="row  ">
                  <h1 className="cityHeader">{item.city.name}</h1>
                </div>

                <div className="row">
                  {this.filterCities(item.list)}
                  {console.log("item", item)}
                  {this.currentCity.map((object, index) => (
                    <Card
                      key={index}
                      title={`${item.city.name} on ${this.splitDateAndTime(
                        object.dt_txt
                      )}`}
                      extra={
                        <a
                          href="https://en.wikipedia.org/wiki/Communism"
                          target="_blank"
                        >
                          More
                        </a>
                      }
                      style={{ width: 300 }}
                    >
                      <p>Temperature: {object.main.temp}K </p>
                      <p>Humidity: {object.main.humidity}%</p>
                      <p>Pressure: {object.main.pressure}hpa</p>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

      return weather;
    }
  };
  componentDidUpdate() {
    console.log("MyElementsLength", this.myElements.array);
    animationService.fadeIn(this.myElements.array);
  }

  render() {
    return (
      <Layout className="layout">
        <Content className="content-box">{this.createCurrentWeather()}</Content>
        <div>
          <Layout className="min-height-page">
            <Footer className="footer">Created By Javi :) 2018</Footer>
          </Layout>
        </div>
      </Layout>
    );
  }
}

export default WeekUI;

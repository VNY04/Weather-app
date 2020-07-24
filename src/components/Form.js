import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

const URL = "http://api.openweathermap.org/data/2.5/weather?q=";
const key = "&units=metric&appid=d7186571b83399d28957be5375c0defd";

export class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feels_like: null,
      temp: null,
      temp_max: null,
      temp_min: null,
      city: "",
      status: false,
    };
    this.getTemp = this.getTemp.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      city: event.target.value,
    });
  };

  getTemp() {
    axios
      .get(URL + `${this.state.city}` + key)
      .then((Response) => {
        this.setState(Response.data.main);
        this.setState({
          status: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const { temp, temp_max, temp_min, city } = this.state;
    return (
      <center>
        <div
          style={{
            width: "40%",
            margin: "5%",
            borderRadius: "20px",
            boxShadow: "2px 2px 5px 5px black",
            padding: "20px",
          }}
        >
          <div>
            <input
              type="text"
              placeholder="Enter a city . ."
              style={{ textTransform: "uppercase", color: "black" }}
              onChange={this.handleChange}
            />
            <br />
            <Button variant="dark" onClick={this.getTemp}>
              SUBMIT
            </Button>
          </div>
          {this.state.status ? (
            <div
              style={{
                borderRadius: "20 px",
                textAlign: "justify",
                marginTop: "30px",
              }}
            >
              <h1 style={{ textTransform: "uppercase", textAlign: "center" }}>
                {city}
              </h1>
              <div style={{ marginTop: "10px" }}>
                <h4>Min-Temp: {temp_min} </h4>
                <h4>Max-Temp: {temp_max} </h4>
                <h4>Avg- Temp: {temp} </h4>
                <p>Temperature in degree celsius</p>
              </div>
            </div>
          ) : null}
        </div>
      </center>
    );
  }
}

export default Form;

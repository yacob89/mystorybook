import React, { Component } from "react";
import { Container, Grid, Header, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

export default class SearchFlex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: "",
      hasil: ""
    };
    this.searchSimulation = this.searchSimulation.bind(this);
    this.loadGeojsonFromUrl = this.loadGeojsonFromUrl.bind(this);
  }

  componentDidMount() {
    this.loadGeojsonFromUrl();
  }

  searchSimulation(books) {
    this.setState({ books: JSON.stringify(books) });

    const result = books.filter(row => {
        var searchPattern = /POLRI/i
        return row.NAMA.match(searchPattern);
      });
      console.log("result: ", result);

    this.setState({ hasil: JSON.stringify(result) });
  }

  loadGeojsonFromUrl() {
    var rows = [];
    axios
      .get(
        "https://geomapid-layer.s3-us-west-2.amazonaws.com/public/demo/demo_d0ab0ea0-01d3-11ea-bd82-771f29575d64_kantor_polisi.geojson"
      )
      .then(res => {
        //console.log("Data geojson IOT di tabel: ", res.data);
        var books = res.data.features;
        console.log("Books: ", books);
        var i;
        for (i = 0; i < books.length; i++) {
          rows.push(books[i].properties);
        }
        console.log("Books: ", rows);
        this.searchSimulation(rows);
      })
      .catch(err => {
        console.log("geojson Error: ", err);
      });
  }

  render() {
    return (
      <div>
        <Segment>{this.state.books}</Segment>
        <Segment style={{ padding: "2em 0em" }} vertical>
          <p>{this.state.hasil}</p>
        </Segment>
      </div>
    );
  }
}

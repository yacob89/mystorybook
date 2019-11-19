import React, { Component } from "react";
import { Container, Grid, Header, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Fuse from "fuse.js";
import axios from "axios";

export default class SearchJson extends Component {
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
    /* var books = [
      {
        ISBN: "A",
        title: "Old Man's War kucing anjing harimau hamster",
        author: "John Scalzi"
      },
      {
        ISBN: "B",
        title: "The Lock Artist bangau burung monyet gajah",
        author: "Steve Hamilton"
      }
    ]; */

    this.setState({ books: JSON.stringify(books) });

    var options = {
      keys: ["NAMA"]
    };
    var fuse = new Fuse(books, options);

    const results = fuse.search("KEBON");

    console.log("FUSE: ", results);
    this.setState({ hasil: JSON.stringify(results) });
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
        for (i=0;i<books.length;i++){
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

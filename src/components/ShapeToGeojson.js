import React, { Component } from "react";
import { Container, Grid, Header, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Dropzone from "react-dropzone";
import "mapbox-gl/dist/mapbox-gl.css";

export default class ShapeToGeojson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    this.setState({ uploadDimmerActive: true });
    this.setState({ uploadPercentage: 0 });
    console.log("Files data: ", files[0]);
    //var path = require('path');
    //var shapefile = require("shapefile");

    //let reader = new FileReader();
  }

  render() {
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));

    return (
      <div>
        <Segment style={{ padding: "2em 0em" }} vertical>
          <Dropzone onDrop={this.onDrop} multiple={true}>
            {({ getRootProps, getInputProps }) => (
              <section className="container">
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <p>
                    Drag 'n' drop GEOJSON file here, or click to select file
                  </p>
                </div>
                <aside>
                  <h4>File:</h4>
                  <ul>{files}</ul>
                </aside>
              </section>
            )}
          </Dropzone>
        </Segment>

        <Segment inverted vertical style={{ padding: "5em 0em" }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={13}>
                  <Header as="h4" inverted>
                    ss
                  </Header>
                  <p>ss</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    );
  }
}

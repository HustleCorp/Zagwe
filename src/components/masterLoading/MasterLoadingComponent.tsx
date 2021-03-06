// - Import react components
import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { IMasterLoadingComponentProps } from "./IMasterLoadingComponentProps";
import { IMasterLoadingComponentState } from "./IMasterLoadingComponentState";
import Grid from "@material-ui/core/Grid/Grid";
import { Typography } from "@material-ui/core";

// - Import app components

// - Create MasterLoading component class
export default class MasterLoadingComponent extends Component<
  IMasterLoadingComponentProps,
  IMasterLoadingComponentState
> {
  // Constructor
  constructor(props: IMasterLoadingComponentProps) {
    super(props);
    // Binding functions to `this`
  }

  loadProgress() {
    const { error, timedOut, pastDelay } = this.props;
    if (error) {
      console.log(error);
      return (
        <Grid container>
          <Grid item>
            <CircularProgress color="primary" size={50} />
          </Grid>
          <Grid item style={{ zIndex: 1 }}>
            <Typography
              variant="h6"
              color="primary"
              style={{ marginLeft: "-9px" }}
            >
              Oops something went wrong, please reload the page
            </Typography>
          </Grid>
        </Grid>
      );
    } else if (timedOut) {
      return (
        <Grid container>
          <Grid item>
            <CircularProgress color="primary" size={50} />
          </Grid>
          <Grid item style={{ zIndex: 1 }}>
            <Typography
              variant="h6"
              color="primary"
              style={{ marginLeft: "-9px" }}
            >
              Hmmm, Loading seems to take a long time. Aboo Tele yasbelal
            </Typography>
          </Grid>
        </Grid>
      );
    } else if (pastDelay) {
      return (
        <Grid container>
          <Grid item>
            <CircularProgress color="primary" size={50} />
          </Grid>
          <Grid item style={{ zIndex: 1 }}>
            <Typography
              variant="h6"
              color="primary"
              style={{ marginLeft: "-9px" }}
            >
              Loading...
            </Typography>
          </Grid>
        </Grid>
      );
    }
  }

  // Render app DOM component
  render() {
    return (
      <>
        <div className="mLoading__loading">
          <div>{this.loadProgress()}</div>
        </div>

        <div>i Know what you di</div>
      </>
    );
  }
}

import MoonLoader from "react-spinners/MoonLoader";
import React, { Component } from "react";
import css from './Loader.module.css'

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <div className={css.sweet_loading}>
            <MoonLoader 
                size={100}
                color={"green"}
                loading={this.state.loading}
                speedMultiplier={1} />
      </div>
    );
  }
}

export default Loader;
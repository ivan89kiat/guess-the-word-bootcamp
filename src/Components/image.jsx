import React from "react";

export default class Image extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { opacity } = this.props;

    return (
      <div style={{ opacity: this.props.opacity }}>
        <img
          src="https://pbs.twimg.com/media/E_3k99GVUAQt8PH.jpg"
          alt="image"
          height={300}
          width={300}
        />
      </div>
    );
  }
}

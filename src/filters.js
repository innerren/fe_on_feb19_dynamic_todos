import React from "react";

class Filters extends React.Component {

  list = () => {return this.props.filters.map(filter => (
      <li key={filter}>
        <div onClick={() => {
              this.props.setFilter(filter);
            }}>
          <span className="radio-text">{filter}</span>
        </div>
      </li>
    ));
  }

  render() {
    return (
      <ul className="filters">
      {this.list()}
      </ul>
    )
  }
}

export default Filters;

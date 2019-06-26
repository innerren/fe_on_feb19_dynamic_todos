import React from "react";

class Filters extends React.Component {
  render() {
    return this.props.filters.map(filter => (
      <li>
        <label className="radio">
          <input
            type="radio"
            name="filters"
            checked={filter === this.props.filter}
            onChange={() => {
              this.props.setFilter(filter);
            }}
          />
          <span className="radio-text">{filter}</span>
        </label>
      </li>
    ));
  }
}

export default Filters;

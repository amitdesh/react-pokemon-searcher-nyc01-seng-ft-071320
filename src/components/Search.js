import React from "react";

class Search extends React.Component {
  render() {
    return (
      <div className="ui search">
        <div className="ui icon input">
          <input
            className="prompt"
            name="searchWords"
            value={this.props.searchTerm}
            onChange={(e) => {
              this.props.searchHandler(e.target);
            }}
          />
          <i className="search icon" />
        </div>
      </div>
    );
  }
}

export default Search;

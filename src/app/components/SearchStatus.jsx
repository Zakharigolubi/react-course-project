import React from "react";

const SearchStatus = (props) => {
  const renderPhrase = (number) => {
    let phrase = "";
    number >= 2 && number <= 4
      ? (phrase = props.users.length + " человека тусанут с тобой сегодня")
      : (phrase = props.users.length + " человек тусанет с тобой сегодня");
    return number > 0 ? (
      <span className="badge bg-primary">{phrase}</span>
    ) : (
      <span className="badge bg-danger">{"Никто с тобой не тусанет"}</span>
    );
  };

  return <h2>{renderPhrase(props.users.length)}</h2>;
};

export default SearchStatus;

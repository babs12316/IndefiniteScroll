import React from "react";
import "./App.css";
import ScrollComponent from "./ScrollComponent";

function App() {
  return (
    <div className="app">
      <ScrollComponent
        apiUrl={"https://jsonplaceholder.typicode.com/photos"}
        pageNumber={"_page"}
        pageLimit={"_limit"}
      />
    </div>
  );
}
// another url supporting pagination : https://jsonplaceholder.typicode.com/comments

export default App;

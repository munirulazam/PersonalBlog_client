import "./App.css";
import axios from "axios";
import { useState } from "react";
import Posts from "./components/Posts/Posts";
import Category from "./components/Category";

function App() {
  return (
    <div>
      <Posts />
      <Category />
    </div>
  );
}

export default App;

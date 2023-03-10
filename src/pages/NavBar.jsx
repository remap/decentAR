import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/fileuploaderpage">Upload File</Link>
        </li>
        <li>
          <Link to="/sceneuploaderpage">Upload Scene</Link>
        </li>
        <li>
          <Link to="/viewerpage">View Scene</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
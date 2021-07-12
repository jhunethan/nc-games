import { useState } from "react";
import { Redirect } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [redirect, setRedirect] = useState();

  return (
    <div className="header">
      {redirect && <Redirect to="/" />}
      <h1 onClick={() => setRedirect(true)} className="">
        NC Games Reviews
      </h1>
    </div>
  );
}

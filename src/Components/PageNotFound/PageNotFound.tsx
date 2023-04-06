import "./PageNotFound.css"
import { NavLink } from "react-router-dom";
import image from "../../assets/empty-closet.png"

export const PageNotFound = (): JSX.Element => {
  return (
    <section className="page-not-found">
      <h2>Oops! Page not found.</h2>
      <NavLink to={"/"}>
        <button className="page-not-found-btn">Return Home</button>
      </NavLink>
      <img className="empty-closet-image" src={image} alt="Picture of an empty closet"></img>
    </section>
  )
}
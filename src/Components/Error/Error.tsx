import { NavLink } from "react-router-dom";

export const Error: React.FC = (): JSX.Element => {
  return (
     <section className="item-not-found">
      <p>Server Error - Please Try Again Later </p>
      <NavLink to={"/"}>
        <button className="item-not-found-btn">Return Home</button>
      </NavLink>
      <img className="empty-closet-image" src="src/assets/empty-closet.png" alt="Picture of an empty closet"></img>
    </section>
  );
};
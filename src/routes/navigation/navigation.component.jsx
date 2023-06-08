import { Outlet } from "react-router";
import { Link } from "react-router-dom";

const Navigation = () => {
	return (
		<div className="navigation__container">
			<ul className="navigation__container__links">
				<li>
					<Link to="/">HOME</Link>
				</li>
				<li>
					<Link to="/home">Home page actually</Link>
				</li>
				<li>
					<Link to="/auth">SIGN IN</Link>
				</li>
			</ul>
			<Outlet />
		</div>
	);
};

export default Navigation;

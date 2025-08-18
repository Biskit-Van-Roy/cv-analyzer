import {Link} from "react-router";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/">
                <p className="text-2xl font-bold text-gradient">CV-ANALYZER</p>
            </Link>
            <Link to="/upload" className="primary-button w-fit">
                Subir CV
            </Link>
        </nav>
    )
}
export default Navbar;
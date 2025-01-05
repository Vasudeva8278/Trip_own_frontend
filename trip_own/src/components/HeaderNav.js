import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap is imported

const HeaderNav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item ms-3"> {/* Added margin-left */}
              <Link className="nav-link" to="/hotels">Hotels</Link>
            </li>
            <li className="nav-item ms-3"> {/* Added margin-left */}
              <Link className="nav-link" to="/restaurants">Restaurants</Link>
            </li>
            <li className="nav-item ms-3"> {/* Added margin-left */}
              <Link className="nav-link" to="/spots">Spots</Link>
            </li>
            {/* Add more nav items here with ms-3 for spacing */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderNav;

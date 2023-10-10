

const Navbar = () => {
    return (
        <nav>
        <div>
          <button id="toggle-nav" aria-label="Toggle navigation">
            ☰
          </button>
        </div>
        <ul id="nav-links">
          <li>
            <a className="active" href="#">
              Home
            </a>
          </li>
        </ul>
      </nav>
    );
};

export default Navbar;

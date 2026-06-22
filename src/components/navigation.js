/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Link } from "gatsby"
import { RiMenu3Line, RiCloseLine } from "react-icons/ri"
import Theme from "../components/theme"
import menuItems from "../util/menu.json"

// Menu is data-driven from src/util/menu.json.
// Each item supports:
//   { "title": "Blog", "path": "/blog" }                      internal link
//   { "title": "YT", "url": "https://…", "external": true }   external link
//   add "button": true to render it as a highlighted button
const buttonStyle = {
  display: "inline-block",
  bg: "#FF0000",
  color: "#fff",
  borderRadius: "4px",
  px: 3,
  py: 1,
  "&:hover": { color: "#fff", opacity: 0.9 },
}

const MenuLink = ({ item }) => {
  const sxProp = item.button ? buttonStyle : {}

  if (item.external) {
    return (
      <li>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          sx={sxProp}
        >
          {item.title}
        </a>
      </li>
    )
  }

  return (
    <li>
      <Link to={item.path} sx={sxProp}>
        {item.title}
      </Link>
    </li>
  )
}

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showMenu: false }
    this.handleToggleClick = this.handleToggleClick.bind(this)
  }

  handleToggleClick() {
    this.setState(state => ({
      showMenu: !state.showMenu,
    }))
  }

  render() {
    const listMenuItems = menuItems.map((item, index) => (
      <MenuLink key={index} item={item} />
    ))
    return (
      <nav className="site-navigation" sx={navStyle.menu}>
        <button
          aria-label="toggle menu"
          onClick={this.handleToggleClick}
          className={"menu-trigger" + (this.state.showMenu ? " is-active" : "")}
        >
          <div className="icon-menu-line">
            <RiMenu3Line />
          </div>
          <div className="icon-menu-close">
            <RiCloseLine />
          </div>
        </button>
        <ul>
          {listMenuItems}
          <div sx={navStyle.border}></div>
          <div sx={navStyle.theme}>
            <Theme />
          </div>
        </ul>
      </nav>
    )
  }
}

export default Navigation

const navStyle = {
  menu: {
    ul: {
      bg: "siteColor",
    },
  },
  theme: {
    display: ["block", "block", "block", "none"],
    p: " 25px 20px 20px",
  },
  border: {
    bg: "borderColor",
    borderTop: "1px solid transparent",
    display: ["block", "block", "block", "none"],
  },
}

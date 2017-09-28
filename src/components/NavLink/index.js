import React from 'react'
import { Route, Link } from 'react-router-dom'

export default function NavItem({ children, to, exact, className }) {
  return (
    <Route path={to} exact={exact} children={({ match }) => (
      <li className={match && match.isExact ? `nav-item active ${className}` : `nav-item ${className}`}>
        <Link className='nav-link' to={to}>{children}</Link>
      </li>
    )} />
  )
}

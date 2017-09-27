import React from 'react'
import {Route, Link} from 'react-router-dom'

export default function NavItem({children, to, exact}) {
    return (
        <Route path={to} exact={exact} children={({match}) => (
            <li className={match && match.isExact ? 'nav-item active' : 'nav-item'}>
                <Link className='nav-link' to={to}>{children}</Link>
            </li>
        )}/>
    )
}

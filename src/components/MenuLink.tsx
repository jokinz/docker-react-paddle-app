import React from 'react';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import { NavLink, NavLinkProps } from 'react-router-dom';

type StyledNavLinkProps = NavLinkProps & MuiLinkProps;

const CustomNavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (props, ref) => {
    const { to, className, ...other } = props;
    return (
      <NavLink
        {...other}
        to={to}
        className={({ isActive }) =>
          [className, isActive ? 'active-link' : null].filter(Boolean).join(' ')
        }
        ref={ref}
      />
    );
  }
);

const MenuLink = React.forwardRef<HTMLAnchorElement, StyledNavLinkProps>(
  (props, ref) => {
    const { to, className, ...other } = props;
    return (
      <MuiLink
        component={CustomNavLink}
        to={to}
        ref={ref}
        className={className}
        {...other}
      />
    );
  }
);

export default MenuLink;

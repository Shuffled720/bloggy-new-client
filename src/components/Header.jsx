import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';
import { Link, useSearchParams } from 'react-router-dom'
import Button from '@mui/material/Button';

import { categories } from '../constants/categories';

function Header({ setUserAuthenticated }) {

    const title = "Bloggy";

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    return (
        <React.Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Button variant='contained'>
                    <Link to={`/create?category=${category || ''}`}>
                        <Typography>Create Blog</Typography>
                    </Link>
                </Button>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    <Link to='/'>
                        {title}
                    </Link>
                </Typography>
                {/* <Typography sx={{ px: 2, fontWeight: 'bold' }}>
                    <Link to='/about'>About</Link>
                </Typography> */}

                <Typography sx={{ px: 2, fontWeight: 'bold' }}>
                    <Link to='/login'>Logout</Link>
                </Typography>
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
            >   <Link to='/'>All Categories</Link>
                {categories.map((item) => (
                    <Link

                        to={`/?category=${item.type}`}
                        sx={{ p: 1, flexShrink: 0 }}
                    >
                        {item.title}
                    </Link>
                ))}
            </Toolbar>
        </React.Fragment >
    );
}

Header.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }),
    ).isRequired,
    title: PropTypes.string.isRequired,
};

export default Header;
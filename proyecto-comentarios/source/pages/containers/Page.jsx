import React from 'react';
import {
    Match,
    Miss,
    Link,
} from 'react-router';

import Home from './Home.jsx';
import Post from './Post.jsx';
import Error404 from './Error404.jsx';
import Profile from './Profile.jsx';

function Pages() {
    return (
        <main role="application">
            {/* List de articulos */}
            <Match
                pattern="/"
                exactly
                component={Home}
            />
            {/* Detalle d articulo */}
            <Match
                pattern="/post/:id"
                exactly
                component={Post}
            />
            {/* Perfil de usuario */}
            <Match
                pattern="/user/:id"
                exactly
                component={Profile}
            />
            {/* Error 404 */}
            <Miss component={Error404}/>
        </main>
    )
}

export default Pages;
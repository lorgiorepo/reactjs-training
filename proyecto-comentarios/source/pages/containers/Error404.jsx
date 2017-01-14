import React, {Component} from 'react';
import {Link} from 'react-router';

class Error404 extends Component {
    render() {
        return (
            <section name="error404">
                <h1>Error 404</h1>
                <Link to="/">
                    Go to home
                </Link>
            </section>
        );
    };
}

export default Error404;
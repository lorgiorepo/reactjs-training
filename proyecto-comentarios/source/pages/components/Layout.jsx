import React from 'react';

function Layout(props){
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <title>{props.title}</title>
            </head>
            <body>
                <div 
                    id="render-target"
                    dangerouslySetInnerHTML={{
                        __html: props.content,
                    }}
                />
                <script src="http://localhost:3001/app.js" />
            </body>
        </html>
    )
}

export default Layout;
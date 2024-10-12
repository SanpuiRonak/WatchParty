import { type Component } from 'solid-js';

import './styles/notfounderrorpage.css';


const NotFoundErrorPage: Component = () => {
    return (
       <div class='root'>
        <div class='container'>
            <h1>404 | Page Not Found</h1>
            <p>The page you are trying to visit does not exsist</p>
            <p></p>
        </div>
       </div>
    )
}

export default NotFoundErrorPage;
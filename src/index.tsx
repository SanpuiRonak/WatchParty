/* @refresh reload */
import { render } from 'solid-js/web';
import { Route, Router } from "@solidjs/router";
import { getPathWithPrefix } from './helpers/routingHelper';

import './index.css';
//TODO lazy loading
import HomePage from './pages/HomePage';
import CreateUserPage from './pages/CreateUserPage';
import NotFoundErrorPage from './pages/NotFoundErrorPage';
import AllowWhenUserInitialized from './components/AllowWhenUserInitialized';


const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
    )
}

render(() => (
    <Router>
        <Route path='' component={AllowWhenUserInitialized} >
            <Route path={getPathWithPrefix('/')} component={HomePage} />
        </Route>
        <Route path={getPathWithPrefix('/create-user')} component={CreateUserPage} />
        <Route path='*' component={NotFoundErrorPage} />
    </Router>
), root!)

import Home from '../pages/Home';
import Details from '../pages/Details';
import Watching from '../pages/Watching';
import SignUp from '../pages/SignUp';
import LogIn from '../pages/LogIn';
import Categories from '../pages/Categories';
import Blog from '../pages/Blog';
import Contacts from '../pages/Contacts';
import { loginAction } from './actions/loginAction';
import { ActionFunctionArgs } from 'react-router-dom';
import { registerAction } from './actions/registerAction';
import Dashboard from '../pages/Dashboard';

const publicRoutes: {
    [key: string]: {
        path: string;
        component: () => JSX.Element;
        layout?: (() => JSX.Element) | null;
        action?: ({ request }: ActionFunctionArgs<any>) => Promise<any> | null;
    };
} = {
    home: { path: '/', component: Home },
    categories: { path: '/categories', component: Categories },
    details: { path: '/details', component: Details },
    watching: { path: '/watching', component: Watching },
    signUp: { path: '/signup', component: SignUp, action: registerAction },
    logIn: { path: '/login', component: LogIn, action: loginAction },
    blog: { path: '/blog', component: Blog },
    contacts: { path: '/contacts', component: Contacts },
    dashboard: { path: '/dashboard', component: Dashboard },
};

// const privateRoutes = [];

export { publicRoutes };

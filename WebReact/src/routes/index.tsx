import Home from '../pages/Home';
import Details from '../pages/Details';
import Watching from '../pages/Watching';
import SignUp from '../pages/SignUp';
import LogIn from '../pages/LogIn';
import Categories from '../pages/Categories';
import Blog from '../pages/Blog';
import Contacts from '../pages/Contacts';

const publicRoutes: {
    [key: string]: {
        path: string;
        component: () => JSX.Element;
        layout?: () => JSX.Element | null;
    };
} = {
    home: { path: '/', component: Home },
    categories: { path: '/categories', component: Categories },
    details: { path: '/details', component: Details },
    watching: { path: '/watching', component: Watching },
    signUp: { path: '/signup', component: SignUp },
    logIn: { path: '/login', component: LogIn },
    blog: { path: '/blog', component: Blog },
    contacts: { path: '/contacts', component: Contacts },
};

// const privateRoutes = [];

export { publicRoutes };

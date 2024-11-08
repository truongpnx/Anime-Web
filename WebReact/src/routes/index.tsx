import Home from '../pages/Home';
import Details from '../pages/Details';
import Watching from '../pages/Watching';
import SignUp from '../pages/SignUp';
import LogIn from '../pages/LogIn';
import Categories from '../pages/Categories';
import Blog from '../pages/Blog';
import Contacts from '../pages/Contacts';

const publicRoutes: {
    path: string;
    component: () => JSX.Element;
    layout?: () => JSX.Element | null;
}[] = [
    { path: '/', component: Home },
    { path: '/categories', component: Categories },
    { path: '/details', component: Details },
    { path: '/watching', component: Watching },
    { path: '/signup', component: SignUp },
    { path: '/login', component: LogIn },
    { path: '/blog', component: Blog },
    { path: '/contacts', component: Contacts },
];

// const privateRoutes = [];

export { publicRoutes };

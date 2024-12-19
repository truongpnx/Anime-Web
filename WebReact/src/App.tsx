import React, { Fragment, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './components/Layouts';
import NotFound from './pages/NotFound';

const routes = Object.entries(publicRoutes).map(([_, route]) => {
    const Page = route.component;
    const Layout = route.layout === undefined ? DefaultLayout : route.layout === null ? Fragment : route.layout;

    return {
        path: route.path,
        element: (
            <Layout>
                <Page />
            </Layout>
        ),
        action: route.action || undefined,
    };
});

routes.push({
    path: '*',
    element: <NotFound />,
    action: undefined,
});

const router = createBrowserRouter(routes);

function App() {
    useEffect(() => {
        document.title = 'My Anime Web';
    }, []);

    return (
        <RouterProvider
            future={{
                v7_startTransition: true,
                // v7_normalizeFormMethod: true,
                // v7_fetcherPersist: true,
                // v7_partialHydration: true,
                // v7_relativeSplatPath: true,
            }}
            router={router}
        />
    );
}

export default App;

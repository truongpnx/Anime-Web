import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './components/Layouts';
import NotFound from './pages/NotFound';
import { handleAuthToken } from './utils/auth';

function App() {
    useEffect(() => {
        document.title = 'My Anime Web';
        handleAuthToken();
    }, []);

    return (
        <Router
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <div className="App">
                <Routes>
                    {Object.entries(publicRoutes).map(([_, route], index) => {
                        const Page = route.component;
                        let Layout =
                            route.layout === undefined
                                ? DefaultLayout
                                : route.layout === null
                                ? Fragment
                                : route.layout;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

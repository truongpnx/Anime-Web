import React, { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface DefaultLayoutProps {
    children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default DefaultLayout;

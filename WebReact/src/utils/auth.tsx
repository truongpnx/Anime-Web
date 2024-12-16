export const handleAuthToken = () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
        localStorage.setItem('authToken', token);
        console.log('Token:', token);
        window.history.replaceState({}, document.title, window.location.pathname);
    } else {
        console.error('No token received');
    }
};

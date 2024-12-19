import axios from 'axios';
import { ActionFunctionArgs } from 'react-router-dom';
import { backendURL } from '../../constants';

export interface LoginActionResult {
    error?: string;
}

export async function loginAction({ request }: ActionFunctionArgs): Promise<LoginActionResult | Response> {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const res = await fetch(`${backendURL}/oauth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        // const res = await axios.post(
        //     `${backendURL}/oauth/login`,
        //     { email, password },
        //     {
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         withCredentials: true,
        //     },
        // );

        if (res.status !== 200) {
            throw new Error('Sign-up failed');
        }

        return new Response(JSON.stringify({ error: undefined }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorMessage: string = error.response.data?.message || 'Failed to login';
            return new Response(JSON.stringify({ error: errorMessage }), {
                status: error.response.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

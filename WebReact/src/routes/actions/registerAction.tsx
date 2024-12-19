import axios from 'axios';
import { ActionFunctionArgs } from 'react-router-dom';
import { backendURL } from '../../constants';

export interface SignUpActionResult {
    error?: string;
}

export async function registerAction({ request }: ActionFunctionArgs): Promise<SignUpActionResult | Response> {
    const formData = await request.formData();
    const email = formData.get('email');
    const userName = formData.get('user-name');
    const password = formData.get('password');

    try {
        const res = await axios.post(
            `${backendURL}/user/register`,
            { email, userName, password },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            },
        );

        if (res.status !== 200) {
            throw new Error('Sign-up failed');
        }

        return new Response('OK', {
            status: 200,
        });
    } catch (error: any) {
        if (error.response) {
            if (error.response.status === 400) {
                return { error: 'Email or Username exist' };
            }
            return { error: error.response?.data?.message || 'Sign-up failed. Please try again.' };
        } else {
            return { error: 'Network error. Please try again later.' };
        }
    }
}

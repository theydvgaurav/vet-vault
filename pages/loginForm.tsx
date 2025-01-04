import { useState } from 'react';
import axios from 'axios';

export default function LoginForm() {
    const [mobile, setMobile] = useState('8683076058');
    const [password, setPassword] = useState('8683076058');
    const [error, setError] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!/^[6-9]\d{9}$/.test(mobile)) {
            setError('Invalid mobile number');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        try {
            const response = await axios.post('/api/login', { mobile, password });
            if (response.status == 200) {
                const user_data = response.data
                localStorage.setItem('userData', JSON.stringify(user_data));
            }
            else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="flex  items-center justify-center p-4 bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-center text-2xl font-bold mb-4 text-green-500">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                            Mobile:
                        </label>
                        <input
                            type="text"
                            id="mobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="Enter mobile number"
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );

}

import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';

const LoginPage: NextPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen">
        <Head>
          <title>Login</title>
        </Head>
        <div className="bg-[#1f2937] p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Email</label>
              <input type="email" id="email" className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2">Password</label>
              <input type="password" id="password" className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex justify-between items-center">
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">Login</button>
              <Link href="/signup" className="text-gray-400 hover:text-white">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
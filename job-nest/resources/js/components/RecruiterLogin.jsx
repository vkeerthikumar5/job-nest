import React, { useState } from 'react';
import api from '../api_r';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function RecruiterLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[loading,setLoading]=useState(false)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setLoading(true)
    console.log(email,password)
    e.preventDefault();

    try {
      const res = await api.post('/recruiter-login', { email, password });

      // Save token and role in localStorage
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('name',res.data.name)
      console.log(res.data.role)
      // Redirect based on role
      if (res.data.role === 'admin') navigate('/admin/dashboard');
      else if(res.data.role==='super-admin') navigate('/super-admin/dashboard')
      
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || 'Login failed!');
    }finally{
      setLoading(false)
    }
  };

  return (
    <section className='w-full flex m-8 justify-end md:mr-32 items-center min-h-screen'>
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
        <form className="max-w-md mx-auto " onSubmit={handleLogin}>
          <h5 className="text-xl font-medium text-gray-900 mb-6">Admin Sign in</h5>

          {/* Email */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                 border-b-2 border-gray-300 appearance-none focus:outline-none 
                 focus:ring-0 focus:border-violet-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 
                 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-violet-600"
            >
              Email Address
            </label>
          </div>

          {/* Password */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                 border-b-2 border-gray-300 appearance-none focus:outline-none 
                 focus:ring-0 focus:border-violet-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 
                 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-violet-600"
            >
              Password
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading} // disable while loading
            className={`text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none 
              focus:ring-violet-300 font-medium rounded-lg text-sm w-full sm:w-auto 
              px-5 py-2.5 text-center inline-flex items-center justify-center ${
                loading ? 'cursor-not-allowed opacity-70' : ''
              }`}
          >
            {loading && (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
            {loading ? 'Loading...' : 'Login to your account'}
          </button>


          <div className="text-sm font-medium text-gray-500 mt-4">
            Not registered?{" "}
            <Link to="/register" className="text-violet-700 hover:underline">
              Create account
            </Link>
          </div>

          <div className="text-sm font-medium text-gray-500 mt-2">
            For User Login{" "}
            <Link to="/login" className="text-violet-700 hover:underline">
              Click Here
            </Link>
          </div>

          
        </form>

      </div>
    </section>
  );
}

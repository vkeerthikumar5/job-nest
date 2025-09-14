import React, { useState } from 'react';
import api from '../api_r';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function RecruiterRegistration() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[c_name,setc_name]=useState('')
  const[website,set_website]=useState('')
  const[year,set_year]=useState('')
  const[address,set_address]=useState('')
  const[m_no,set_mno]=useState('')
  const [role, setRole] = useState('admin'); // default role
  const[loading,setLoading]=useState(false)
  const navigate = useNavigate();
  const [toast, setToast] = useState({ message: "" });

  const handleRegister = async (e) => {
    setLoading(true)
    e.preventDefault();
    
    try {
      
      await api.post('/recruiter-register', { name:c_name, email, password, role,address,website,established_year:year,contact_number:m_no });

      setToast({ message: "Registration successful! Please login." });

      
    } catch (err) {
        let errorMessage = "Registration failed!";
        
        if (err.response?.data?.errors) {
          // Grab the first error only
          const firstErrorField = Object.keys(err.response.data.errors)[0];
          errorMessage = err.response.data.errors[firstErrorField][0];
        } else if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        }
        
        setToast({ message: errorMessage });
      }
      finally{
        setLoading(false)
      }
      
      
  };

  const renderToast = () => {
    if (!toast.message) return null;
    return (
      

<div id="toast-simple" class="flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800" role="alert">
    <svg class="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
    </svg>
    <div class="ps-4 text-sm font-normal">{toast.message}</div>
</div>

    );
  };

    return (
      <section>
        {/* Banner */}
        <div className="bg-gradient-to-br from-sky-500 to-violet-600 h-32 w-full flex flex-col justify-center items-center px-4 text-center">
          <h1 className="text-white text-3xl font-bold">JobNest</h1>
          <p className="text-white text-lg font-semibold italic mt-2">
            Find, apply, and grow your career with ease. Build your future from the nest today!
          </p>
        </div>
   {/* Toast */}
   <div className="flex justify-center mt-4">{renderToast()}</div>
        {/* Form Card */}
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl border border-gray-300 mt-8 p-8">
          {/* Account Information */}
          <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
            Account Information
          </h2>
          <form onSubmit={handleRegister}>
            {/* First row - Email, Password, Confirm Password */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="relative z-0 w-full group">
                <input
                  type="email"
                  id="email"
                  onChange={(e)=>setEmail(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                    border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 
                    focus:border-violet-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-gray-500 duration-300 transform 
                    -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 
                    peer-focus:text-violet-600"
                >
                  Email Address
                </label>
              </div>
  
              <div className="relative z-0 w-full group">
                <input
                  type="password"
                  id="password"
                  onChange={(e)=>setPassword(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                    border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 
                    focus:border-violet-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-500 duration-300 transform 
                    -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 
                    peer-focus:text-violet-600"
                >
                  Password
                </label>
              </div>
  
              <div className="relative z-0 w-full group">
                <input
                  type="number"
                  id="m_no"
                 onChange={(e)=>set_mno(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                    border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 
                    focus:border-violet-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="m_no"
                  className="absolute text-sm text-gray-500 duration-300 transform 
                    -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 
                    peer-focus:text-violet-600"
                >
                  Mobile Number
                </label>
              </div>
            </div>
  
            {/* Company Information */}
            <h2 className="text-xl font-semibold text-gray-800 mt-10 mb-6 border-b pb-2">
              Company Information
            </h2>
  
            <div className="grid md:grid-cols-3 gap-6">
              {/* Company Name */}
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  id="companyName"
                  onChange={(e)=>setc_name(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                    border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 
                    focus:border-violet-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="companyName"
                  className="absolute text-sm text-gray-500 duration-300 transform 
                    -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 
                    peer-focus:text-violet-600"
                >
                  Company Name
                </label>
              </div>
  
              {/* Website */}
              <div className="relative z-0 w-full group">
                <input
                  
                  id="website"
                  onChange={(e)=>set_website(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                    border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 
                    focus:border-violet-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="website"
                  className="absolute text-sm text-gray-500 duration-300 transform 
                    -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 
                    peer-focus:text-violet-600"
                >
                  Website
                </label>
              </div>
  
              {/* Established Year */}
              <div className="relative z-0 w-full group">
                <input
                  type="number"
                  id="established"
                  onChange={(e)=>set_year(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                    border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 
                    focus:border-violet-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="established"
                  className="absolute text-sm text-gray-500 duration-300 transform 
                    -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 
                    peer-focus:text-violet-600"
                >
                  Established Year
                </label>
              </div>
            </div>
  
            {/* Address full row */}
            <div className="grid md:grid-cols-1 gap-6 mt-6">
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  id="address"
                  onChange={(e)=>set_address(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                    border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 
                    focus:border-violet-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="address"
                  className="absolute text-sm text-gray-500 duration-300 transform 
                    -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 
                    peer-focus:text-violet-600"
                >
                  Company Address
                </label>
              </div>
            </div>
  
            {/* Submit button */}
          <button
            type="submit"
            disabled={loading} // disable while loading
            className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
              focus:ring-violet-300 font-medium rounded-lg text-sm w-full sm:w-auto 
              px-5 py-2.5 text-center inline-flex items-center justify-center mt-6 ${
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
            {loading ? 'Loading...' : 'Register'}
          </button>

          </form>
        </div>
      </section>
    );
    }
  
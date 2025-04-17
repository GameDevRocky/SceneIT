import { useState } from "react";
import { BiCameraMovie } from "react-icons/bi";
import purple from '../../App';
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";

//FIXME add props for light and dark mode
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { currentUser, userLoggedIn } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await doSignInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={'/'} replace={true} />}
      <div className="w-full h-[100vh] flex items-center">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* add conditional rendering for light and dark mode */}
            <div className="border-0 w-full flex justify-center p-[0px]">
              <BiCameraMovie className={`size-[70px] text-dark-purple`} />
            </div>

            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Log in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1
                     -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2
                      focus:outline-indigo-600 sm:text-sm/6 border-[1px] border-black shadow-lg focus:border-0 duration-75"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 
                    -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2
                     focus:outline-indigo-600 sm:text-sm/6 border-[1px] border-black focus:border-0 duration-75"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Need an account?{' '}
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
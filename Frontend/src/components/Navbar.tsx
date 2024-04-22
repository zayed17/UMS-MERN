import React from 'react';
import Cookies from 'js-cookie';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/user/userSlice';

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const currentUser = useSelector((state: { user: { currentUser: any; }; }) => state.user.currentUser);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove('access_token');

  };

  const isAuthenticated = currentUser !== null;

  React.useEffect(() => {
    if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/signup' || location.pathname=='/')) {
      navigate('/')
    } else if (!isAuthenticated && location.pathname === '/profile' || location.pathname=='/') {
      navigate('/login')
    }
  }, [isAuthenticated, location.pathname]);

  // Authentication button
  let authButton;
  if (isAuthenticated) {
    authButton = (
      <button type="button" onClick={handleLogout} className="bg-blue-700 text-white font-medium rounded-lg text-sm px-4 py-2 text-center">
        Logout
      </button>
    );
  } else {
    authButton = (
      <Link to="/login" className="bg-blue-700 text-white font-medium rounded-lg text-sm px-4 py-2 text-center">
        Login
      </Link>
    );
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">UMS</span>
        </Link>
        <div className="flex items-center space-x-3">
          {location.pathname === '/' && (
            <div className="relative inline-block">
              <Link to={'/profile'}>
                <button data-popover-target="popover-default" type="button" className="text-white bg-blue-700 font-medium rounded-full text-sm px-3 py-3 text-center">
                  <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z" />
                  </svg>
                </button>
              </Link>
            </div>
          )}
          {authButton}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

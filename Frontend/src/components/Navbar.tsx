import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
 
  let authButton;
  if (location.pathname === '/login') {
    authButton = <Link to="/signup" className="bg-blue-700 text-white font-medium rounded-lg text-sm px-4 py-2 text-center">Sign Up</Link>;
  } else if (location.pathname === '/signup') {
    authButton = <Link to="/login" className="bg-blue-700 text-white font-medium rounded-lg text-sm px-4 py-2 text-center">Login</Link>;
  } else {
    authButton = <button type="button" className="bg-blue-700 text-white font-medium rounded-lg text-sm px-4 py-2 text-center">Logout</button>;
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

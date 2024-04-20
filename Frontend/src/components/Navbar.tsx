import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

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
          <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">Broto</span>
        </Link>
        <div className="flex items-center space-x-3">
          {location.pathname === '/' && (
            <div className="relative inline-block">
             <button onMouseEnter={togglePopover} onMouseLeave={togglePopover} data-popover-target="popover-default" type="button" className="text-white bg-blue-700 font-medium rounded-full text-sm px-3 py-3 text-center">
             <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z" />
             </svg>
             </button>

              {isOpen && (
                <div id="popover-default" role="tooltip" className="absolute z-20 top-full left-0 mt-1 w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800" >
                  <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Popover title</h3>
                  </div>
                  <div className="px-3 py-2">
                    <p>And here's some amazing content. It's very engaging. Right?</p>
                  </div>
                  <div data-popper-arrow></div>
                </div>
              )}
            </div>
          )}
          {authButton}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

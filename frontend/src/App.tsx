/**
 * @file App.tsx
 * @description Root router managing auth page routes.
 */

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import Landing from './pages/Landing';

/**
 * Root App component handling public routes for authentication pages.
 */
function App() {
  return (
    <BrowserRouter>
      {/* Basic Nav Bar */}
      <nav className="p-4 bg-gray-100 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/signout">Sign Out</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="*" element={<div className="p-6">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

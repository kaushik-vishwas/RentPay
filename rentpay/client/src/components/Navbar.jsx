import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const Navbar = () => {
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((s) => s.auth);
  const cartCount = useSelector((s) => s.cart.items.reduce((a, i) => a + i.quantity, 0));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?search=${encodeURIComponent(search.trim())}`);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            Rentpay
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
            <input
              type="text"
              placeholder="Search products, rentals, services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-primary-700">
              Search
            </button>
          </form>

          <nav className="hidden md:flex items-center gap-4">
            <Link to="/products" className="text-gray-600 hover:text-primary">Products</Link>
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-primary">
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center gap-1 text-gray-600 hover:text-primary">
                  {user?.name}
                </button>
                <div className="absolute right-0 mt-1 w-40 bg-white border rounded-lg shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</Link>
                  {user?.role === 'admin' && (
                    <a href={import.meta.env.VITE_ADMIN_URL || '/admin'} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm hover:bg-gray-100">Admin</a>
                  )}
                  <button onClick={() => dispatch(logout())} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-primary">Login</Link>
            )}
          </nav>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 border-t">
            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
              <button type="submit" className="mt-2 w-full py-2 bg-primary text-white rounded">Search</button>
            </form>
            <Link to="/products" className="block py-2" onClick={() => setMenuOpen(false)}>Products</Link>
            <Link to="/cart" className="block py-2" onClick={() => setMenuOpen(false)}>Cart ({cartCount})</Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="block py-2" onClick={() => setMenuOpen(false)}>Profile</Link>
                <button onClick={() => { dispatch(logout()); setMenuOpen(false); }} className="block py-2 text-red-600">Logout</button>
              </>
            ) : (
              <Link to="/login" className="block py-2" onClick={() => setMenuOpen(false)}>Login</Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 mt-auto">
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link to="/" className="text-xl font-bold text-white">Rentpay</Link>
          <p className="mt-2 text-sm">Rent products online with ease. Quality items, flexible duration.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/products" className="hover:text-primary">Products</Link></li>
            <li><Link to="/cart" className="hover:text-primary">Cart</Link></li>
            <li><Link to="/login" className="hover:text-primary">Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <p className="text-sm">support@rentpay.com</p>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
        &copy; {new Date().getFullYear()} Rentpay. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;

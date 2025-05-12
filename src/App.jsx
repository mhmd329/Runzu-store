
import './App.css'
import AdminOrders from './components/AdminOrders/AdminOrders';
import Checkout from './components/CheckOut';
import Footer from './components/Footer'
import Home from './components/Home'
import Nav from './components/Nav'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <Nav />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin/orders" element={<AdminOrders />} />

          </Routes>
        </main>

        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}


export default App

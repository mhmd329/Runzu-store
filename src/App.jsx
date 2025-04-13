
import './App.css'
import Footer from './components/Footer'
import Home from './components/Home'
import Nav from './components/Nav'
function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Nav />
      
     
      <main className="flex-grow">
        <Home />
      </main>

      <Footer />
    </div>
  );
}


export default App

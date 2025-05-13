import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ContextProvider } from './context/cartContext.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // ⬅️ أضف هذا
const queryClient = new QueryClient(); // ⬅️ أنشئ Client جديد

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}> {/* ⬅️ لف التطبيق بالمزود */}
    <ContextProvider>
      <App />
    </ContextProvider>
  </QueryClientProvider>
);

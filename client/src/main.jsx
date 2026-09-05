import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import store, { persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { SavedHomesProvider } from './context/SavedHomesContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <BrowserRouter>
          <SavedHomesProvider>
            <App />
          </SavedHomesProvider>
        </BrowserRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>
)

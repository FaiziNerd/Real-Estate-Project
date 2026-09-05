import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import SignOut from './pages/SignOut'
import About from './pages/About'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'
import Search from './pages/Search'
import NotFound from './pages/NotFound'
import Saved from './pages/Saved'
import CookieBanner from './components/CookieBanner'

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="scroll-mt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/update-listing/:listingId" element={<UpdateListing />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-out" element={<SignOut />} />
          <Route path="/listing/:listingId" element={<Listing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}

export default App

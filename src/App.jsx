import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import SignUp from './Pages/SignUp'
import Home from './Pages/Home';
import RootLayout from './Layouts/RootLayout';
import PrivateProfile from './Pages/PrivateProfile';
import PersistLogin from './services/PersistLogin';
import LogIn from './Pages/LogIn';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import posterUrl from '/images/the_walking_dead.jpg';
import SearchMovie from './Pages/SearchMovie';
import MovieDetails from './Pages/MovieDetails';
import PopularPage from './Pages/PopularPage';
import About from './Pages/About';
import PublicProfile from './Pages/PublicProfile';
import RootLayoutPrivateProf from './Layouts/RootLayoutPrivateProf';
import RootLayoutAuth from './Layouts/RootLayoutAuth';
import UpdateProfile from './Pages/UpdateProfile';


function App() {  

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<RootLayout />}>
            <Route index element={<Home/>} />
            <Route path='/search' element={<SearchMovie />} />
            <Route path='/popular' element={<PopularPage />} />
            <Route path='/about' element={<About />} />
            <Route path='/movie/:movieId' element={<MovieDetails />} />
            <Route path='/public-profile/:username' element={<PublicProfile />} />
        </Route>
        <Route element={<RootLayoutPrivateProf />}>
            <Route path='/:username' element={<PrivateProfile />} />
            <Route path='/update-profile/:username' element={<UpdateProfile />} />
        </Route>
        <Route element={<RootLayoutAuth />}>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
        </Route>
      </>
    )
  )

  return (

    <div className="relative min-h-screen text-white">

      <div
        className="fixed inset-0 -z-10 bg-gray-900"
        style={{
          backgroundImage: `url(${posterUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: window.innerWidth > 768 ? "fixed" : "scroll",
        }}
      />

      <div className="fixed inset-0 -z-0 bg-black/50" />

      <PersistLogin>
        <RouterProvider router={router} />
      </PersistLogin>
    </div>

    
  )
}

export default App

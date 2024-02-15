import { BrowserRouter, Routes, Route} from 'react-router-dom'

// components 
import  Header  from '../components/Header';
import  Footer  from '../components/Footer';

// pages
import  HomePage  from '../pages/HomePage';
import  AboutPage  from '../pages/AboutPage';
import  MoviePage  from '../pages/MoviePage';
import  MyListPage from '../pages/MyListPage';
import  NotFoundPage from '../pages/NotFoundPage';


const AppRouter = () => {
  return (

    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/mylist" element={<MyListPage />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
    </BrowserRouter>
    )
}

export default AppRouter
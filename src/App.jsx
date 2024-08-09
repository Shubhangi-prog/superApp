import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import RegisterUsers from "./pages/user/RegisterUsers";
import UserDashboard from "./pages/dashboard/Dashboard";
import ChooseGenre from "./pages/movies/ChooseGenre";
import BrowseMovies from "./pages/movies/BrowseMovies";
import NotFound from "./pages/PageNotFound";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<RegisterUsers />} />
                <Route path='user/dashboard' element={<UserDashboard />} />
                <Route path='movies/genre' element={<ChooseGenre />} />
                <Route path='movies/browse' element={<BrowseMovies />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;

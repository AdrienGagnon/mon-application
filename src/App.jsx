import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import NavLayout from './components/MainNavigation/MainNavigationRoot';
import FooterLayout from './components/Footer/FooterRoot';

import HomePage from './pages/Home/Home';
import InfosPage from './pages/Infos/Infos';
import PhotoApp from './pages/Photos/Photos';
import QuizApp from './pages/Quiz/Quiz';

const router = createBrowserRouter([
    {
        path: '/',
        element: <NavLayout />,
        children: [
            {
                path: '/',
                element: <FooterLayout />,
                children: [
                    { path: '/', element: <HomePage /> },
                    { path: '/infos', element: <InfosPage /> },
                    { path: '/photos', element: <PhotoApp /> },
                ],
            },
            { path: '/quiz', element: <QuizApp /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;

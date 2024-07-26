import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import VideoDetail from './pages/VideoDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/search/:keyword', element: <Home /> },
      { path: '/video/:videoId', element: <VideoDetail /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

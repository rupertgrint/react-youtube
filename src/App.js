import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SearchedVideos from './pages/SearchedVideos';
import VideoDetail from './pages/VideoDetail';
import { SearchProvider } from './context/SearchContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/search/:keyword', element: <SearchedVideos /> },
      { path: '/video/:videoId', element: <VideoDetail /> },
    ],
  },
]);

function App() {
  return (
    <SearchProvider>
      <RouterProvider router={router} />
    </SearchProvider>
  );
}

export default App;

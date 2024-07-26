import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import VideoDetail from './pages/VideoDetail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;

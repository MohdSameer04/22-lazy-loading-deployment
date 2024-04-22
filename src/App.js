import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';

// import PostPage, { loader as postLoader } from './pages/Post';

import RootLayout from './pages/Root';
import { lazy, Suspense } from 'react';

// lazy will load import function and taking import as an argument 
const BlogPage = lazy(() => import('./pages/Blog'));

const PostPage = lazy(() => import('./pages/Post'));


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          { 
            index: true, 

            // if our page was taking some time for load then with the help of suspense a fallback msg was showed at that time
            element: <Suspense fallback={<p>Loding...</p>}> <BlogPage /> </Suspense>, 

            // with the help of that we can implement lazyLoading so firstly we import that file when user are in that route after that load a loader function 
            loader: () => import('./pages/Blog').then(module => module.loader()) 
          },
          { 
            path: ':id', 
            element: <Suspense fallback={<p>Loading...</p>}> <PostPage /> </Suspense>, 
            loader: (meta) => import('./pages/Post').then(module => module.loader(meta)) 
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import { Layout } from './../layouts/Layout';
import { Home } from './../pages/Home';
import { About } from './../pages/About';
import { NotFound } from './../pages/NotFound';
import { History } from './../pages/History';
import { Star } from './../pages/Star';

export const routeData = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: "history",
        element: <History />
      },
      {
        path: "star",
        element: <Star />
      }
    ],
  },
];

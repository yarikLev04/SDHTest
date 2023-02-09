import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { UserTable } from 'src/sections/userSection/UserTable';
import { Page404 } from 'src/components/Page404';
import { CreateEditForm } from 'src/sections/userSection/CreateEditForm';
import { RedirectToMainPage } from 'src/components/RedirectToMainPage';
import { UserProfile } from '../sections/userSection/UserProfile';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <RedirectToMainPage />,
        errorElement:  <Page404 />,
        children: [
            {
                path: '/users',
                element: <UserTable />
            },
            {
                path: '/users/createUser',
                element: <CreateEditForm />
            },
            {
                path: '/users/:id',
                element: <CreateEditForm />
            },
            {
                path: '/users/:id/profile',
                element: <UserProfile />
            }
        ]
    }
];

export const router = createBrowserRouter(routes);

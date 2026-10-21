import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import ListingsPage from '../pages/ListingsPage';
import ListingDetailsPage from '../pages/ListingDetailsPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import FavoritesPage from '../pages/FavoritesPage';
import StudentDashboardPage from '../pages/StudentDashboardPage';
import OwnerDashboardPage from '../pages/OwnerDashboardPage';
import ListingFormPage from '../pages/ListingFormPage';
import NotFoundPage from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'listings',
        element: <ListingsPage />,
      },
      {
        path: 'listings/:id',
        element: <ListingDetailsPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
      {
        path: 'dashboard',
        element: <StudentDashboardPage />,
      },
      {
        path: 'owner/dashboard',
        element: <OwnerDashboardPage />,
      },
      {
        path: 'owner/listings/new',
        element: <ListingFormPage />,
      },
      {
        path: 'owner/listings/:id/edit',
        element: <ListingFormPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

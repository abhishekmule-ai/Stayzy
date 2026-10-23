import { Router } from 'express';
import { authenticate, requireAuth, requireRole } from '../middleware/auth.js';
import * as authController from '../controllers/authController.js';
import * as listingsController from '../controllers/listingsController.js';
import * as areasController from '../controllers/areasController.js';
import * as favoritesController from '../controllers/favoritesController.js';
import * as enquiriesController from '../controllers/enquiriesController.js';

const router = Router();

// 0. API Root Index
router.get('/', (req, res) => {
  res.json({
    name: 'Stayzy Mumbai REST API',
    version: '1.0.0',
    status: 'online',
    message: 'Welcome to Stayzy API. Below are the available endpoints:',
    endpoints: {
      health: '/api/v1/health',
      areas: '/api/v1/areas',
      listings: '/api/v1/listings',
      listing_details: '/api/v1/listings/1',
      auth_login: 'POST /api/v1/auth/login',
      auth_register: 'POST /api/v1/auth/register',
      favorites: 'GET /api/v1/favorites (requires Bearer token)',
      student_enquiries: 'GET /api/v1/student/enquiries (requires Bearer token)',
      owner_listings: 'GET /api/v1/owner/listings (requires Owner Bearer token)',
    },
  });
});

// 1. System Health
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Stayzy Mumbai REST API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// 2. Searchable Areas
router.get('/areas', areasController.getAreas);

// 3. Listings (Public Search & Details)
router.get('/listings', listingsController.getListings);
router.get('/listings/:id', listingsController.getListingById);

// 4. Authentication
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/logout', authenticate, authController.logout);
router.get('/auth/me', authenticate, authController.getMe);

// 5. Favorites (Authenticated Users)
router.get('/favorites', authenticate, requireAuth, favoritesController.getFavorites);
router.post('/favorites/:listingId', authenticate, requireAuth, favoritesController.addFavorite);
router.delete('/favorites/:listingId', authenticate, requireAuth, favoritesController.removeFavorite);

// 6. Enquiries (Public or Authenticated)
router.post('/listings/:id/enquiries', authenticate, enquiriesController.submitEnquiry);
router.get('/student/enquiries', authenticate, requireAuth, enquiriesController.getStudentEnquiries);

// 7. Owner Protected Routes (Owner Role Only)
router.get('/owner/listings', authenticate, requireRole('owner'), listingsController.getOwnerListings);
router.post('/owner/listings', authenticate, requireRole('owner'), listingsController.createListing);
router.patch('/owner/listings/:id', authenticate, requireRole('owner'), listingsController.updateListing);
router.delete('/owner/listings/:id', authenticate, requireRole('owner'), listingsController.deleteListing);
router.get('/owner/enquiries', authenticate, requireRole('owner'), enquiriesController.getOwnerEnquiries);

export default router;

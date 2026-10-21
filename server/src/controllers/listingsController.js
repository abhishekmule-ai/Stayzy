import { StayzyRepo } from '../repositories/stayzyRepo.js';

export async function getListings(req, res, next) {
  try {
    const {
      q,
      area,
      minPrice,
      maxPrice,
      type,
      sharing,
      gender,
      amenities,
      sort,
      page,
      limit,
    } = req.query;

    const result = await StayzyRepo.getListings({
      q,
      area,
      minPrice,
      maxPrice,
      type,
      sharing,
      gender,
      amenities,
      sort,
      page,
      limit,
    });

    res.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
}

export async function getListingById(req, res, next) {
  try {
    const { id } = req.params;
    const listing = await StayzyRepo.getListingById(id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: `Listing with id '${id}' not found.`,
      });
    }

    res.json({
      success: true,
      data: listing,
    });
  } catch (error) {
    next(error);
  }
}

export async function createListing(req, res, next) {
  try {
    const { title, description, monthlyPrice, propertyType } = req.body;

    if (!title || !description || !monthlyPrice || !propertyType) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, monthlyPrice, and propertyType are required.',
      });
    }

    if (Number(monthlyPrice) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Monthly price must be a positive number.',
      });
    }

    const listing = await StayzyRepo.createListing(req.body, req.user.id);
    res.status(201).json({
      success: true,
      data: listing,
      message: 'Listing published successfully.',
    });
  } catch (error) {
    next(error);
  }
}

export async function getOwnerListings(req, res, next) {
  try {
    const listings = await StayzyRepo.getOwnerListings(req.user.id);
    res.json({
      success: true,
      data: listings,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateListing(req, res, next) {
  try {
    const { id } = req.params;
    const updated = await StayzyRepo.updateListing(id, req.body, req.user.id);
    res.json({
      success: true,
      data: updated,
      message: 'Listing updated successfully.',
    });
  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      return res.status(403).json({ success: false, message: error.message });
    }
    next(error);
  }
}

export async function deleteListing(req, res, next) {
  try {
    const { id } = req.params;
    await StayzyRepo.deleteListing(id, req.user.id);
    res.json({
      success: true,
      message: 'Listing deactivated/deleted successfully.',
    });
  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      return res.status(403).json({ success: false, message: error.message });
    }
    next(error);
  }
}

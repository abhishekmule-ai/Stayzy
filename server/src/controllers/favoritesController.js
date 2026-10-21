import { StayzyRepo } from '../repositories/stayzyRepo.js';

export async function getFavorites(req, res, next) {
  try {
    const favorites = await StayzyRepo.getFavorites(req.user.id);
    res.json({
      success: true,
      data: favorites,
    });
  } catch (error) {
    next(error);
  }
}

export async function addFavorite(req, res, next) {
  try {
    const { listingId } = req.params;
    await StayzyRepo.addFavorite(req.user.id, listingId);
    res.json({
      success: true,
      message: 'Added to saved properties.',
    });
  } catch (error) {
    next(error);
  }
}

export async function removeFavorite(req, res, next) {
  try {
    const { listingId } = req.params;
    await StayzyRepo.removeFavorite(req.user.id, listingId);
    res.json({
      success: true,
      message: 'Removed from saved properties.',
    });
  } catch (error) {
    next(error);
  }
}

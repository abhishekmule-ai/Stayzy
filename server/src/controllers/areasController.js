import { StayzyRepo } from '../repositories/stayzyRepo.js';

export async function getAreas(req, res, next) {
  try {
    const areas = await StayzyRepo.getAreas();
    res.json({
      success: true,
      data: areas,
    });
  } catch (error) {
    next(error);
  }
}

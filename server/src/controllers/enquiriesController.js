import { StayzyRepo } from '../repositories/stayzyRepo.js';

export async function submitEnquiry(req, res, next) {
  try {
    const { id } = req.params;
    const { name, email, phone, message, moveInDate } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.',
      });
    }

    const studentId = req.user ? req.user.id : null;
    const enquiry = await StayzyRepo.createEnquiry(id, studentId, {
      name,
      email,
      phone,
      message,
      moveInDate,
    });

    res.status(201).json({
      success: true,
      data: enquiry,
      message: 'Enquiry submitted successfully.',
    });
  } catch (error) {
    next(error);
  }
}

export async function getStudentEnquiries(req, res, next) {
  try {
    const studentId = req.user.id;
    const enquiries = await StayzyRepo.getStudentEnquiries(studentId);
    res.json({
      success: true,
      data: enquiries,
    });
  } catch (error) {
    next(error);
  }
}

export async function getOwnerEnquiries(req, res, next) {
  try {
    const ownerId = req.user.id;
    const enquiries = await StayzyRepo.getOwnerEnquiries(ownerId);
    res.json({
      success: true,
      data: enquiries,
    });
  } catch (error) {
    next(error);
  }
}

import { apiRequest } from './api';

const ENQUIRIES_KEY = 'stayzy_enquiries_list';

export function getLocalEnquiries() {
  try {
    const raw = localStorage.getItem(ENQUIRIES_KEY);
    return raw ? JSON.parse(raw) : [
      {
        id: 'enq-demo-1',
        listingId: 'demo-1',
        listingTitle: 'Sunlit Twin-Sharing PG with Home Cooked Meals',
        area: 'Powai',
        name: 'Aarav Sharma',
        email: 'student@stayzy.in',
        phone: '+91 98765 43210',
        message: 'Hi, I am an IIT Bombay student looking for a move-in around 1st of next month. Is twin sharing available?',
        moveInDate: '2026-04-01',
        status: 'contacted',
        createdAt: '2026-03-22T14:30:00Z',
        isDemo: true
      }
    ];
  } catch (e) {
    return [];
  }
}

export function saveLocalEnquiry(enquiry) {
  try {
    const all = getLocalEnquiries();
    all.unshift(enquiry);
    localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(all));
  } catch (e) {
    console.error('Failed to save enquiry locally', e);
  }
}

export async function submitEnquiry(listingId, enquiryData) {
  try {
    const res = await apiRequest(`/listings/${listingId}/enquiries`, {
      method: 'POST',
      body: JSON.stringify(enquiryData),
    });
    return { data: res.data, isDemo: false };
  } catch (error) {
    const newEnquiry = {
      id: `enq-${Date.now()}`,
      listingId,
      ...enquiryData,
      status: 'new',
      createdAt: new Date().toISOString(),
      isDemo: true,
    };
    saveLocalEnquiry(newEnquiry);
    return { data: newEnquiry, isDemo: true };
  }
}

export async function getStudentEnquiries() {
  try {
    const res = await apiRequest('/student/enquiries');
    return { data: res.data, isDemo: false };
  } catch (error) {
    return { data: getLocalEnquiries(), isDemo: true };
  }
}

export async function getOwnerEnquiries() {
  try {
    const res = await apiRequest('/owner/enquiries');
    return { data: res.data, isDemo: false };
  } catch (error) {
    return { data: getLocalEnquiries(), isDemo: true };
  }
}

import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

function validateE164Phone(phone: string) {
  if (!phone) return null;
  if (!/^\+[1-9]\d{1,14}$/.test(phone)) {
    return "Phone number must follow E.164 format.";
  }

  if (phone.startsWith("+33")) {
    const nationalNumber = phone.slice(3);
    if (!/^[67]\d+$/.test(nationalNumber)) {
      return "For France (+33), mobile numbers must start with 6 or 7.";
    }
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, phone } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const phoneError = validateE164Phone(phone || "");
    if (phoneError) {
      return NextResponse.json({ error: phoneError }, { status: 400 });
    }

    // Save contact form to Firestore
    const docRef = await adminDb.collection('contacts').add({
      name,
      email,
      phone: phone || "",
      message,
      createdAt: new Date().toISOString(),
      status: 'UNREAD' // UNREAD, READ, REPLIED
    });

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error('Error saving contact:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    // Basic Auth Check
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split('Bearer ')[1];
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminDoc = await adminDb.collection('admins').doc(token).get();
    if (!adminDoc.exists) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch contacts
    const snapshot = await adminDb.collection('contacts').orderBy('createdAt', 'desc').get();
    const contacts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

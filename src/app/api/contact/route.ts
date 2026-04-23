import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

// The passcode to secure admin API routes (from .env.local)
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Save contact form to Firestore
    const docRef = await adminDb.collection('contacts').add({
      name,
      email,
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

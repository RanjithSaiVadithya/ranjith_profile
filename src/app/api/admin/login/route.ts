import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    const adminsRef = adminDb.collection('admins');
    
    // Seed DB if it's completely empty (per user request)
    const snapshot = await adminsRef.limit(1).get();
    if (snapshot.empty) {
      await adminsRef.add({
        email: 'ranjithsaivadithya@gmail.com',
        password: '11223344', // Note: Secure hashing should be used in production
        role: 'SUPER_ADMIN'
      });
      console.log('Seeded initial admin user.');
    }

    // Verify User
    const userQuery = await adminsRef
      .where('email', '==', email)
      .where('password', '==', password)
      .limit(1)
      .get();

    if (userQuery.empty) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const userDoc = userQuery.docs[0];

    // Return the doc ID as a simple token
    return NextResponse.json({ success: true, token: userDoc.id });

  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}

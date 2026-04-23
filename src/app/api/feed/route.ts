import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE;

export async function GET(request: Request) {
  try {
    // Public API - Fetch all feeds
    const snapshot = await adminDb.collection('feeds').orderBy('createdAt', 'desc').get();
    
    const feeds = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ feeds });
  } catch (error) {
    console.error('Error fetching feeds:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
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

    const body = await request.json();
    const { title, content, relatedProjectId, category } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Missing title or content' }, { status: 400 });
    }

    // Save to Firestore
    const docRef = await adminDb.collection('feeds').add({
      title,
      content,
      relatedProjectId: relatedProjectId || null,
      category: category || 'UPDATE', // e.g. ARCHITECTURE, PERFORMANCE
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error('Error saving feed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split('Bearer ')[1];
    
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const adminDoc = await adminDb.collection('admins').doc(token).get();
    if (!adminDoc.exists) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { id, title, content, relatedProjectId, category } = body;

    if (!id || !title || !content) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

    await adminDb.collection('feeds').doc(id).update({
      title,
      content,
      relatedProjectId: relatedProjectId || null,
      category: category || 'UPDATE'
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating feed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split('Bearer ')[1];
    
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const adminDoc = await adminDb.collection('admins').doc(token).get();
    if (!adminDoc.exists) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'Missing feed ID' }, { status: 400 });

    await adminDb.collection('feeds').doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting feed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

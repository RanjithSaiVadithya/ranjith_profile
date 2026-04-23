require('dotenv').config({ path: '.env.local' });
console.log("PROJECT_ID:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
console.log("CLIENT_EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);
console.log("PRIVATE_KEY LENGTH (if exists):", process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.length : 0);

const admin = require('firebase-admin');
try {
  admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
  });
  console.log("App initialized.");
  const db = admin.firestore();
  db.collection('admins').limit(1).get().then(snap => {
      console.log('Admins snapshot empty?', snap.empty);
      process.exit(0);
  }).catch(e => {
      console.error('Firestore Error:', e);
      process.exit(1);
  });
} catch(e) {
  console.error("Init Error:", e);
  process.exit(1);
}

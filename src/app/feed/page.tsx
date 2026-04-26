import { FeedModule } from "@/modules/feed/FeedModule";
import type { Metadata } from "next";
import { adminDb } from "@/lib/firebase/admin";

export const metadata: Metadata = {
  title: "Outbox Feed | RanjithSai Portfolio",
  description: "Transmissions, architectural updates, and engineering logs published by RanjithSai Vadithya.",
  keywords: ["RanjithSai Blogs", "Anjit Tech Logs", "Software Engineering Feed", "Transmissions", "RanjithSai Articles"],
};

// Revalidate every 60 seconds (ISR) or 0 for dynamic
export const revalidate = 60;

export default async function FeedPage() {
  let initialBlogs: any[] = [];
  try {
    const snapshot = await adminDb.collection("feeds").orderBy("createdAt", "desc").get();
    initialBlogs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error pre-fetching feeds:", error);
  }

  return <FeedModule initialBlogs={initialBlogs} />;
}

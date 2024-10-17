import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const useFirestore = (collection: string, documentId: string) => {
  const [document, setDocument] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const docRef = doc(db, collection, documentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDocument(docSnap.data());
        } else {
          setError('Document not found');
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [collection, documentId]);

  const updateDocument = async (updates: any) => {
    try {
      const docRef = doc(db, collection, documentId);
      await updateDoc(docRef, updates);
      setDocument((prev: any) => ({ ...prev, ...updates }));
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return { document, loading, error, updateDocument };
};
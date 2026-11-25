import { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../config/firebase'

export function useLiveEvent(eventId) {
  const [checkins, setCheckins] = useState([])

  useEffect(() => {
    if (!eventId) return

    try {
      const q = query(
        collection(db, 'checkins'),
        where('eventId', '==', eventId)
      )

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const data = snapshot.docs.map((item) => ({
              id: item.id,
              ...item.data()
            }))
            setCheckins(data)
          }
        },
        (err) => {
          console.warn('Firestore onSnapshot fallback:', err.message)
        }
      )

      return () => unsubscribe()
    } catch (err) {
      console.warn('Firestore subscription fallback:', err.message)
    }
  }, [eventId])

  return { checkins }
}

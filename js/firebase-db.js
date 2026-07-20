// --- FIREBASE FIRESTORE & LOCAL DB UNIFIED ADAPTER ---

// Read collections dynamically
async function fetchCollectionData(collectionName) {
    const actualCol = collectionName === 'attractions' ? 'atracoes' : collectionName;
    if (window.firebaseEnabled) {
        try {
            const { collection, getDocs } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
            const colRef = collection(window.firebaseDb, actualCol);
            const snapshot = await getDocs(colRef);
            const list = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                data.id = data.id || doc.id; // Fallback to document ID
                list.push(data);
            });
            return list;
        } catch (e) {
            console.error(`Error reading ${actualCol} from Firestore, falling back to local:`, e);
        }
    }
    
    // Fallback: local database fetch
    if (collectionName === 'commercialConditions' || collectionName === 'financialInfo') {
        const res = await fetch('/api/commercial-settings');
        const data = await res.json();
        return data[collectionName] || [];
    } else if (collectionName === 'refunds') {
        const res = await fetch('/api/refunds');
        return await res.json();
    } else {
        const res = await fetch('/api/srs-data');
        const data = await res.json();
        return data[actualCol] || [];
    }
}

// Save/Update/Delete records dynamically
async function saveCollectionRecord(collectionName, action, recordData) {
    const actualCol = collectionName === 'attractions' ? 'atracoes' : collectionName;
    if (window.firebaseEnabled) {
        try {
            const { collection, doc, setDoc, deleteDoc, updateDoc } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
            const colRef = collection(window.firebaseDb, actualCol);
            
            const docId = String(recordData.id || Date.now());
            const docRef = doc(colRef, docId);
            
            if (action === 'delete') {
                await deleteDoc(docRef);
                return { success: true };
            }
            
            if (action === 'inactivate') {
                await updateDoc(docRef, { status: 'Inativo' });
                return { success: true };
            }
            
            if (action === 'send-docusign') {
                await updateDoc(docRef, { status: 'Enviado a Docusign' });
                return { success: true };
            }
            
            // Create or edit
            recordData.id = recordData.id || Number(docId);
            await setDoc(docRef, recordData, { merge: true });
            return { success: true };
        } catch (e) {
            console.error(`Error saving to Firestore, falling back to local:`, e);
        }
    }
    
    // Fallback: local REST APIs
    let url = '/api/srs-data';
    let body = { collection: collectionName, action: action, data: recordData };
    
    if (collectionName === 'commercialConditions') {
        url = '/api/commercial-conditions';
        body = { ...recordData, action: action };
    } else if (collectionName === 'financialInfo') {
        url = '/api/financial-info';
        body = { ...recordData, action: action };
    } else if (collectionName === 'refunds') {
        url = '/api/refunds';
        body = { ...recordData, action: action };
    }
    
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    return await res.json();
}

// Export to window
window.fetchCollectionData = fetchCollectionData;
window.saveCollectionRecord = saveCollectionRecord;

// --- FIREBASE INITIALIZATION & CONFIG ADAPTER ---

// Default firebaseConfig placeholder
let firebaseConfig = null;

// Try to retrieve configuration from localStorage (so the user can set it in the UI)
try {
    const savedConfig = localStorage.getItem('c360_firebase_config');
    if (savedConfig) {
        firebaseConfig = JSON.parse(savedConfig);
    }
} catch (e) {
    console.warn("Could not load Firebase config from localStorage", e);
}

// Global flag to indicate if Firebase is connected
window.firebaseEnabled = false;
window.firebaseApp = null;
window.firebaseAuth = null;
window.firebaseDb = null;

// Initialize Firebase if config is present
async function initializeFirebaseApp() {
    if (!firebaseConfig || !firebaseConfig.apiKey) {
        console.log("Firebase credentials not configured. Running in Local Database Mode.");
        return false;
    }
    
    try {
        // Dynamically load Firebase client modules from Firebase CDN (ES Modules)
        const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js");
        const { getAuth } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js");
        const { getFirestore } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
        
        window.firebaseApp = initializeApp(firebaseConfig);
        window.firebaseAuth = getAuth(window.firebaseApp);
        window.firebaseDb = getFirestore(window.firebaseApp);
        window.firebaseEnabled = true;
        
        console.log("Firebase initialized successfully! Cloud Database Mode is Active.");
        return true;
    } catch (err) {
        console.error("Failed to initialize Firebase SDK:", err);
        window.firebaseEnabled = false;
        return false;
    }
}

// Function to save config from the UI
function saveFirebaseUiConfig(config) {
    if (!config || !config.apiKey || !config.projectId) {
        alert("Configuração inválida.");
        return;
    }
    localStorage.setItem('c360_firebase_config', JSON.stringify(config));
    alert("Configurações do Firebase salvas! Recarregando a página para aplicar...");
    window.location.reload();
}

// Export functions to window
window.initializeFirebaseApp = initializeFirebaseApp;
window.saveFirebaseUiConfig = saveFirebaseUiConfig;

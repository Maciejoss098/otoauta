// Konfiguracja Firebase (wstaw tutaj swoje dane z Firebase)
const firebaseConfig = {
    apiKey: "TWOJ_KOD_API",
    authDomain: "TWOJ_DOMAIN.firebaseapp.com",
    projectId: "TWOJ_PROJECT_ID",
    storageBucket: "TWOJ_BUCKET.appspot.com",
    messagingSenderId: "TWOJ_SENDER_ID",
    appId: "TWOJ_APP_ID"
};
firebase.initializeApp(firebaseConfig);

// Odniesienie do Firestore
const db = firebase.firestore();

// Obsługa formularza dodawania ogłoszeń
document.getElementById('add-listing-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;

    // Dodaj ogłoszenie do kolekcji Firestore
    db.collection('listings').add({
        title: title,
        description: description,
        price: price
    }).then(() => {
        alert("Ogłoszenie dodane!");
        document.getElementById('add-listing-form').reset();
        loadListings(); // Odśwież listę ogłoszeń po dodaniu
    }).catch((error) => {
        console.error("Błąd dodawania ogłoszenia: ", error);
    });
});

// Funkcja ładowania ogłoszeń
function loadListings() {
    db.collection('listings').get().then((snapshot) => {
        const listingsContainer = document.getElementById('listings-container');
        listingsContainer.innerHTML = '';
        snapshot.docs.forEach(doc => {
            const listing = doc.data();
            listingsContainer.innerHTML += `
                <div>
                    <h3>${listing.title}</h3>
                    <p>${listing.description}</p>
                    <p>${listing.price} PLN</p>
                </div>
            `;
        });
    });
}

// Załaduj ogłoszenia po załadowaniu strony
window.onload = loadListings;

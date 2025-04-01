document.addEventListener('DOMContentLoaded', function () {
    // Hämta produktens namn från URL:en
    const urlParams = new URLSearchParams(window.location.search);
    const produkt = urlParams.get('product');
    console.log('Produkt från URL:', produkt);

    // Visa produktnamn om det finns
    const produktDisplay = document.getElementById('productInfo');
    if (produktDisplay && produkt) {
        produktDisplay.textContent = `Du beställer: ${produkt}`;
    }

    // Formulärvalidering
    const form = document.getElementById('checkoutForm');
    if (!form) {
        console.error('Formuläret hittades inte!');
        return;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const postal = document.getElementById('postal').value.trim();
        const city = document.getElementById('city').value.trim();

        let errors = [];

        if (name.length < 2 || name.length > 50) errors.push("Namn måste vara 2–50 tecken.");
        if (!email.includes('@') || email.length > 50) errors.push("Ogiltig e-post.");
        if (!/^[0-9\-\(\) ]+$/.test(phone) || phone.length > 50) errors.push("Ogiltigt telefonnummer.");
        if (address.length < 2 || address.length > 50) errors.push("Ogiltig adress.");
        if (!/^\d{5}$/.test(postal)) errors.push("Postnummer måste vara exakt 5 siffror.");
        if (city.length < 2 || city.length > 50) errors.push("Ogiltig ort.");

        if (errors.length > 0) {
            alert("Formulärfel:\n" + errors.join("\n"));
        } else {
            alert(`Tack för din beställning av: ${produkt}!`);
            form.reset();
            // Om du använder ett orderForm-div, döljs det här:
            const orderForm = document.getElementById('orderForm');
            if (orderForm) orderForm.style.display = 'none';
        }
    });
});

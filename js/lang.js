const translations = {
    nl: {
        "nav-home": "Home",
        "nav-services": "Diensten ▼",
        "nav-permits": "Vergunningen",
        "nav-escort": "Begeleiding",
        "nav-route": "Route-onderzoeken",
        "nav-vlm": "VLM",
        "nav-sign": "Signalisatie",
        "nav-ship": "Verscheping",
        "nav-reg": "Regelgeving",
        "nav-terms": "Algemene Voorwaarden",
        "nav-contact": "Contact"
    },
    en: {
        "nav-home": "Home",
        "nav-services": "Services ▼",
        "nav-permits": "Permits",
        "nav-escort": "Escort",
        "nav-route": "Route analysis",
        "nav-vlm": "VLM",
        "nav-sign": "Signage",
        "nav-ship": "Shipping",
        "nav-reg": "Regulations",
        "nav-terms": "Terms & Conditions",
        "nav-contact": "Contact"
    },
    de: {
        "nav-home": "Startseite",
        "nav-services": "Dienstleistungen ▼",
        "nav-permits": "Genehmigungen",
        "nav-escort": "Begleitung",
        "nav-route": "Streckenanalyse",
        "nav-vlm": "VLM",
        "nav-sign": "Signalisation",
        "nav-ship": "Verschiffung",
        "nav-reg": "Regelungen",
        "nav-terms": "Allgemeine Bedingungen",
        "nav-contact": "Kontakt"
    },
    fr: {
        "nav-home": "Accueil",
        "nav-services": "Services ▼",
        "nav-permits": "Permis",
        "nav-escort": "Guidage",
        "nav-route": "Études de parcours",
        "nav-vlm": "VLM",
        "nav-sign": "Signalisation",
        "nav-ship": "Expédition",
        "nav-reg": "Réglementation",
        "nav-terms": "Conditions générales",
        "nav-contact": "Contact"
    }
};

function changeLanguage(lang) {
    // 1. Toon alleen het gekozen taalblok en verberg de rest
    document.querySelectorAll("[data-lang]").forEach(el => {
        if (el.getAttribute("data-lang") === lang) {
            el.style.display = "block";
        } else {
            el.style.display = "none";
        }
    });

    // 2. Vertaal de menu-items in de navigatiebalk
    if (translations[lang]) {
        const t = translations[lang];
        for (const id in t) {
            const el = document.getElementById(id);
            if (el) {
                el.textContent = t[id];
            }
        }
    }

    // 3. Sla de gekozen taal op in de browser
    localStorage.setItem("siteLang", lang);

    // 4. Zet het selectie-menu in de header op de juiste waarde
    const select = document.querySelector(".lang-select");
    if (select) {
        select.value = lang;
    }
}

// Uitvoeren zodra de pagina is geladen
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("siteLang") || "nl";
    changeLanguage(savedLang);
});
document.addEventListener("DOMContentLoaded", function() {
    const path = window.location.pathname;
    let suffix = "";

    // Bepaal de taal-achtervoegsel op basis van de URL
    if (path.includes("-de.html")) {
        suffix = "-de.html";
    } else if (path.includes("-en.html")) {
        suffix = "-en.html";
    } else if (path.includes("-fr.html")) {
        suffix = "-fr.html";
    } else {
        suffix = ".html"; // Standaard Nederlands (zonder achtervoegsel of met .html)
    }

    // Als we op een taalpagina zitten, pas dan de menu-links aan
    if (suffix !== ".html") {
        const navLinks = document.querySelectorAll("header nav a, .dropdown-content a");
        
        navLinks.forEach(link => {
            let href = link.getAttribute("href");
            
            // Controleer of het een interne HTML-pagina is (en niet index.html of een externe link)
            if (href && href.endsWith(".html") && !href.includes("-de") && !href.includes("-en") && !href.includes("-fr")) {
                let baseName = href.replace(".html", "");
                link.setAttribute("href", baseName + suffix);
            }
        });
    }
});
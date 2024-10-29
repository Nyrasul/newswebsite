// pop up
document.getElementById('show-login').addEventListener('click', function() {
    if (localStorage.getItem("email")) {  // Check for email in localStorage
        document.getElementById('logout-overlay').style.display = 'flex';
        document.getElementById('login-overlay').style.display = 'none';
    } else {
        document.getElementById('login-overlay').style.display = 'flex';
        document.getElementById('logout-overlay').style.display = 'none';
    }
});

document.addEventListener('click', function(event) {
    if (event.target.id === 'login-overlay') {
        document.getElementById('login-overlay').style.display = 'none';
    }
});

// form validation
window.addEventListener('load', function() {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
        document.getElementById('show-login').innerText = storedEmail; 
        document.getElementById('login-overlay').style.display = 'none';
    }
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    let isValid = true;

    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    document.getElementById('email-error').textContent = '';
    document.getElementById('password-error').textContent = '';

    if (!email) {
        document.getElementById('email-error').textContent = 'Email is required.';
        isValid = false;
    }

    if (password.length < 6) {
        document.getElementById('password-error').textContent = 'Password must be at least 6 characters long.';
        isValid = false;
    }

    if (isValid) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        const localEmail = localStorage.getItem("email");
        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('show-login').innerText = localEmail; 
    }
});

document.getElementById('logout-button').addEventListener('click', function() {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    document.getElementById('show-login').innerText = 'Log In'; 
    document.getElementById('logout-overlay').style.display = 'none';
    alert('You have logged out successfully!');
});

document.getElementById('show-login').addEventListener('click', function() {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        document.getElementById('show-login').innerText = 'Log In';
    }
});


// accordion

 const toggleButton = document.getElementById('toggleButton');
 const accordionSection = document.getElementById('accordionSection');

 toggleButton.addEventListener('click', function() {
     if (accordionSection.style.maxHeight === '0px' || !accordionSection.style.maxHeight) {
        accordionSection.style.maxHeight = accordionSection.scrollHeight + 'px'; 
        toggleButton.textContent = 'Hide';
    } else {
        accordionSection.style.maxHeight = '0px'; 
        toggleButton.textContent = 'See also';
    }
 });

 const toggleText = document.getElementById('toggleText');
 const accordionSection2 = document.getElementById('accordionSection2');
 toggleText.addEventListener('click', function() {
    if (accordionSection2.style.maxHeight === '0px' || !accordionSection2.style.maxHeight) {
       accordionSection2.style.maxHeight = accordionSection2.scrollHeight + 'px'; 
       toggleText.textContent = 'Hide';
   } else {
       accordionSection2.style.maxHeight = '0px'; 
       toggleText.textContent = 'See also';
   }
});

//date and time
function updateDateTime() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: false 
    };
    const formattedDateTime = now.toLocaleString('en-GB', options);
    document.getElementById('dateTimeBlock').innerText = formattedDateTime;
}

setInterval(updateDateTime, 1000);
updateDateTime();

// night day theme
const changeTheme = document.getElementById('themeChange');
const themeIcon = document.getElementById('themeIcon');
const header = document.querySelector('header');
const body = document.body;
const imgs = document.querySelectorAll('img');
const savedTheme = localStorage.getItem('theme') || 'day-theme';
applyTheme(savedTheme);

changeTheme.addEventListener('click', () => {
    const newTheme = body.classList.contains('day-theme') ? 'night-theme' : 'day-theme';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});

function applyTheme(theme) {
    const whiteA = document.querySelectorAll('a.white');
    const blackA = document.querySelectorAll('a.black');

    if (theme === 'night-theme') {
        body.classList.add('night-theme');
        body.classList.remove('day-theme');
        header.style.backgroundColor = '#000';
        header.style.color = '#000';
        themeIcon.src = 'img/night.png';

        whiteA.forEach(link => link.classList.replace('white', 'black'));
        blackA.forEach(link => link.classList.replace('black', 'white'));

        imgs.forEach(image => image.style.filter = 'brightness(0.8)');
    } else {
        body.classList.add('day-theme');
        body.classList.remove('night-theme');
        header.style.backgroundColor = '#000';
        header.style.color = '#fff';
        themeIcon.src = 'img/daylight.png';

        whiteA.forEach(link => link.classList.replace('black', 'white'));
        blackA.forEach(link => link.classList.replace('white', 'black'));

        imgs.forEach(image => image.style.filter = 'brightness(1)');
    }
}

// weather change
const refreshBtn = document.getElementById('refreshBtn');
const weatherDisplay = document.getElementById('weatherDisplay');
const weatherIcon = document.getElementById('weatherIcon');

const apiKey = 'c1464f8567b6406f990202736241410';
const city = 'Astana';
const weatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

refreshBtn.addEventListener('click', () => {
    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(data => {
            const temperature = Math.round(data.current.temp_c); 
            const weatherCondition = data.current.condition.text; 
            const weatherIconUrl = data.current.condition.icon;

            weatherDisplay.innerHTML = `${temperature}° <img id="weatherIcon" src="${weatherIconUrl}" alt="weather-icon" style="width: 26px; height: 26px; vertical-align: text-bottom; padding-right: 30px;">`;
        })
        .catch(error => {
            console.error('error', error);
            weatherDisplay.innerHTML = 'error';
        });
});

// nav by arrows
const navMenu = document.getElementById('navMenu');
const menuItems = navMenu.getElementsByClassName('a');
const headertg = document.getElementById('header');

let currentIndex = 0;

function focusMenuItem(index) {
    menuItems[index].focus();
}

function initMenu() {
    currentIndex = 0;
    focusMenuItem(currentIndex);
}

headertg.addEventListener('click', () => {

    document.addEventListener('keydown', (event) => {
        const key = event.key;

        if (key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % menuItems.length;
            focusMenuItem(currentIndex);
            event.preventDefault();
        } else if (key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
            focusMenuItem(currentIndex);
            event.preventDefault();
        }
    });
});

// translation
function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: 'en,ru,kk'}, 'google_translate_element');
}

function clearTranslateCookie() {
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=." + window.location.hostname + "; path=/;";
}

function translateLanguage() {
    var language = document.getElementById("languageSelect").value;
    clearTranslateCookie();
    
    var googTransCookie;
    switch (language) {
        case 'ru':
            googTransCookie = 'googtrans=/en/ru';
            break;
        case 'kk':
            googTransCookie = 'googtrans=/en/kk';
            break;
        case 'en':
            googTransCookie = 'googtrans=/en/en';
            break;
        default:
            googTransCookie = 'googtrans=/en/en';
    }

    document.cookie = `${googTransCookie}; path=/`;
    window.location.reload();
}

function checkGoogleTranslateLoaded() {
    var intervalId = setInterval(function() {
        var googleTranslateFrame = document.querySelector("iframe.goog-te-menu-frame");

        if (googleTranslateFrame) {
            console.log("Google Translate is fully loaded");
            clearInterval(intervalId);
        } else {
            console.log("Waiting for Google Translate to load...");
        }
    }, 500);
}

checkGoogleTranslateLoaded();

// dynamic data
const data = {
    media: "Media",
    sport: "Sport",
    bussiness: "Business",
    music: "Music",
    techno: "Techno",
    science: "Science"
};

const titles = document.querySelectorAll('.section-title');

titles.forEach((title) => {
    const type = title.getAttribute('data-type');
    if (data[type]) { 
        title.textContent = data[type];
    }
});

// search
document.getElementById('search-btn').addEventListener('click', () => {
    const inputSearch = document.getElementById('search-input');
    const searchHistoryDiv = document.getElementById('searched-items');
    const searchValue = inputSearch.value.toLowerCase().trim();
    let found = false;

    console.log("Search value:", searchValue);

    inputSearch.style.display = 'block';
    searchHistoryDiv.style.display = 'flex';

    titles.forEach((title) => {
        const type = title.getAttribute('data-type');
        if (!type || !data[type]) return;
        
        const titleText = data[type].toLowerCase();

        if (titleText.includes(searchValue)) {
            title.classList.remove('hidden');

            if (!found) {
                title.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                found = true;
            }
        } else {
            title.classList.add('hidden');
        }
    });

    if (!found) {
        alert('No matches found.');
    } else {
        let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        
        if (searchValue && !searchHistory.includes(searchValue)) {
            searchHistory.push(searchValue);
            console.log("Saving to localStorage:", searchHistory);
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
            console.log("Stored search history in localStorage:", localStorage.getItem('searchHistory'));
        }
        updateSearchHistory();
    }
});

function updateSearchHistory() {
    const searchHistoryDiv = document.getElementById('searched-items');
    searchHistoryDiv.innerHTML = '';

    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    console.log("Loaded search history:", searchHistory);

    searchHistory.forEach((search) => {
        const p = document.createElement('p');
        p.textContent = search;
        searchHistoryDiv.appendChild(p);
    });
}

document.addEventListener('DOMContentLoaded', updateSearchHistory);

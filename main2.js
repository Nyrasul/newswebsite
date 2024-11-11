//login - register
document.addEventListener('DOMContentLoaded', function () {
    const showLoginButton = document.getElementById('show-login');
    const loginOverlay = document.getElementById('login-overlay');
    const logoutOverlay = document.getElementById('logout-overlay');
    const authForm = document.getElementById('auth-form');
    const submitButton = document.getElementById('submit-button');
    const switchFormButton = document.getElementById('switch-form');
    const formTitle = document.getElementById('form-title');

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userEmail = localStorage.getItem('userEmail');

    updateLoginUI(isLoggedIn, userEmail);

    showLoginButton.addEventListener('click', function () {
        if (isLoggedIn) {
            logoutOverlay.style.display = 'flex';
            loginOverlay.style.display = 'none';
        } else {
            loginOverlay.style.display = 'flex';
            logoutOverlay.style.display = 'none';
            formTitle.innerText = 'Register / Login';
            submitButton.innerText = 'Register In';
            switchFormButton.innerText = 'Login';
        }
    });

    loginOverlay.addEventListener('click', function (event) {
        if (event.target === loginOverlay) {
            loginOverlay.style.display = 'none';
        }
    });

    logoutOverlay.addEventListener('click', function (event) {
        if (event.target === logoutOverlay) {
            logoutOverlay.style.display = 'none';
        }
    });

    switchFormButton.addEventListener('click', function () {
        if (submitButton.innerText === 'Register In') {
            formTitle.innerText = 'Login';
            submitButton.innerText = 'Login';
            switchFormButton.innerText = 'Register';
        } else {
            formTitle.innerText = 'Register';
            submitButton.innerText = 'Register In';
            switchFormButton.innerText = 'Login';
        }
    });

    authForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (!email.includes('@') || password.length < 6) {
            alert('Invalid input. Please check your email and password.');
            return;
        }

        if (submitButton.innerText === 'Register In') {
            const userCredentials = { email, password };
            localStorage.setItem('login-data', JSON.stringify(userCredentials));
            localStorage.setItem('userEmail', email);
            localStorage.setItem('isLoggedIn', 'true');
            updateLoginUI(true, email);
            alert('Registration successful!');
        } else {
            const storedCredentials = JSON.parse(localStorage.getItem('login-data'));
            if (storedCredentials && storedCredentials.email === email && storedCredentials.password === password) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                updateLoginUI(true, email);
                alert('Logged in successfully!');
            } else {
                alert('Invalid credentials. Please try again.');
            }
        }
    });

    document.getElementById('logout-button').addEventListener('click', function () {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('userEmail');
        updateLoginUI(false);
        logoutOverlay.style.display = 'none';
        alert('You have logged out!');
    });

    showLoginButton.addEventListener('click', function () {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            logoutOverlay.style.display = 'flex';
            loginOverlay.style.display = 'none';
        }
    });

    function updateLoginUI(isLoggedIn, email = '') {
        if (isLoggedIn) {
            showLoginButton.innerText = email;
            loginOverlay.style.display = 'none';
            logoutOverlay.style.display = 'none';
        } else {
            showLoginButton.innerText = 'Sign In';
            loginOverlay.style.display = 'none';
            logoutOverlay.style.display = 'none';
        }
    }
});

// Day/Night theme
const changeTheme = document.querySelector('.theme-change'); 
const themeIcon = document.querySelector('.theme-icon'); 
const header = document.querySelector('header');
const body = document.body;
const imgs = document.querySelectorAll('img');

// Localstorage
const savedTheme = localStorage.getItem('theme');
applyTheme(savedTheme);

if (changeTheme) {
    changeTheme.addEventListener('click', () => {
        const newTheme = body.classList.contains('day-theme') ? 'night-theme' : 'day-theme';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function applyTheme(theme) {
    const whiteA = document.querySelectorAll('a.white');
    const blackA = document.querySelectorAll('a.black');

    if (theme === 'night-theme') {
        body.classList.add('night-theme');
        body.classList.remove('day-theme');
        header.style.backgroundColor = '#000';
        header.style.color = '#000';
        themeIcon.src = 'img/night.png';

        whiteA.forEach(a => a.classList.replace('white', 'black'));
        blackA.forEach(a => a.classList.replace('black', 'white'));

        imgs.forEach(image => image.style.filter = 'brightness(0.8)');
    } else {
        body.classList.add('day-theme');
        body.classList.remove('night-theme');
        header.style.backgroundColor = '#000';
        header.style.color = '#fff';
        themeIcon.src = 'img/daylight.png';

        whiteA.forEach(a => a.classList.replace('black', 'white'));
        blackA.forEach(a => a.classList.replace('white', 'black'));

        imgs.forEach(image => image.style.filter = 'brightness(1)');
    }
}

// Weather change
const refreshBtn = document.querySelector('.refresh-btn'); 
const weatherDisplay = document.querySelector('.weather-display'); 
const weatherIcon = document.querySelector('.weather-icon-img'); 

const apiKey = 'c1464f8567b6406f990202736241410';
const city = 'Astana';
const weatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
        fetch(weatherApiUrl)
            .then(response => response.json())
            .then(data => {
                const temperature = Math.round(data.current.temp_c);
                const weatherIconUrl = data.current.condition.icon;
                weatherDisplay.innerHTML = `${temperature}° <img class="weather-icon-img" src="${weatherIconUrl}" alt="weather-icon" style="width: 26px; height: 26px; vertical-align: text-bottom; padding-right: 30px;">`;
            })
            .catch(error => {
                console.error('Error fetching weather:', error);
                weatherDisplay.innerHTML = 'Error loading weather data';
            });
    });
}

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
        } else if (key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
            focusMenuItem(currentIndex);
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

// Dynamic Data
const data = {
    entertainment: "Entertainment",
    sport: "Sport",
    bussiness: "Business",
    health: "Health",
    techno: "Techno"
};
// Search
const titles = document.querySelectorAll('.section-title2');
titles.forEach((title) => {
    const type = title.getAttribute('data-type');
    if (data[type]) { 
        title.textContent = data[type];
    }
});

let isSearchOpened = false;
let hasSearched = false;

document.querySelector('.search-btn').addEventListener('click', () => { 
    const inputSearch = document.querySelector('.search-input'); 
    const searchHistoryDiv = document.querySelector('.searched-items'); 
    
    if (!isSearchOpened) {
        inputSearch.style.display = 'block';
        searchHistoryDiv.style.display = 'flex';
        isSearchOpened = true;
        hasSearched = false; 
    } else if (inputSearch.value.trim() && !hasSearched) {
        const searchValue = inputSearch.value.toLowerCase().trim();
        let found = false;

        titles.forEach((title) => {
            const type = title.getAttribute('data-type');
            if (type && data[type]) {
                title.innerHTML = data[type];
            }
        });

        titles.forEach((title) => {
            const type = title.getAttribute('data-type');
            if (!type || !data[type]) return;

            const titleText = data[type].toLowerCase();

            if (titleText.includes(searchValue)) {
                const highlightedText = data[type].replace(
                    new RegExp(searchValue, 'gi'), 
                    (match) => `<span class="highlight">${match}</span>`
                );
                title.innerHTML = highlightedText;

                if (!found) {
                    title.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                    found = true;
                }
            }
        });

        if (!found) {
            alert('No matches found.');
        } else {
            let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

            if (searchValue && !searchHistory.includes(searchValue)) {
                searchHistory.push(searchValue);
                localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
            }
            updateSearchHistory();
        }

        hasSearched = true; 
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        resetSearch();
    }
});

function resetSearch() {
    const inputSearch = document.querySelector('.search-input');
    inputSearch.value = '';
    hasSearched = false;
    isSearchOpened = false;
    
    titles.forEach((title) => {
        const type = title.getAttribute('data-type');
        if (type && data[type]) {
            title.innerHTML = data[type];
            title.classList.remove('hidden');
        }
    });
}

function updateSearchHistory() {
    const searchHistoryDiv = document.querySelector('.searched-items');
    searchHistoryDiv.innerHTML = ''; 

    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    searchHistory.forEach((search) => {
        const p = document.createElement('p');
        p.textContent = search;
        searchHistoryDiv.appendChild(p);
    });
}

document.addEventListener('DOMContentLoaded', updateSearchHistory);

//toggle menu
function toggleMenu() {
    document.querySelectorAll('#navMenu .a').forEach(link => {
        link.classList.toggle('hidden');
    });
}
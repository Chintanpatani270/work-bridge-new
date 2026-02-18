// --- Data Import (Global Scope for local file support) ---
const { categories, metroCities } = window.WorkBridgeData;

// --- State Management ---
const state = {
    userLocation: localStorage.getItem('userLocation') || 'Select Location',
    user: null, // { name: 'Chintan' } if logged in
    activeTab: 'overview',
    bookingDraft: {},
    activeCategoryTab: 'all' // 'all' or category group id
};

// --- DOM Elements ---
const app = document.getElementById('app');
const headerEl = document.getElementById('main-header');
const mainEl = document.getElementById('main-content');
const footerEl = document.getElementById('main-footer');
const modalContainer = document.getElementById('modal-container');
const toastContainer = document.getElementById('toast-container');

// --- Router ---
function router() {
    const hash = window.location.hash || '#home';
    const parts = hash.split('/');
    const route = parts[0];
    const param = parts[1];

    // Scroll to top on route change
    window.scrollTo(0, 0);

    renderHeader();
    renderFooter();

    if (route === '#home') {
        renderHome();
    } else if (route === '#category' && param) {
        renderCategoryDetail(param);
    } else if (route === '#profile') {
        renderProfile();
    } else if (route === '#worker-onboarding') {
        renderWorkerOnboarding();
    } else {
        renderHome();
    }
}

function renderWorkerOnboarding() {
    mainEl.innerHTML = `
        <div class="worker-page animate-fade-in">
            <!-- 1. Hero Section -->
            <section class="worker-hero" style="position: relative; padding: 6rem 1.5rem 4rem; text-align: center; background: linear-gradient(135deg, #003366 0%, #001f3f 100%); color: white; border-bottom-left-radius: 30px; border-bottom-right-radius: 30px; overflow: hidden;">
                <div class="container">
                    <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 1rem; display: inline-block;">🚀 JOIN 50,000+ WORKERS</span>
                    <h1 style="font-size: 2.8rem; line-height: 1.2; margin-bottom: 1rem;">Find Daily Work <br><span style="color: var(--accent);">Without Middlemen</span></h1>
                    <p style="font-size: 1.1rem; opacity: 0.9; margin-bottom: 2rem; max-width: 500px; margin-left: auto; margin-right: auto;">Get verified jobs near you. Fast payouts directly to your bank. Flexible schedule.</p>
                    
                    <div class="flex" style="justify-content: center; gap: 1rem; flex-wrap: wrap;">
                        <button onclick="scrollToElement('worker-registration-form')" class="btn btn-primary" style="background: var(--accent); padding: 1rem 2rem; font-size: 1.1rem; box-shadow: 0 4px 15px rgba(0,163,255,0.4);">Join as Worker</button>
                        <button onclick="scrollToElement('how-it-works')" class="btn btn-outline" style="color: white; border-color: rgba(255,255,255,0.3);">See How It Works</button>
                    </div>
                </div>
                <!-- Deco circles -->
                <div style="position: absolute; top: -50px; left: -50px; width: 200px; height: 200px; border-radius: 50%; background: white; opacity: 0.05;"></div>
            </section>

            <!-- 2. Benefits -->
            <section class="container" style="margin-top: -3rem; position: relative; z-index: 10;">
                <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem;">
                    <div class="benefit-card">
                        <div class="icon">📅</div>
                        <h4>Daily Opportunities</h4>
                        <p>Get job alerts every morning based on your location.</p>
                    </div>
                    <div class="benefit-card">
                        <div class="icon">💸</div>
                        <h4>Fast Payments</h4>
                        <p>Money sent to your bank/UPI within 24 hours of job completion.</p>
                    </div>
                    <div class="benefit-card">
                        <div class="icon">⭐</div>
                        <h4>Build Reputation</h4>
                        <p>Get 5-star ratings and earn bonuses for good work.</p>
                    </div>
                     <div class="benefit-card">
                        <div class="icon">🚫</div>
                        <h4>No Commission</h4>
                        <p>We charge a small platform fee, no hidden cuts from your pay.</p>
                    </div>
                </div>
            </section>

            <!-- 3. How It Works -->
            <section id="how-it-works" class="container" style="padding: 4rem 1.5rem;">
                <h2 style="text-align: center; margin-bottom: 3rem;">Simple 4-Step Process</h2>
                <div class="steps-container">
                    <div class="step">
                        <div class="step-num">1</div>
                        <h4>Register</h4>
                        <p>Fill form & upload ID</p>
                    </div>
                    <div class="step-line"></div>
                    <div class="step">
                        <div class="step-num">2</div>
                        <h4>Verify</h4>
                        <p>We check your details</p>
                    </div>
                     <div class="step-line"></div>
                    <div class="step">
                        <div class="step-num">3</div>
                        <h4>Get Jobs</h4>
                        <p>Receive alerts on app</p>
                    </div>
                     <div class="step-line"></div>
                    <div class="step">
                        <div class="step-num">4</div>
                        <h4>Earn</h4>
                        <p>Complete & get paid</p>
                    </div>
                </div>
            </section>

            <!-- 6. Earnings Illustration -->
             <section style="background: #EBF8FF; padding: 4rem 1.5rem;">
                <div class="container flex" style="flex-wrap: wrap; justify-content: center; gap: 3rem;">
                    <div style="flex: 1; min-width: 300px;">
                        <h2 style="margin-bottom: 1rem;">Potential Earnings</h2>
                        <ul style="list-style: none; display: grid; gap: 1rem;">
                            <li class="flex"><span style="color: var(--success); font-weight: bold;">✔</span> Average Job Pay: ₹500 - ₹1200</li>
                            <li class="flex"><span style="color: var(--success); font-weight: bold;">✔</span> Full-time (25 days): ₹25,000+</li>
                            <li class="flex"><span style="color: var(--success); font-weight: bold;">✔</span> Part-time (Weekends): ₹8,000+</li>
                        </ul>
                    </div>
                    <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: var(--shadow-md); text-align: center; min-width: 280px;">
                        <h3 style="color: var(--text-light); font-size: 1rem;">Monthly Potential</h3>
                        <div style="font-size: 3rem; font-weight: 800; color: var(--primary); margin: 0.5rem 0;">₹24,000</div>
                        <p style="font-size: 0.9rem; color: var(--text-light);">Based on 2 jobs/day @ ₹400 avg</p>
                    </div>
                </div>
            </section>

            <!-- 4. Registration Form (Multi-Step) -->
            <section id="worker-registration-form" class="container" style="padding: 4rem 1.5rem; max-width: 600px;">
                <div style="background: white; padding: 2rem; border-radius: 16px; box-shadow: var(--shadow-lg); border: 1px solid #e2e8f0;">
                    <h2 style="text-align: center; margin-bottom: 1.5rem;">Start Your Application</h2>
                    
                    <!-- Progress Bar -->
                    <div class="progress-container" style="margin-bottom: 2rem;">
                        <div class="progress-bar-bg"><div class="progress-bar-fill" id="reg-progress" style="width: 33%;"></div></div>
                        <div class="flex" style="justify-content: space-between; font-size: 0.8rem; color: var(--text-light); margin-top: 0.5rem;">
                            <span>Basic</span>
                            <span>Work</span>
                            <span>Verification</span>
                        </div>
                    </div>

                    <form id="worker-form">
                        <!-- Step 1: Basic Details -->
                        <div class="form-step active" id="step-1">
                            <h4 style="margin-bottom: 1.5rem;">Let's get to know you</h4>
                            <div class="form-group">
                                <label>Full Name</label>
                                <input type="text" id="w-name" class="form-input" placeholder="e.g. Rahul Kumar">
                            </div>
                            <div class="form-group">
                                <label>Mobile Number</label>
                                <div class="flex">
                                    <span style="padding: 0.75rem; background: #eee; border-radius: 8px 0 0 8px; border: 1px solid #ddd; border-right: none;">+91</span>
                                    <input type="tel" id="w-phone" class="form-input" style="border-radius: 0 8px 8px 0;" placeholder="Enter 10-digit number">
                                </div>
                            </div>
                            <div class="form-group">
                                <label>City / Area</label>
                                <select id="w-city" class="form-input">
                                    <option value="">Select City</option>
                                    ${metroCities.map(c => `<option>${c.name}</option>`).join('')}
                                </select>
                            </div>
                            <button type="button" class="btn btn-primary" style="width: 100%; margin-top: 1rem;" onclick="nextWorkerStep(2)">Next: Work Details →</button>
                        </div>

                        <!-- Step 2: Work Details -->
                        <div class="form-step" id="step-2" style="display: none;">
                            <h4 style="margin-bottom: 1.5rem;">Your Expertise</h4>
                            <div class="form-group">
                                <label>Primary Category</label>
                                <select id="w-category" class="form-input">
                                    ${categories.flatMap(g => g.items).map(i => `<option value="${i.name}">${i.name}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Years of Experience</label>
                                <div class="flex" style="gap: 0.5rem; flex-wrap: wrap;">
                                    <label class="radio-card"><input type="radio" name="exp" value="0-1"> 0-1 Yrs</label>
                                    <label class="radio-card"><input type="radio" name="exp" value="2-5"> 2-5 Yrs</label>
                                    <label class="radio-card"><input type="radio" name="exp" value="5+"> 5+ Yrs</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Availability</label>
                                <div class="flex" style="gap: 1rem;">
                                    <label class="checkbox-label"><input type="checkbox" checked> Full Time</label>
                                    <label class="checkbox-label"><input type="checkbox"> Weekends</label>
                                </div>
                            </div>
                            <div class="flex" style="gap: 1rem; margin-top: 2rem;">
                                <button type="button" class="btn btn-outline" style="flex: 1;" onclick="nextWorkerStep(1)">← Back</button>
                                <button type="button" class="btn btn-primary" style="flex: 1;" onclick="nextWorkerStep(3)">Next: Verify →</button>
                            </div>
                        </div>

                         <!-- Step 3: Identity Verification -->
                        <div class="form-step" id="step-3" style="display: none;">
                            <h4 style="margin-bottom: 1.5rem;">Verify Your Identity</h4>
                            
                            <div class="form-group">
                                <label>Select ID Type</label>
                                <select class="form-input">
                                    <option>Aadhaar Card</option>
                                    <option>Voter ID</option>
                                    <option>Driving License</option>
                                </select>
                            </div>
                             <div class="form-group">
                                <label>ID Number</label>
                                <input type="text" class="form-input" placeholder="e.g. 1234 5678 9012">
                            </div>
                            
                            <div class="form-group">
                                <label>Upload ID Photo</label>
                                <div style="border: 2px dashed #ddd; padding: 2rem; text-align: center; border-radius: 8px; cursor: pointer; color: var(--text-light);" onclick="alert('File upload simulation')">
                                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">📷</div>
                                    <span style="font-size: 0.9rem;">Tap to take a photo or upload</span>
                                </div>
                            </div>

                            <div style="background: #EBF8FF; padding: 1rem; border-radius: 8px; border: 1px solid #BEE3F8; margin-bottom: 1.5rem; font-size: 0.9rem; color: #2C5282;">
                                🛡️ <strong>No Joining Fee!</strong> Verification is required only to build trust with customers.
                            </div>

                             <div class="flex" style="gap: 1rem; margin-top: 2rem;">
                                <button type="button" class="btn btn-outline" style="flex: 1;" onclick="nextWorkerStep(2)">← Back</button>
                                <button type="button" class="btn btn-primary" style="flex: 1;" onclick="submitWorkerFormFinal()">Complete Registration</button>
                            </div>
                        </div>

                    </form>
                </div>
            </section>

            <!-- 5. Trust / FAQ -->
            <section class="container" style="padding: 2rem 1.5rem 6rem; text-align: center;">
                 <h2 style="margin-bottom: 2rem;">Common Questions</h2>
                 <div style="max-width: 600px; margin: 0 auto; text-align: left;">
                    <details style="background: white; padding: 1rem; border-radius: 8px; margin-bottom: 0.5rem; border: 1px solid #eee;">
                        <summary style="font-weight: 600; cursor: pointer;">Is there a joining fee?</summary>
                        <p style="margin-top: 0.5rem; color: var(--text-light);">No, joining WorkBridge is 100% free. We only take a small fee when you complete a job.</p>
                    </details>
                     <details style="background: white; padding: 1rem; border-radius: 8px; margin-bottom: 0.5rem; border: 1px solid #eee;">
                        <summary style="font-weight: 600; cursor: pointer;">Do I need a smartphone?</summary>
                        <p style="margin-top: 0.5rem; color: var(--text-light);">Yes, to receive job alerts. But our app is very simple to use.</p>
                    </details>
                 </div>
                 <div style="margin-top: 3rem; background: #fff; display: inline-block; padding: 1rem 2rem; border-radius: 50px; border: 1px solid #eee;">
                    NEED HELP? CALL HELPLINE: <a href="tel:1800-123-4567" style="color: var(--primary); font-weight: 700;">1800-123-4567</a>
                 </div>
            </section>
        </div>
    `;
}

// --- Worker Form Logic ---
window.nextWorkerStep = function (step) {
    document.querySelectorAll('.form-step').forEach(el => el.style.display = 'none');
    document.getElementById(`step-${step}`).style.display = 'block';

    // Update Progress
    const progress = step === 1 ? '33%' : step === 2 ? '66%' : '100%';
    document.getElementById('reg-progress').style.width = progress;

    // Scroll to form top
    document.getElementById('worker-registration-form').scrollIntoView({ behavior: 'smooth' });
}

window.submitWorkerFormFinal = function () {
    showToast('🎉 Registration Successful! Download the app to start.');
    // In real app, redirect or show success state
    setTimeout(() => {
        window.location.hash = '#home';
    }, 2000);
}

window.scrollToElement = function (id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// --- Components ---

function renderProfile() {
    if (!state.user) {
        window.location.hash = '#home';
        window.loginDemo();
        return;
    }

    mainEl.innerHTML = `
        <div class="container" style="padding-top: 100px; padding-bottom: 2rem;">
            <div class="flex" style="align-items: center; gap: 1.5rem; margin-bottom: 2rem;">
                <div style="width: 80px; height: 80px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem;">
                    👤
                </div>
                <div>
                    <h1 style="margin-bottom: 0.25rem;">${state.user.name}</h1>
                    <p style="color: var(--text-light);">+91 98765 43210</p>
                </div>
            </div>

            <div class="grid" style="grid-template-columns: 250px 1fr; gap: 2rem;">
                <aside>
                    <div style="background: white; border-radius: 12px; border: 1px solid #eee; overflow: hidden;">
                        <button class="btn" style="width: 100%; text-align: left; padding: 1rem; border-bottom: 1px solid #eee; background: var(--bg-light); font-weight: 600;">My Bookings</button>
                        <button class="btn" style="width: 100%; text-align: left; padding: 1rem; border-bottom: 1px solid #eee;">Saved Addresses</button>
                        <button class="btn" style="width: 100%; text-align: left; padding: 1rem; border-bottom: 1px solid #eee;">Payment Methods</button>
                        <button class="btn" style="width: 100%; text-align: left; padding: 1rem; color: var(--warning);" onclick="state.user = null; renderHeader(); window.location.hash='#home'; showToast('Logged Out');">Logout</button>
                    </div>
                </aside>

                <div>
                    <h2 style="margin-bottom: 1.5rem;">Active Bookings</h2>
                    
                    <!-- Mock Booking -->
                    <div style="background: white; border: 1px solid #eee; border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem;">
                        <div class="flex" style="justify-content: space-between; margin-bottom: 1rem;">
                            <div>
                                <h4 style="margin-bottom: 0.25rem;">Deep Home Cleaning</h4>
                                <p style="font-size: 0.9rem; color: var(--text-light);">Today, 02:00 PM</p>
                            </div>
                            <span style="background: #E6FFFA; color: var(--success); padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700;">CONFIRMED</span>
                        </div>
                        <div class="flex" style="gap: 1rem; border-top: 1px solid #eee; padding-top: 1rem;">
                            <button class="btn btn-outline" style="font-size: 0.9rem;">Track Professional</button>
                            <button class="btn btn-outline" style="font-size: 0.9rem;">Reschedule</button>
                        </div>
                    </div>

                    <div style="background: white; border: 1px solid #eee; border-radius: 12px; padding: 1.5rem; opacity: 0.7;">
                        <div class="flex" style="justify-content: space-between; margin-bottom: 1rem;">
                            <div>
                                <h4 style="margin-bottom: 0.25rem;">AC Service</h4>
                                <p style="font-size: 0.9rem; color: var(--text-light);">Last Week</p>
                            </div>
                            <span style="background: #eee; color: var(--text-light); padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700;">COMPLETED</span>
                        </div>
                         <div class="flex" style="gap: 1rem; border-top: 1px solid #eee; padding-top: 1rem;">
                            <button class="btn btn-outline" style="font-size: 0.9rem;">Book Again</button>
                            <button class="btn btn-outline" style="font-size: 0.9rem;">Download Invoice</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `;
}

function renderHeader() {
    headerEl.innerHTML = `
        <div class="container nav-content" style="gap: 1rem; justify-content: space-between;">
            <!-- Left Group: Logo + Categories -->
            <div style="display: flex; align-items: center; gap: 2rem;">
                <a href="#home" class="logo" style="flex-shrink: 0;">Work<span>Bridge</span></a>
                
                <div class="dropdown" style="position: relative;">
                    <button class="btn" id="mega-menu-trigger" style="padding: 0.5rem 1rem; background: transparent; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                        Categories ▾
                    </button>
                    <div class="mega-menu" id="mega-menu">
                        <div class="container grid" style="grid-template-columns: repeat(2, 1fr); gap: 2rem;">
                            ${categories.map(cat => `
                                <div>
                                    <h5 style="color: var(--primary); margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">${cat.title}</h5>
                                    <ul style="list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                                        ${cat.items.map(item => `
                                            <li style="margin-bottom: 0.25rem;">
                                                <a href="#category/${item.id}" class="mega-link" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; border-radius: 8px; transition: background 0.2s;">
                                                    <span style="font-size: 1.2rem;">${item.icon}</span>
                                                    <span style="font-size: 0.9rem; color: var(--text-dark); font-weight: 500;">${item.name}</span>
                                                </a>
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Nav -->
            <div class="desktop-nav" style="display: flex; gap: 1rem; align-items: center; flex-shrink: 0;">
                <a href="#worker-onboarding" class="btn btn-worker" style="border-radius: 20px; padding: 0.5rem 1.2rem; font-size: 0.9rem;">💼 Join as Pro</a>
                <button class="btn btn-outline" id="location-btn">📍 ${state.userLocation}</button>
                ${state.user ? `
                    <a href="#profile" class="btn btn-primary">👤 ${state.user.name}</a>
                ` : `
                    <button class="btn btn-primary" onclick="loginDemo()">Login / Sign Up</button>
                `}
            </div>
        </div>
    `;

    // Event Listeners for Header
    document.getElementById('location-btn').addEventListener('click', openLocationModal);

    // Improved Mega Menu Logic
    const dropdown = document.querySelector('.dropdown'); // Parent container
    if (dropdown) {
        dropdown.addEventListener('mouseenter', () => {
            const menu = document.getElementById('mega-menu');
            if (menu) menu.classList.add('active');
        });
        dropdown.addEventListener('mouseleave', () => {
            const menu = document.getElementById('mega-menu');
            if (menu) menu.classList.remove('active');
        });
    }
}

// ... renderHome, renderCategoryDetail ...

// --- Interactive Functions ---

window.loginDemo = function () {
    state.user = { name: 'Chintan' };
    renderHeader();
    showToast('Logged in as Chintan');
}

window.filterHomeCategories = function (tabId) {
    state.activeCategoryTab = tabId;
    renderHome();
};

window.openWorkerModal = function () {
    // Step 1: Easy Selection
    modalContainer.innerHTML = `
        < div class="modal-backdrop active" id = "worker-modal-backdrop" >
            <div class="modal-content animate-fade-in" style="max-width: 600px; padding: 0;">
                <div style="background: var(--primary); color: white; padding: 2rem; border-radius: 12px 12px 0 0; text-align: center;">
                    <h2 style="margin-bottom: 0.5rem;">Join WorkBridge</h2>
                    <p style="opacity: 0.9;">Earn money on your own schedule. What do you do?</p>
                </div>

                <div style="padding: 2rem;">
                    <div class="grid" style="grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem;">
                        <button onclick="showWorkerForm('Cleaning')" style="padding: 1rem; border: 1px solid #eee; border-radius: 12px; background: white; text-align: center; cursor: pointer; transition: all 0.2s;">
                            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🧹</div>
                            <div style="font-weight: 600;">Cleaning</div>
                        </button>
                        <button onclick="showWorkerForm('Driving')" style="padding: 1rem; border: 1px solid #eee; border-radius: 12px; background: white; text-align: center; cursor: pointer; transition: all 0.2s;">
                            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🚗</div>
                            <div style="font-weight: 600;">Driving</div>
                        </button>
                        <button onclick="showWorkerForm('Plumbing')" style="padding: 1rem; border: 1px solid #eee; border-radius: 12px; background: white; text-align: center; cursor: pointer; transition: all 0.2s;">
                            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🚰</div>
                            <div style="font-weight: 600;">Plumbing</div>
                        </button>
                        <button onclick="showWorkerForm('Cooking')" style="padding: 1rem; border: 1px solid #eee; border-radius: 12px; background: white; text-align: center; cursor: pointer; transition: all 0.2s;">
                            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🍳</div>
                            <div style="font-weight: 600;">Cooking</div>
                        </button>
                        <button onclick="showWorkerForm('Security')" style="padding: 1rem; border: 1px solid #eee; border-radius: 12px; background: white; text-align: center; cursor: pointer; transition: all 0.2s;">
                            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🛡️</div>
                            <div style="font-weight: 600;">Security</div>
                        </button>
                        <button onclick="showWorkerForm('Other')" style="padding: 1rem; border: 1px solid #eee; border-radius: 12px; background: white; text-align: center; cursor: pointer; transition: all 0.2s;">
                            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">➕</div>
                            <div style="font-weight: 600;">Other</div>
                        </button>
                    </div>

                    <div style="text-align: center; padding-top: 1rem; border-top: 1px solid #eee;">
                        <p style="color: var(--text-light); margin-bottom: 0.5rem;">Need help joining?</p>
                        <a href="tel:+919876543210" style="color: var(--primary); font-weight: 700; font-size: 1.1rem; text-decoration: none;">📞 Call Support: +91 98765 43210</a>
                    </div>
                </div>
                <button onclick="closeModal()" style="position: absolute; top: 1rem; right: 1rem; background: rgba(255,255,255,0.2); border: none; color: white; font-size: 1.5rem; width: 40px; height: 40px; border-radius: 50%; cursor: pointer;">×</button>
            </div>
        </div >
        `;

    document.getElementById('worker-modal-backdrop').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal();
    });
};

window.showWorkerForm = function (category) {
    modalContainer.innerHTML = `
        < div class="modal-backdrop active" id = "worker-form-backdrop" >
            <div class="modal-content animate-fade-in" style="max-width: 500px; padding: 2rem;">
                <button onclick="openWorkerModal()" style="border: none; background: none; font-size: 1rem; color: var(--text-light); margin-bottom: 1rem;">← Back</button>

                <h2 style="margin-bottom: 0.5rem;">Applying for: <span style="color: var(--primary);">${category}</span></h2>
                <p style="margin-bottom: 2rem; color: var(--text-light);">Just a few details to get started.</p>

                <form onsubmit="submitWorkerApplication(event)">
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem;">Your Name</label>
                        <input type="text" required placeholder="Enter your full name" style="width: 100%; padding: 1rem; border: 1px solid #eee; border-radius: 12px; font-size: 1rem;">
                    </div>
                    <div style="margin-bottom: 2rem;">
                        <label style="display: block; font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem;">Mobile Number</label>
                        <input type="tel" required placeholder="10-digit number" style="width: 100%; padding: 1rem; border: 1px solid #eee; border-radius: 12px; font-size: 1rem;">
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 1rem; font-size: 1.1rem; border-radius: 12px;">✅ Submit Application</button>
                </form>
            </div>
        </div >
        `;
};

function renderHome() {
    // Flatten categories for the grid or Filter
    let displayItems = [];
    if (state.activeCategoryTab === 'all') {
        displayItems = categories.flatMap(group => group.items);
    } else {
        const foundGroup = categories.find(g => g.id === state.activeCategoryTab);
        displayItems = foundGroup ? foundGroup.items : [];
    }

    mainEl.innerHTML = `
        <section class="hero-section">
            <div class="container animate-fade-in">
                <h1 style="font-size: 3.5rem; margin-bottom: 1.5rem; letter-spacing: -1px;">
                    Expert Services, <br><span style="color: var(--accent);">On Demand.</span>
                </h1>
                <p style="font-size: 1.2rem; color: var(--text-light); margin-bottom: 2rem;">
                    Instant access to 50,000+ verified professionals in your city.
                </p>
                <div class="hero-search">
                    <input type="text" id="hero-search-input" placeholder="What do you need help with? (e.g. AC Repair, Cleaning...)">
                        <button class="btn btn-primary">Search</button>
                </div>
                <div class="flex" style="justify-content: center; gap: 1.5rem; margin-top: 2rem; color: var(--text-light); font-size: 0.9rem;">
                    <span>⚡ 10-min response</span>
                    <span>🛡️ Insurance covered</span>
                    <span>✅ Background checked</span>
                </div>
            </div>
        </section>

        <section class="container" style="margin-bottom: 2rem; min-height: 600px;">
            <div class="flex" style="justify-content: space-between; margin-bottom: 2rem; align-items: center;">
                <h2>Explore Categories</h2>
            </div>

            <!-- Category Filter Tabs -->
            <div class="category-tabs">
                <button class="category-tab-btn ${state.activeCategoryTab === 'all' ? 'active' : ''}" onclick="filterHomeCategories('all')">All</button>
                ${categories.map(cat => `
                    <button class="category-tab-btn ${state.activeCategoryTab === cat.id ? 'active' : ''}" onclick="filterHomeCategories('${cat.id}')">${cat.title}</button>
                `).join('')}
            </div>

            <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.5rem;">
                ${displayItems.map(item => `
                    <a href="#category/${item.id}" class="category-card animate-fade-in">
                        <div class="category-icon">${item.icon}</div>
                        <div class="category-content" style="padding: 0;">
                            <h4>${item.name}</h4>
                            <p style="font-size: 0.85rem; color: var(--text-light); margin-top: 0.25rem; margin-bottom: 1rem;">${item.description.substring(0, 50)}...</p>
                            <div class="flex" style="justify-content: center; width: 100%; font-size: 0.85rem; font-weight: 600; color: var(--primary);">
                                <span>Starting ${item.price}</span>
                            </div>
                        </div>
                    </a>
                `).join('')}
            </div>
        </section>

        <!--B2B Banner-- >
        <section class="container" style="margin-top: 4rem;">
            <div style="background: var(--primary-dark); color: white; border-radius: 20px; padding: 4rem; text-align: center; position: relative; overflow: hidden;">
                <h2 style="position: relative; z-index: 2; margin-bottom: 1rem;">WorkBridge for Enterprise</h2>
                <p style="position: relative; z-index: 2; margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto; opacity: 0.9;">
                    Staff your warehouse, office, or construction site with verified bulk labor. Managed payroll and compliance included.
                </p>
                <button class="btn btn-primary" style="background: var(--accent); position: relative; z-index: 2;" onclick="showToast('Sales team will contact you!')">Get a Corporate Quote</button>

                <!-- Deco circles -->
                <div style="position: absolute; top: -50px; left: -50px; width: 200px; height: 200px; border-radius: 50%; background: white; opacity: 0.05;"></div>
                <div style="position: absolute; bottom: -50px; right: -50px; width: 300px; height: 300px; border-radius: 50%; background: var(--accent); opacity: 0.1;"></div>
            </div>
        </section>
    `;
}

function renderCategoryDetail(catId) {
    // Find category
    let item = null;
    categories.forEach(group => {
        const found = group.items.find(i => i.id === catId);
        if (found) item = found;
    });

    if (!item) {
        mainEl.innerHTML = `<div class="container" style="padding: 4rem; text-align: center;"><h2>Category Not Found</h2><a href="#home" class="btn btn-primary">Go Home</a></div>`;
        return;
    }

    // Default to overview if no tab logic in URL yet, or simple state switch
    // For this level, we can just render the layout which includes tabs

    mainEl.innerHTML = `
        <div style="background: white; padding-top: 100px; padding-bottom: 2rem; border-bottom: 1px solid #eee;">
            <div class="container">
                <div class="flex" style="align-items: flex-start; gap: 2rem;">
                    <div style="width: 80px; height: 80px; font-size: 3rem; background: var(--bg-light); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                        ${item.icon}
                    </div>
                    <div>
                        <span style="background: #EBF8FF; color: var(--accent); padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700;">VERIFIED PROS</span>
                        <h1 style="margin: 0.5rem 0;">${item.name}</h1>
                        <p style="color: var(--text-light); max-width: 600px;">${item.description} Trusted by 10k+ customers in ${state.userLocation}.</p>
                    </div>
                    <div style="margin-left: auto; text-align: right;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">${item.price}</div>
                        <div style="font-size: 0.9rem; color: var(--text-light);">Starting Price</div>
                    </div>
                </div>
            </div>
        </div >

        <div class="container" style="margin-top: 2rem; display: grid; grid-template-columns: 2fr 1fr; gap: 3rem;">
            <!-- Left Content -->
            <div>
                <div class="tabs-nav">
                    <button class="tab-btn active" onclick="switchTab(event, 'services')">Services</button>
                    <button class="tab-btn" onclick="switchTab(event, 'reviews')">Reviews (4.8)</button>
                    <button class="tab-btn" onclick="switchTab(event, 'faq')">FAQs</button>
                </div>

                <div id="tab-content">
                    <!-- Default: Services -->
                    <div class="animate-fade-in">
                        <h3 style="margin-bottom: 1.5rem;">Select a Service</h3>
                        ${item.tasks.map(task => `
                            <div class="service-item">
                                <div>
                                    <h4 style="margin-bottom: 0.25rem;">${task}</h4>
                                    <p style="font-size: 0.85rem; color: var(--text-light);">Includes consultation and standard execution.</p>
                                </div>
                                <button class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.85rem;" onclick="openBookingModal('${task}', '${item.price}')">Add</button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- Right Sidebar -->
            <aside>
                <div style="background: white; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; position: sticky; top: 100px;">
                    <h3 style="margin-bottom: 1rem;">WorkBridge Guarantee</h3>
                    <ul style="list-style: none; display: grid; gap: 0.75rem; color: var(--text-light); font-size: 0.9rem; margin-bottom: 1.5rem;">
                        <li class="flex"><span style="color: var(--success);">✔</span> 100% Secure Payments</li>
                        <li class="flex"><span style="color: var(--success);">✔</span> Background Verified Pros</li>
                        <li class="flex"><span style="color: var(--success);">✔</span> Insurance up to ₹10k</li>
                    </ul>
                    <button class="btn btn-primary" style="width: 100%;" onclick="openBookingModal('${item.name} Consultation', '${item.price}')">Book Consultation</button>
                </div>
            </aside>
        </div>
    `;
}

function renderFooter() {
    footerEl.innerHTML = `
        <div class="container footer-cols">
            <div>
                <a href="#" class="logo" style="margin-bottom: 1rem; display: block;">Work<span>Bridge</span></a>
                <p style="font-size: 0.9rem; color: var(--text-light);">Building the future of the gig economy with fair wages and premium service.</p>
            </div>
            <div>
                 <h4>Categories</h4>
                 <ul style="list-style: none; margin-top: 1rem; display: grid; gap: 0.5rem; color: var(--text-light); font-size: 0.9rem;">
                    <li><a href="#">Home Cleaning</a></li>
                    <li><a href="#">Plumbing</a></li>
                    <li><a href="#">Beauty & Spa</a></li>
                 </ul>
            </div>
             <div>
                 <h4>Company</h4>
                 <ul style="list-style: none; margin-top: 1rem; display: grid; gap: 0.5rem; color: var(--text-light); font-size: 0.9rem;">
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Careers</a></li>
                    <li><a href="#">Contact</a></li>
                 </ul>
            </div>
        </div >
        <div class="container" style="border-top: 1px solid #eee; padding-top: 1.5rem; text-align: center; color: var(--text-light); font-size: 0.85rem;">
            &copy; 2026 WorkBridge Technologies. All rights reserved.
        </div>
    `;
}

// --- Interactive Functions ---

window.switchTab = function (e, tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');

    const contentDiv = document.getElementById('tab-content');
    if (tabName === 'services') {
        // We need to re-render services. Since we don't have the data in this scope easily without re-fetching, 
        // in a real app we'd use state. For now, we reload the view or hide/show divs.
        // Simplified: Just showing an alert for the other tabs
    } else if (tabName === 'reviews') {
        contentDiv.innerHTML = `
        <div class="animate-fade-in">
                <div class="flex" style="margin-bottom: 2rem; background: var(--bg-light); padding: 1.5rem; border-radius: 8px;">
                    <div style="text-align: center; padding-right: 2rem; border-right: 1px solid #ddd;">
                        <h2 style="font-size: 2.5rem; color: var(--primary);">4.8</h2>
                        <div style="color: var(--warning);">⭐⭐⭐⭐⭐</div>
                        <span style="font-size: 0.8rem; color: var(--text-light);">12,450 Reviews</span>
                    </div>
                    <div style="flex-grow: 1; padding-left: 1rem;">
                        <!-- Bars mock -->
                        <div class="flex" style="font-size: 0.8rem; margin-bottom: 0.25rem;"><span style="width: 30px;">5★</span> <div style="height: 6px; width: 80%; background: var(--success); border-radius: 4px;"></div></div>
                        <div class="flex" style="font-size: 0.8rem; margin-bottom: 0.25rem;"><span style="width: 30px;">4★</span> <div style="height: 6px; width: 15%; background: var(--warning); border-radius: 4px;"></div></div>
                    </div>
                </div>
                <!--Comments -->
        <div style="display: grid; gap: 1rem;">
            <div style="background: white; padding: 1rem; border: 1px solid #eee; border-radius: 8px;">
                <div class="flex" style="margin-bottom: 0.5rem;">
                    <strong>Anjali P.</strong> <span style="color: var(--text-light); font-size: 0.8rem; margin-left: auto;">2 days ago</span>
                </div>
                <p style="font-size: 0.9rem;">Great service! The professional arrived on time and was very polite.</p>
            </div>
            <div style="background: white; padding: 1rem; border: 1px solid #eee; border-radius: 8px;">
                <div class="flex" style="margin-bottom: 0.5rem;">
                    <strong>Rahul K.</strong> <span style="color: var(--text-light); font-size: 0.8rem; margin-left: auto;">1 week ago</span>
                </div>
                <p style="font-size: 0.9rem;">Job done well, but he was 10 mins late. Otherwise good.</p>
            </div>
        </div>
            </div >
        `;
    } else if (tabName === 'faq') {
        contentDiv.innerHTML = `
        <div class="animate-fade-in">
                <details style="padding: 1rem; border: 1px solid #eee; border-radius: 8px; margin-bottom: 0.5rem;">
                    <summary style="font-weight: 600; cursor: pointer;">Is the pricing final?</summary>
                    <p style="margin-top: 1rem; color: var(--text-light);">Yes, the prices listed are standard base rates. Extra charges apply only for parts.</p>
                </details>
                <details style="padding: 1rem; border: 1px solid #eee; border-radius: 8px; margin-bottom: 0.5rem;">
                    <summary style="font-weight: 600; cursor: pointer;">What if I damage something?</summary>
                    <p style="margin-top: 1rem; color: var(--text-light);">All our services are insured up to ₹10,000 against accidental damages.</p>
                </details>
            </div >
        `;
    }
    // Re-render Service was tricky without data, but since we default to it, we can just handle the other two. 
    // If user clicks back to Services, we'd strictly need to re-render the category to get the data back or store it in state. 
    // For this prototype, clicking "Services" reload the route:
    if (tabName === 'services') router();
};

window.openLocationModal = function () {
    modalContainer.innerHTML = `
        <div class="modal-backdrop active" id="loc-modal-backdrop">
            <div class="modal-content animate-fade-in">
                <div class="flex" style="justify-content: space-between; margin-bottom: 1.5rem;">
                    <h3>Select City</h3>
                    <button onclick="closeModal()" style="border: none; background: none; font-size: 1.5rem;">×</button>
                </div>
                <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                    ${metroCities.map(city => `
                        <button class="btn btn-outline" style="text-align: left; justify-content: flex-start;" onclick="setLocation('${city.name}')">
                            ${city.name}
                        </button>
                    `).join('')}
                </div>
            </div>
        </div >
        `;

    // Close on backdrop click
    document.getElementById('loc-modal-backdrop').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal();
    });
};

window.setLocation = function (city) {
    state.userLocation = city;
    localStorage.setItem('userLocation', city);
    renderHeader(); // Re-render header to update button
    closeModal();
    showToast(`Location set to ${city} `);
    // Optional: Refresh home to show content relevant to city?
    if (window.location.hash === '' || window.location.hash === '#home') renderHome();
};

window.openBookingModal = function (serviceName, price) {
    if (!state.user) {
        // Force login
        window.loginDemo();
        return;
    }

    modalContainer.innerHTML = `
        <div class="modal-backdrop active" id="book-modal-backdrop">
            <div class="modal-content animate-fade-in" style="max-width: 600px;">
                <div class="flex" style="justify-content: space-between; margin-bottom: 1.5rem;">
                    <div>
                        <h3>Complete Booking</h3>
                        <p style="color: var(--text-light); font-size: 0.9rem;">${serviceName}</p>
                    </div>
                    <button onclick="closeModal()" style="border: none; background: none; font-size: 1.5rem;">×</button>
                </div>

                <form onsubmit="confirmBooking(event)">
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem;">Service Address</label>
                        <input type="text" value="${state.userLocation}, Sector 4" style="width: 100%; padding: 0.8rem; border: 1px solid #eee; border-radius: 8px;">
                    </div>

                    <div class="grid" style="grid-template-columns: 1fr 1fr; margin-bottom: 1.5rem;">
                        <div>
                            <label style="display: block; font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem;">Date</label>
                            <input type="date" required style="width: 100%; padding: 0.8rem; border: 1px solid #eee; border-radius: 8px;">
                        </div>
                        <div>
                            <label style="display: block; font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem;">Time</label>
                            <select style="width: 100%; padding: 0.8rem; border: 1px solid #eee; border-radius: 8px;">
                                <option>10:00 AM</option>
                                <option>02:00 PM</option>
                                <option>06:00 PM</option>
                            </select>
                        </div>
                    </div>

                    <div style="background: var(--bg-light); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                        <div class="flex" style="justify-content: space-between; margin-bottom: 0.5rem;">
                            <span>Base Price</span>
                            <strong>${price}</strong>
                        </div>
                        <div class="flex" style="justify-content: space-between; margin-bottom: 0.5rem;">
                            <span>Convenience Fee</span>
                            <strong>₹49</strong>
                        </div>
                        <div class="flex" style="justify-content: space-between; border-top: 1px solid #ddd; padding-top: 0.5rem; margin-top: 0.5rem;">
                            <strong>Total</strong>
                            <strong>To be calculated</strong>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary" style="width: 100%;">Confirm & Pay</button>
                </form>
            </div>
        </div >
        `;
    document.getElementById('book-modal-backdrop').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal();
    });
}

window.confirmBooking = function (e) {
    e.preventDefault();
    closeModal();
    showToast('🎉 Booking Confirmed! A professional has been assigned.');
}

window.closeModal = function () {
    modalContainer.innerHTML = '';
};

window.showToast = function (msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = `
    position: fixed; bottom: 2rem; right: 2rem;
    background: #333; color: white; padding: 1rem 2rem;
    border-radius: 50px; box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease-out; z-index: 2000;
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}


window.submitWorkerApplication = function (e) {
    e.preventDefault();
    closeModal();
    showToast('✅ Application Submitted! Our team will call you shortly.');
};

// --- Init ---
window.addEventListener('hashchange', router);
router();

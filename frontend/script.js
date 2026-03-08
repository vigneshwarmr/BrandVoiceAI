/**
 * BrandVoice AI - Tweet Generator
 * Frontend JavaScript
 * 
 * Handles form submission, API communication, and UI interactions
 */

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    // Backend API URL - change this to your Spring Boot server URL
    API_BASE_URL:'https://brandvoiceai-3.onrender.com',
    
    // API Endpoints
    ENDPOINTS: {
        GENERATE_TWEETS: '/api/v1/tweets/generateTweets'
    },
    
    // Maximum character count for product description
    MAX_DESCRIPTION_LENGTH: 500
};

// ============================================
// DOM ELEMENTS
// ============================================
const elements = {
    // Form elements
    form: document.getElementById('tweetForm'),
    brandName: document.getElementById('brandName'),
    industry: document.getElementById('industry'),
    campaignObjective: document.getElementById('campaignObjective'),
    productDescription: document.getElementById('productDescription'),
    charCount: document.getElementById('charCount'),
    generateBtn: document.getElementById('generateBtn'),
    btnText: document.querySelector('.btn-text'),
    btnLoader: document.querySelector('.btn-loader'),
    
    // Mobile menu
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileMenu: document.getElementById('mobileMenu'),
    
    // Sections
    heroSection: document.getElementById('heroSection'),
    resultsSection: document.getElementById('resultsSection'),
    featuresSection: document.getElementById('features'),
    
    // Results elements
    brandVoiceSummary: document.getElementById('brandVoiceSummary'),
    tweetsGrid: document.getElementById('tweetsGrid'),
    tweetCount: document.getElementById('tweetCount'),
    
    // Action buttons
    backBtn: document.getElementById('backBtn'),
    copyAllBtn: document.getElementById('copyAllBtn'),
    
    // Toast
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage')
};

// Store generated tweets for copy functionality
let generatedTweets = [];

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Toast type (success, error)
 */
function showToast(message, type = 'success') {
    const toast = elements.toast;
    const toastMessage = elements.toastMessage;
    const icon = toast.querySelector('i');
    
    toastMessage.textContent = message;
    
    // Update icon based on type
    if (type === 'error') {
        icon.className = 'fas fa-exclamation-circle';
        icon.style.color = '#ef4444';
    } else {
        icon.className = 'fas fa-check-circle';
        icon.style.color = '#22c55e';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('Copied to clipboard!');
    } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            showToast('Copied to clipboard!');
        } catch (err) {
            showToast('Failed to copy', 'error');
        }
        
        document.body.removeChild(textarea);
    }
}

/**
 * Show loading state on button
 */
function showLoading() {
    elements.btnText.classList.add('hidden');
    elements.btnLoader.classList.remove('hidden');
    elements.generateBtn.disabled = true;
    elements.generateBtn.style.cursor = 'not-allowed';
    elements.generateBtn.style.opacity = '0.7';
}

/**
 * Hide loading state on button
 */
function hideLoading() {
    elements.btnText.classList.remove('hidden');
    elements.btnLoader.classList.add('hidden');
    elements.generateBtn.disabled = false;
    elements.generateBtn.style.cursor = 'pointer';
    elements.generateBtn.style.opacity = '1';
}

/**
 * Create loading overlay
 */
function createLoadingOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.id = 'loadingOverlay';
    overlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p class="loading-text">Analyzing your brand...</p>
            <p class="loading-subtext">Our AI is crafting the perfect voice</p>
        </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
}

/**
 * Remove loading overlay
 */
function removeLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.remove();
    }
}

/**
 * Scroll to element smoothly
 * @param {HTMLElement} element - Element to scroll to
 */
function scrollToElement(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================
// FORM VALIDATION
// ============================================

/**
 * Validate form inputs
 * @returns {boolean} - Whether form is valid
 */
function validateForm() {
    const industry = elements.industry.value.trim();
    const campaignObjective = elements.campaignObjective.value.trim();
    const productDescription = elements.productDescription.value.trim();
    
    if (!industry) {
        showToast('Please select an industry', 'error');
        elements.industry.focus();
        return false;
    }
    
    if (!campaignObjective) {
        showToast('Please select a campaign objective', 'error');
        elements.campaignObjective.focus();
        return false;
    }
    
    if (!productDescription) {
        showToast('Please enter a product description', 'error');
        elements.productDescription.focus();
        return false;
    }
    
    if (productDescription.length < 10) {
        showToast('Product description must be at least 10 characters', 'error');
        elements.productDescription.focus();
        return false;
    }
    
    return true;
}

/**
 * Update character count for textarea
 */
function updateCharCount() {
    const currentLength = elements.productDescription.value.length;
    elements.charCount.textContent = `${currentLength} / ${CONFIG.MAX_DESCRIPTION_LENGTH}`;
    
    // Visual feedback when approaching limit
    if (currentLength > CONFIG.MAX_DESCRIPTION_LENGTH * 0.9) {
        elements.charCount.style.color = '#ef4444';
    } else if (currentLength > CONFIG.MAX_DESCRIPTION_LENGTH * 0.7) {
        elements.charCount.style.color = '#f59e0b';
    } else {
        elements.charCount.style.color = 'var(--color-text-muted)';
    }
}

// ============================================
// API FUNCTIONS
// ============================================

/**
 * Generate tweets by calling the backend API
 * @param {Object} formData - Form data object
 * @returns {Promise<Object>} - API response
 */
async function generateTweets(formData) {
    const url = `${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.GENERATE_TWEETS}`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// ============================================
// UI RENDERING FUNCTIONS
// ============================================

/**
 * Render brand voice summary
 * @param {Array<string>} summary - Array of summary strings
 */
function renderBrandVoiceSummary(summary) {
    elements.brandVoiceSummary.innerHTML = '';
    
    if (!summary || summary.length === 0) {
        elements.brandVoiceSummary.innerHTML = '<p class="summary-text">No brand voice analysis available.</p>';
        return;
    }
    
    summary.forEach(item => {
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        summaryItem.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span class="summary-text">${escapeHtml(item)}</span>
        `;
        elements.brandVoiceSummary.appendChild(summaryItem);
    });
}

/**
 * Render tweet cards
 * @param {Array<string>} tweets - Array of tweet texts
 */
function renderTweets(tweets) {
    elements.tweetsGrid.innerHTML = '';
    generatedTweets = tweets;
    
    if (!tweets || tweets.length === 0) {
        elements.tweetsGrid.innerHTML = '<p class="summary-text">No tweets generated.</p>';
        return;
    }
    
    tweets.forEach((tweet, index) => {
        const tweetCard = document.createElement('div');
        tweetCard.className = 'tweet-card';
        tweetCard.innerHTML = `
            <div class="tweet-header">
                <span class="tweet-number">${index + 1}</span>
            </div>
            <p class="tweet-text">${escapeHtml(tweet)}</p>
            <div class="tweet-actions">
                <button class="tweet-btn tweet-btn-copy" data-tweet-index="${index}">
                    <i class="fas fa-copy"></i>
                    Copy Tweet
                </button>
                <button class="tweet-btn tweet-btn-regenerate" data-tweet-index="${index}">
                    <i class="fas fa-sync-alt"></i>
                    Regenerate
                </button>
            </div>
        `;
        elements.tweetsGrid.appendChild(tweetCard);
    });
    
    // Update tweet count
    elements.tweetCount.textContent = `${tweets.length} tweet${tweets.length !== 1 ? 's' : ''}`;
    
    // Add event listeners to tweet buttons
    attachTweetButtonListeners();
}

/**
 * Attach event listeners to tweet action buttons
 */
function attachTweetButtonListeners() {
    // Copy buttons
    document.querySelectorAll('.tweet-btn-copy').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.tweetIndex);
            copyToClipboard(generatedTweets[index]);
        });
    });
    
    // Regenerate buttons
    document.querySelectorAll('.tweet-btn-regenerate').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.tweetIndex);
            regenerateSingleTweet(index);
        });
    });
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Show results section and hide hero
 */
function showResults() {
    elements.heroSection.classList.add('hidden');
    elements.featuresSection.classList.add('hidden');
    elements.resultsSection.classList.remove('hidden');
    scrollToElement(elements.resultsSection);
}

/**
 * Show hero section and hide results
 */
function showHero() {
    elements.resultsSection.classList.add('hidden');
    elements.heroSection.classList.remove('hidden');
    elements.featuresSection.classList.remove('hidden');
    scrollToElement(elements.heroSection);
    
    // Reset form
    elements.form.reset();
    updateCharCount();
}

// ============================================
// REGENERATE SINGLE TWEET
// ============================================

/**
 * Regenerate a single tweet
 * @param {number} index - Index of tweet to regenerate
 */
async function regenerateSingleTweet(index) {
    const btn = document.querySelector(`.tweet-btn-regenerate[data-tweet-index="${index}"]`);
    const originalText = btn.innerHTML;
    
    // Show loading state
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Regenerating...';
    btn.disabled = true;
    
    try {
        // Get current form data
        const formData = {
            brandName: elements.brandName.value.trim(),
            industry: elements.industry.value,
            campaignObjective: elements.campaignObjective.value,
            productDescription: elements.productDescription.value.trim()
        };
        
        // Call API to regenerate
        const response = await generateTweets(formData);
        
        if (response.tweets && response.tweets.length > 0) {
            // Replace the specific tweet with a new one
            const newTweet = response.tweets[0];
            generatedTweets[index] = newTweet;
            
            // Update the UI
            const tweetCard = elements.tweetsGrid.children[index];
            const tweetText = tweetCard.querySelector('.tweet-text');
            tweetText.textContent = newTweet;
            
            showToast('Tweet regenerated!');
        }
    } catch (error) {
        showToast('Failed to regenerate tweet', 'error');
        console.error('Regenerate error:', error);
    } finally {
        // Restore button state
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// ============================================
// EVENT HANDLERS
// ============================================

/**
 * Handle form submission
 * @param {Event} e - Submit event
 */
async function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Get form data
    const formData = {
        brandName: elements.brandName.value.trim(),
        industry: elements.industry.value,
        campaignObjective: elements.campaignObjective.value,
        productDescription: elements.productDescription.value.trim()
    };
    
    // Show loading states
    showLoading();
    const loadingOverlay = createLoadingOverlay();
    
    try {
        // Call API
        const response = await generateTweets(formData);
        
        // Render results
        renderBrandVoiceSummary(response.brandVoiceSummary);
        renderTweets(response.tweets);
        
        // Show results section
        showResults();
        
        showToast('Tweets generated successfully!');
    } catch (error) {
        showToast(error.message || 'Failed to generate tweets. Please try again.', 'error');
        console.error('Form submission error:', error);
    } finally {
        // Hide loading states
        hideLoading();
        removeLoadingOverlay();
    }
}

/**
 * Handle copy all tweets
 */
function handleCopyAll() {
    if (generatedTweets.length === 0) {
        showToast('No tweets to copy', 'error');
        return;
    }
    
    const allTweets = generatedTweets.map((tweet, index) => `${index + 1}. ${tweet}`).join('\n\n');
    copyToClipboard(allTweets);
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    elements.mobileMenu.classList.toggle('active');
    const icon = elements.mobileMenuBtn.querySelector('i');
    
    if (elements.mobileMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize event listeners
 */
function initEventListeners() {
    // Form submission
    elements.form.addEventListener('submit', handleFormSubmit);
    
    // Character count
    elements.productDescription.addEventListener('input', updateCharCount);
    
    // Mobile menu
    elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Back button
    elements.backBtn.addEventListener('click', showHero);
    
    // Copy all button
    elements.copyAllBtn.addEventListener('click', handleCopyAll);
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            elements.mobileMenu.classList.remove('active');
            elements.mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
        });
    });
}

/**
 * Initialize application
 */
function init() {
    initEventListeners();
    updateCharCount();
    
    console.log('BrandVoice AI - Tweet Generator initialized');
    console.log('API Base URL:', CONFIG.API_BASE_URL);
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// ============================================
// DEMO MODE (For testing without backend)
// ============================================

/**
 * Enable demo mode for testing without backend
 * Uncomment the following code to test UI without a running backend
 */
/*
const DEMO_MODE = true;

if (DEMO_MODE) {
    // Override generateTweets function for demo
    async function generateTweets(formData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    brandVoiceSummary: [
                        `Tone: Bold and ${formData.industry.toLowerCase() === 'tech' ? 'innovative' : 'professional'}`,
                        `Audience: ${formData.campaignObjective === 'Engagement' ? 'Social media enthusiasts' : 'Target market segment'}`,
                        `Themes: ${formData.industry.toLowerCase()} trends and product highlights`,
                        `Style: Conversational with strategic CTAs`
                    ],
                    tweets: [
                        `Just launched our latest innovation! ${formData.brandName || 'Our product'} is changing the game in ${formData.industry}. Ready to experience the future? 🚀 #${formData.industry} #Innovation`,
                        `Why settle for ordinary when you can have extraordinary? Discover what makes ${formData.brandName || 'us'} different. ✨ #${formData.industry} #Quality`,
                        `Monday motivation: Start your week with ${formData.brandName || 'our solution'}. Your ${formData.industry.toLowerCase()} goals are within reach! 💪 #MondayMotivation`,
                        `Behind the scenes: Our team is working hard to bring you the best ${formData.industry.toLowerCase()} experience possible. Stay tuned! 🔧 #BehindTheScenes`,
                        `Customer love: "Best ${formData.industry.toLowerCase()} product I've ever used!" - Happy Customer ⭐️ #Testimonial #HappyCustomers`,
                        `Pro tip: Maximize your results by integrating ${formData.brandName || 'our product'} into your daily workflow. Here's how... 🧵 #ProTip #${formData.industry}`,
                        `The ${formData.industry} industry is evolving. Are you keeping up? ${formData.brandName || 'We'} help you stay ahead of the curve. 📈 #Trends #${formData.industry}`,
                        `Flash sale alert! Get 20% off ${formData.brandName || 'our product'} this weekend only. Don't miss out! ⚡️ #Sale #LimitedTime`,
                        `Question for our community: What's your biggest challenge in ${formData.industry.toLowerCase()}? Let's discuss! 👇 #Community #Discussion`,
                        `Thank you to our amazing community for your continued support! Here's to many more milestones together. 🎉 #Grateful #Community`
                    ]
                });
            }, 2000); // Simulate 2 second delay
        });
    }
}
*/

let cursorTrail = [];
let isPageLoaded = false;

const psychologyFacts = {
    'Loss Aversion': {
        fact: 'Originally discovered by Kahneman and Tversky, this bias affects 87% of decision-making processes',
        examples: ['Stock market behavior', 'Insurance purchases', 'Status quo bias'],
        color: '#ff6b6b'
    },
    'Social Proof': {
        fact: '92% of people are more likely to trust a product with reviews, even fake ones',
        examples: ['Restaurant queues', 'Social media likes', 'Testimonials'],
        color: '#4ecdc4'
    },
    'Anchoring Effect': {
        fact: 'The first number you see can influence estimates by up to 76% in subsequent judgments',
        examples: ['Price negotiations', 'Salary expectations', 'Product comparisons'],
        color: '#feca57'
    }
};

const regionalInsights = {
    'North America': {
        culture: 'Individualistic, fast-paced decision making',
        surprise: 'Americans make decisions 3x faster than Europeans on average',
        preference: 'Direct communication preferred by 82% of the population'
    },
    'East Asia': {
        culture: 'Collective harmony, consensus-driven',
        surprise: '94% consider context more important than direct content',
        preference: 'Group decisions take 40% longer but have 91% satisfaction rates'
    },
    'Europe': {
        culture: 'Quality-focused, tradition-aware',
        surprise: '88% prioritize long-term quality over immediate convenience',
        preference: 'Sustainability factors influence 79% of purchasing decisions'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    initializeInsightsPage();
});

function initializeInsightsPage() {
    setupCursorTrail();
    setupFloatingBubbles();
    setupInteractiveCards();
    setupTimelineAnimations();
    setupRegionalStats();
    setupScrollAnimations();
    
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    isPageLoaded = true;
}

function setupCursorTrail() {
    const trail = document.querySelector('.cursor-trail');
    if (!trail) return;
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (Math.random() > 0.95) {
            createSparkle(mouseX, mouseY);
        }
    });
    
    function updateTrail() {
        const dx = mouseX - trailX;
        const dy = mouseY - trailY;
        
        trailX += dx * 0.15;
        trailY += dy * 0.15;
        
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
        
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: var(--accent-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        animation: sparkleAnim 0.8s ease-out forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 800);
}

function setupFloatingBubbles() {
    const container = document.querySelector('.preference-bubbles');
    if (!container) return;
    
    const bubbleTexts = [
        'Psychology', '87% Loss', 'Social Proof', 'Anchoring', 
        'Cultural', '0.3sec', 'Decisions', 'Statistics'
    ];
    
    function createBubble() {
        if (Math.random() > 0.3) return;
        
        const bubble = document.createElement('div');
        bubble.className = 'insight-bubble';
        bubble.textContent = bubbleTexts[Math.floor(Math.random() * bubbleTexts.length)];
        
        const size = 60 + Math.random() * 40;
        bubble.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(0, 255, 170, 0.1);
            border: 1px solid rgba(0, 255, 170, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: ${8 + Math.random() * 4}px;
            font-family: var(--font-mono);
            color: var(--accent-color);
            left: ${Math.random() * 100}%;
            top: 100%;
            animation: bubbleFloat ${6 + Math.random() * 4}s linear forwards;
            pointer-events: none;
            z-index: 1;
        `;
        
        container.appendChild(bubble);
        
        setTimeout(() => {
            if (bubble.parentNode) bubble.remove();
        }, 10000);
    }
    
    setInterval(createBubble, 3000);
    
    if (!document.querySelector('#bubbleStyles')) {
        const style = document.createElement('style');
        style.id = 'bubbleStyles';
        style.textContent = `
            @keyframes bubbleFloat {
                0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
            @keyframes sparkleAnim {
                0% { transform: scale(0) rotate(0deg); opacity: 1; }
                50% { transform: scale(1) rotate(180deg); opacity: 0.8; }
                100% { transform: scale(0) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

function setupInteractiveCards() {
    const cards = document.querySelectorAll('.insight-card');
    
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const stat = card.querySelector('.card-stat').textContent;
            
            if (psychologyFacts[title]) {
                showPsychologyModal(title, stat, psychologyFacts[title]);
            }
            
            createRippleEffect(card, event);
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.filter = 'brightness(1.1)';
            
            animateCardVisual(card);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.filter = 'brightness(1)';
        });
        
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

function animateCardVisual(card) {
    const visual = card.querySelector('.card-visual');
    if (!visual) return;
    
    const loss = visual.querySelector('.loss');
    const gain = visual.querySelector('.gain');
    if (loss && gain) {
        loss.style.transform = 'scale(1.1) rotate(-2deg)';
        gain.style.transform = 'scale(1.1) rotate(2deg)';
        setTimeout(() => {
            loss.style.transform = 'scale(1) rotate(0deg)';
            gain.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    }
    
    const crowd = visual.querySelector('.crowd');
    const follow = visual.querySelector('.follow');
    if (crowd && follow) {
        crowd.style.animation = 'crowd-move 0.5s ease-in-out';
        follow.style.animation = 'follow-move 0.5s ease-in-out 0.2s';
    }
    
    const firstPrice = visual.querySelector('.first-price');
    const finalPrice = visual.querySelector('.final-price');
    if (firstPrice && finalPrice) {
        firstPrice.style.animation = 'priceStrike 1s ease-in-out';
        finalPrice.style.animation = 'priceGlow 1s ease-in-out';
    }
}

function setupTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h3').textContent;
            const description = item.querySelector('p').textContent;
            
            showTimelineModal(title, description, index);
        });
        
        const progressBar = item.querySelector('.fill');
        if (progressBar) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const width = progressBar.style.width;
                        progressBar.style.width = '0%';
                        setTimeout(() => {
                            progressBar.style.width = width;
                        }, 500 + index * 200);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(item);
        }
    });
}

function setupRegionalStats() {
    const regionStats = document.querySelectorAll('.region-stat');
    
    regionStats.forEach(stat => {
        stat.addEventListener('click', () => {
            const regionName = stat.querySelector('h3').textContent.replace(/🇺🇸|🇯🇵|🇪🇺/g, '').trim();
            const cleanRegionName = regionName.split(' ')[0];
            
            let region = null;
            for (let key in regionalInsights) {
                if (key.includes(cleanRegionName) || cleanRegionName.includes(key.split(' ')[0])) {
                    region = regionalInsights[key];
                    break;
                }
            }
            
            if (region) {
                showRegionalModal(regionName, region);
            }
            
            createRippleEffect(stat, event);
        });
        
        const prefs = stat.querySelectorAll('.pref');
        prefs.forEach((pref, index) => {
            pref.addEventListener('click', (e) => {
                e.stopPropagation();
                
                pref.style.background = 'rgba(0, 255, 170, 0.2)';
                pref.style.transform = 'scale(1.05)';
                
                setTimeout(() => {
                    pref.style.background = 'rgba(0, 255, 170, 0.05)';
                    pref.style.transform = 'scale(1)';
                }, 200);
                
                showMiniTooltip(pref, pref.textContent);
            });
        });
    });
}

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                const children = entry.target.querySelectorAll('.insight-card, .timeline-item, .region-stat');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.insight-category').forEach(section => {
        observer.observe(section);
    });
}

function showPsychologyModal(title, stat, data) {
    closeModal();
    
    document.body.style.cursor = "auto"

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'insight-modal';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        opacity: 1;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: #1a1a1a;
        border: 2px solid #00ffaa;
        border-radius: 16px;
        max-width: 90vw;
        max-height: 80vh;
        width: 600px;
        overflow-y: auto;
        color: white;
        font-family: 'Space Grotesk', sans-serif;
        animation: modalSlide 0.3s ease-out;
    `;
    
    modalContent.innerHTML = `
        <div style="padding: 2rem; position: relative;">
            <button style="
                position: absolute;
                top: 1rem;
                right: 1.5rem;
                background: none;
                border: none;
                color: #00ffaa;
                font-size: 1.5rem;
                cursor: pointer;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            " class="close-modal-btn">&times;</button>
            
            <h2 style="color: #00ffaa; margin: 0 0 0.5rem 0; font-size: 1.8rem;">${title}</h2>
            <div style="color: #00ffaa; font-size: 1.5rem; font-family: 'JetBrains Mono', monospace; margin-bottom: 1.5rem;">${stat}</div>
            
            <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 1.5rem; color: #e0e0e0;">${data.fact}</p>
            
            <h3 style="color: #00ffaa; margin-bottom: 1rem; font-size: 1.2rem;">Real-world Examples:</h3>
            <ul style="list-style: none; padding: 0; margin-bottom: 2rem;">
                ${data.examples.map(example => `
                    <li style="
                        padding: 0.8rem;
                        background: rgba(0, 255, 170, 0.1);
                        margin: 0.8rem 0;
                        border-radius: 8px;
                        border-left: 3px solid #00ffaa;
                        color: #e0e0e0;
                    ">${example}</li>
                `).join('')}
            </ul>
            
            <div style="text-align: center;">
                <button class="share-btn" style="
                    background: #00ffaa;
                    color: #0a0a0a;
                    border: none;
                    padding: 0.8rem 1.5rem;
                    border-radius: 8px;
                    margin: 0.5rem;
                    cursor: pointer;
                    font-weight: 600;
                ">Share Insight</button>
                <button class="learn-btn" style="
                    background: transparent;
                    color: #00ffaa;
                    border: 1px solid #00ffaa;
                    padding: 0.8rem 1.5rem;
                    border-radius: 8px;
                    margin: 0.5rem;
                    cursor: pointer;
                    font-weight: 600;
                ">Learn More</button>
            </div>
        </div>
    `;
    
    if (!document.querySelector('#modalAnimation')) {
        const style = document.createElement('style');
        style.id = 'modalAnimation';
        style.textContent = `
            @keyframes modalSlide {
                from { transform: scale(0.8) translateY(-20px); opacity: 0; }
                to { transform: scale(1) translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    const closeBtn = modalContent.querySelector('.close-modal-btn');
    const shareBtn = modalContent.querySelector('.share-btn');
    const learnBtn = modalContent.querySelector('.learn-btn');
    
    closeBtn.addEventListener('click', closeModal);
    shareBtn.addEventListener('click', () => shareInsight(title));
    learnBtn.addEventListener('click', () => learnMore(title));
    
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
            document.body.style.cursor = "none"
        }
    });
}

function showTimelineModal(title, description, index) {
    // Remove any existing modal first
    closeModal();
    
    document.body.style.cursor = "auto"

    const timeDetails = [
        { 
            title: 'Initial Reaction', 
            detail: 'Subconscious processing happens before conscious awareness. The amygdala triggers fight-or-flight responses.',
            tips: ['Use strong visuals', 'Clear first impressions', 'Minimize cognitive load']
        },
        { 
            title: 'Decision Making', 
            detail: 'The prefrontal cortex evaluates options. Most purchase decisions happen in this window.',
            tips: ['Limit choices to 3-5 options', 'Use social proof', 'Clear call-to-actions']
        },
        { 
            title: 'Commitment', 
            detail: 'Deeper analytical thinking engages. Users justify their decisions and look for confirmation.',
            tips: ['Provide detailed information', 'Show testimonials', 'Offer guarantees']
        }
    ];
    
    const details = timeDetails[index] || { title, detail: description, tips: [] };

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'insight-modal';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        opacity: 1;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: #1a1a1a;
        border: 2px solid #00ffaa;
        border-radius: 16px;
        max-width: 90vw;
        max-height: 80vh;
        width: 600px;
        overflow-y: auto;
        color: white;
        font-family: 'Space Grotesk', sans-serif;
        animation: modalSlide 0.3s ease-out;
    `;
    
    modalContent.innerHTML = `
        <div style="padding: 2rem; position: relative;">
            <button style="
                position: absolute;
                top: 1rem;
                right: 1.5rem;
                background: none;
                border: none;
                color: #00ffaa;
                font-size: 1.5rem;
                cursor: pointer;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            " class="close-modal-btn">&times;</button>
            
            <h2 style="color: #00ffaa; margin: 0 0 1.5rem 0; font-size: 1.8rem;">${details.title}</h2>
            
            <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 1.5rem; color: #e0e0e0;">${details.detail}</p>
            
            ${details.tips.length > 0 ? `
                <h3 style="color: #00ffaa; margin-bottom: 1rem; font-size: 1.2rem;">Design Tips:</h3>
                <ul style="list-style: none; padding: 0; margin-bottom: 2rem;">
                    ${details.tips.map(tip => `
                        <li style="
                            padding: 0.8rem;
                            background: rgba(0, 255, 170, 0.1);
                            margin: 0.8rem 0;
                            border-radius: 8px;
                            border-left: 3px solid #00ffaa;
                            color: #e0e0e0;
                        ">${tip}</li>
                    `).join('')}
                </ul>
            ` : ''}
        </div>
    `;
    
    // Add animation keyframes if not exists
    if (!document.querySelector('#modalAnimation')) {
        const style = document.createElement('style');
        style.id = 'modalAnimation';
        style.textContent = `
            @keyframes modalSlide {
                from { transform: scale(0.8) translateY(-20px); opacity: 0; }
                to { transform: scale(1) translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Add event listeners
    const closeBtn = modalContent.querySelector('.close-modal-btn');
    closeBtn.addEventListener('click', closeModal);
    
    // Close when clicking overlay
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
            document.body.style.cursor = "none"
        }
    });
}

function showRegionalModal(regionName, data) {
    // Remove any existing modal first
    closeModal();
    
    document.body.style.cursor = "auto"

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'insight-modal';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        opacity: 1;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: #1a1a1a;
        border: 2px solid #00ffaa;
        border-radius: 16px;
        max-width: 90vw;
        max-height: 80vh;
        width: 600px;
        overflow-y: auto;
        color: white;
        font-family: 'Space Grotesk', sans-serif;
        animation: modalSlide 0.3s ease-out;
    `;
    
    modalContent.innerHTML = `
        <div style="padding: 2rem; position: relative;">
            <button style="
                position: absolute;
                top: 1rem;
                right: 1.5rem;
                background: none;
                border: none;
                color: #00ffaa;
                font-size: 1.5rem;
                cursor: pointer;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            " class="close-modal-btn">&times;</button>
            
            <h2 style="color: #00ffaa; margin: 0 0 1.5rem 0; font-size: 1.8rem;">${regionName}</h2>
            
            <div style="background: rgba(0, 255, 170, 0.1); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 3px solid #00ffaa;">
                <h3 style="color: #00ffaa; margin-bottom: 1rem; font-size: 1.2rem;">Cultural Context</h3>
                <p style="color: #e0e0e0; line-height: 1.6;">${data.culture}</p>
            </div>
            
            <div style="background: rgba(255, 107, 107, 0.1); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 3px solid #ff6b6b;">
                <h3 style="color: #ff6b6b; margin-bottom: 1rem; font-size: 1.2rem;">Surprising Fact</h3>
                <p style="color: #e0e0e0; line-height: 1.6;">${data.surprise}</p>
            </div>
            
            <div style="background: rgba(76, 205, 196, 0.1); padding: 1.5rem; border-radius: 12px; border-left: 3px solid #4ecdc4;">
                <h3 style="color: #4ecdc4; margin-bottom: 1rem; font-size: 1.2rem;">Key Preference</h3>
                <p style="color: #e0e0e0; line-height: 1.6;">${data.preference}</p>
            </div>
        </div>
    `;
    
    // Add animation keyframes if not exists
    if (!document.querySelector('#modalAnimation')) {
        const style = document.createElement('style');
        style.id = 'modalAnimation';
        style.textContent = `
            @keyframes modalSlide {
                from { transform: scale(0.8) translateY(-20px); opacity: 0; }
                to { transform: scale(1) translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Add event listeners
    const closeBtn = modalContent.querySelector('.close-modal-btn');
    closeBtn.addEventListener('click', closeModal);
    
    // Close when clicking overlay
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
            document.body.style.cursor = "none"
        }
    });
}

function createModal() {
    // Remove any existing modals first
    const existingModal = document.querySelector('.insight-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'insight-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    
    if (!document.querySelector('#modalStyles')) {
        const style = document.createElement('style');
        style.id = 'modalStyles';
        style.textContent = `
            .insight-modal.show { opacity: 1; }
            .modal-content {
                background: rgba(26,26,26,0.95);
                border: 1px solid rgba(0,255,170,0.3);
                border-radius: 16px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                backdrop-filter: blur(20px);
                animation: modalSlideIn 0.3s ease;
                color: #ffffff;
            }
            .modal-header {
                padding: 2rem 2rem 1rem 2rem;
                border-bottom: 1px solid rgba(255,255,255,0.1);
                position: relative;
            }
            .modal-header h2 {
                margin: 0;
                color: #00ffaa;
            }
            .modal-body {
                padding: 2rem;
                color: #ffffff;
            }
            .modal-close {
                position: absolute;
                top: 1rem;
                right: 1.5rem;
                background: none;
                border: none;
                color: #b0b0b0;
                font-size: 2rem;
                cursor: pointer;
                transition: color 0.3s ease;
                z-index: 1;
            }
            .modal-close:hover {
                color: #00ffaa;
            }
            .modal-stat {
                font-size: 2rem;
                color: #00ffaa;
                font-family: 'JetBrains Mono', monospace;
            }
            .action-btn {
                background: #00ffaa;
                color: #0a0a0a;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: 8px;
                margin: 0.5rem;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            .action-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0,255,170,0.3);
            }
            .action-btn.secondary {
                background: transparent;
                color: #00ffaa;
                border: 1px solid #00ffaa;
            }
            @keyframes modalSlideIn {
                from { transform: scale(0.9) translateY(20px); opacity: 0; }
                to { transform: scale(1) translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    return modal;
}

function closeModal() {
    document.body.style.cursor = "none"
    const modal = document.querySelector('.insight-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal && modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 200);
    }
}

// Add escape key handler
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        left: ${event.clientX - rect.left - size/2}px;
        top: ${event.clientY - rect.top - size/2}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(0,255,170,0.3);
        transform: scale(0);
        animation: rippleAnim 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
    
    if (!document.querySelector('#rippleStyles')) {
        const style = document.createElement('style');
        style.id = 'rippleStyles';
        style.textContent = `
            @keyframes rippleAnim {
                to { transform: scale(2); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

function showMiniTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: fixed;
        background: rgba(0,255,170,0.9);
        color: var(--dark-bg);
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-size: 0.8rem;
        z-index: 10001;
        pointer-events: none;
        transform: translateY(-10px);
        animation: tooltipShow 0.3s ease;
    `;
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.top - 40) + 'px';
    
    document.body.appendChild(tooltip);
    
    setTimeout(() => {
        tooltip.style.animation = 'tooltipHide 0.3s ease forwards';
        setTimeout(() => tooltip.remove(), 300);
    }, 2000);
    
    if (!document.querySelector('#tooltipStyles')) {
        const style = document.createElement('style');
        style.id = 'tooltipStyles';
        style.textContent = `
            @keyframes tooltipShow {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(-10px); }
            }
            @keyframes tooltipHide {
                from { opacity: 1; transform: translateY(-10px); }
                to { opacity: 0; transform: translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
    }
}

function shareInsight(title) {
    if (navigator.share) {
        navigator.share({
            title: `Human Preference Codex - ${title}`,
            text: `Interesting insight about ${title} from the Human Preference Codex`,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(`Check out this insight about ${title}: ${window.location.href}`);
    }
    closeModal();
}

function learnMore(title) {
    closeModal();
}

function handleKeyboardShortcuts(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
    
    if (event.key === ' ' && !event.target.matches('input, textarea')) {
        event.preventDefault();
        const sections = document.querySelectorAll('.insight-category');
        const currentSection = [...sections].find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top >= 0 && rect.top <= window.innerHeight / 2;
        });
        
        if (currentSection) {
            const nextSection = currentSection.nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
}

window.closeModal = closeModal;
function handleKeyboardShortcuts(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
    
    if (event.key === ' ' && !event.target.matches('input, textarea')) {
        event.preventDefault();
        const sections = document.querySelectorAll('.insight-category');
        const currentSection = [...sections].find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top >= 0 && rect.top <= window.innerHeight / 2;
        });
        
        if (currentSection) {
            const nextSection = currentSection.nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
}

window.closeModal = closeModal;

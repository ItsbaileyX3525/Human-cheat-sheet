let cursorTrail = [];
let isPageLoaded = false;

const patternData = {
    'default': {
        message: 'You follow the Default Bias pattern!',
        percentage: '78% of people choose this',
        insight: 'You prefer convenience and trust expert recommendations. This is the most common decision pattern.',
        color: '#00ffaa'
    },
    'simple': {
        message: 'You prefer Simple choices!',
        percentage: '84% of people avoid complexity',
        insight: 'You value clarity and straightforward options. This leads to faster, more confident decisions.',
        color: '#4ecdc4'
    },
    'complex': {
        message: 'You enjoy having many options!',
        percentage: 'Only 16% choose complex options',
        insight: 'You like control and customization, even if it takes longer to decide. You are detail-oriented.',
        color: '#ff6b6b'
    }
};

const bubbleTexts = [
    'Default Effect', 'Analysis', 'Paralysis', 'Choice Paradox', 
    'Emotional', 'Time Patterns', 'Decision Speed', 'Satisfaction'
];

document.addEventListener('DOMContentLoaded', function() {
    initializePatternsPage();
});

function initializePatternsPage() {
    setupCursorTrail();
    setupFloatingBubbles();
    setupInteractiveElements();
    setupPatternTest();
    setupScrollAnimations();
    setupHoverEffects();
    
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
        
        if (Math.random() > 0.97) {
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
        width: 3px;
        height: 3px;
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
    
    function createBubble() {
        if (Math.random() > 0.4) return;
        
        const bubble = document.createElement('div');
        bubble.className = 'pattern-bubble';
        bubble.textContent = bubbleTexts[Math.floor(Math.random() * bubbleTexts.length)];
        
        const size = 50 + Math.random() * 30;
        bubble.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(0, 255, 170, 0.08);
            border: 1px solid rgba(0, 255, 170, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: ${7 + Math.random() * 3}px;
            font-family: var(--font-mono);
            color: var(--accent-color);
            left: ${Math.random() * 100}%;
            top: 100%;
            animation: bubbleFloat ${7 + Math.random() * 4}s linear forwards;
            pointer-events: none;
            z-index: 1;
        `;
        
        container.appendChild(bubble);
        
        setTimeout(() => {
            if (bubble.parentNode) bubble.remove();
        }, 12000);
    }
    
    setInterval(createBubble, 4000);
    
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

function setupInteractiveElements() {
    const choiceOptions = document.querySelectorAll('.choice-option');
    choiceOptions.forEach(option => {
        option.addEventListener('click', () => {
            choiceOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            
            createRippleEffect(option, event);
        });
    });
    
    const pyramidLevels = document.querySelectorAll('.pyramid-level');
    pyramidLevels.forEach(level => {
        level.addEventListener('click', () => {
            pyramidLevels.forEach(l => l.classList.remove('highlighted'));
            level.classList.add('highlighted');
            
            const levelData = level.getAttribute('data-level');
            showPyramidInsight(levelData, level);
        });
    });
    
    const emotionItems = document.querySelectorAll('.emotion-item');
    emotionItems.forEach(item => {
        item.addEventListener('click', () => {
            emotionItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            animateEmotionItem(item);
        });
    });
    
    const timePeriods = document.querySelectorAll('.time-period');
    timePeriods.forEach(period => {
        period.addEventListener('click', () => {
            timePeriods.forEach(p => p.classList.remove('selected'));
            period.classList.add('selected');
            
            highlightTimePeriod(period);
        });
    });
}

function setupPatternTest() {
    const testOptions = document.querySelectorAll('.test-option');
    const resultContainer = document.getElementById('patternResult');
    
    testOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            const type = e.target.dataset.type;
            const data = patternData[type];
            
            if (data && resultContainer) {
                showTestResult(data, resultContainer);
            }
            
            testOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            
            createRippleEffect(option, e);
        });
    });
}

function showTestResult(data, container) {
    container.innerHTML = `
        <div style="padding: 2rem; background: rgba(0,255,170,0.1); border: 1px solid ${data.color}; border-radius: 12px;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                <div style="width: 4px; height: 40px; background: ${data.color}; border-radius: 2px;"></div>
                <div>
                    <h3 style="color: ${data.color}; margin-bottom: 0.5rem;">${data.message}</h3>
                    <p style="color: var(--text-secondary); font-family: var(--font-mono); font-size: 0.9rem;">${data.percentage}</p>
                </div>
            </div>
            <p style="color: var(--text-secondary); line-height: 1.6;">${data.insight}</p>
        </div>
    `;
    
    container.classList.add('show');
    
    setTimeout(() => {
        container.style.background = `linear-gradient(135deg, rgba(0,255,170,0.05), rgba(76,205,196,0.05))`;
    }, 200);
}

function showPyramidInsight(level, element) {
    const insights = {
        '1': 'No choice can lead to dissatisfaction, but eliminates decision fatigue.',
        '3': 'The sweet spot - enough options to feel empowered, not enough to overwhelm.',
        '10': 'Too many choices create anxiety and decision paralysis, reducing satisfaction.'
    };
    
    const insight = insights[level];
    if (insight) {
        showTooltip(element, insight);
    }
}

function animateEmotionItem(item) {
    const icon = item.querySelector('.emotion-icon');
    if (icon) {
        icon.style.animation = 'none';
        setTimeout(() => {
            icon.style.animation = 'emotionBounce 0.6s ease-in-out';
        }, 10);
    }
    
    item.style.transform = 'scale(1.05)';
    setTimeout(() => {
        item.style.transform = 'scale(1)';
    }, 200);
}

function highlightTimePeriod(period) {
    const bar = period.querySelector('.pattern-bar');
    if (bar) {
        bar.style.animation = 'none';
        setTimeout(() => {
            bar.style.animation = 'growBar 1s ease-out';
        }, 10);
    }
}

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                animatePatternSection(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.pattern-section').forEach(section => {
        observer.observe(section);
    });
}

function animatePatternSection(section) {
    const bars = section.querySelectorAll('.pattern-bar');
    bars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.animation = 'growBar 1.5s ease-out';
        }, index * 200);
    });
    
    const satisfactionMeters = section.querySelectorAll('.satisfaction-meter');
    satisfactionMeters.forEach((meter, index) => {
        setTimeout(() => {
            meter.style.animation = 'fillBar 1.5s ease-out';
        }, index * 300);
    });
}

function setupHoverEffects() {
    const interactiveElements = document.querySelectorAll('.choice-option, .choice-scenario, .pyramid-level, .emotion-item, .time-period');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.filter = 'brightness(1.1)';
            if (element.classList.contains('choice-scenario')) {
                animateChoiceScenario(element);
            }
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.filter = 'brightness(1)';
        });
    });
}

function animateChoiceScenario(scenario) {
    const decisionTime = scenario.querySelector('.decision-time');
    const satisfaction = scenario.querySelector('.satisfaction');
    
    if (decisionTime) {
        decisionTime.style.animation = 'none';
        setTimeout(() => {
            decisionTime.style.animation = 'pulse 0.5s ease-in-out';
        }, 10);
    }
    
    if (satisfaction) {
        satisfaction.style.animation = 'none';
        setTimeout(() => {
            satisfaction.style.animation = 'fadeIn 0.5s ease-in-out';
        }, 100);
    }
}

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
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            @keyframes fadeIn {
                from { opacity: 0.5; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: fixed;
        background: rgba(0,255,170,0.95);
        color: var(--dark-bg);
        padding: 0.8rem 1.2rem;
        border-radius: 8px;
        font-size: 0.9rem;
        z-index: 10001;
        pointer-events: none;
        max-width: 300px;
        line-height: 1.4;
        font-weight: 500;
        transform: translateY(-10px);
        animation: tooltipShow 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,255,170,0.3);
    `;
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = (rect.left + rect.width/2) + 'px';
    tooltip.style.top = (rect.top - 10) + 'px';
    tooltip.style.transform = 'translateX(-50%) translateY(-100%)';
    
    document.body.appendChild(tooltip);
    
    setTimeout(() => {
        tooltip.style.animation = 'tooltipHide 0.3s ease forwards';
        setTimeout(() => tooltip.remove(), 300);
    }, 3000);
    
    if (!document.querySelector('#tooltipStyles')) {
        const style = document.createElement('style');
        style.id = 'tooltipStyles';
        style.textContent = `
            @keyframes tooltipShow {
                from { opacity: 0; transform: translateX(-50%) translateY(-90%); }
                to { opacity: 1; transform: translateX(-50%) translateY(-100%); }
            }
            @keyframes tooltipHide {
                from { opacity: 1; transform: translateX(-50%) translateY(-100%); }
                to { opacity: 0; transform: translateX(-50%) translateY(-110%); }
            }
        `;
        document.head.appendChild(style);
    }
}

function handleKeyboardShortcuts(event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.test-result.show').forEach(result => {
            result.classList.remove('show');
        });
    }
    
    if (event.key === ' ' && !event.target.matches('input, textarea, button')) {
        event.preventDefault();
        const sections = document.querySelectorAll('.pattern-section');
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
    
    if (event.key >= '1' && event.key <= '3') {
        const testOptions = document.querySelectorAll('.test-option');
        const index = parseInt(event.key) - 1;
        if (testOptions[index]) {
            testOptions[index].click();
        }
    }
}

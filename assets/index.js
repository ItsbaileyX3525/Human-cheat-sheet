let currentTemperature = 70;
let wheelSpinning = false;
let currentMood = 'calm';
let animationId;
let cursorTrail = [];

const preferences = [
    { text: "Sweet Foods", weight: 73, color: "#ff6b6b" },
    { text: "Small Groups", weight: 76, color: "#4ecdc4" },
    { text: "Natural Light", weight: 89, color: "#45b7d1" },
    { text: "Comfortable Temp", weight: 91, color: "#96ceb4" },
    { text: "Simple Choices", weight: 84, color: "#feca57" },
    { text: "Personalization", weight: 91, color: "#ff9ff3" },
    { text: "Happy Endings", weight: 78, color: "#54a0ff" },
    { text: "Familiar Faces", weight: 67, color: "#5f27cd" }
];

const colorPalettes = {
    calm: ['#4A90E2', '#7ED321', '#50E3C2', '#B8E986', '#87D68D'],
    energetic: ['#F5A623', '#D0021B', '#BD10E0', '#FF6B35', '#E74C3C'],
    focused: ['#4A4A4A', '#9013FE', '#0091EA', '#5D6D7E', '#2C3E50'],
    creative: ['#FF6B35', '#F7931E', '#FFD23F', '#FF8A65', '#FFAB40']
};

const radarData = {
    food: {
        labels: ['Sweet', 'Salty', 'Spicy', 'Bitter', 'Umami', 'Sour'],
        values: [89, 76, 45, 23, 67, 58]
    },
    music: {
        labels: ['Pop', 'Rock', 'Hip-Hop', 'Classical', 'Electronic', 'Jazz'],
        values: [72, 68, 65, 34, 58, 29]
    },
    entertainment: {
        labels: ['Comedy', 'Action', 'Drama', 'Horror', 'Romance', 'Sci-Fi'],
        values: [78, 74, 69, 34, 56, 61]
    },
    lifestyle: {
        labels: ['Social', 'Active', 'Creative', 'Routine', 'Adventure', 'Peace'],
        values: [71, 63, 82, 76, 54, 89]
    }
};

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    
    setTimeout(() => {
        testInteractiveElements();
    }, 1000);
});

function initializeWebsite() {
    
    setupCursorTrail();
    setupTemperatureSlider();
    setupFloatingBubbles();
    setupMoodSelector();
    setupRadarChart();
    animateCountersOnScroll();
    setupMiniPalette();
    
    showMiniPalette('calm');
    
    requestAnimationFrame(updateCursorTrail);
    
    const elements = {
        tempSlider: document.getElementById('tempSlider'),
        miniWheel: document.getElementById('miniWheel'),
        miniPalette: document.getElementById('miniPalette'),
        toastContainer: document.getElementById('toastContainer')
    };
    
}

function setupCursorTrail() {
    const trail = document.querySelector('.cursor-trail');
    if (!trail) return;
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
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

function updateCursorTrail() {
    requestAnimationFrame(updateCursorTrail);
}

function setupTemperatureSlider() {
    const slider = document.getElementById('tempSlider');
    const display = document.getElementById('tempValue');
    const indicator = document.getElementById('comfortIndicator');
    
    if (!slider || !display) {
        return;
    }
    
    slider.addEventListener('input', (e) => {
        currentTemperature = parseInt(e.target.value);
        display.textContent = currentTemperature;
                
        if (indicator) {
            if (currentTemperature >= 68 && currentTemperature <= 72) {
                indicator.style.color = '#00ffaa';
                indicator.textContent = 'Perfect Zone ✓';
            } else if (currentTemperature >= 65 && currentTemperature <= 75) {
                indicator.style.color = '#feca57';
                indicator.textContent = 'Acceptable Range';
            } else {
                indicator.style.color = '#ff6b6b';
                indicator.textContent = 'Outside Comfort Zone';
            }
        }
        
    });
    
    slider.addEventListener('mousedown', () => {
        slider.style.transform = 'scale(1.02)';
    });
    
    slider.addEventListener('mouseup', () => {
        slider.style.transform = 'scale(1)';
    });
    
}

function getTemperatureFeeling(temp) {
    if (temp < 65) return 'Too cold for most people';
    if (temp >= 65 && temp < 68) return 'A bit chilly';
    if (temp >= 68 && temp <= 72) return 'Perfect comfort zone!';
    if (temp > 72 && temp <= 75) return 'Slightly warm';
    return 'Too hot for most people';
}

function setupFloatingBubbles() {
    const container = document.querySelector('.preference-bubbles');
    if (!container) return;
    
    const bubbleTexts = [
        '72°F', 'Pizza > Salad', 'Small Groups', 'Natural Light', 
        'Simple UI', 'Happy Endings', 'Default Options', 'Personalized'
    ];
    
    setInterval(() => {
        if (Math.random() > 0.4) return;
        
        const bubble = document.createElement('div');
        bubble.className = 'preference-bubble';
        bubble.textContent = bubbleTexts[Math.floor(Math.random() * bubbleTexts.length)];
        
        const size = 50 + Math.random() * 30;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.fontSize = (7 + Math.random() * 3) + 'px';
        
        container.appendChild(bubble);
        
        setTimeout(() => {
            if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
        }, 6000);
    }, 3000);
}

function setupMoodSelector() {
    const moodButtons = document.querySelectorAll('.mood-btn');
    
    moodButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            
            moodButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const mood = button.dataset.mood || 'calm';
            currentMood = mood;
            showMiniPalette(mood);
        });
        
        button.addEventListener('mouseenter', () => {
            if (!button.classList.contains('active')) {
                button.style.transform = 'scale(1.1)';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            if (!button.classList.contains('active')) {
                button.style.transform = 'scale(1)';
            }
        });
    });
}

function setupMiniPalette() {
    showMiniPalette('calm');
}

function showMiniPalette(mood) {
    
    const palette = document.getElementById('miniPalette');
    if (!palette) {
        return;
    }
    
    const colors = colorPalettes[mood] || colorPalettes.calm;
    palette.innerHTML = '';
    
    colors.slice(0, 4).forEach((color, index) => {
        const colorSample = document.createElement('div');
        colorSample.className = 'mini-color';
        colorSample.style.backgroundColor = color;
        colorSample.style.animationDelay = (index * 0.1) + 's';
        colorSample.title = `Click to copy ${color}`;
        
        colorSample.addEventListener('click', (e) => {
            e.preventDefault();
            copyToClipboard(color);
            
            colorSample.style.transform = 'scale(1.3) rotate(10deg)';
            setTimeout(() => {
                colorSample.style.transform = 'scale(1) rotate(0deg)';
            }, 200);
        });
        
        colorSample.addEventListener('mouseenter', () => {
            colorSample.style.transform = 'scale(1.2)';
            colorSample.style.borderColor = '#00ffaa';
        });
        
        colorSample.addEventListener('mouseleave', () => {
            colorSample.style.transform = 'scale(1)';
            colorSample.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        });
        
        palette.appendChild(colorSample);
    });
    
}

function spinWheel() {
    
    if (wheelSpinning) {
        return;
    }
    
    wheelSpinning = true;
    const wheel = document.getElementById('miniWheel');
    const result = document.getElementById('spinResult');
    
    if (!wheel) {
        wheelSpinning = false;
        return;
    }
    
    if (!result) {
        wheelSpinning = false;
        return;
    }
    
    const spins = 3 + Math.random() * 3;
    const randomDegree = Math.random() * 360;
    const totalRotation = (spins * 360) + randomDegree;
    
    
    wheel.style.transform = `rotate(${totalRotation}deg)`;
    wheel.style.transition = 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    result.textContent = 'Spinning...';
    result.style.color = '#00ffaa';
    
    setTimeout(() => {
        const normalizedDegree = (360 - (randomDegree % 360)) % 360;
        const segmentIndex = Math.floor(normalizedDegree / 45);
        const selectedPreference = preferences[segmentIndex] || preferences[0];
        
        result.innerHTML = `<strong>${selectedPreference.text}</strong><br>${selectedPreference.weight}% prefer this`;
        result.style.color = selectedPreference.color;
        
        wheelSpinning = false;
        wheel.style.transition = 'transform 0.3s ease';
        
    }, 2000);
}

function setupRadarChart() {    
    const buttons = document.querySelectorAll('.radar-btn-mini');
    if (buttons.length > 0) {        
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
            });
        });
    }
}

function animateCountersOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.counter').forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseFloat(element.dataset.target);
    const duration = 1500;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = target * easeOut;
        
        if (target < 10) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current);
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target < 10 ? target.toFixed(1) : target;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function startJourney() {    
    let targetSection = document.querySelector('.interactive-hub');
    if (!targetSection) {
        targetSection = document.querySelector('.stats-grid');
    }
    if (!targetSection) {
        targetSection = document.querySelector('.quick-insights');
    }
    
    if (targetSection) {
        targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    } 
    
    if (typeof event !== 'undefined' && event && event.target) {
        createParticleEffect(event.target);
    }
}

window.startJourney = startJourney;
window.spinWheel = spinWheel;
window.closeEasterModal = closeEasterModal;
window.showEasterModal = showEasterModal;

function createParticleEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '3px';
        particle.style.height = '3px';
        particle.style.background = '#00ffaa';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 15;
        const distance = 80 + Math.random() * 60;
        
        const targetX = centerX + Math.cos(angle) * distance;
        const targetY = centerY + Math.sin(angle) * distance;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${targetX - centerX}px, ${targetY - centerY}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800 + Math.random() * 400,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
    }
}

function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            console.log("Copied successfully i think")
        }).catch(() => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
    } catch (err) {
        console.log(err)
    }
    
    document.body.removeChild(textArea);
}

function showEasterModal() {
    const modal = document.getElementById('easterModal');
    if (modal) {
        modal.classList.add('show');
        
        createMatrixRain();
        
        setTimeout(() => {
            closeEasterModal();
        }, 10000);
    }
}

function closeEasterModal() {
    const modal = document.getElementById('easterModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

document.addEventListener('keydown', (e) => {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    if (!window.konamiProgress) window.konamiProgress = 0;
    
    if (e.keyCode === konamiCode[window.konamiProgress]) {
        window.konamiProgress++;
        if (window.konamiProgress === konamiCode.length) {
            showEasterModal();
            window.konamiProgress = 0;
        }
    } else {
        window.konamiProgress = 0;
    }
    
    if (e.key === 's' && e.ctrlKey) {
        e.preventDefault();
        spinWheel();
    }
    
    if (e.key === 'Escape') {
        closeEasterModal();
    }
});

function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
        opacity: 0.2;
    `;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const chars = '01234567890123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 12;
    const columns = canvas.width / fontSize;
    const drops = new Array(Math.floor(columns)).fill(1);
    
    let animationId;
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ffaa';
        ctx.font = fontSize + 'px monospace';
        
        drops.forEach((y, index) => {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = index * fontSize;
            
            ctx.fillText(text, x, y * fontSize);
            
            if (y * fontSize > canvas.height && Math.random() > 0.975) {
                drops[index] = 0;
            }
            drops[index]++;
        });
        
        animationId = requestAnimationFrame(draw);
    }
    
    draw();
    
    setTimeout(() => {
        cancelAnimationFrame(animationId);
        canvas.remove();
    }, 8000);
}

if (document.querySelector('.test-option')) {
    document.querySelectorAll('.test-option').forEach(option => {
        option.addEventListener('click', (e) => {
            const type = e.target.dataset.type;
            const result = document.getElementById('patternResult');
            
            let message = '';
            let percentage = '';
            
            switch(type) {
                case 'default':
                    message = 'You follow the Default Bias pattern!';
                    percentage = '78% of people choose this';
                    break;
                case 'simple':
                    message = 'You prefer Simple choices!';
                    percentage = '84% of people avoid complexity';
                    break;
                case 'complex':
                    message = 'You enjoy having many options!';
                    percentage = 'Only 16% choose complex options';
                    break;
            }
            
            if (result) {
                result.innerHTML = `
                    <div style="padding: 1rem; background: rgba(0,255,170,0.1); border: 1px solid var(--accent-color); border-radius: 8px; margin-top: 1rem;">
                        <strong style="color: var(--accent-color);">${message}</strong><br>
                        <em style="color: var(--text-secondary);">${percentage}</em>
                    </div>
                `;
            }
            
        });
    });
}
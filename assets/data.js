let cursorTrail = [];
let isPageLoaded = false;
let radarChart = null;

const radarData = {
    food: {
        labels: ['Sweet', 'Salty', 'Bitter', 'Sour', 'Umami', 'Spicy'],
        data: [85, 73, 22, 45, 38, 67]
    },
    music: {
        labels: ['Pop', 'Rock', 'Classical', 'Jazz', 'Electronic', 'Country'],
        data: [78, 65, 45, 32, 58, 41]
    },
    entertainment: {
        labels: ['Comedy', 'Drama', 'Action', 'Horror', 'Documentary', 'Romance'],
        data: [82, 71, 74, 34, 48, 63]
    },
    lifestyle: {
        labels: ['Urban', 'Rural', 'Active', 'Relaxed', 'Social', 'Private'],
        data: [67, 33, 72, 68, 54, 46]
    }
};

const bubbleTexts = [
    'Statistics', 'Analysis', 'Data Points', 'Trends', 
    'Correlations', 'Insights', 'Patterns', 'Research'
];

document.addEventListener('DOMContentLoaded', function() {
    initializeDataPage();
});

function initializeDataPage() {
    setupCursorTrail();
    setupFloatingBubbles();
    setupRadarChart();
    setupLiveCounters();
    setupInteractiveElements();
    setupScrollAnimations();
    
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
            createDataSparkle(mouseX, mouseY);
        }
    });
    
    function updateTrail() {
        const dx = mouseX - trailX;
        const dy = mouseY - trailY;
        
        trailX += dx * 0.12;
        trailY += dy * 0.12;
        
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
        
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
}

function createDataSparkle(x, y) {
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
        animation: sparkleData 1s ease-out forwards;
    `;
    
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
}

function setupFloatingBubbles() {
    const container = document.querySelector('.preference-bubbles');
    if (!container) return;
    
    function createBubble() {
        if (Math.random() > 0.3) return;
        
        const bubble = document.createElement('div');
        bubble.className = 'data-bubble';
        bubble.textContent = bubbleTexts[Math.floor(Math.random() * bubbleTexts.length)];
        
        const size = 60 + Math.random() * 40;
        bubble.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(0, 255, 170, 0.06);
            border: 1px solid rgba(0, 255, 170, 0.15);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: ${8 + Math.random() * 4}px;
            font-family: var(--font-mono);
            color: var(--accent-color);
            left: ${Math.random() * 100}%;
            top: 100%;
            animation: dataBubbleFloat ${8 + Math.random() * 5}s linear forwards;
            pointer-events: none;
            z-index: 1;
        `;
        
        container.appendChild(bubble);
        
        setTimeout(() => {
            if (bubble.parentNode) bubble.remove();
        }, 15000);
    }
    
    setInterval(createBubble, 5000);
    
    if (!document.querySelector('#dataBubbleStyles')) {
        const style = document.createElement('style');
        style.id = 'dataBubbleStyles';
        style.textContent = `
            @keyframes dataBubbleFloat {
                0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
            @keyframes sparkleData {
                0% { transform: scale(0) rotate(0deg); opacity: 1; }
                50% { transform: scale(1.5) rotate(180deg); opacity: 0.9; }
                100% { transform: scale(0) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

function setupRadarChart() {
    const canvas = document.getElementById('dataRadar');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let currentData = 'food';
    
    function drawRadarChart(category) {
        const data = radarData[category];
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 80;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, (radius / 5) * i, 0, 2 * Math.PI);
            ctx.stroke();
        }
        
        // Draw axis lines
        for (let i = 0; i < data.labels.length; i++) {
            const angle = (i * 2 * Math.PI) / data.labels.length - Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(
                centerX + Math.cos(angle) * radius,
                centerY + Math.sin(angle) * radius
            );
            ctx.stroke();
        }
        
        // Draw data
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 255, 170, 0.2)';
        ctx.strokeStyle = 'rgba(0, 255, 170, 0.8)';
        ctx.lineWidth = 2;
        
        for (let i = 0; i < data.data.length; i++) {
            const angle = (i * 2 * Math.PI) / data.data.length - Math.PI / 2;
            const value = (data.data[i] / 100) * radius;
            const x = centerX + Math.cos(angle) * value;
            const y = centerY + Math.sin(angle) * value;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Draw data points
        ctx.fillStyle = 'rgba(0, 255, 170, 1)';
        for (let i = 0; i < data.data.length; i++) {
            const angle = (i * 2 * Math.PI) / data.data.length - Math.PI / 2;
            const value = (data.data[i] / 100) * radius;
            const x = centerX + Math.cos(angle) * value;
            const y = centerY + Math.sin(angle) * value;
            
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fill();
        }
        
        // Draw labels
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '10px JetBrains Mono';
        ctx.textAlign = 'center';
        
        for (let i = 0; i < data.labels.length; i++) {
            const angle = (i * 2 * Math.PI) / data.labels.length - Math.PI / 2;
            const labelRadius = radius + 15;
            const x = centerX + Math.cos(angle) * labelRadius;
            const y = centerY + Math.sin(angle) * labelRadius;
            
            ctx.fillText(data.labels[i], x, y + 3);
        }
    }
    
    drawRadarChart(currentData);
    
    const radarButtons = document.querySelectorAll('.radar-btn-mini');
    radarButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            radarButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentData = btn.dataset.category;
            drawRadarChart(currentData);
        });
    });
}

function setupLiveCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseFloat(element.dataset.target);
    const duration = 2000;
    const startTime = performance.now();
    const isDecimal = target !== Math.floor(target);
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = easeOut * target;
        
        if (isDecimal) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current);
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = isDecimal ? target.toFixed(1) : target;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function setupInteractiveElements() {
    const tempBars = document.querySelectorAll('.temp-bar');
    tempBars.forEach(bar => {
        bar.addEventListener('click', () => {
            tempBars.forEach(b => b.classList.remove('selected'));
            bar.classList.add('selected');
            highlightTempBar(bar);
        });
    });
    
    const complexityPoints = document.querySelectorAll('.complexity-point');
    complexityPoints.forEach(point => {
        point.addEventListener('click', () => {
            complexityPoints.forEach(p => p.classList.remove('active'));
            point.classList.add('active');
            pulseComplexityPoint(point);
        });
    });
    
    const dataRows = document.querySelectorAll('.data-table tbody tr');
    dataRows.forEach(row => {
        row.addEventListener('click', () => {
            dataRows.forEach(r => r.classList.remove('highlighted'));
            row.classList.add('highlighted');
            highlightDataRow(row);
        });
    });
}

function highlightTempBar(bar) {
    bar.style.animation = 'none';
    setTimeout(() => {
        bar.style.animation = 'tempBarPulse 0.6s ease-in-out';
    }, 10);
}

function pulseComplexityPoint(point) {
    point.style.animation = 'none';
    setTimeout(() => {
        point.style.animation = 'pointPulse 2s ease-in-out infinite, pointHighlight 0.5s ease-in-out';
    }, 10);
}

function highlightDataRow(row) {
    row.style.background = 'rgba(0, 255, 170, 0.1)';
    setTimeout(() => {
        row.style.background = '';
    }, 1000);
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
                
                animateDataSection(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.data-widget, .method-card').forEach(element => {
        observer.observe(element);
    });
}

function animateDataSection(section) {
    if (section.querySelector('.temp-bar')) {
        const bars = section.querySelectorAll('.temp-bar');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.animation = 'growUp 1.5s ease-out, tempBarGlow 2s ease-in-out infinite';
            }, index * 100);
        });
    }
    
    if (section.querySelector('.complexity-point')) {
        const points = section.querySelectorAll('.complexity-point');
        points.forEach((point, index) => {
            setTimeout(() => {
                point.style.opacity = '1';
                point.style.animation = 'pointPulse 2s ease-in-out infinite';
            }, index * 300);
        });
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
        background: rgba(0, 255, 170, 0.3);
        transform: scale(0);
        animation: dataRipple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

document.addEventListener('click', function(event) {
    const clickableElements = event.target.closest('.data-widget, .method-card, .temp-bar, .radar-btn-mini');
    if (clickableElements) {
        createRippleEffect(clickableElements, event);
    }
});

if (!document.querySelector('#dataAnimationStyles')) {
    const style = document.createElement('style');
    style.id = 'dataAnimationStyles';
    style.textContent = `
        @keyframes dataRipple {
            to { transform: scale(2); opacity: 0; }
        }
        @keyframes tempBarPulse {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(1.1); }
        }
        @keyframes tempBarGlow {
            0%, 100% { box-shadow: 0 0 5px rgba(0, 255, 170, 0.3); }
            50% { box-shadow: 0 0 20px rgba(0, 255, 170, 0.6); }
        }
        @keyframes pointHighlight {
            0% { transform: translate(-50%, 50%) scale(1); }
            50% { transform: translate(-50%, 50%) scale(1.5); }
            100% { transform: translate(-50%, 50%) scale(1); }
        }
        .data-table tbody tr.highlighted {
            background: rgba(0, 255, 170, 0.1) !important;
            border-left: 3px solid var(--accent-color);
        }
        .temp-bar.selected::before {
            box-shadow: 0 0 15px rgba(0, 255, 170, 0.8);
        }
        .complexity-point.active {
            background: var(--secondary-accent);
            box-shadow: 0 0 10px rgba(76, 205, 196, 0.8);
        }
    `;
    document.head.appendChild(style);
}

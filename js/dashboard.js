// Curitiba360 - Dashboard Analytics Module

// Seed data simulating metrics from the PDF projection
const dashboardData = {
    visitorsTotal: 18635,
    conversionRate: 6.8, // Average conversion
    revenueTotal: 142450.00, // Simulated total ticket revenue (BRL)
    
    // Monthly visitors by channels
    channels: [
        { name: "QR Hotéis (30)", visitors: 10500, conversion: 10.0, colorClass: "" },
        { name: "QR Bares (30)", visitors: 7500, conversion: 5.0, colorClass: "secondary-color" },
        { name: "Banner DiskIngressos", visitors: 285, conversion: 1.5, colorClass: "" },
        { name: "Mídia / Influencer", visitors: 200, conversion: 2.0, colorClass: "secondary-color" },
        { name: "Acesso Orgânico", visitors: 150, conversion: 5.0, colorClass: "" }
    ],
    
    // Top hotels scanner volume (simulation of QR codes)
    hotels: [
        { name: "Hotel Pestana Curitiba", scans: 1450, percentage: 90 },
        { name: "Radisson Hotel Curitiba", scans: 1210, percentage: 75 },
        { name: "Grand Hotel Rayon", scans: 960, percentage: 60 },
        { name: "Novotel Curitiba Batel", scans: 880, percentage: 55 },
        { name: "Bourbon Curitiba Hotel", scans: 640, percentage: 40 }
    ],
    
    // Tourist profile survey simulated aggregate data (updated live on purchase)
    touristProfile: {
        origins: [
            { name: "São Paulo", value: 42 },
            { name: "Rio de Janeiro", value: 18 },
            { name: "Santa Catarina", value: 15 },
            { name: "Outros Estados", value: 17 },
            { name: "Internacional", value: 8 }
        ],
        reasons: {
            leisure: 65,
            business: 35
        },
        stayDuration: [
            { label: "1-2 dias", value: 30 },
            { label: "3-5 dias", value: 55 },
            { label: "6+ dias", value: 15 }
        ]
    }
};

// Global variables for live stats updates
let liveRegistrations = [];

function initDashboard() {
    renderStatsSummary();
    renderChannelChart();
    renderHotelHeatmap();
    renderDemographicChart();
}

function renderStatsSummary() {
    document.getElementById('dash-stat-visitors').textContent = dashboardData.visitorsTotal.toLocaleString();
    document.getElementById('dash-stat-conversion').textContent = dashboardData.conversionRate.toFixed(1) + "%";
    document.getElementById('dash-stat-revenue').textContent = "R$ " + dashboardData.revenueTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function renderChannelChart() {
    const container = document.getElementById('dash-chart-channels');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Find max value for scale calculation
    const maxVal = Math.max(...dashboardData.channels.map(c => c.visitors));
    
    dashboardData.channels.forEach(ch => {
        const barWrapper = document.createElement('div');
        barWrapper.className = 'chart-bar-wrapper';
        
        // Calculate height percentage
        const heightPct = (ch.visitors / maxVal) * 85; // cap at 85% for labels
        
        const bar = document.createElement('div');
        bar.className = `chart-bar ${ch.colorClass}`;
        bar.style.height = '0%'; // Start at 0 for transition
        bar.setAttribute('data-value', ch.visitors);
        
        const label = document.createElement('div');
        label.className = 'chart-label';
        label.textContent = ch.name;
        
        barWrapper.appendChild(bar);
        barWrapper.appendChild(label);
        container.appendChild(barWrapper);
        
        // Trigger reflow for CSS transition
        setTimeout(() => {
            bar.style.height = `${heightPct}%`;
        }, 100);
    });
}

function renderHotelHeatmap() {
    const list = document.getElementById('dash-hotel-heatmap');
    if (!list) return;
    
    list.innerHTML = '';
    
    dashboardData.hotels.forEach(h => {
        const row = document.createElement('div');
        row.className = 'heatmap-row';
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'name';
        nameSpan.textContent = h.name;
        
        const barBg = document.createElement('div');
        barBg.className = 'heatmap-bar-bg';
        
        const barFill = document.createElement('div');
        barFill.className = 'heatmap-bar-fill';
        barFill.style.width = '0%'; // Start at 0 for transition
        barBg.appendChild(barFill);
        
        const countSpan = document.createElement('span');
        countSpan.className = 'count';
        countSpan.textContent = h.scans;
        
        row.appendChild(nameSpan);
        row.appendChild(barBg);
        row.appendChild(countSpan);
        list.appendChild(row);
        
        setTimeout(() => {
            barFill.style.width = `${h.percentage}%`;
        }, 150);
    });
}

function renderDemographicChart() {
    const container = document.getElementById('dash-chart-demographics');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Find max value for scale calculation
    const maxVal = Math.max(...dashboardData.touristProfile.origins.map(o => o.value));
    
    dashboardData.touristProfile.origins.forEach(origin => {
        const barWrapper = document.createElement('div');
        barWrapper.className = 'chart-bar-wrapper';
        
        // Calculate height percentage
        const heightPct = (origin.value / maxVal) * 85; 
        
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = '0%';
        bar.setAttribute('data-value', origin.value + "%");
        
        const label = document.createElement('div');
        label.className = 'chart-label';
        label.textContent = origin.name;
        
        barWrapper.appendChild(bar);
        barWrapper.appendChild(label);
        container.appendChild(barWrapper);
        
        setTimeout(() => {
            bar.style.height = `${heightPct}%`;
        }, 100);
    });
}

// Function to simulate dynamic real-time traffic updates when a user registers/purchases
function addLiveRegistration(reg) {
    liveRegistrations.unshift(reg);
    
    // Adjust dashboard numbers dynamically
    dashboardData.visitorsTotal += 1;
    dashboardData.revenueTotal += reg.pricePaid;
    
    // Dynamically update hotel metrics if registered from hotel
    if (reg.hotel && reg.hotel !== "none") {
        const hotelName = reg.hotel;
        const matchingHotel = dashboardData.hotels.find(h => h.name.includes(hotelName) || hotelName.includes(h.name));
        if (matchingHotel) {
            matchingHotel.scans += 1;
            // update percentages
            const maxScans = Math.max(...dashboardData.hotels.map(h => h.scans));
            dashboardData.hotels.forEach(h => {
                h.percentage = Math.round((h.scans / maxScans) * 100);
            });
        }
    }
    
    // Update dashboard views if active
    const activeDashboardSection = document.getElementById('section-dashboard');
    if (activeDashboardSection && activeDashboardSection.style.display !== 'none') {
        renderStatsSummary();
        renderHotelHeatmap();
    }
}

window.initDashboard = initDashboard;
window.addLiveRegistration = addLiveRegistration;
window.dashboardData = dashboardData;

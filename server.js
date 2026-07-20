const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DB_FILE = path.join(__dirname, 'data', 'database.json');

// MIME types dictionary for static server
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.ico': 'image/x-icon'
};

// Base stats from the PDF projections (to merge with live data)
const BASE_STATS = {
    visitorsTotal: 18630,
    revenueTotal: 141975.00,
    channels: [
        { name: "QR Hotéis (30)", visitors: 10500, conversion: 10.0, colorClass: "" },
        { name: "QR Bares (30)", visitors: 7500, conversion: 5.0, colorClass: "secondary-color" },
        { name: "Banner DiskIngressos", visitors: 285, conversion: 1.5, colorClass: "" },
        { name: "Mídia / Influencer", visitors: 200, conversion: 2.0, colorClass: "secondary-color" },
        { name: "Acesso Orgânico", visitors: 150, conversion: 5.0, colorClass: "" }
    ],
    hotels: [
        { name: "Hotel Pestana Curitiba", scans: 1448 },
        { name: "Radisson Hotel Curitiba", scans: 1209 },
        { name: "Grand Hotel Rayon", scans: 959 },
        { name: "Novotel Curitiba Batel", scans: 879 },
        { name: "Bourbon Curitiba Hotel", scans: 640 }
    ],
    origins: [
        { name: "São Paulo", value: 40 },
        { name: "Rio de Janeiro", value: 18 },
        { name: "Santa Catarina", value: 14 },
        { name: "Outros Estados", value: 17 },
        { name: "Internacional", value: 7 }
    ]
};

// Helper: Read JSON database safely
function readDatabase() {
    try {
        if (!fs.existsSync(DB_FILE)) {
            // Ensure directory exists
            fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
            fs.writeFileSync(DB_FILE, JSON.stringify({ registrations: [] }, null, 2));
            return { registrations: [] };
        }
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        console.error("Error reading database:", e);
        return { registrations: [] };
    }
}

// Helper: Write to JSON database safely
function writeDatabase(data) {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (e) {
        console.error("Error writing to database:", e);
        return false;
    }
}

// Helper: Calculate aggregated statistics by combining baseline and live DB records
function calculateAggregatedStats() {
    const db = readDatabase();
    const regs = db.registrations;
    
    // Deep clone baseline data
    const stats = JSON.parse(JSON.stringify(BASE_STATS));
    
    // 1. Totalized values
    stats.visitorsTotal += regs.length;
    
    let dbRevenue = 0;
    regs.forEach(r => {
        dbRevenue += Number(r.pricePaid || 0);
        
        // 2. Add dynamic hotel scans
        if (r.hotel) {
            const match = stats.hotels.find(h => h.name === r.hotel || r.hotel.includes(h.name));
            if (match) {
                match.scans += 1;
            }
        }
        
        // 3. Add dynamic origins percentages
        if (r.origin) {
            let matchedOrigin = null;
            if (r.origin.toLowerCase().includes("são paulo") || r.origin.toLowerCase().includes("sp")) {
                matchedOrigin = stats.origins.find(o => o.name === "São Paulo");
            } else if (r.origin.toLowerCase().includes("rio") || r.origin.toLowerCase().includes("rj")) {
                matchedOrigin = stats.origins.find(o => o.name === "Rio de Janeiro");
            } else if (r.origin.toLowerCase().includes("santa catarina") || r.origin.toLowerCase().includes("sc")) {
                matchedOrigin = stats.origins.find(o => o.name === "Santa Catarina");
            } else if (r.origin.toLowerCase().includes("internacional") || r.origin.toLowerCase().includes("inter")) {
                matchedOrigin = stats.origins.find(o => o.name === "Internacional");
            } else {
                matchedOrigin = stats.origins.find(o => o.name === "Outros Estados");
            }
            if (matchedOrigin) matchedOrigin.value += 1;
        }
    });
    
    stats.revenueTotal += dbRevenue;
    
    // Recalculate percentages for hotel scan visual bars
    const maxScans = Math.max(...stats.hotels.map(h => h.scans));
    stats.hotels.forEach(h => {
        h.percentage = Math.round((h.scans / maxScans) * 100);
    });
    
    // Recalculate origins percentages
    const totalOriginsWeight = stats.origins.reduce((acc, o) => acc + o.value, 0);
    stats.origins.forEach(o => {
        o.value = Math.round((o.value / totalOriginsWeight) * 100);
    });
    
    // Conversions stats
    const totalQRVisitors = stats.channels[0].visitors + stats.channels[1].visitors;
    const totalQRConversionsCount = (stats.channels[0].visitors * 0.1) + (stats.channels[1].visitors * 0.05) + regs.length;
    stats.conversionRate = (totalQRConversionsCount / totalQRVisitors) * 100;
    
    return {
        stats,
        registrations: regs
    };
}

// Create native http server
const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const method = req.method;

    console.log(`${method} ${url.pathname}`);

    // --- API Endpoints ---
    
    // GET /api/dashboard
    if (url.pathname === '/api/dashboard' && method === 'GET') {
        const payload = calculateAggregatedStats();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(payload));
        return;
    }

    // POST /api/register
    if (url.pathname === '/api/register' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const regData = JSON.parse(body);
                
                // Input validation
                if (!regData.name || !regData.email) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: "Missing required fields" }));
                    return;
                }
                
                const db = readDatabase();
                db.registrations.unshift(regData); // Add new entry on top
                
                if (writeDatabase(db)) {
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, registration: regData }));
                } else {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: "Database write error" }));
                }
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Malformed JSON body" }));
            }
        });
        return;
    }

    // --- Static File Server ---
    let filePath = path.join(__dirname, url.pathname === '/' ? 'index.html' : url.pathname);
    
    // Prevent directory traversal attacks
    if (!filePath.startsWith(__dirname)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': mimeType });
        
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
    });
});

server.listen(PORT, () => {
    console.log(`Curitiba360 Native server running at:`);
    console.log(`  http://127.0.0.1:${PORT}`);
    console.log(`Press Ctrl+C to shut down the server.`);
});

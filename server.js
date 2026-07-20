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

    // GET /api/commercial-settings
    if (url.pathname === '/api/commercial-settings' && method === 'GET') {
        const db = readDatabase();
        const payload = {
            commercialConditions: db.commercialConditions || [],
            financialInfo: db.financialInfo || []
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(payload));
        return;
    }

    // POST /api/commercial-conditions
    if (url.pathname === '/api/commercial-conditions' && method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const reqData = JSON.parse(body);
                const db = readDatabase();
                db.commercialConditions = db.commercialConditions || [];
                
                // 1. DELETE Action
                if (reqData.action === 'delete') {
                    const idsToDelete = Array.isArray(reqData.ids) ? reqData.ids : [reqData.id];
                    
                    // Check if any is linked
                    const linkedFound = db.commercialConditions.some(c => idsToDelete.includes(c.id) && c.linked);
                    if (linkedFound) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: "Não é possível excluir condição vinculada a contrato" }));
                        return;
                    }
                    
                    db.commercialConditions = db.commercialConditions.filter(c => !idsToDelete.includes(c.id));
                    writeDatabase(db);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true }));
                    return;
                }
                
                // 2. INACTIVATE Action
                if (reqData.action === 'inactivate') {
                    const idsToInactivate = Array.isArray(reqData.ids) ? reqData.ids : [reqData.id];
                    db.commercialConditions.forEach(c => {
                        if (idsToInactivate.includes(c.id)) {
                            c.status = 'Inativo';
                        }
                    });
                    writeDatabase(db);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true }));
                    return;
                }
                
                // 3. CREATE / EDIT Action
                if (reqData.id) {
                    // EDIT Mode
                    const existing = db.commercialConditions.find(c => c.id === Number(reqData.id));
                    if (!existing) {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: "Condição não encontrada" }));
                        return;
                    }
                    if (existing.linked && reqData.nickname !== existing.nickname) {
                        // Business rule: lock if linked (prevent changing structural properties, block editing linked)
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: "Não é possível editar condição vinculada a contrato vigente" }));
                        return;
                    }
                    
                    // Update fields
                    existing.nickname = reqData.nickname;
                    existing.type = reqData.type;
                    existing.value = Number(reqData.value);
                    existing.ccVista = Number(reqData.ccVista);
                    existing.ccParcelado = Number(reqData.ccParcelado);
                    existing.pix = Number(reqData.pix);
                    existing.anticipation = Number(reqData.anticipation);
                    existing.daysLimit = Number(reqData.daysLimit);
                    existing.international = Number(reqData.international);
                    existing.status = reqData.status || existing.status;
                } else {
                    // CREATE Mode
                    const nextId = db.commercialConditions.reduce((max, c) => c.id > max ? c.id : max, 0) + 1;
                    const newCond = {
                        id: nextId,
                        nickname: reqData.nickname,
                        type: reqData.type,
                        value: Number(reqData.value),
                        ccVista: Number(reqData.ccVista),
                        ccParcelado: Number(reqData.ccParcelado),
                        pix: Number(reqData.pix),
                        anticipation: Number(reqData.anticipation),
                        daysLimit: Number(reqData.daysLimit),
                        international: Number(reqData.international),
                        status: reqData.status || 'Ativo',
                        linked: false
                    };
                    db.commercialConditions.push(newCond);
                }
                
                writeDatabase(db);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Malformed JSON body" }));
            }
        });
        return;
    }

    // POST /api/financial-info
    if (url.pathname === '/api/financial-info' && method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const reqData = JSON.parse(body);
                const db = readDatabase();
                db.financialInfo = db.financialInfo || [];
                
                // 1. DELETE Action
                if (reqData.action === 'delete') {
                    const idsToDelete = Array.isArray(reqData.ids) ? reqData.ids : [reqData.id];
                    db.financialInfo = db.financialInfo.filter(f => !idsToDelete.includes(f.id));
                    writeDatabase(db);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true }));
                    return;
                }
                
                // 2. CREATE / EDIT Action
                if (reqData.id) {
                    // EDIT Mode
                    const existing = db.financialInfo.find(f => f.id === Number(reqData.id));
                    if (!existing) {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: "Regra financeira não encontrada" }));
                        return;
                    }
                    existing.nickname = reqData.nickname;
                    existing.status = reqData.status || existing.status;
                    existing.withdrawAllowed = reqData.withdrawAllowed;
                    existing.withdrawPct = Number(reqData.withdrawPct);
                    existing.withdrawMax = Number(reqData.withdrawMax);
                    existing.withdrawMinDays = Number(reqData.withdrawMinDays);
                    existing.pixFee = reqData.pixFee;
                    existing.tedFee = reqData.tedFee;
                } else {
                    // CREATE Mode
                    const nextId = db.financialInfo.reduce((max, f) => f.id > max ? f.id : max, 0) + 1;
                    const newInfo = {
                        id: nextId,
                        nickname: reqData.nickname,
                        status: reqData.status || 'Ativo',
                        withdrawAllowed: reqData.withdrawAllowed,
                        withdrawPct: Number(reqData.withdrawPct),
                        withdrawMax: Number(reqData.withdrawMax),
                        withdrawMinDays: Number(reqData.withdrawMinDays),
                        pixFee: reqData.pixFee,
                        tedFee: reqData.tedFee,
                        linked: false
                    };
                    db.financialInfo.push(newInfo);
                }
                
                writeDatabase(db);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Malformed JSON body" }));
            }
        });
        return;
    }

    // GET /api/refunds
    if (url.pathname === '/api/refunds' && method === 'GET') {
        const db = readDatabase();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(db.refunds || []));
        return;
    }

    // POST /api/refunds
    if (url.pathname === '/api/refunds' && method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const reqData = JSON.parse(body);
                const db = readDatabase();
                db.refunds = db.refunds || [];
                
                const nowStr = new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR');
                
                // 1. UPDATE STATUS / MARCAR EM ANÁLISE
                if (reqData.action === 'status-update') {
                    const idsToUpdate = Array.isArray(reqData.ids) ? reqData.ids : [reqData.id];
                    db.refunds.forEach(r => {
                        if (idsToUpdate.includes(r.id)) {
                            r.status = reqData.status;
                            r.history.push({
                                actor: "Administrador",
                                action: `Status alterado para ${reqData.status}`,
                                date: nowStr
                            });
                        }
                    });
                    writeDatabase(db);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true }));
                    return;
                }
                
                // 2. APPROVE ACTION
                if (reqData.action === 'approve') {
                    const r = db.refunds.find(ref => ref.id === Number(reqData.id));
                    if (!r) {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: "Solicitação não encontrada" }));
                        return;
                    }
                    
                    r.status = "Aprovado";
                    r.ticketStatus = "Cancelado";
                    r.approvedAmount = Number(reqData.approvedAmount);
                    r.returnMethod = reqData.returnMethod;
                    r.internalNotes = reqData.internalNotes;
                    r.history.push({
                        actor: "Administrador",
                        action: `Reembolso Aprovado (R$ ${Number(reqData.approvedAmount).toFixed(2)} via ${reqData.returnMethod})`,
                        date: nowStr
                    });
                    
                    writeDatabase(db);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true }));
                    return;
                }
                
                // 3. REJECT ACTION
                if (reqData.action === 'reject') {
                    const idsToReject = Array.isArray(reqData.ids) ? reqData.ids : [reqData.id];
                    const reason = reqData.reason || "Rejeitado pelo administrador.";
                    
                    db.refunds.forEach(r => {
                        if (idsToReject.includes(r.id)) {
                            r.status = "Rejeitado";
                            r.history.push({
                                actor: "Administrador",
                                action: `Reembolso Rejeitado: ${reason}`,
                                date: nowStr
                            });
                        }
                    });
                    
                    writeDatabase(db);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true }));
                    return;
                }
                
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Invalid action type" }));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Malformed JSON body" }));
            }
        });
        return;
    }

    // GET /api/srs-data
    if (url.pathname === '/api/srs-data' && method === 'GET') {
        const db = readDatabase();
        const payload = {
            contracts: db.contracts || [],
            attractions: db.attractions || [],
            agencies: db.agencies || [],
            cms: db.cms || { faq: [], banners: [] },
            notifications: db.notifications || [],
            packages: db.packages || [],
            commercialConditions: db.commercialConditions || [],
            financialInfo: db.financialInfo || []
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(payload));
        return;
    }

    // POST /api/srs-data
    if (url.pathname === '/api/srs-data' && method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const reqData = JSON.parse(body);
                const db = readDatabase();
                const col = reqData.collection;
                const act = reqData.action;
                const record = reqData.data || {};
                
                if (!col || !act) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: "Missing collection or action parameters" }));
                    return;
                }
                
                db[col] = db[col] || [];
                
                // 1. CREATE Action
                if (act === 'create') {
                    const nextId = db[col].reduce((max, r) => r.id > max ? r.id : max, 0) + 1;
                    record.id = nextId;
                    db[col].push(record);
                } 
                // 2. EDIT Action
                else if (act === 'edit') {
                    const existing = db[col].find(r => r.id === Number(record.id));
                    if (!existing) {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: "Record not found" }));
                        return;
                    }
                    Object.assign(existing, record);
                } 
                // 3. DELETE Action
                else if (act === 'delete') {
                    const idsToDelete = Array.isArray(reqData.ids) ? reqData.ids : [Number(reqData.id)];
                    db[col] = db[col].filter(r => !idsToDelete.includes(r.id));
                } 
                // 4. INACTIVATE Action
                else if (act === 'inactivate') {
                    const idsToInactivate = Array.isArray(reqData.ids) ? reqData.ids : [Number(reqData.id)];
                    db[col].forEach(r => {
                        if (idsToInactivate.includes(r.id)) {
                            r.status = 'Inativo';
                        }
                    });
                } 
                // 5. DOCUSIGN Action (specific to contracts)
                else if (act === 'send-docusign') {
                    const idsToSign = Array.isArray(reqData.ids) ? reqData.ids : [Number(reqData.id)];
                    db[col].forEach(r => {
                        if (idsToSign.includes(r.id)) {
                            r.status = 'Enviado a Docusign';
                        }
                    });
                }
                
                writeDatabase(db);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Malformed JSON body" }));
            }
        });
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

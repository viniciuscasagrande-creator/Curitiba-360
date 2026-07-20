// Curitiba360 - Interactive Map Module

const touristSpots = {
    pt: {
        botanico: {
            title: "Jardim Botânico",
            desc: "Inaugurado em 1991, o Jardim Botânico de Curitiba é o principal cartão-postal da cidade. Sua estufa de ferro e vidro inspirada no Palácio de Cristal de Londres abriga espécies botânicas que são referência nacional, cercada por jardins de estilo francês impecavelmente desenhados.",
            horario: "06:00 - 20:00 (Diário)",
            ingresso: "Gratuito",
            tags: ["Natureza", "Fotografia", "Ícone"],
            image: "https://images.unsplash.com/photo-1599839600109-6617e920d36b?auto=format&fit=crop&w=600&q=80" // Placeholder from Unsplash
        },
        opera: {
            title: "Ópera de Arame",
            desc: "Construída em apenas 75 dias em 1992, a Ópera de Arame é uma estrutura tubular única montada sobre um lago em uma antiga pedreira. O local sedia grandes shows teatrais e musicais, cercada por paredões de pedra, cascatas e vegetação nativa exuberante.",
            horario: "10:00 - 18:00 (Terça a Domingo)",
            ingresso: "R$ 15,00 (Inteira)",
            tags: ["Cultura", "Música", "Arquitetura"],
            image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=600&q=80"
        },
        mon: {
            title: "Museu Oscar Niemeyer (MON)",
            desc: "Conhecido localmente como o 'Museu do Olho' devido ao seu design audacioso projetado pelo arquiteto Oscar Niemeyer, é um dos maiores museus de arte da América Latina. Abriga exposições de artes visuais, design e arquitetura nacionais e internacionais.",
            horario: "10:00 - 18:00 (Terça a Domingo)",
            ingresso: "R$ 30,00 (Inteira)",
            tags: ["Arte", "Arquitetura", "Design"],
            image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=600&q=80"
        },
        historico: {
            title: "Centro Histórico & Largo",
            desc: "O berço de Curitiba. Ruas de paralelepípedo, casarões coloridos do século XVIII e XIX, igrejas coloniais e a famosa feira de artesanato de domingo. Uma caminhada mágica que saboreia a história, cafés locais e a vibrante cultura artística curitibana.",
            horario: "Livre (Comércio varia)",
            ingresso: "Gratuito",
            tags: ["História", "Gastronomia", "Arte"],
            image: "https://images.unsplash.com/photo-1513829096999-4978602297f7?auto=format&fit=crop&w=600&q=80"
        },
        lerner: {
            title: "Parque Jaime Lerner",
            desc: "Um espaço verde inovador dedicado ao urbanismo sustentável e planejamento urbano, homenageando o icônico arquiteto e prefeito de Curitiba, Jaime Lerner. Integra design ecológico, ciclovias modernas e o memorial da revolução do transporte urbano de Curitiba.",
            horario: "08:00 - 18:00 (Diário)",
            ingresso: "Gratuito",
            tags: ["Urbanismo", "Lazer", "Sustentabilidade"],
            image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80"
        }
    },
    en: {
        botanico: {
            title: "Botanical Garden",
            desc: "Opened in 1991, Curitiba's Botanical Garden is the city's main postcard. Its iron and glass greenhouse, inspired by London's Crystal Palace, houses botanical species that are a national reference, surrounded by impeccably manicured French-style gardens.",
            horario: "06:00 AM - 08:00 PM (Daily)",
            ingresso: "Free Entry",
            tags: ["Nature", "Photography", "Iconic"],
            image: "https://images.unsplash.com/photo-1599839600109-6617e920d36b?auto=format&fit=crop&w=600&q=80"
        },
        opera: {
            title: "Wire Opera House",
            desc: "Built in just 75 days in 1992, the Wire Opera House is a unique tubular structure erected over a lake in a former quarry. The venue hosts major theatrical and musical shows, surrounded by stone walls, waterfalls, and lush native vegetation.",
            horario: "10:00 AM - 06:00 PM (Tue to Sun)",
            ingresso: "R$ 15.00 (Full Ticket)",
            tags: ["Culture", "Music", "Architecture"],
            image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=600&q=80"
        },
        mon: {
            title: "Oscar Niemeyer Museum (MON)",
            desc: "Known locally as the 'Eye Museum' due to its bold design by world-renowned architect Oscar Niemeyer, it is one of the largest art museums in Latin America. It hosts exhibitions of visual arts, national and international design, and architecture.",
            horario: "10:00 AM - 06:00 PM (Tue to Sun)",
            ingresso: "R$ 30.00 (Full Ticket)",
            tags: ["Art", "Architecture", "Design"],
            image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=600&q=80"
        },
        historico: {
            title: "Historic Center & Largo",
            desc: "The birthplace of Curitiba. Cobblestone streets, colorful 18th and 19th-century mansions, colonial churches, and the famous Sunday crafts fair. A magical walk that relishes history, local specialty coffee, and the vibrant arts scene.",
            horario: "Open access (Shops vary)",
            ingresso: "Free Entry",
            tags: ["History", "Gastronomy", "Art"],
            image: "https://images.unsplash.com/photo-1513829096999-4978602297f7?auto=format&fit=crop&w=600&q=80"
        },
        lerner: {
            title: "Jaime Lerner Park",
            desc: "An innovative green space dedicated to sustainable urbanism and city planning, honoring Curitiba's iconic architect and former mayor, Jaime Lerner. Integrates ecological design, modern bike lanes, and the memorial of Curitiba's bus rapid transit system.",
            horario: "08:00 AM - 06:00 PM (Daily)",
            ingresso: "Free Entry",
            tags: ["Urbanism", "Leisure", "Sustainability"],
            image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80"
        }
    }
};

function initMap(language) {
    const pins = document.querySelectorAll('.map-pin');
    const placeholder = document.getElementById('map-placeholder');
    const content = document.getElementById('map-content');
    
    // UI detail bindings
    const detailImg = document.getElementById('detail-img');
    const detailTitle = document.getElementById('detail-title');
    const detailDesc = document.getElementById('detail-desc');
    const detailHorario = document.getElementById('detail-horario');
    const detailIngresso = document.getElementById('detail-ingresso');
    const detailTags = document.getElementById('detail-tags');
    const detailLabelHorario = document.getElementById('label-horario');
    const detailLabelIngresso = document.getElementById('label-ingresso');

    pins.forEach(pin => {
        pin.addEventListener('click', function() {
            // Remove active class from all pins
            pins.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked pin
            this.classList.add('active');
            
            const spotKey = this.getAttribute('data-spot');
            const data = touristSpots[language][spotKey];
            
            if (data) {
                // Populate details
                detailTitle.textContent = data.title;
                detailDesc.textContent = data.desc;
                detailHorario.textContent = data.horario;
                detailIngresso.textContent = data.ingresso;
                detailImg.src = data.image;
                detailImg.alt = data.title;
                
                // Set translations for labels
                detailLabelHorario.textContent = language === 'pt' ? 'HORÁRIO' : 'OPEN HOURS';
                detailLabelIngresso.textContent = language === 'pt' ? 'INGRESSO' : 'TICKET';
                
                // Clear and render tags
                detailTags.innerHTML = '';
                data.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.className = 'section-badge';
                    tagSpan.style.margin = '0 6px 6px 0';
                    tagSpan.style.fontSize = '10px';
                    tagSpan.style.padding = '4px 10px';
                    tagSpan.textContent = tag;
                    detailTags.appendChild(tagSpan);
                });
                
                // Switch panel view
                placeholder.style.display = 'none';
                content.style.display = 'block';
                content.classList.add('active');
            }
        });
    });
}

// Function to refresh details text when language changes without clearing the active selection
function refreshMapLanguage(language) {
    const activePin = document.querySelector('.map-pin.active');
    if (activePin) {
        const spotKey = activePin.getAttribute('data-spot');
        const data = touristSpots[language][spotKey];
        if (data) {
            document.getElementById('detail-title').textContent = data.title;
            document.getElementById('detail-desc').textContent = data.desc;
            document.getElementById('detail-horario').textContent = data.horario;
            document.getElementById('detail-ingresso').textContent = data.ingresso;
            document.getElementById('label-horario').textContent = language === 'pt' ? 'HORÁRIO' : 'OPEN HOURS';
            document.getElementById('label-ingresso').textContent = language === 'pt' ? 'INGRESSO' : 'TICKET';
            
            const detailTags = document.getElementById('detail-tags');
            detailTags.innerHTML = '';
            data.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'section-badge';
                tagSpan.style.margin = '0 6px 6px 0';
                tagSpan.style.fontSize = '10px';
                tagSpan.style.padding = '4px 10px';
                tagSpan.textContent = tag;
                detailTags.appendChild(tagSpan);
            });
        }
    }
}
window.initMap = initMap;
window.refreshMapLanguage = refreshMapLanguage;

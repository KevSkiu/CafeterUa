/**
 * Render Products Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');

    // Check if data exists
    if (typeof products === 'undefined' || !productGrid) {
        console.error("Data or Container missing");
        return;
    }

    // Currency Formatter
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN'
        }).format(price);
    };

    /**
     * Create Product Card HTML
     */
    const createProductCard = (product) => {
        const article = document.createElement('article');
        article.className = 'group bg-white rounded-3xl overflow-hidden shadow-lg border border-coffee-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col';

        article.innerHTML = `
            <div class="relative h-64 overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
                <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-coffee-800 shadow-sm">
                    ${product.category === 'hot' ? 'Caliente' : product.category === 'cold' ? 'Frío' : 'Postre'}
                </div>
            </div>
            
            <div class="p-6 flex flex-col flex-grow">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-bold text-brand-dark font-serif">${product.name}</h3>
                    <span class="text-lg font-bold text-brand-gold">${formatPrice(product.price)}</span>
                </div>
                
                <p class="text-coffee-600 text-sm leading-relaxed mb-6 flex-grow">
                    ${product.description}
                </p>
                
                <button class="w-full py-3 rounded-xl bg-coffee-50 text-coffee-400 font-bold text-sm uppercase tracking-wider border border-coffee-100 cursor-not-allowed group-hover:bg-coffee-100 group-hover:text-coffee-500 transition-colors relative overflow-hidden" disabled>
                    <span class="relative z-10">Pedir (Próximamente)</span>
                </button>
            </div>
        `;

        return article;
    };

    /**
     * Render functions
     */
    const renderProducts = (categoryFilter = 'all') => {
        productGrid.innerHTML = ''; // Clear loading/existing

        const filteredProducts = categoryFilter === 'all'
            ? products
            : products.filter(p => p.category === categoryFilter);

        filteredProducts.forEach(product => {
            productGrid.appendChild(createProductCard(product));
        });
    };

    // Initial Render
    renderProducts();

    // Category Buttons Logic (Simple implementation)
    // Note: In a real app, we would add event listeners to the buttons.
    // For this prototype, let's just make the existing buttons functional visually if the user wanted to filter.
    // Finding buttons with the specific text to add click handlers

    // Select all filter buttons
    const buttons = document.querySelectorAll('#menu button');

    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active classes from all
            buttons.forEach(b => {
                b.classList.remove('bg-white', 'border-coffee-200');
                b.classList.add('bg-transparent', 'border-coffee-200'); // Reset to default
            });
            // Add active class to clicked (simulated logic for visual toggle)
            e.target.classList.remove('bg-transparent');
            e.target.classList.add('bg-white'); // Active state

            // Filter logic map
            const text = e.target.innerText.toLowerCase();
            let filter = 'all';
            if (text.includes('calientes')) filter = 'hot';
            if (text.includes('fríos')) filter = 'cold';
            if (text.includes('postres')) filter = 'dessert';

            renderProducts(filter);
        });
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md', 'bg-white/95');
            navbar.classList.remove('bg-white/80');
        } else {
            navbar.classList.remove('shadow-md', 'bg-white/95');
            navbar.classList.add('bg-white/80');
        }
    });

    // Reveal Animation on Scroll
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();
});

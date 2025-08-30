// ===== MENU PAGE SPECIFIC FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    initMenuSearch();
    initMenuFilters();
    initCategoryNavigation();
    
    // Add menu-specific accessibility enhancements
    enhanceMenuAccessibility();
});

// ===== MENU SEARCH FUNCTIONALITY =====
function initMenuSearch() {
    const searchInput = document.getElementById('menu-search');
    const menuItems = document.querySelectorAll('.menu-item-card');
    
    if (!searchInput) return;
    
    // Debounced search function
    const debouncedSearch = debounce((searchTerm) => {
        filterMenuItems(searchTerm, menuItems);
    }, 300);
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        debouncedSearch(searchTerm);
    });
    
    // Clear search on escape
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            filterMenuItems('', menuItems);
            searchInput.blur();
        }
    });
}

function filterMenuItems(searchTerm, menuItems) {
    let visibleCount = 0;
    
    menuItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const description = item.querySelector('.description').textContent.toLowerCase();
        const tags = item.dataset.tags ? item.dataset.tags.toLowerCase() : '';
        
        const isVisible = searchTerm === '' || 
                         title.includes(searchTerm) || 
                         description.includes(searchTerm) ||
                         tags.includes(searchTerm);
        
        if (isVisible) {
            showMenuItem(item);
            visibleCount++;
        } else {
            hideMenuItem(item);
        }
    });
    
    // Show/hide categories based on visible items
    updateCategoryVisibility();
    
    // Show no results message if needed
    showNoResultsMessage(visibleCount, searchTerm);
}

// ===== ENHANCED MENU FILTERS =====
function initMenuFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Clear search when filtering
            const searchInput = document.getElementById('menu-search');
            if (searchInput) {
                searchInput.value = '';
            }
            
            // Filter items with enhanced animation
            filterByCategory(filter, menuItems);
            
            // Update URL hash for deep linking
            updateUrlHash(filter);
            
            // Announce filter change for screen readers
            announceFilterChange(btn.textContent.trim());
        });
    });
    
    // Handle initial filter from URL hash
    handleInitialFilter();
}

function filterByCategory(filter, menuItems) {
    let visibleCount = 0;
    
    menuItems.forEach((item, index) => {
        const tags = item.dataset.tags || '';
        const shouldShow = filter === 'all' || tags.includes(filter);
        
        if (shouldShow) {
            // Stagger the show animation
            setTimeout(() => showMenuItem(item), index * 50);
            visibleCount++;
        } else {
            hideMenuItem(item);
        }
    });
    
    updateCategoryVisibility();
    
    // Scroll to first visible category if filtering
    if (filter !== 'all' && visibleCount > 0) {
        scrollToFirstVisibleCategory();
    }
}

// ===== MENU ITEM ANIMATION HELPERS =====
function showMenuItem(item) {
    item.classList.remove('hidden');
    item.classList.add('visible');
    item.style.display = 'block';
    item.setAttribute('aria-hidden', 'false');
}

function hideMenuItem(item) {
    item.classList.remove('visible');
    item.classList.add('hidden');
    item.setAttribute('aria-hidden', 'true');
    
    // Hide after animation completes
    setTimeout(() => {
        if (item.classList.contains('hidden')) {
            item.style.display = 'none';
        }
    }, 200);
}

// ===== CATEGORY VISIBILITY MANAGEMENT =====
function updateCategoryVisibility() {
    const categories = document.querySelectorAll('.menu-category');
    
    categories.forEach(category => {
        const visibleItems = category.querySelectorAll('.menu-item-card.visible, .menu-item-card:not(.hidden)');
        const categoryHeader = category.querySelector('.category-header');
        
        if (visibleItems.length === 0) {
            category.style.display = 'none';
            categoryHeader.setAttribute('aria-hidden', 'true');
        } else {
            category.style.display = 'block';
            categoryHeader.setAttribute('aria-hidden', 'false');
        }
    });
}

// ===== NO RESULTS MESSAGE =====
function showNoResultsMessage(visibleCount, searchTerm) {
    let noResultsMsg = document.getElementById('no-results-message');
    
    if (visibleCount === 0 && searchTerm !== '') {
        if (!noResultsMsg) {
            noResultsMsg = createNoResultsMessage();
            document.querySelector('.menu-full .container').appendChild(noResultsMsg);
        }
        noResultsMsg.style.display = 'block';
        noResultsMsg.querySelector('.search-term').textContent = searchTerm;
        
        // Announce to screen readers
        setTimeout(() => {
            announceToScreenReader(`No se encontraron resultados para "${searchTerm}"`);
        }, 100);
    } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

function createNoResultsMessage() {
    const div = document.createElement('div');
    div.id = 'no-results-message';
    div.className = 'no-results';
    div.innerHTML = `
        <div class="no-results-content">
            <h3>No se encontraron resultados</h3>
            <p>No hay platos que coincidan con "<span class="search-term"></span>"</p>
            <button class="btn btn-secondary" onclick="clearSearch()">Limpiar búsqueda</button>
        </div>
    `;
    
    // Add styles
    const styles = `
        .no-results {
            text-align: center;
            padding: 4rem 2rem;
            color: var(--muted);
        }
        .no-results-content h3 {
            margin-bottom: 1rem;
            color: var(--text);
        }
        .search-term {
            font-weight: 600;
            color: var(--accent);
        }
    `;
    
    if (!document.querySelector('#no-results-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'no-results-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    return div;
}

// ===== CLEAR SEARCH FUNCTION =====
function clearSearch() {
    const searchInput = document.getElementById('menu-search');
    const menuItems = document.querySelectorAll('.menu-item-card');
    
    if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
    }
    
    // Show all items
    menuItems.forEach(item => showMenuItem(item));
    updateCategoryVisibility();
    
    const noResultsMsg = document.getElementById('no-results-message');
    if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

// ===== URL HASH MANAGEMENT =====
function updateUrlHash(filter) {
    if (filter === 'all') {
        history.replaceState(null, null, window.location.pathname);
    } else {
        history.replaceState(null, null, `#filter-${filter}`);
    }
}

function handleInitialFilter() {
    const hash = window.location.hash;
    if (hash.startsWith('#filter-')) {
        const filter = hash.replace('#filter-', '');
        const filterBtn = document.querySelector(`[data-filter="${filter}"]`);
        if (filterBtn) {
            filterBtn.click();
        }
    }
}

// ===== CATEGORY NAVIGATION =====
function initCategoryNavigation() {
    // Add smooth scroll to category headers when they become visible
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    categoryHeaders.forEach(header => {
        const categoryId = header.closest('.menu-category').id;
        if (categoryId) {
            header.setAttribute('id', `${categoryId}-header`);
        }
    });
}

function scrollToFirstVisibleCategory() {
    const firstVisibleCategory = document.querySelector('.menu-category[style*="block"], .menu-category:not([style*="none"])');
    if (firstVisibleCategory) {
        const navbar = document.querySelector('.navbar');
        const offset = navbar ? navbar.offsetHeight + 20 : 20;
        
        setTimeout(() => {
            window.scrollTo({
                top: firstVisibleCategory.offsetTop - offset,
                behavior: 'smooth'
            });
        }, 300);
    }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function enhanceMenuAccessibility() {
    // Add live region for filter announcements
    if (!document.getElementById('menu-live-region')) {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'menu-live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
        document.body.appendChild(liveRegion);
    }
    
    // Enhance filter buttons with proper ARIA labels
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        const filter = btn.dataset.filter;
        btn.setAttribute('aria-label', `Filtrar por ${btn.textContent.trim()}`);
        btn.setAttribute('role', 'button');
    });
    
    // Add proper labels to menu items
    const menuItems = document.querySelectorAll('.menu-item-card');
    menuItems.forEach((item, index) => {
        const title = item.querySelector('h3').textContent;
        const price = item.querySelector('.price').textContent;
        item.setAttribute('aria-label', `${title}, ${price}`);
    });
    
    // Keyboard navigation for filter buttons
    addKeyboardNavigation();
}

function addKeyboardNavigation() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach((btn, index) => {
        btn.addEventListener('keydown', (e) => {
            let targetIndex;
            
            switch (e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    targetIndex = index > 0 ? index - 1 : filterBtns.length - 1;
                    filterBtns[targetIndex].focus();
                    break;
                    
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    targetIndex = index < filterBtns.length - 1 ? index + 1 : 0;
                    filterBtns[targetIndex].focus();
                    break;
                    
                case 'Home':
                    e.preventDefault();
                    filterBtns[0].focus();
                    break;
                    
                case 'End':
                    e.preventDefault();
                    filterBtns[filterBtns.length - 1].focus();
                    break;
            }
        });
    });
}

// ===== SCREEN READER ANNOUNCEMENTS =====
function announceFilterChange(filterName) {
    const message = `Mostrando platos filtrados por ${filterName}`;
    announceToScreenReader(message);
}

function announceToScreenReader(message) {
    const liveRegion = document.getElementById('menu-live-region');
    if (liveRegion) {
        liveRegion.textContent = message;
        
        // Clear after announcement
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy load menu item images when they become visible
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.clearSearch = clearSearch;

// Initialize lazy loading if needed
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyLoading);
} else {
    initLazyLoading();
}

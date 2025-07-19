// Popup script - handles the extension popup interface
document.addEventListener('DOMContentLoaded', function() {
    const loadingDiv = document.getElementById('loading');
    const resultsDiv = document.getElementById('results');
    const noResultsDiv = document.getElementById('no-results');
    const techGrid = document.getElementById('tech-grid');
    const currentUrl = document.getElementById('current-url');
    const refreshBtn = document.getElementById('refresh-btn');
    const exportBtn = document.getElementById('export-btn');
    const exportMenu = document.getElementById('export-menu');
    
    let currentResults = null;

    // Initialize popup
    init();

    async function init() {
        try {
            // Get current tab
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            currentUrl.textContent = tab.url;

            // Get detection results
            await getResults();
        } catch (error) {
            console.error('Error initializing popup:', error);
            showError('Failed to initialize extension');
        }
    }

    async function getResults() {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            // Send message to content script to get results
            chrome.tabs.sendMessage(tab.id, { action: 'getResults' }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error('Error getting results:', chrome.runtime.lastError);
                    // Try to inject content script if it's not available
                    injectContentScriptAndRetry(tab.id);
                    return;
                }
                
                if (response && response.technologies) {
                    currentResults = response;
                    displayResults(response);
                } else {
                    showNoResults();
                }
            });
        } catch (error) {
            console.error('Error getting results:', error);
            showError('Failed to get detection results');
        }
    }

    // Inject content script if it's not available
    async function injectContentScriptAndRetry(tabId) {
        try {
            await chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ['content.js']
            });
            
            // Wait a bit for the script to initialize
            setTimeout(() => {
                chrome.tabs.sendMessage(tabId, { action: 'getResults' }, (response) => {
                    if (chrome.runtime.lastError) {
                        console.error('Error after injection:', chrome.runtime.lastError);
                        showError('Failed to get detection results');
                        return;
                    }
                    
                    if (response && response.technologies) {
                        currentResults = response;
                        displayResults(response);
                    } else {
                        showNoResults();
                    }
                });
            }, 1000);
        } catch (error) {
            console.error('Error injecting content script:', error);
            showError('Failed to inject content script');
        }
    }

    function displayResults(results) {
        loadingDiv.style.display = 'none';
        noResultsDiv.style.display = 'none';
        resultsDiv.style.display = 'block';

        const technologies = results.technologies || [];
        
        // Update stats
        updateStats(technologies);
        
        // Clear existing results
        techGrid.innerHTML = '';

        if (technologies.length === 0) {
            showNoResults();
            return;
        }

        // Sort technologies by category and confidence
        technologies.sort((a, b) => {
            if (a.category !== b.category) {
                return a.category.localeCompare(b.category);
            }
            return (b.confidence || 0) - (a.confidence || 0);
        });

        // Display each technology
        technologies.forEach(tech => {
            const techItem = createTechItem(tech);
            techGrid.appendChild(techItem);
        });
    }

    function createTechItem(tech) {
        const item = document.createElement('div');
        item.className = 'tech-item';
        
        const confidence = (tech.confidence || 0) * 100;
        const categoryClass = getCategoryClass(tech.category);
        
        item.innerHTML = `
            <div class="tech-name ${categoryClass}">${tech.name}</div>
            <div class="tech-category">${tech.category}</div>
            <div class="confidence-bar">
                <div class="confidence-fill" style="width: ${confidence}%"></div>
            </div>
            <div class="confidence-text">${Math.round(confidence)}% confidence</div>
        `;
        
        return item;
    }

    function getCategoryClass(category) {
        const categoryMap = {
            'Framework': 'category-frameworks',
            'UI Framework': 'category-frameworks',
            'CSS Framework': 'category-css',
            'Icon Library': 'category-css',
            'CMS': 'category-cms',
            'E-commerce': 'category-cms',
            'Website Builder': 'category-cms',
            'Analytics': 'category-analytics',
            'Build Tool': 'category-build',
            'Testing': 'category-build',
            'Development Tool': 'category-build'
        };
        return categoryMap[category] || 'category-other';
    }

    function updateStats(technologies) {
        const totalCount = technologies.length;
        const frameworkCount = technologies.filter(t => 
            ['Framework', 'UI Framework', 'CSS Framework'].includes(t.category)).length;
        const libraryCount = technologies.filter(t => 
            ['Library', 'Visualization', '3D Library', 'Animation', 'Icon Library', 'HTTP Library', 'WebSocket', 'Maps', 'UI Component', 'Payment'].includes(t.category)).length;

        document.getElementById('total-count').textContent = totalCount;
        document.getElementById('framework-count').textContent = frameworkCount;
        document.getElementById('library-count').textContent = libraryCount;
    }

    function showNoResults() {
        loadingDiv.style.display = 'none';
        resultsDiv.style.display = 'none';
        noResultsDiv.style.display = 'block';
    }

    function showError(message) {
        loadingDiv.style.display = 'none';
        resultsDiv.style.display = 'none';
        noResultsDiv.style.display = 'block';
        noResultsDiv.innerHTML = `
            <div class="no-results-icon">❌</div>
            <div>${message}</div>
        `;
    }

    // Event listeners
    refreshBtn.addEventListener('click', async () => {
        loadingDiv.style.display = 'block';
        resultsDiv.style.display = 'none';
        noResultsDiv.style.display = 'none';
        
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            chrome.tabs.sendMessage(tab.id, { action: 'redetect' }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error('Error during refresh:', chrome.runtime.lastError);
                    showError('Failed to refresh results');
                    return;
                }
                
                if (response && response.technologies) {
                    currentResults = response;
                    displayResults(response);
                } else {
                    showNoResults();
                }
            });
        } catch (error) {
            console.error('Error during refresh:', error);
            showError('Failed to refresh results');
        }
    });

    exportBtn.addEventListener('click', () => {
        exportMenu.classList.toggle('show');
    });

    // Close export menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!exportBtn.contains(event.target) && !exportMenu.contains(event.target)) {
            exportMenu.classList.remove('show');
        }
    });

    // Export functionality
    document.querySelectorAll('.export-option').forEach(option => {
        option.addEventListener('click', () => {
            const format = option.dataset.format;
            exportResults(format);
            exportMenu.classList.remove('show');
        });
    });

    function exportResults(format) {
        if (!currentResults || !currentResults.technologies) {
            alert('No results to export');
            return;
        }

        const data = {
            url: currentResults.url,
            detectedAt: new Date().toISOString(),
            technologies: currentResults.technologies
        };

        switch (format) {
            case 'json':
                downloadFile(JSON.stringify(data, null, 2), 'tech-stack-detection.json', 'application/json');
                break;
            case 'csv':
                const csv = convertToCSV(data.technologies);
                downloadFile(csv, 'tech-stack-detection.csv', 'text/csv');
                break;
            case 'copy':
                const text = data.technologies.map(t => `${t.name} (${t.category})`).join('\n');
                navigator.clipboard.writeText(text).then(() => {
                    showNotification('Results copied to clipboard!');
                }).catch(err => {
                    console.error('Failed to copy to clipboard:', err);
                    alert('Failed to copy to clipboard');
                });
                break;
        }
    }

    function convertToCSV(technologies) {
        const headers = ['Name', 'Category', 'Confidence'];
        const rows = technologies.map(tech => [
            tech.name,
            tech.category,
            Math.round((tech.confidence || 0) * 100) + '%'
        ]);
        
        return [headers, ...rows].map(row => 
            row.map(field => `"${field}"`).join(',')
        ).join('\n');
    }

    function downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    function showNotification(message) {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #48bb78;
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 10000;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }
});
// Enhanced content.js - More comprehensive tech detection
class TechDetector {
  constructor() {
    this.detectedTechs = [];
    this.confidence = {};
    this.techDatabase = this.loadTechDatabase();
  }

  // Comprehensive technology database with detection patterns
  loadTechDatabase() {
    return {
      // JavaScript Frameworks
      'React': {
        patterns: [
          { check: () => !!(window.React || window.__REACT_DEVTOOLS_GLOBAL_HOOK__), weight: 0.9 },
          { check: () => !!document.querySelector('[data-reactroot]'), weight: 0.8 },
          { check: () => !!document.querySelector('[data-react-helmet]'), weight: 0.7 },
          { check: () => this.hasTextInScripts('React'), weight: 0.6 },
          { check: () => this.hasScriptSrc('react'), weight: 0.8 }
        ],
        category: 'Framework'
      },
      'Vue.js': {
        patterns: [
          { check: () => !!(window.Vue || window.__VUE__), weight: 0.9 },
          { check: () => !!document.querySelector('[data-server-rendered="true"]'), weight: 0.8 },
          { check: () => !!document.querySelector('[v-]'), weight: 0.7 },
          { check: () => this.hasTextInScripts('Vue'), weight: 0.6 },
          { check: () => this.hasScriptSrc('vue'), weight: 0.8 }
        ],
        category: 'Framework'
      },
      'Angular': {
        patterns: [
          { check: () => !!(window.angular || window.ng || window.getAllAngularRootElements), weight: 0.9 },
          { check: () => !!document.querySelector('[ng-app]'), weight: 0.8 },
          { check: () => !!document.querySelector('[data-ng-app]'), weight: 0.8 },
          { check: () => this.hasTextInScripts('angular'), weight: 0.6 },
          { check: () => this.hasScriptSrc('angular'), weight: 0.8 }
        ],
        category: 'Framework'
      },
      'Svelte': {
        patterns: [
          { check: () => !!window.svelte, weight: 0.9 },
          { check: () => this.hasTextInScripts('svelte'), weight: 0.7 },
          { check: () => this.hasScriptSrc('svelte'), weight: 0.8 }
        ],
        category: 'Framework'
      },
      'Next.js': {
        patterns: [
          { check: () => !!window.__NEXT_DATA__, weight: 0.9 },
          { check: () => !!document.querySelector('#__next'), weight: 0.8 },
          { check: () => this.hasScriptSrc('_next'), weight: 0.8 }
        ],
        category: 'Framework'
      },
      'Nuxt.js': {
        patterns: [
          { check: () => !!window.$nuxt, weight: 0.9 },
          { check: () => !!document.querySelector('#__nuxt'), weight: 0.8 },
          { check: () => this.hasScriptSrc('_nuxt'), weight: 0.8 }
        ],
        category: 'Framework'
      },
      'Alpine.js': {
        patterns: [
          { check: () => !!window.Alpine, weight: 0.9 },
          { check: () => !!document.querySelector('[x-data]'), weight: 0.8 },
          { check: () => this.hasScriptSrc('alpine'), weight: 0.8 }
        ],
        category: 'Framework'
      },
      'Ember.js': {
        patterns: [
          { check: () => !!(window.Ember || window.Em), weight: 0.9 },
          { check: () => this.hasScriptSrc('ember'), weight: 0.8 }
        ],
        category: 'Framework'
      },
      'Backbone.js': {
        patterns: [
          { check: () => !!window.Backbone, weight: 0.9 },
          { check: () => this.hasScriptSrc('backbone'), weight: 0.8 }
        ],
        category: 'Framework'
      },

      // JavaScript Libraries
      'jQuery': {
        patterns: [
          { check: () => !!(window.jQuery || window.$), weight: 0.9 },
          { check: () => this.hasScriptSrc('jquery'), weight: 0.8 },
          { check: () => this.hasTextInScripts('jQuery'), weight: 0.6 }
        ],
        category: 'Library'
      },
      'Lodash': {
        patterns: [
          { check: () => !!(window._ && window._.VERSION), weight: 0.9 },
          { check: () => this.hasScriptSrc('lodash'), weight: 0.8 }
        ],
        category: 'Library'
      },
      'Underscore.js': {
        patterns: [
          { check: () => !!(window._ && !window._.VERSION), weight: 0.8 },
          { check: () => this.hasScriptSrc('underscore'), weight: 0.8 }
        ],
        category: 'Library'
      },
      'Moment.js': {
        patterns: [
          { check: () => !!window.moment, weight: 0.9 },
          { check: () => this.hasScriptSrc('moment'), weight: 0.8 }
        ],
        category: 'Library'
      },
      'D3.js': {
        patterns: [
          { check: () => !!window.d3, weight: 0.9 },
          { check: () => this.hasScriptSrc('d3'), weight: 0.8 }
        ],
        category: 'Visualization'
      },
      'Three.js': {
        patterns: [
          { check: () => !!window.THREE, weight: 0.9 },
          { check: () => this.hasScriptSrc('three'), weight: 0.8 }
        ],
        category: '3D Library'
      },
      'Chart.js': {
        patterns: [
          { check: () => !!window.Chart, weight: 0.9 },
          { check: () => this.hasScriptSrc('chart.js'), weight: 0.8 }
        ],
        category: 'Visualization'
      },
      'GSAP': {
        patterns: [
          { check: () => !!(window.gsap || window.TweenMax || window.TweenLite), weight: 0.9 },
          { check: () => this.hasScriptSrc('gsap'), weight: 0.8 }
        ],
        category: 'Animation'
      },
      'Axios': {
        patterns: [
          { check: () => !!window.axios, weight: 0.9 },
          { check: () => this.hasScriptSrc('axios'), weight: 0.8 }
        ],
        category: 'HTTP Library'
      },
      'Socket.io': {
        patterns: [
          { check: () => !!window.io, weight: 0.9 },
          { check: () => this.hasScriptSrc('socket.io'), weight: 0.8 }
        ],
        category: 'WebSocket'
      },
      'Leaflet': {
        patterns: [
          { check: () => !!(window.L && window.L.version), weight: 0.9 },
          { check: () => this.hasScriptSrc('leaflet'), weight: 0.8 }
        ],
        category: 'Maps'
      },
      'Mapbox GL': {
        patterns: [
          { check: () => !!window.mapboxgl, weight: 0.9 },
          { check: () => this.hasScriptSrc('mapbox'), weight: 0.8 }
        ],
        category: 'Maps'
      },
      'Swiper': {
        patterns: [
          { check: () => !!window.Swiper, weight: 0.9 },
          { check: () => this.hasScriptSrc('swiper'), weight: 0.8 }
        ],
        category: 'UI Component'
      },
      'AOS': {
        patterns: [
          { check: () => !!window.AOS, weight: 0.9 },
          { check: () => this.hasScriptSrc('aos'), weight: 0.8 }
        ],
        category: 'Animation'
      },
      'Typed.js': {
        patterns: [
          { check: () => !!window.Typed, weight: 0.9 },
          { check: () => this.hasScriptSrc('typed'), weight: 0.8 }
        ],
        category: 'Animation'
      },
      'Lottie': {
        patterns: [
          { check: () => !!window.lottie, weight: 0.9 },
          { check: () => this.hasScriptSrc('lottie'), weight: 0.8 }
        ],
        category: 'Animation'
      },

      // CSS Frameworks
      'Bootstrap': {
        patterns: [
          { check: () => !!document.querySelector('[class*="bootstrap"]'), weight: 0.7 },
          { check: () => !!document.querySelector('[class*="btn-"]'), weight: 0.6 },
          { check: () => !!document.querySelector('[class*="col-"]'), weight: 0.7 },
          { check: () => this.hasTextInStylesheets('bootstrap'), weight: 0.8 },
          { check: () => this.hasLinkHref('bootstrap'), weight: 0.9 }
        ],
        category: 'CSS Framework'
      },
      'Tailwind CSS': {
        patterns: [
          { check: () => this.hasClassPattern(/^(flex|grid|text-|bg-|p-|m-|w-|h-)/), weight: 0.8 },
          { check: () => this.hasTextInStylesheets('tailwind'), weight: 0.9 },
          { check: () => this.hasLinkHref('tailwind'), weight: 0.9 }
        ],
        category: 'CSS Framework'
      },
      'Bulma': {
        patterns: [
          { check: () => !!document.querySelector('[class*="bulma"]'), weight: 0.8 },
          { check: () => !!document.querySelector('[class*="column"]'), weight: 0.6 },
          { check: () => this.hasTextInStylesheets('bulma'), weight: 0.8 },
          { check: () => this.hasLinkHref('bulma'), weight: 0.9 }
        ],
        category: 'CSS Framework'
      },
      'Material-UI': {
        patterns: [
          { check: () => !!document.querySelector('[class*="MuiButton"]'), weight: 0.8 },
          { check: () => !!document.querySelector('[class*="MuiTypography"]'), weight: 0.8 },
          { check: () => !!window.MaterialUI, weight: 0.9 }
        ],
        category: 'UI Framework'
      },
      'Ant Design': {
        patterns: [
          { check: () => !!document.querySelector('[class*="ant-"]'), weight: 0.8 },
          { check: () => !!window.antd, weight: 0.9 }
        ],
        category: 'UI Framework'
      },
      'Chakra UI': {
        patterns: [
          { check: () => !!document.querySelector('[class*="chakra-"]'), weight: 0.8 },
          { check: () => this.hasTextInStylesheets('chakra'), weight: 0.7 }
        ],
        category: 'UI Framework'
      },
      'Semantic UI': {
        patterns: [
          { check: () => !!document.querySelector('[class*="ui "]'), weight: 0.6 },
          { check: () => this.hasTextInStylesheets('semantic'), weight: 0.8 }
        ],
        category: 'CSS Framework'
      },
      'Foundation': {
        patterns: [
          { check: () => !!document.querySelector('[class*="foundation"]'), weight: 0.7 },
          { check: () => this.hasTextInStylesheets('foundation'), weight: 0.8 }
        ],
        category: 'CSS Framework'
      },
      'Font Awesome': {
        patterns: [
          { check: () => !!document.querySelector('link[href*="font-awesome"]'), weight: 0.9 },
          { check: () => !!document.querySelector('i[class*="fa-"]'), weight: 0.8 },
          { check: () => !!document.querySelector('i[class*="fas "]'), weight: 0.8 }
        ],
        category: 'Icon Library'
      },

      // CMS and Platforms
      'WordPress': {
        patterns: [
          { check: () => !!document.querySelector('meta[name="generator"][content*="WordPress"]'), weight: 0.9 },
          { check: () => !!document.querySelector('link[href*="wp-content"]'), weight: 0.8 },
          { check: () => !!document.querySelector('script[src*="wp-content"]'), weight: 0.8 },
          { check: () => this.hasTextInScripts('wp-'), weight: 0.6 }
        ],
        category: 'CMS'
      },
      'Shopify': {
        patterns: [
          { check: () => !!window.Shopify, weight: 0.9 },
          { check: () => !!document.querySelector('script[src*="shopify"]'), weight: 0.8 },
          { check: () => !!document.querySelector('meta[name="shopify-checkout-api-token"]'), weight: 0.9 }
        ],
        category: 'E-commerce'
      },
      'Drupal': {
        patterns: [
          { check: () => !!document.querySelector('meta[name="generator"][content*="Drupal"]'), weight: 0.9 },
          { check: () => !!document.querySelector('script[src*="drupal"]'), weight: 0.8 }
        ],
        category: 'CMS'
      },
      'Joomla': {
        patterns: [
          { check: () => !!document.querySelector('meta[name="generator"][content*="Joomla"]'), weight: 0.9 },
          { check: () => this.hasTextInScripts('joomla'), weight: 0.7 }
        ],
        category: 'CMS'
      },
      'Webflow': {
        patterns: [
          { check: () => !!document.querySelector('meta[name="generator"][content*="Webflow"]'), weight: 0.9 },
          { check: () => !!document.querySelector('script[src*="webflow"]'), weight: 0.8 }
        ],
        category: 'Website Builder'
      },
      'Squarespace': {
        patterns: [
          { check: () => !!document.querySelector('meta[name="generator"][content*="Squarespace"]'), weight: 0.9 },
          { check: () => !!document.querySelector('script[src*="squarespace"]'), weight: 0.8 }
        ],
        category: 'Website Builder'
      },
      'Wix': {
        patterns: [
          { check: () => !!document.querySelector('meta[name="generator"][content*="Wix"]'), weight: 0.9 },
          { check: () => this.hasTextInScripts('wix'), weight: 0.7 }
        ],
        category: 'Website Builder'
      },

      // Analytics and Tracking
      'Google Analytics': {
        patterns: [
          { check: () => !!(window.ga || window.gtag), weight: 0.9 },
          { check: () => !!document.querySelector('script[src*="google-analytics"]'), weight: 0.8 },
          { check: () => !!document.querySelector('script[src*="gtag"]'), weight: 0.8 }
        ],
        category: 'Analytics'
      },
      'Google Tag Manager': {
        patterns: [
          { check: () => !!window.google_tag_manager, weight: 0.9 },
          { check: () => !!document.querySelector('script[src*="googletagmanager"]'), weight: 0.8 }
        ],
        category: 'Analytics'
      },
      'Facebook Pixel': {
        patterns: [
          { check: () => !!window.fbq, weight: 0.9 },
          { check: () => !!document.querySelector('script[src*="facebook.net"]'), weight: 0.8 }
        ],
        category: 'Analytics'
      },
      'Hotjar': {
        patterns: [
          { check: () => !!window.hj, weight: 0.9 },
          { check: () => !!document.querySelector('script[src*="hotjar"]'), weight: 0.8 }
        ],
        category: 'Analytics'
      },
      'Mixpanel': {
        patterns: [
          { check: () => !!window.mixpanel, weight: 0.9 },
          { check: () => !!document.querySelector('script[src*="mixpanel"]'), weight: 0.8 }
        ],
        category: 'Analytics'
      },
      'Segment': {
        patterns: [
          { check: () => !!window.analytics, weight: 0.8 },
          { check: () => !!document.querySelector('script[src*="segment"]'), weight: 0.8 }
        ],
        category: 'Analytics'
      },

      // Build Tools and Bundlers
      'Webpack': {
        patterns: [
          { check: () => !!window.webpackJsonp, weight: 0.8 },
          { check: () => !!document.querySelector('script[src*="webpack"]'), weight: 0.7 },
          { check: () => this.hasTextInScripts('webpackJsonp'), weight: 0.8 }
        ],
        category: 'Build Tool'
      },
      'Vite': {
        patterns: [
          { check: () => !!document.querySelector('script[type="module"][src*="vite"]'), weight: 0.8 },
          { check: () => this.hasTextInScripts('vite'), weight: 0.7 }
        ],
        category: 'Build Tool'
      },
      'Parcel': {
        patterns: [
          { check: () => this.hasTextInScripts('parcel'), weight: 0.7 },
          { check: () => !!document.querySelector('script[src*="parcel"]'), weight: 0.8 }
        ],
        category: 'Build Tool'
      },
      'Rollup': {
        patterns: [
          { check: () => this.hasTextInScripts('rollup'), weight: 0.7 }
        ],
        category: 'Build Tool'
      },

      // Testing Frameworks
      'Jest': {
        patterns: [
          { check: () => !!window.jest, weight: 0.9 },
          { check: () => this.hasTextInScripts('jest'), weight: 0.6 }
        ],
        category: 'Testing'
      },
      'Mocha': {
        patterns: [
          { check: () => !!window.mocha, weight: 0.9 },
          { check: () => this.hasTextInScripts('mocha'), weight: 0.6 }
        ],
        category: 'Testing'
      },
      'Cypress': {
        patterns: [
          { check: () => !!window.Cypress, weight: 0.9 },
          { check: () => this.hasTextInScripts('cypress'), weight: 0.6 }
        ],
        category: 'Testing'
      },

      // Development Tools
      'ESLint': {
        patterns: [
          { check: () => this.hasTextInScripts('eslint'), weight: 0.6 }
        ],
        category: 'Development Tool'
      },
      'Prettier': {
        patterns: [
          { check: () => this.hasTextInScripts('prettier'), weight: 0.6 }
        ],
        category: 'Development Tool'
      },
      'Babel': {
        patterns: [
          { check: () => this.hasTextInScripts('babel'), weight: 0.6 }
        ],
        category: 'Development Tool'
      },

      // Payment Systems
      'Stripe': {
        patterns: [
          { check: () => !!window.Stripe, weight: 0.9 },
          { check: () => !!document.querySelector('script[src*="stripe"]'), weight: 0.8 }
        ],
        category: 'Payment'
      },
      'PayPal': {
        patterns: [
          { check: () => !!window.paypal, weight: 0.9 },
          { check: () => !!document.querySelector('script[src*="paypal"]'), weight: 0.8 }
        ],
        category: 'Payment'
      },

      // Social Media
      'Twitter Widget': {
        patterns: [
          { check: () => !!window.twttr, weight: 0.9 },
          { check: () => !!document.querySelector('script[src*="twitter"]'), weight: 0.8 }
        ],
        category: 'Social Media'
      },
      'Facebook SDK': {
        patterns: [
          { check: () => !!window.FB, weight: 0.9 },
          { check: () => !!document.querySelector('script[src*="facebook"]'), weight: 0.8 }
        ],
        category: 'Social Media'
      },

      // CDN and Hosting
      'Cloudflare': {
        patterns: [
          { check: () => this.hasTextInScripts('cloudflare'), weight: 0.7 },
          { check: () => !!document.querySelector('script[src*="cloudflare"]'), weight: 0.8 }
        ],
        category: 'CDN'
      },
      'jsDelivr': {
        patterns: [
          { check: () => !!document.querySelector('script[src*="jsdelivr"]'), weight: 0.8 },
          { check: () => !!document.querySelector('link[href*="jsdelivr"]'), weight: 0.8 }
        ],
        category: 'CDN'
      },
      'unpkg': {
        patterns: [
          { check: () => !!document.querySelector('script[src*="unpkg"]'), weight: 0.8 },
          { check: () => !!document.querySelector('link[href*="unpkg"]'), weight: 0.8 }
        ],
        category: 'CDN'
      }
    };
  }

  // Main detection function
  detectTechnologies() {
    this.detectedTechs = [];
    this.confidence = {};
    
    // Run detection for each technology in database
    Object.entries(this.techDatabase).forEach(([techName, techConfig]) => {
      const confidence = this.calculateConfidence(techConfig.patterns);
      if (confidence > 0.3) { // Only include if confidence is above threshold
        this.addTechnology(techName, techConfig.category, confidence);
      }
    });

    // Additional meta tag detection
    this.detectFromMeta();
    
    // Additional script source detection
    this.detectFromScripts();
    
    // Sort by confidence
    this.detectedTechs.sort((a, b) => (b.confidence || 0) - (a.confidence || 0));
    
    return {
      technologies: this.detectedTechs,
      confidence: this.confidence,
      url: window.location.href,
      detectedAt: new Date().toISOString()
    };
  }

  // Calculate confidence score based on multiple patterns
  calculateConfidence(patterns) {
    let totalWeight = 0;
    let matchedWeight = 0;
    
    patterns.forEach(pattern => {
      totalWeight += pattern.weight;
      try {
        if (pattern.check()) {
          matchedWeight += pattern.weight;
        }
      } catch (e) {
        // Ignore errors in pattern checking
      }
    });
    
    return totalWeight > 0 ? matchedWeight / totalWeight : 0;
  }

  // Helper methods
  hasScriptSrc(keyword) {
    const scripts = document.querySelectorAll('script[src]');
    return Array.from(scripts).some(script => 
      script.src.toLowerCase().includes(keyword.toLowerCase()));
  }

  hasLinkHref(keyword) {
    const links = document.querySelectorAll('link[href]');
    return Array.from(links).some(link => 
      link.href.toLowerCase().includes(keyword.toLowerCase()));
  }

  hasTextInScripts(text) {
    const scripts = document.querySelectorAll('script');
    return Array.from(scripts).some(script => 
      script.textContent && script.textContent.toLowerCase().includes(text.toLowerCase()));
  }

  hasTextInStylesheets(text) {
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    return Array.from(links).some(link => 
      link.href && link.href.toLowerCase().includes(text.toLowerCase()));
  }

  hasClassPattern(pattern) {
    const allElements = document.querySelectorAll('*');
    return Array.from(allElements).some(element => 
      element.className && typeof element.className === 'string' && pattern.test(element.className));
  }

  detectFromMeta() {
    const metaTags = document.querySelectorAll('meta');
    metaTags.forEach(meta => {
      const name = meta.getAttribute('name');
      const content = meta.getAttribute('content');
      
      if (name === 'generator' && content) {
        // Skip if already detected
        if (!this.detectedTechs.find(tech => tech.name === content)) {
          this.addTechnology(content, 'Generator', 0.9);
        }
      }
    });
  }

  detectFromScripts() {
    const scripts = document.querySelectorAll('script[src]');
    const commonLibraries = {
      'react': { name: 'React', category: 'Framework' },
      'vue': { name: 'Vue.js', category: 'Framework' },
      'angular': { name: 'Angular', category: 'Framework' },
      'jquery': { name: 'jQuery', category: 'Library' },
      'bootstrap': { name: 'Bootstrap', category: 'CSS Framework' },
      'lodash': { name: 'Lodash', category: 'Library' },
      'moment': { name: 'Moment.js', category: 'Library' },
      'chart': { name: 'Chart.js', category: 'Visualization' },
      'three': { name: 'Three.js', category: '3D Library' },
      'gsap': { name: 'GSAP', category: 'Animation' },
      'aos': { name: 'AOS', category: 'Animation' },
      'swiper': { name: 'Swiper', category: 'UI Component' },
      'leaflet': { name: 'Leaflet', category: 'Maps' },
      'mapbox': { name: 'Mapbox GL', category: 'Maps' }
    };

    scripts.forEach(script => {
      const src = script.src.toLowerCase();
      Object.entries(commonLibraries).forEach(([keyword, tech]) => {
        if (src.includes(keyword) && !this.detectedTechs.find(t => t.name === tech.name)) {
          this.addTechnology(tech.name, tech.category, 0.7);
        }
      });
    });
  }

  addTechnology(name, category, confidence = 0.5) {
    if (!this.detectedTechs.find(tech => tech.name === name)) {
      this.detectedTechs.push({
        name: name,
        category: category,
        confidence: confidence
      });
    }
  }
}

// Initialize detector when page loads
let detector;
let detectionResults = {};

function runDetection() {
  // **FIX**: Check if the extension's context is still valid before running.
  // `chrome.runtime.id` is a reliable way to check this.
  if (!chrome.runtime || !chrome.runtime.id) {
    return;
  }
    
  try {
    detector = new TechDetector();
    detectionResults = detector.detectTechnologies();
    
    console.log('Tech Stack Detection Results:', detectionResults);
    
    // Update badge with count
    chrome.runtime.sendMessage({
      action: 'updateBadge',
      count: detectionResults.technologies.length
    });
    
    // Store results for popup
    chrome.runtime.sendMessage({
      action: 'storeResults',
      results: detectionResults
    });
    
  } catch (error) {
    // Check if the error is due to an invalid context before logging.
    if (error.message.includes("Extension context invalidated")) {
        console.log("Extension context invalidated. Stopping detection in this tab.");
    } else {
        console.error('Error during tech detection:', error);
    }
  }
}

// Run detection after page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runDetection);
} else {
  runDetection();
}

// **FIX**: Add a guard clause to the message listener as well.
if (chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'getResults') {
        sendResponse(detectionResults);
      } else if (request.action === 'redetect') {
        runDetection();
        sendResponse(detectionResults);
      }
      // Indicate that the response will be sent asynchronously.
      return true;
    });
}


// Re-run detection for SPAs when URL changes
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    // The error is not in the MutationObserver itself, but in the `runDetection`
    // function it calls after the extension context is lost. The fix above handles this.
    setTimeout(runDetection, 1000); // Wait for SPA to load
  }
}).observe(document, { subtree: true, childList: true });
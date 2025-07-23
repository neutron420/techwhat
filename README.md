<div align="center">

# Tech What 🕵️‍♂️

<br/>

<div>
  <img src="https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/Chrome_Extension-MV3-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Chrome Extension">
</div>

<br/>

**A powerful Chrome extension that detects the technologies, frameworks, and libraries used on any website you visit.**

<p>
  <a href="#-about-the-project">About</a> •
  <a href="#-key-features">Features</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-contributing">Contributing</a>
</p>

[**Install from Chrome Web Store (Link to your store page)**] · [**Report a Bug**] · [**Request a Feature**]

</div>

## 🌟 About The Project

Tech What is a browser extension for developers, researchers, and tech enthusiasts who want to quickly identify the technology stack of any website. It runs in the background, analyzing scripts, global variables, and HTML to provide a detailed and accurate summary of the frameworks, libraries, CMS, and analytics tools powering the current page.

### 🛠️ Built With

This extension is built with a focus on performance and reliability, using core web technologies:

* **Core Logic:** Vanilla JavaScript (ES6+)
* **Platform:** Chrome Extension Manifest V3
* **Styling:** HTML5 & CSS3

## ✨ Key Features

* **Comprehensive Detection:** Identifies a wide range of technologies, including:
    * **JavaScript Frameworks:** React, Vue.js, Angular, Next.js, Svelte, and more.
    * **Libraries:** jQuery, Lodash, D3.js, Three.js, GSAP, and others.
    * **CSS Frameworks:** Tailwind CSS, Bootstrap, Material-UI, and more.
    * **CMS & Platforms:** WordPress, Shopify, Drupal, Webflow, etc.
    * **Analytics Tools:** Google Analytics, Hotjar, Mixpanel, and more.
* **Confidence Score:** Each detected technology is assigned a confidence score, giving you a better understanding of the detection accuracy.
* **Detailed Summary:** The popup provides a quick overview with total counts for frameworks and libraries.
* **Multiple Export Options:** Easily export the detected stack as a `JSON` or `CSV` file, or copy the list directly to your clipboard.
* **One-Click Refresh:** Re-run the detection at any time with a single click to analyze single-page applications (SPAs) after navigation.

## 🚀 Getting Started

To get a local copy up and running for development, follow these steps.

### Prerequisites

You will need Google Chrome or a Chromium-based browser.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/neutron420/techwhat.git](https://github.com/neutron420/techwhat.git)
    cd techwhat
    ```
2.  **Open Chrome and navigate to the Extensions page:**
    Go to `chrome://extensions` in your browser.
3.  **Enable Developer Mode:**
    Click the toggle switch in the top-right corner to enable "Developer mode".
4.  **Load the extension:**
    * Click the "**Load unpacked**" button.
    * Select the `techwhat` folder that you cloned.

The extension icon should now appear in your browser's toolbar.

## Usage

1.  Navigate to any website you want to inspect.
2.  Click on the **Tech What** icon in your browser's toolbar.
3.  The popup will display a list of all detected technologies, grouped by category and sorted by confidence.
4.  Use the **Refresh** button to re-scan the page, which is useful for websites that load content dynamically.
5.  Use the **Export** button to save or copy the results.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📜 License

Distributed under the MIT License.

## 📧 Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter) - email@example.com

Project Link: [https://github.com/neutron420/techwhat](https://github.com/neutron420/techwhat)

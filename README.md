# Allinone Desktop Application

A human-curated desktop application that aggregates useful public websites (AI tools, utilities, media, etc.) into a single unified app-shell experience. Built for performance and convenience, it brings together the best of the web into a seamless desktop environment.

> **⚠️ NOTE:** This application is a curated browser shell. All third-party tools are the property of their respective owners.

## ✨ Features

We have packed this application with powerful features to enhance your productivity:

- **🚀 44+ Pre-installed Curated Tools** - Manually searched, tested, and curated by the creator.
- **🤖 SmartAttend** - A pre-installed, integrated ChatGPT tool for instant AI assistance.
- **📝 Built-in Notepad** - A rich-text notepad with auto-save functionality, so you never lose your ideas.
- **📌 Pinning System** - Pin your favorite tools to the top of the sidebar for quick access.
- **⚔️ LLM Comparison Mode (Beta)** - Compare 2-3 AI chatbots side-by-side to get the best answers. *(Note: This feature is currently in beta and may experience injection errors with some models. Updates coming soon!)*
- **🎨 Dark Premium UI** - A modern, sleek ChatGPT-style interface with a collapsible sidebar and smooth animations.
- **➕ User-Added Tools** - Easily add your own website links to the "Custom Tools" section.
- **🌐 Native Webviews** - Uses Electron's native webview tags for a secure and stable browsing experience.
- **🔗 Smart Navigation** - Intelligent handling of external links and redirects (e.g., Google/Microsoft login pages open in your default browser).

## 🛠️ Included Tools

The application comes with **44+ tools** pre-installed across various categories:

### 🤖 AI Chatbots / LLMs
- **ChatGPT** (OpenAI)
- **DeepSeek** (DeepSeek AI)
- **Gemini** (Google)
- **Claude** (Anthropic)
- **Qwen** (Alibaba)
- **Kimi**, **Z.AI**, **Meta AI**

### 🧠 AI Agents & Assistants
- **SmartAttend** (Attendance Assistant)
- **GenSpark** (Research Agent)
- **Manus** (Autonomous Agent)
- **OpenRouter** (Unified API)

### 🎨 Creative AI (Images & Video)
- **Reve**, **UnWatermark**, **Watermark Remover**
- **Reduce Image Size**, **Google Labs Whisk**
- **Wan Video** (AI Video Generation)

### 🎵 Music & Media
- **Suno** (AI Music)
- **Cineby**, **MovieBox**, **KatMovieHD**, **VegaMovies**, **DotMovies** (Movies/TV)

### 📂 Utilities & Downloads
- **PDF Tools:** I Love PDF, FreeConvert
- **Software:** FileCR, IGetIntoPC
- **Games:** FitGirl Repacks, DODI Repacks, AnkerGames, SteamUnlocked, OceanOfGames
- **Misc:** ToolBaz, BoredHumans, MrFreeTools, AI Top Tools

### ⚡ Internet Tools
- **Fast.com**, **Speedtest.net**

---

## ⚙️ How It Works

**Allinone** is built on **Electron**, effectively acting as a specialized web browser.
1.  **Isolation:** Each tool runs in its own secure container (`webview`), ensuring that one crashing tool won't affect the others.
2.  **Privacy:** Your navigation history and "My Tools" are stored locally on your machine. We do not track your usage.
3.  **Smart Routing:** The app detects when a site tries to open a popup or an external authentication page (like "Sign in with Google") and automatically opens it in your default OS browser to ensure security.

## 📥 Download & Installation

### For Users
To download the latest version of the application:
1. Go to the [Releases](https://github.com/yourusername/allinone/releases) page.
2. Download the installer for your operating system:
   - **Windows:** `Allinone-Setup-1.0.2.exe`
   - **macOS:** `Allinone-1.0.2.dmg`
   - **Linux:** `Allinone-1.0.2.AppImage`
3. Run the installer and you're good to go!

### For Developers
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/allinone.git
   cd allinone
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run locally:**
   ```bash
   npm start
   ```

## 🐛 Known Issues
- **LLM Comparison Mode:** You might face issues with text injection on some specific AI models due to their frequent UI updates. We are working on a fix!

## 🛡️ Trust & Attribution

> **"Manually searched, tested, and curated by the creator."**

All pre-installed tools were personally discovered, tested for functionality, and categorized based on real-world usage by **Aniket Rajput**.

## 📄 License

MIT License.

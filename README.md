# 📱 Wolt Influencer – AI-Powered Restaurant Video Feed

A TikTok-style vertical video feed for restaurant review content, powered by **OpenAI video analysis** and **semantic search**.  
Users can upload review videos, auto-generate tags using AI, and search using natural language (e.g., *“cozy brunch place”*, *“sushi spot”*, *“great fries”*).

---

## 🚀 Features

### 🎥 Vertical Video Feed
- Smooth vertical swipe + autoplay  
- Tag bar with two tags + Order/Reserve button  

### 🤖 AI Video Processing
- Transcription via **gpt-4o-transcribe**  
- Tag generation with **gpt-4o-mini**  
- Automatic metadata extraction

### 🔍 AI Semantic Search
- Meaning-based search  
- Finds relevant videos even when exact tags don't match  
- Powered by **gpt-4o-mini** chat completions

### 📤 Demo Uploads
- Upload preloaded demo videos  
- AI tags generated instantly  
- Uploaded videos removed from the list

### 🔑 API Key Handling
- Local key storage with AsyncStorage  
- Required for all AI tasks  
- Managed through Profile screen

---

## 📦 Installation

```bash
git clone https://github.com/<your-repo>.git
cd wolt-influencer
npm install

iOS (Expo prebuild)

npx expo prebuild
cd ios
pod install
cd ..

Run the app:

npx expo run:ios

🔐 OpenAI API Key

Create an API key here:

https://platform.openai.com/settings/keys

Paste it into the Profile screen inside the app.
The app won’t process videos until a key is saved.
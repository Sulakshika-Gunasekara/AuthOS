<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1bEJMwuuYaIf7745rzSZISMlYNhzWnvzp

## Run Locally

**Prerequisites:**  Node.js

1. **Install dependencies:**
   Open the terminal in VS Code (Terminal > New Terminal) and run:
   ```bash
   npm install
   ```

2. **Set up Environment Variables:**
   Create a file named `.env.local` in the root directory.
   Add your Gemini API key (optional for UI testing but required for AI features):
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Run the app:**
   ```bash
   npm run dev
   ```

4. **View in Browser:**
   Open [http://localhost:3000](http://localhost:3000) to view your app.

## VS Code Tips

- **Extensions:** Install the "ES7+ React/Redux/React-Native snippets" and "Tailwind CSS IntelliSense" extensions for a better development experience.
- **Debugging:** You can use the "JavaScript Debug Terminal" or configure a launch.json for debugging.

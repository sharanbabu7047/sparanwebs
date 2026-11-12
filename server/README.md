# SyntraWebs Direct Email Backend

A lightweight, secure Node.js & Express service that receives contact form submissions and directly forwards them to **`syntrawebs@gmail.com`** and **`sparanwebs@gmail.com`** via official Gmail SMTP (using your Google App Password).

**No database setup or maintenance needed.**

---

## 🚀 How It Works
1. When a client submits the "Let's Talk" form on the website, it sends:
   - Client Name
   - Client Email
   - Project Type
   - Project Description
2. The server instantly sends a formatted notification email to **`syntrawebs@gmail.com`** and **`sparanwebs@gmail.com`** with a one-click "Reply" button.
3. The server sends a polite confirmation email to the client confirming receipt.
4. Includes built-in rate-limiting and anti-spam protection.

---

## 🛠️ Setup (Only 1 Step!)

### 1. Generate Your 16-Letter Google App Password
1. Open your [Google Account App Passwords](https://myaccount.google.com/apppasswords) logged in as `syntrawebs@gmail.com`.
   *(Make sure 2-Step Verification is turned on in your account security)*.
2. Enter the name `SyntraWebs Website` and click **Create**.
3. Copy the **16-letter code** (e.g., `abcd efgh ijkl mnop`).
4. Paste it into `server/.env`:
   ```env
   GMAIL_USER=syntrawebs@gmail.com
   SECONDARY_ADMIN_EMAIL=sparanwebs@gmail.com
   GMAIL_APP_PASSWORD=abcdefghijklmnop
   ```

---

## 🏃 Running the Server

In your terminal:
```bash
cd server
npm install
npm run dev
```

The server will run on `http://localhost:5000`.

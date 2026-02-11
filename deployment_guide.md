# BossGears - Website Deployment Guide

This guide provides simple, step-by-step instructions to host the **BossGears Premium Industrial Website** for free.

## Option 1: Netlify (Easiest - Drag & Drop)
**Best for:** Instant hosting without technical setup.

1.  **Prepare Folder:**
    -   Make sure your `bossgears` folder contains `index.html`, `style.css`, `script.js`, and the `assets` folder.
2.  **Go to Netlify:**
    -   Visit [app.netlify.com/drop](https://app.netlify.com/drop).
    -   Sign up or Log in.
3.  **Upload:**
    -   Drag and drop the **entire `bossgears` folder** into the "Drag and drop your site folder here" area.
4.  **Finish:**
    -   Wait a few seconds. Netlify will generate a link (e.g., `random-name.netlify.app`).
    -   Click **"Site settings"** -> **"Change site name"** to something like `bossgears-limited.netlify.app`.

## Option 2: GitHub Pages (Professional)
**Best for:** Long-term hosting and code management.

1.  **Create Repository:**
    -   Go to GitHub.com and create a new repository named `bossgears-website`.
    -   Check "Add a README file".
2.  **Upload Files:**
    -   Click **"Add file"** -> **"Upload files"**.
    -   Drag and drop `index.html`, `style.css`, `script.js`, and `assets` folder.
    -   Click **"Commit changes"**.
3.  **Activate Pages:**
    -   Go to **Settings** (tab) -> **Pages** (sidebar).
    -   Under **"Branch"**, select `main` (or `master`) and click **Save**.
4.  **Finish:**
    -   Wait 1-2 minutes.
    -   Your site will be live at `https://yourusername.github.io/bossgears-website/`.

## Option 3: Vercel (Fast & Scalable)
**Best for:** High performance (similar to Netlify).

1.  **Install Vercel CLI** (Optional) OR use the Web Dashboard.
2.  **Web Dashboard:**
    -   Go to [vercel.com/new](https://vercel.com/new).
    -   Import your GitHub repository (from Option 2).
    -   Click **Deploy**.
3.  **Finish:**
    -   Vercel will give you a live URL ending in `.vercel.app`.

---

## Domain Setup (Optional)
To look fully professional (e.g., `www.bossgears.com`), buy a domain from GoDaddy or Namecheap and follow the "Custom Domain" instructions on Netlify/Vercel settings to link it.

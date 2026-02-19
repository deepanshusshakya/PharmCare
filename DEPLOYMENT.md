# Pharmacy App Deployment Guide (Vercel)

This document provides step-by-step instructions on how to deploy the **PharmCare** (VrindaCare) project to Vercel.

## Prerequisites
- A [GitHub](https://github.com) account.
- A [Vercel](https://vercel.com) account.

---

## Step 1: Ensure Your Code is on GitHub

The project is already connected to GitHub (`https://github.com/deusshakya/PharmCare.git`). To make sure your latest changes are live:

1. Open your terminal in the project root (`e:\PROJECT\VrindaCare`).
2. Run the following commands:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

---

## Step 2: Deploy on Vercel

1. Log in to [vercel.com](https://vercel.com).
2. Click the **"Add New"** button and select **"Project"**.
3. Under **"Import Git Repository"**, find and click **"Import"** next to `PharmCare`.
4. In the **"Configure Project"** screen:
   - **Framework Preset**: Vercel will automatically detect **Next.js**.
   - **Root Directory**: Ensure it is set to the project root (not `Frontend`).
   - **Build and Output Settings**: Keep the default values.

---

## Step 3: Configure Environment Variables

If your project uses environment variables (like the ones we added in `.env.local`):

1. In the Vercel project configuration, expand the **"Environment Variables"** section.
2. Add each key and value from your `.env.local` file (e.g., `DATABASE_URL`, `NEXT_PUBLIC_API_URL`).
3. Click **"Add"** for each variable.

---

## Step 4: Finalize Deployment

1. Click the **"Deploy"** button.
2. Vercel will build your project and provide a live URL (e.g., `pharm-care.vercel.app`).

---

## Continuous Deployment
Once linked, every time you `git push` to the `main` branch, Vercel will automatically trigger a new deployment and update your live site.

---

## Troubleshooting

- **Missing Swc Dependencies**: If the build fails with an SWC error, run `npm install` locally before pushing to ensure `package-lock.json` is healthy.
- **Environment Variables**: If features like API calls fail on the live site, double-check that your `NEXT_PUBLIC_` variables are correctly added in the Vercel Dashboard.

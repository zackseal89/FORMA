# FORMA Shapewear Storefront

FORMA is a premium shapewear brand born in Nairobi, built for everywhere. This repository contains the Next.js storefront, fully integrated with the Shopify Storefront API.

## Tech Stack

* **Framework:** Next.js 14+ (App Router)
* **Styling:** Tailwind CSS v4, Custom CSS (Editorial Noir Design System)
* **Commerce:** Shopify Storefront API (GraphQL)
* **Deployment:** Vercel

## Environment Variables

To run this project locally or deploy it to Vercel, you will need the following environment variables. Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_PRIVATE_TOKEN=your-private-storefront-token
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-public-storefront-token
SHOPIFY_API_VERSION=2024-04
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

This project is configured for seamless deployment to Vercel.

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Configure the environment variables listed above in the Vercel project settings.
4. Deploy!

## Project Structure

* `app/`: Next.js App Router pages and layouts.
* `components/`: Reusable React components (UI, Product, Cart, Layout, etc.).
* `lib/`: Utility functions, Shopify API integrations, and constants.
* `public/`: Static assets (images, icons).

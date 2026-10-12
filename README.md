Bazar Dor — বাজার দর
Bazar Dor is a Bangla market price web application that helps users explore everyday product prices, compare today's prices with yesterday's, and view price ranges across markets. Built with Next.js and React, it includes category browsing, price sorting, authentication, and user profiles.
Live Website: https://bazar-dor-a7-i5lf.vercel.app/
GitHub Repository: https://github.com/jstashin/bazar-dor-a7
Features
- Bangla interface: Bangla dates, numbers, product names, and price labels.
- Price overview: Separate home page sections for products with rising prices, falling prices, and all products.
- Price ticker: A scrolling overview of product prices and price changes.
- Category browsing: Browse products by category with active navigation highlights.
- Price sorting: Sort category products from low to high or high to low.
- Protected product details: Signed-in users can view detailed product prices and market comparisons.
- Market price summaries: Minimum, maximum, and average prices calculated from the available market data. The overall average is the mean of each market's minimum–maximum midpoint.
- Market comparison table: Compare market names, divisions, and minimum, maximum, and average prices.
- Authentication: Email/password registration and sign-in, plus Google and GitHub sign-in through Better Auth.
- User profiles: View account information, update the display name, and sign out.
- Responsive layout: Product grids and layouts adapt to mobile, tablet, and desktop screens.
- User feedback: Loading states, error handling, and toast notifications.
Technology Stack
Technology	Purpose
Next.js 16	App Router, routing, server rendering, and API routes
React 19	Components and client-side interactions
JavaScript	Application logic
Tailwind CSS 4	Styling and responsive layouts
DaisyUI 5	UI component styling
Better Auth	Authentication and session management
MongoDB	Authentication data storage
React Icons	Interface icons
React Hot Toast	Notifications
Vercel	Deployment


Main Dependencies
next, react, react-dom, better-auth, @better-auth/mongo-adapter, mongodb, react-icons, and react-hot-toast.
Development dependencies include tailwindcss, daisyui, @tailwindcss/turbopack, eslint, eslint-config-next, and babel-plugin-react-compiler. See package.json for the complete versions.
Run Locally
1. Prerequisites
- A Node.js version compatible with the Next.js version in package.json, and npm.
- A MongoDB connection string.
- Google and GitHub OAuth applications for social sign-in.
2. Clone and install
git clone https://github.com/jstashin/bazar-dor-a7.git
cd bazar-dor-a7
npm install
3. Configure environment variables
Create a .env.local file in the project root:
MONGODB_URL=your_mongodb_connection_string
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_random_auth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
Generate a random authentication secret:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
Authentication uses the MongoDB database named bazar-dor. Keep .env.local and real credentials out of version control.
Configure these callback URLs in the corresponding OAuth provider settings for local development:
Google: http://localhost:3000/api/auth/callback/google
GitHub: http://localhost:3000/api/auth/callback/github
4. Start the application
npm run dev
Open http://localhost:3000 in your browser.
Available Scripts
Command	Description
npm run dev	Start the development server
npm run build	Create a production build
npm run start	Run the production server after building
npm run lint	Run ESLint


Main Routes
Route	Description
/	Home page and product price overview
/category/[categoryId]	Category products and price sorting
/product/[productId]	Protected product details; the parameter resolves a product slug
/signup	Create an account
/signin	Sign in
/profile	Protected user profile
/profile/update	Update the user's display name
/auth/success	Social sign-in completion page
/api/auth/[...all]	Better Auth API handler


Data Source
Product and category data come from the Programming Hero Bazar Dor API:
https://openapi.programming-hero.com/api/bazardor
The application fetches /categories, /products, and /products?category=<categoryId> with cache: "no-store". Product details are resolved from the product list by slug. Displayed prices depend on the data supplied by this API.
Project Structure
Directory	Contents
src/app/	App Router pages, layouts, loading states, and auth API route
src/components/	Header, footer, product cards, ticker, and authentication/profile components
src/lib/	API helpers, authentication configuration, and Bangla formatting utilities
public/	Static assets


Deployment
1. Import the GitHub repository into Vercel.
2. Add the environment variables listed above.
3. Set BETTER_AUTH_URL to the deployment's production URL.
4. Configure production OAuth callback URLs using that same domain:
   - https://bazar-dor-a7-i5lf.vercel.app/api/auth/callback/google
   - https://bazar-dor-a7-i5lf.vercel.app/api/auth/callback/github
5. Ensure the deployed application can connect to MongoDB, then deploy.

# Bazar Dor — বাজার দর

Bazar Dor is a Bangla market price web application where users can explore everyday product prices, compare price changes, and view prices across different markets.

## Live Website

https://bazar-dor-a7-i5lf.vercel.app/

## GitHub Repository

https://github.com/jstashin/bazar-dor-a7

## Features

- **Bangla Interface:** Bangla product names, dates, numbers, and price labels.
- **Product Price Overview:** View today's prices and compare them with yesterday's prices.
- **Price Changes:** Separate sections for products with rising and falling prices.
- **Price Ticker:** A scrolling ticker displaying product prices and changes.
- **Category Browsing:** Explore products by category.
- **Price Sorting:** Sort products by price from low to high or high to low.
- **Protected Product Details:** Signed-in users can access detailed product information.
- **Market Comparison:** View minimum, maximum, and average prices across markets.
- **Authentication:** Email/password registration and login, plus Google and GitHub sign-in.
- **Profile Management:** View profile information, update the display name, and sign out.
- **Responsive Design:** Layouts adapt to mobile, tablet, and desktop screens.
- **Loading and Feedback:** Loading states, error messages, and toast notifications.

## Technology Stack

| Technology | Purpose |
| --- | --- |
| Next.js | App Router, server rendering, and API routes |
| React | User interface and interactive components |
| JavaScript | Application logic |
| Tailwind CSS | Styling and responsive layouts |
| DaisyUI | UI component styling |
| Better Auth | Authentication and session management |
| MongoDB | Authentication data storage |
| React Icons | Interface icons |
| React Hot Toast | Toast notifications |
| Vercel | Deployment |

## Dependencies

### Main Dependencies

- next
- react
- react-dom
- better-auth
- @better-auth/mongo-adapter
- mongodb
- react-icons
- react-hot-toast

### Development Dependencies

- tailwindcss
- @tailwindcss/turbopack
- daisyui
- eslint
- eslint-config-next
- babel-plugin-react-compiler

## Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/jstashin/bazar-dor-a7.git
cd bazar-dor-a7
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the project root and add:

```env
MONGODB_URL=your_mongodb_connection_string
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_random_auth_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Generate a random authentication secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

The application uses the MongoDB database named `bazar-dor`.

Configure the following local callback URLs in your OAuth provider settings:

- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`

Do not commit `.env.local` or real credentials to GitHub.

### 4. Start the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server after building |
| `npm run lint` | Run ESLint |

## Main Routes

| Route | Description |
| --- | --- |
| `/` | Home page with product prices |
| `/category/[categoryId]` | Category products with price sorting |
| `/product/[productId]` | Protected product details, resolved by product slug |
| `/signup` | Create an account |
| `/signin` | Sign in |
| `/profile` | View user profile |
| `/profile/update` | Update the display name |
| `/auth/success` | Social sign-in completion page |
| `/api/auth/[...all]` | Authentication API handler |

## API and Data Source

Product and category data are fetched from the Programming Hero Bazar Dor API.

**Base URL:**

```text
https://openapi.programming-hero.com/api/bazardor
```

**Endpoints used:**

```text
/categories
/products
/products?category=<categoryId>
```

Product details are resolved from the product list using the product slug. Displayed prices depend on the data provided by the API.

## Project Structure

| Directory | Description |
| --- | --- |
| `src/app/` | Pages, layouts, loading states, and authentication API route |
| `src/components/` | Reusable UI, authentication, and profile components |
| `src/lib/` | API helpers, authentication setup, and formatting utilities |
| `public/` | Static assets |

## Deployment

The application is deployed on Vercel.

To deploy your own copy:

1. Import the repository into Vercel.
2. Add the required environment variables.
3. Set `BETTER_AUTH_URL` to your production website URL.
4. Configure Google and GitHub OAuth callback URLs using your production domain.
5. Ensure the deployment can connect to MongoDB.
6. Deploy the project.



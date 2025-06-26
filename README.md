# CleanCraft Website

This project is the main frontend application for CleanCraft, built with a modern, performant, and scalable tech stack.

## Tech Stack

- **Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Deployment**: Docker

---

## Project Structure

The codebase is organized to separate concerns and facilitate maintainability.

```
/
├── public/               # Static assets (images, fonts, etc.)
├── src/
│   ├── components/       # Reusable React components (UI, layout, etc.)
│   ├── config/           # Application configuration (e.g., react-query)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Core libraries and utilities (e.g., Strapi client)
│   ├── pages/            # Page components mapped to routes
│   └── App.tsx           # Main application component, sets up providers
├── .github/workflows/    # CI/CD workflows (e.g., build and push to ECR)
├── Dockerfile            # Multi-stage Dockerfile for building a production image
└── package.json          # Project dependencies and scripts
```

---

## Routing and Application Flow

The application uses a country-scoped routing system managed by `react-router-dom`.

1.  **Initial Visit**: A user visiting the root `/` is immediately redirected by the `CountryRedirect` component to a path prefixed with their country code (e.g., `/us/`).
2.  **Layout Shell**: All subsequent navigation happens within a `/:countryCode/*` route, which renders the `CountryLayout` component. This component acts as a persistent shell, providing a consistent header, footer, and other global elements.
3.  **Page Loading**: Most pages are lazy-loaded using `React.lazy()` to improve initial load times. A `PageLoader` component is shown as a fallback during code-splitting.
4.  **Routing Configuration**: The central routing configuration is located in `src/components/AppRoutes.tsx`.

### Available Routes

| Path                                        | Page Component             | Description                                      |
| ------------------------------------------- | -------------------------- | ------------------------------------------------ |
| `/`                                         | `CountryRedirect`          | Geo-IP redirect to the appropriate country scope.|
| `/:countryCode/`                            | `Index`                    | The main landing page.                           |
| `/:countryCode/blog`                        | `Blog` (lazy)              | Displays a list of blog articles.                |
| `/:countryCode/faq`                         | `Faq`                      | Shows frequently asked questions.                |
| `/:countryCode/services`                    | `ServicesNavbar`           | The main services page.                          |
| `/:countryCode/discover-cleancraft`         | `DiscoverCleanCraft` (lazy)| Information about the CleanCraft brand.          |
| `/:countryCode/laundry-franchise`           | `Franchise` (lazy)         | Page for franchise opportunities.                |
| `/:countryCode/learning/laundry-training-course` | `Courses` (lazy)         | Details about the laundry training course.       |
| `/:countryCode/learning/laundry-training-book`   | `Book` (lazy)            | Details about the laundry training book.         |
| `/:countryCode/policies`                    | `Policies` (lazy)          | Lists all legal policies.                        |
| `/:countryCode/policies/:slug`              | `PolicyDetails`            | Displays the content of a specific policy.       |
| `/:countryCode/*`                           | `NotFound`                 | A 404 page for any unmatched routes.             |

---

## Environment Variables & Configuration

The application is configured at **build time**. This means that environment variables are baked into the static files when the Docker image is built.

The `Dockerfile` accepts the following build arguments to configure the application:

- `VITE_STRAPI_URL` (required): The base URL for the Strapi API.
- `VITE_PUBLIC_BUILDER_KEY` (required): Public key for the Builder.io integration.
- `VITE_STRAPI_API_TOKEN` (optional): An authentication token for making authenticated requests to Strapi. If omitted, the client will make unauthenticated public requests.

See the `push-to-ecr.yml` workflow for an example of how these are passed during the CI/CD process.

---

## Local Development

1.  **Install Dependencies**:
    ```sh
    npm install
    ```
2.  **Create Environment File**:
    - Copy the `.env.example` file (if one exists) to a new `.env` file.
    - Populate it with the necessary variables for your local development environment.
3.  **Run the Development Server**:
    ```sh
    npm run dev
    ```

## Building for Production

The application is containerized using a multi-stage `Dockerfile`. To build a production-ready image locally, you can run:

```sh
docker build -t cleancraft-website \
  --build-arg VITE_STRAPI_URL="<your_strapi_url>" \
  --build-arg VITE_PUBLIC_BUILDER_KEY="<your_builder_key>" \
  --build-arg VITE_STRAPI_API_TOKEN="<your_optional_token>" \
  .
```

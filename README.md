# Harn Gun App

A modern web application built with Next.js, Firebase, Vertex AI, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 15.3.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase
- **AI Integration**: Google Vertex AI
- **Development**: Turbopack

## Prerequisites

- Node.js (Latest LTS version recommended)
- Bun (Latest version recommended)
- Firebase account
- Google Cloud Platform account (for Vertex AI)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/harn-gun-app.git
cd harn-gun-app
```

2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

GOOGLE_CLOUD_PROJECT=your_project_id
GOOGLE_APPLICATION_CREDENTIALS=path_to_your_credentials.json
```

4. Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
harn-gun-app/
├── app/                 # Next.js app directory
├── components/         # React components
├── lib/               # Utility functions and configurations
├── public/            # Static assets
├── styles/            # Global styles
└── types/             # TypeScript type definitions
```

## Features

- Modern UI with Tailwind CSS
- Google Vertex AI integration
- TypeScript support
- ESLint configuration
- Turbopack for faster development

## Available Scripts

- `bun dev` - Start development server with Turbopack
- `bun run build` - Build the application for production
- `bun run start` - Start the production server
- `bun run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Google Vertex AI](https://cloud.google.com/vertex-ai)
- [Tailwind CSS](https://tailwindcss.com/)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

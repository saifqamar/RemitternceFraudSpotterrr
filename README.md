# FraudSpotter

FraudSpotter is a web application built with Next.js that allows users to analyze transaction data to detect and prevent fraud. It uses an AI-powered engine to assess risk and provide detailed analysis.

## Key Features

- **Transaction Analysis**: Submit transaction data in JSON format for fraud risk assessment.
- **Supporting Document Upload**: Upload an accompanying image (e.g., ID, receipt) with the transaction data.
- **AI-Powered Risk Assessment**: The app provides a risk score (0-100), a risk level (Low, Medium, High), a set of triggered flags, and a detailed AI-generated reasoning for the assessment.
- **Detailed Audit Trail**: Review a step-by-step log of the analysis process for transparency and tracking.
- **Modern UI**: A clean, responsive, and intuitive user interface built with shadcn/ui and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI**: React
- **Styling**: Tailwind CSS
- **Component Library**: shadcn/ui
- **Icons**: Lucide React
- **Form Management**: React Hook Form
- **Server Actions**: For handling form submissions and data fetching securely on the server.
- **AI**: Google AI (via Genkit)

## Getting Started

To get started with the application, you can run the development server:

```bash
npm run dev
```

This will start the app on `http://localhost:9002`.

The main application logic can be found in the following files:

- `src/app/page.tsx`: The main page component that orchestrates the UI.
- `src/app/actions.ts`: Contains the server action that handles the fraud analysis logic.
- `src/components/`: Directory for the React components used in the application.

To connect this to your own fraud analysis backend, modify the `apiUrl` in `src/app/actions.ts`.

<a href="https://tan-ai.actnow.dev/">
  <img alt="Tanstack Start and App Router-ready AI chatbot." src="https://github.com/user-attachments/assets/2e6f3c70-8684-4864-a6f2-58ab013a535d">
  <h1 align="center">Tanstack Start Gemini Chatbot</h1>
</a>

<p align="center">
  An Open-Source AI Chatbot Template Built With Tanstack Start.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#model-providers"><strong>Model Providers</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a>
</p>
<br/>

## Features

- [Tanstack Start](https://tanstack.com/start/latest)
  - Full-stack React framework
  - SSR, Streaming, Server Functions, API Routes, bundling and more powered by TanStack Router, Nitro, and Vite. Ready to deploy to your favorite hosting provider.
  - Deploy to any hosting provider that supports Node.js [Netlify, Vercel, Cloudflare, Bun, Deno etc.]
- [AI SDK](https://sdk.vercel.ai/docs)
  - Unified API for generating text, structured objects, and tool calls with LLMs
  - Hooks for building dynamic chat and generative user interfaces
  - Supports Google (default), OpenAI, Anthropic, Cohere, and other model providers
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - Component primitives from [Radix UI](https://radix-ui.com) for accessibility and flexibility
- Data Persistence
  - [Postgres] You can also use postgres from any service provider or local
  - [Cloudflare R2](https://developers.cloudflare.com/r2/) for efficient object storage
- [Better Auth](https://www.better-auth.com/)
  - The most comprehensive authentication framework for TypeScript.
  - Whether you need 2FA, multi-tenancy, multi-session support, or even enterprise features like SSO, it lets you focus on building your application instead of reinventing the wheel.
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Drizzle ORM](https://orm.drizzle.team/) + PostgreSQL

## Model Providers

This template ships with Google Gemini `gemini-1.5-pro` models as the default. However, with the [AI SDK](https://sdk.vercel.ai/docs), you can switch LLM providers to [OpenAI](https://openai.com), [Anthropic](https://anthropic.com), [Cohere](https://cohere.com/), and [many more](https://sdk.vercel.ai/providers/ai-sdk-providers) with just a few lines of code.

## Deploy Your Own

You can deploy your own version of the Tanstack Start Gemini Chatbot to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhehehai%2Ftan-ai&env=VITE_BASE_URL,BETTER_AUTH_SECRET,DATABASE_URL,GOOGLE_GENERATIVE_AI_API_KEY,CLOUD_FLARE_R2_ACCOUNT_ID,CLOUD_FLARE_S3_UPLOAD_ID,CLOUD_FLARE_S3_UPLOAD_SECRET,CLOUD_FLARE_S3_UPLOAD_BUCKET,VITE_CLOUD_FLARE_R2_URL&project-name=tan-ai&repository-name=my-tan-ai)

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Tanstack Start Gemini Chatbot.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various Google Cloud and authentication provider accounts.

2. Install dependencies:

   ```bash
   pnpm install # npm install
   ```

3. Create a `.env` file based on [`.env.example`](./.env.example).

> [!TIP]
> `LOCAL_PROXY` is optional, it's used to proxy the local server to the Vercel AI SDK Studio.
> If you are a China developer, you may need to set this value

4. Push the schema to your database with drizzle-kit:

   ```bash
   pnpm db push # npm run db push
   ```

   <https://orm.drizzle.team/docs/migrations>

5. Run the development server:

   ```bash
   pnpm dev # npm run dev
   ```

   The development server should be now running at [http://localhost:3000](http://localhost:3000).

## Acknowledgements

- [Next.js Gemini Chatbot](https://github.com/vercel-labs/gemini-chatbot) - An Open-Source AI Chatbot Template Built With Next.js and the AI SDK by Vercel.
- [tanstarter](https://github.com/dotnize/tanstarter) - minimal TanStack Start template with Better Auth, Drizzle ORM, shadcn/ui

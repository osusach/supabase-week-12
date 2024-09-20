# PathwayAid

PathwayAid is a web application designed to help students find personalized scholarships and financial aid opportunities. By providing details such as academic interests and background, students can be matched with scholarships that fit their unique profile.

## Setup

This guide will help you set up the project locally.

### Prerequisites:

- [Supabase CLI](https://supabase.com/docs/guides/cli) installed
- A Supabase account
- [Node.js](https://nodejs.org) and package manager (npm or yarn)

### Database

This project uses Supabase's PostgreSQL database for storing application data.

While this setup is optional, it's **strongly recommended** as it simplifies local development.

#### 1. Initialize Supabase in your project

To start, initialize the Supabase project in your local environment:

```bash
supabase init
```

#### 2. Log in to your Supabase account

Authenticate the Supabase CLI with your account by logging in:

```bash
supabase login
```

#### 3. Link your local project to the Supabase project

Link your local environment to your Supabase project using your project reference. Replace `<project-ref>` with your actual project reference ID, which you can find in the Supabase dashboard:

```bash
supabase link --project-ref <project-ref>
```

#### 4. Pull changes from the deployed project

To synchronize your local environment with the latest schema and data changes from your deployed Supabase instance, use:

```bash
supabase db pull
```

### Troubleshooting

If you encounter issues during the setup process, refer to the official [Supabase troubleshooting guide](https://supabase.com/docs/guides/cli/managing-environments?queryGroups=environment&environment=production#troubleshooting) for common solutions.

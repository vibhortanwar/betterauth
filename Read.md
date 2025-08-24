- remove files from `public/\*`
- clear `globals.css`
- clear `page/tsx`
- install shadcn `npx shadcn@latest init`
- install components `npx shadcn@latest add button label input sonner`
- show button and test `dev` server

==PART 1==

- install Better Auth `npm i better-auth`
- create `.env` datatbase with `neon.tech`
- create `lib/auth.ts`
- setup `postgres` with database with `neon.tech`
- install prisma `npm install prisma --save-dev`
- initailize prisma `npx prisma init`
- create **Post** Model
- push database changes `npx prisma db push`
- add `generated` to `.gitignore`
- adjust **script** in `package.json`

- create single Prisma client in `lib/prisma.ts`
- setup prisma adapter with better-auth
- generate auth tables `npx @better-auth/cli generate --output=auth.schema.prisma`
- make tweaks to `schema.prisma`
- quick walkthrough the models:
  - `User`
  - `Session`
  - `Account`
  - `Verification`
- push database changes `npx prisma db push`
- create Mount Handler in `app/api/aut/[...all]/route.ts`
- adjust `eslint.config.mjs` to ignore `/src/generated/**/*`
- create Client instance in `lib/auth-client.ts`

- Enable Email & Password Authentication
- Create Sign Up Page PT1
  - Create Form `components/register-form.tsx`
  - Log Form Values
- Setup Sonner
- Create Sign Up Page PT2
  - Add Form Validation
  - Destructure SignUp Function
  - Showcase `onError`
- OPTIONS - **minPasswordLength**
- Create Sign Up Page PT3
  - Sign Up _default automatically signs in the user_
- Show Session on Profile Page
- Show Data in Neon Dashboard
- Sign Out User
  - Destructure SignOut Function
  - She Removed Cookies
- Create Sign In Page PT1
  - Create Form `components/login-form.tsx`
  - Log Form Values
  - Destructure SignIn Function
- Show Unauthorized on Profile Page
- Create Sign In Page PT2
  - Showcase `onError`
  - Sign In User
- FINISH PART 1

== PART 2 ==

- Showcase `onRequest` and `onResponse`
- Showcase Full Cycle Again
- Add Convenience Links for Auth Pages
- OPTIONS - **autoSign**
  - Showcase
- OPTIONS - **advanced.database.generateId**
  - Create User
  - Argon2 `npm install @node-rs/argon2`
  - Add to `next.config.ts`
  - Create Utilities `lib/argon2.ts`
  - Add to `lib/auth.ts`
  - Showcase
  - Truncate Tables
- Create User

- Sign Up User via SERVER ACTIONS
  - Create Action
  - Log Form Values
  - Sign Up User on Server
- Sign in User via SERVER ACTIONS P1
  - Create Action
  - Log Form Values
  - Sign In User on Server
  - Showcase - No Cookies
  - Manually Set Cookies
  - Showcase - Cookies
- Get Additional Session Properties
- PLUGINS - **nextCookies()**
- FINISH PART 2

== PART 3 ==

- Get Session on Client
  - Create Get Started Button
  - Destructure useSession
  - Showcase
- OPTIONS - **session.expiresIn**
  - Change to 15 seconds
  - Showcase
  - Change to 30 days
- Middleware
  - check for existence of a session cookie
  - showcase on auth routes
- Error Handling
- Hooks
  - Validate Email
  - Transform Name
- FINISH PART 3

== PART 4 ==

- Google OAuth
  - Create Buttons
- GitHub OAuth
- Account Linking
- Error Handling
  - '/auth/login/error'
- FINISH PART 4

== PART 5 ==

- NodeMailer
  - Create Template
- Verify Email
  - `emailAndPasswordrequireEmailVerification`
  - `emailVerification`
  - Handle Error / Expired `/auth/verify`
  - Destructure sendVerificationEmail
  - Handle Login Page Not Verified
- Create Post Sign Up Page
  - Showcase
- Forgot Password
  - Page / Form / Success
- Reset Password
  - Page / Form / Success
  - Showcase
- FINISH PART 5

== PART 7 ==

- Show the image
- Updating User
  - change name / image
  - update hook
  - updateing password
- Custom Sessions
  - type inference

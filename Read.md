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

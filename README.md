This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


step:
- run migration db/migrations/migration.sql
- pnpm prisma db pull
- pnpm prisma db push
- enjoy

notes: user admin:
- email: admin@gmail.com
- password: 123123

## Admin Page
u can open the admin page with [http://localhost:3000/login](http://localhost:3000/login) or [http://localhost:3000/dashboard](http://localhost:3000/dashboard).
<p>if u want login, you must create a user in database</p>
<p>input the gmail, password, name </p>
<p>the password must use bcrypt generator. i recommend use this web : <a href ="https://bcrypt-generator.com/" target="_blank">click here</a></p>
for example : 
<p>input encrypt and make it 10 rounds and go encrypt</p>

![bcrypt](https://github.com/user-attachments/assets/cfdd4d1d-03ca-4651-bac6-11d15ea02b8a)
<p>after encrypt, go copy the password and input in the database</p>

![exmpl](https://github.com/user-attachments/assets/63253047-d6c3-4c83-a63f-cfcb972b35b2)
![exampledb](https://github.com/user-attachments/assets/2fcf8523-b473-470b-ac12-16da5b6b9a2a)

after doing that. you can go login with that user. input the gmail and password ( on that example we input password erty )

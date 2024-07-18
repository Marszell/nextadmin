import NextAuth from 'next-auth';
import {authConfig} from './auth.config';
import Credentials from "next-auth/providers/credentials";
import {fetchUserByEmail} from "@/app/lib/userRepository";
import {z} from "zod";
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<any> {
    try {
        return await fetchUserByEmail(email);
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string() })
                .safeParse(credentials)

            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;
                const user = await getUser(email);
                if (!user) return null;

                const passwordsMatch = await bcrypt.compare(password, user.password);

                if (passwordsMatch) return user;
            }

            return null;
        }
    })],
});
import type { NextApiRequest, NextApiResponse } from 'next'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { fetchUserByEmail } from '@/app/lib/userRepository'


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).end('Method Not Allowed')
//   }

//   const { email, password } = req.body

//   const user = await fetchUserByEmail(email)

//   if (!user) {
//     return res.status(401).json({ message: 'Invalid email or password' })
//   }

//   const isPasswordValid = await compare(password, user.password)

//   if (!isPasswordValid) {
//     return res.status(401).json({ message: 'Invalid email or password' })
//   }

//   const token = sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' })

//   res.status(200).json({ token })
// }
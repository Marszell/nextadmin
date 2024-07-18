// import type { NextApiRequest, NextApiResponse } from 'next'
// import { compare } from 'bcryptjs'
// import { sign } from 'jsonwebtoken'
// import { fetchUserByEmail } from '@/app/lib/userRepository'


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

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({
          status: 'success',
          message: 'Login successful',
          name: user.name,
          image_url: user.image_url
        });
      } else {
        res.status(401).json({ status: 'fail', message: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Server error', error });
    }
  } else {
    res.status(405).json({ status: 'fail', message: 'Method not allowed' });
  }
}

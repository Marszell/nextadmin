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

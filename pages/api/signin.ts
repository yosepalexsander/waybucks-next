import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    'Set-Cookie',
    serialize('token', req.body.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 1,
      path: '/*/**',
    })
  );
  res.status(200).json({ success: true });
};

// eslint-disable-next-line import/no-default-export
export default handler;
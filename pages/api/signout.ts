import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    'Set-Cookie',
    serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/',
    }),
  );
  res.status(200).json({ success: true });
};

// eslint-disable-next-line import/no-default-export
export default handler;
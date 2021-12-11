import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';


export const middleware = async (req: NextRequest, _ev: NextFetchEvent) => {
  const { token } = req && req.cookies;

  if (!token) {
    return NextResponse.redirect('/signin');
  }

  return NextResponse.next();
};
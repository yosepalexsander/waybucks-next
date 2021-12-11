import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';


export const middleware = async (req: NextRequest, _ev: NextFetchEvent) => {
  const { token } = req.cookies

  if (token) {
    return NextResponse.redirect('/');
  }

  return NextResponse.next();
};
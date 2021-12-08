import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';


export const middleware = async (req: NextRequest, _ev: NextFetchEvent) => {
  const { token } = req.cookies
  console.log(token)
  if (token) {
    return NextResponse.redirect('/product');
  }

  return NextResponse.next();
};
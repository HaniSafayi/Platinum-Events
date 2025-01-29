import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from 'next/server'

const publicRoutes = createRouteMatcher([
    '/',
    '/events/:id',
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/uploadthing',
  ]);
  
  const ignoredRoutes = createRouteMatcher([
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/uploadthing',
  ]);

  const isPublicRoute = createRouteMatcher([
    '/sign-in(.*)',
    '/sign-up(.*)'
  ])
  
  export default clerkMiddleware(async (auth, req: NextRequest) => {
    const { userId, sessionClaims, redirectToSignIn } = await auth();
  
    // If the route is ignored, let it pass without checks
    if (ignoredRoutes(req)) {
      return NextResponse.next();
    }
  
    // If the route is public, let it pass without checks
    if (publicRoutes(req) || isPublicRoute(req)) {
      return NextResponse.next();
    }
  
    // If the user isn't signed in, redirect to sign-in
    if (!userId) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // Allow access to all other routes for signed-in users
    return NextResponse.next();
  });

  
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
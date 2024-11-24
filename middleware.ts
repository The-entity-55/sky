import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req) {
    // Check if user is trying to access a protected route without authentication
    if (!auth.userId && !req.url.includes('/')) {
      const signInUrl = new URL('/', req.url)
      signInUrl.searchParams.set('redirect_url', req.url)
      return Response.redirect(signInUrl)
    }
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

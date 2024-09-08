import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes including /api/uploadthing
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/test(.*)",
  "/api/uploadthing(.*)" 
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)"
  ],
};

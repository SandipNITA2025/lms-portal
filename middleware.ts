import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes including /api/uploadthing
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/test(.*)",
  "/api/uploadthing(.*)",
  "/api/webhook(.*)",
  "/",
]);

export default clerkMiddleware((auth, request) => {
  if (isPublicRoute(request)) {
    console.log(`Public route accessed: ${request.url}`);
    // Allow access without protection
    return;
  } else {
    console.log(`Protected route accessed: ${request.url}`);
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

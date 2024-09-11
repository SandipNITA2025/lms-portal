// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/hQLkLpEbWXj
//  * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
//  */
// import Link from "next/link"
// import { Card } from "@/components/ui/card"
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// export default function Component() {
//   return (
//     <div className="flex flex-col min-h-[100dvh]">
//       <header className="px-4 lg:px-6 h-14 flex items-center">
//         <Link href="#" className="flex items-center justify-center" prefetch={false}>
//           <BookIcon className="h-6 w-6" />
//           <span className="sr-only">LMS Portal</span>
//         </Link>
//         <nav className="ml-auto flex gap-4 sm:gap-6">
//           <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
//             Features
//           </Link>
//           <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
//             Pricing
//           </Link>
//           <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
//             About
//           </Link>
//           <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
//             Contact
//           </Link>
//         </nav>
//       </header>
//       <main className="flex-1">
//         <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
//           <div className="container px-4 md:px-6">
//             <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
//               <div className="flex flex-col justify-center space-y-4">
//                 <div className="space-y-2">
//                   <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
//                     Unlock Your Learning Potential with Our LMS
//                   </h1>
//                   <p className="max-w-[600px] text-muted-foreground md:text-xl">
//                     Our comprehensive Learning Management System (LMS) empowers you to create, deliver, and manage
//                     engaging online courses and training programs.
//                   </p>
//                 </div>
//                 <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                   <Link
//                     href="#"
//                     className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//                     prefetch={false}
//                   >
//                     Sign Up
//                   </Link>
//                   <Link
//                     href="#"
//                     className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//                     prefetch={false}
//                   >
//                     Log In
//                   </Link>
//                 </div>
//               </div>
//               <img
//                 src="/placeholder.svg"
//                 width="550"
//                 height="550"
//                 alt="LMS Hero"
//                 className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
//               />
//             </div>
//           </div>
//         </section>
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features of Our LMS</h2>
//                 <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                   Our LMS offers a wide range of features to enhance your learning experience and empower your
//                   organization.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
//               <div className="flex flex-col justify-center space-y-4">
//                 <ul className="grid gap-6">
//                   <li>
//                     <div className="grid gap-1">
//                       <h3 className="text-xl font-bold">Intuitive Course Creation</h3>
//                       <p className="text-muted-foreground">
//                         Easily create and manage engaging online courses with our user-friendly course builder.
//                       </p>
//                     </div>
//                   </li>
//                   <li>
//                     <div className="grid gap-1">
//                       <h3 className="text-xl font-bold">Personalized Learning Paths</h3>
//                       <p className="text-muted-foreground">
//                         Customize learning paths to cater to individual learner needs and preferences.
//                       </p>
//                     </div>
//                   </li>
//                   <li>
//                     <div className="grid gap-1">
//                       <h3 className="text-xl font-bold">Robust Reporting and Analytics</h3>
//                       <p className="text-muted-foreground">
//                         Gain valuable insights into learner progress and course performance with our comprehensive
//                         reporting tools.
//                       </p>
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//               <img
//                 src="/placeholder.svg"
//                 width="550"
//                 height="310"
//                 alt="LMS Features"
//                 className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
//               />
//             </div>
//           </div>
//         </section>
//         <section className="w-full py-12 md:py-24 lg:py-32">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Users Say</h2>
//                 <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                   Hear from our satisfied customers about their experience with our LMS.
//                 </p>
//               </div>
//               <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
//                 <Card className="p-6 shadow-md">
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-2">
//                       <Avatar>
//                         <AvatarImage src="/placeholder-user.jpg" />
//                         <AvatarFallback>JD</AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <p className="text-sm font-medium">John Doe</p>
//                         <p className="text-xs text-muted-foreground">Instructor</p>
//                       </div>
//                     </div>
//                     <p className="text-muted-foreground">
//                       "The LMS has been a game-changer for my online\n courses. The intuitive interface and powerful
//                       features\n have made it easy to create and manage engaging\n content."
//                     </p>
//                   </div>
//                 </Card>
//                 <Card className="p-6 shadow-md">
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-2">
//                       <Avatar>
//                         <AvatarImage src="/placeholder-user.jpg" />
//                         <AvatarFallback>SM</AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <p className="text-sm font-medium">Sarah Miller</p>
//                         <p className="text-xs text-muted-foreground">Learner</p>
//                       </div>
//                     </div>
//                     <p className="text-muted-foreground">
//                       "I've been using the LMS for my online learning, and\n it's been a seamless experience. The
//                       personalized\n learning paths and interactive features have kept me\n engaged and motivated."
//                     </p>
//                   </div>
//                 </Card>
//                 <Card className="p-6 shadow-md">
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-2">
//                       <Avatar>
//                         <AvatarImage src="/placeholder-user.jpg" />
//                         <AvatarFallback>EM</AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <p className="text-sm font-medium">Emily Martinez</p>
//                         <p className="text-xs text-muted-foreground">Administrator</p>
//                       </div>
//                     </div>
//                     <p className="text-muted-foreground">
//                       "As an administrator, the LMS has made it easy to\n manage our organization's training programs.
//                       The\n reporting and analytics tools have been invaluable in\n tracking learner progress and course
//                       performance."
//                     </p>
//                   </div>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Pricing Plans</h2>
//                 <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                   Choose the plan that best fits your learning or training needs.
//                 </p>
//               </div>
//               <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
//                 <Card className="p-6 shadow-md">
//                   <div className="space-y-4">
//                     <div className="space-y-2">
//                       <h3 className="text-2xl font-bold">Basic</h3>
//                       <p className="text-4xl font-bold">
//                         $9<span className="text-2xl font-medium text-muted-foreground">/month</span>
//                       </p>
//                     </div>
//                     <ul className="space-y-2 text-muted-foreground">
//                       <li>
//                         <CheckIcon className="mr-2 inline-block h-4 w-4" />
//                         Up to 100 active learners
//                       </li>
//                       <li>
//                         <CheckIcon className="mr-2 inline-block h-4 w-4" />
//                         10 GB storage
//                       </li>
//                       <li>
//                         <CheckIcon className="mr-2 inline-block h-4 w-4" />
//                         Basic course creation tools
//                       </li>
//                       <li>
//                         <CheckIcon className="mr-2 inline-block h-4 w-4" />
//                         Limited reporting and analytics
//                       </li>
//                     </ul>
//                     <Link
//                       href="#"
//                       className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//                       prefetch={false}
//                     >
//                       Sign Up
//                     </Link>
//                   </div>
//                 </Card>
//                 <Card className="p-6 shadow-md">
//                   <div className="space-y-4">
//                     <div className="space-y-2">
//                       <h3 className="text-2xl font-bold">Pro</h3>
//                       <p className="text-4xl font-bold">
//                         $19<span className="text-2xl font-medium text-muted-foreground">/month</span>
//                       </p>
//                     </div>
//                     <ul className="space-y-2 text-muted-foreground">
//                       <li>
//                         <CheckIcon className="mr-2 inline-block h-4 w-4" />
//                         Up to 500 active learners
//                       </li>
//                       <li>
//                         <CheckIcon className="mr-2 inline-block h-4 w-4" />
//                         50 GB storage
//                       </li>
//                       <li>
//                         <CheckIcon className="mr-2 inline-block h-4 w-4" />
//                         Advanced course creation tools
//                       </li>
//                       <li>
//                         <CheckIcon className="mr-2 inline-block h-4 w-4" />
//                         Comprehensive reporting and analytics
//                       </li>
//                     </ul>
//                     <Link
//                       href="#"
//                       className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//                       prefetch={false}
//                     >
//                       Sign Up
//                     </Link>
//                   </div>
//                 </Card>
//                 <Card className="p-6 shadow-md">
//                   <div className="space-y-4">
//                     <div className="space-y-2">
//                       <h3 className="text-2xl font-bold">Enterprise</h3>
//                       <p className="text-4xl font-bold">
//                         $49<span className="text-2xl font-medium text-muted-foreground">/month</span>
//                       </p>
//                     </div>
//                     <ul className="space-y-2 text-muted-foreground">
//                       <li>
//                         <CheckIcon className="mr-2 inline-block h-4 w-4" />
//                         Unlimited active learners
//                       </li>
//                       <li>
//                         <CheckIcon className="mr-2 inline-block h-4 w-4" />
//                         Unlimited storage
//                       </li>
//                       <li>
//                         <CheckIcon className="mr-2 inline-block h-4 w-4" />
//                         Custom branding and domain
//                       </li>
//                       <li>
//                         <CheckIcon className="mr-2 inline-block h-4 w-4" />
//                         Advanced reporting and analytics
//                       </li>
//                     </ul>
//                     <Link href="#" className="inline-flex h-10 items" prefetch={false} />
//                   </div>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   )
// }

// function BookIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
//     </svg>
//   )
// }


// function CheckIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M20 6 9 17l-5-5" />
//     </svg>
//   )
// }
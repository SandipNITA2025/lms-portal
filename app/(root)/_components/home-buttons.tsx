import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomeButtons = () => {
  return (
    <div className="flex gap-4 items-center">
      <Link href="/search">
        <Button>Explore Courses</Button>
      </Link>
      <Link href="/dashboard">
        <Button variant="outline">Dashboard</Button>
      </Link>
    </div>
  );
};

export default HomeButtons;

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalSearch() {
  return (
    <Button size="icon" variant="ghost" className="rounded-full cursor-pointer">
      <Search />
    </Button>
  );
}

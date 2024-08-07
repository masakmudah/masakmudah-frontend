import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect } from "react";

export function RecipeRoute() {
  useEffect(() => {
    document.title = "${user.name} - Masakmudah";
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <ul>
        <li>
          <Card>
            <CardHeader>
              <CardTitle>Title</CardTitle>
              <CardDescription>Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Content</p>
            </CardContent>
            <CardFooter>
              <p>Footer</p>
            </CardFooter>
          </Card>
        </li>
      </ul>
    </div>
  );
}

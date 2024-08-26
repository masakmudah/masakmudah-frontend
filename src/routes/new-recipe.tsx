import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function NewRecipeRoute() {
  return (
    <div>
      <h1>Tulis Resep Baru</h1>
      <Separator />

      <form>
        <p>Basic information recipe</p>
        <Separator />

        <p>Categories recipe</p>
        <Separator />

        <p>Ingredients recipe</p>
        <Separator />
        <p>Instructions recipe</p>
        <Separator />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

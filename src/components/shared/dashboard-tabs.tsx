import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DashboardTabs() {
  return (
    <Tabs defaultValue="my-recipe" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-[#1C2625] rounded-3xl text-white font-clashDisplayMedium">
        <TabsTrigger
          value="my-recipe"
          className="data-[state=active]:bg-[#F7FEE7] rounded-3xl"
        >
          Resep saya
        </TabsTrigger>
        <TabsTrigger
          value="saved-recipe"
          className="data-[state=active]:bg-[#F7FEE7] rounded-3xl"
        >
          Resep disimpan
        </TabsTrigger>
      </TabsList>
      <TabsContent value="my-recipe"></TabsContent>
      <TabsContent value="saved-recipe"></TabsContent>
    </Tabs>
  );
}

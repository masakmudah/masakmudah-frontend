import { MemberProfile } from "@/components/about/member-profile";
import Container from "@/components/ui/container";

export function AboutRoute() {
  return (
    <div className="font-raleway bg-[#F7FEE7] min-h-dvh">
      <Container className="flex flex-col items-center justify-center gap-4 sm:gap-16 max-xs:py-6">
        <h1 className="text-2xl xs:text-4xl font-bold md:font-extrabold p-4">
          Member Profile
        </h1>

        <MemberProfile />
      </Container>
    </div>
  );
}

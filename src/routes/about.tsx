import { MemberProfile } from "@/components/about/member-profile";

export function AboutRoute() {
  return (
    <div className="font-raleway flex flex-col items-center gap-16 md:gap-36 pt-28 border-b border-black bg-[#F7FEE7] min-h-dvh">
      <h1 className="text-3xl md:text-5xl font-bold md:font-extrabold p-4">
        Member Profile
      </h1>

      <MemberProfile />
    </div>
  );
}

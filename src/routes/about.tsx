import { memberProfile } from "@/constant/member-profile";

export function AboutRoute() {
  return (
    <div className="font-raleway flex flex-col items-center p-8 border-b border-black bg-[#F7FEE7] h-dvh">
      <h1 className="text-4xl md:text-6xl font-bold md:font-extrabold mb-10 p-4">
        Member Profile
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {memberProfile.map((profile) => (
          <div
            key={profile.name}
            className="flex flex-col items-center p-4 max-w-[300px] max-h-[400px] flex-shrink-0 bg-transparent"
          >
            <img
              src={profile.imageURL}
              alt={profile.name}
              className="w-32 h-32 md:w-60 md:h-60 object-cover rounded-full"
            />
            <div className="">
              <h1 className="text-center text-sm md:text-2xl font-semibold mt-6 ">
                {profile.name}
              </h1>
            </div>
            <div className="text-xs md:text-lg font-bold text-[#E85541] flex gap-2 mt-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#a3b47d] transition-colors duration-300"
              >
                GitHub
              </a>
              <p>|</p>
              <a
                href={profile.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#a3b47d] transition-colors duration-300"
              >
                LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

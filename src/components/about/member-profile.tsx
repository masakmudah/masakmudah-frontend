import { memberProfile, memberProfile2 } from "@/constant/member-profile";

export function MemberProfile() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center justify-items-center ">
        {memberProfile.map((profile) => (
          <div
            key={profile.name}
            className="flex flex-col items-center p-4 flex-shrink-0 bg-transparent"
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
      <div className="flex justify-center items-center">
        {memberProfile2.map((profile) => (
          <div
            key={profile.name}
            className="flex flex-col items-center p-4 flex-shrink-0 bg-transparent"
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

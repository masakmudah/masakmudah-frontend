import { memberProfile, memberProfile2 } from "@/constant/member-profile";

export function MemberProfile() {
  return (
    <div className="w-full flex flex-col gap-4 space-y-4 max-h-full">
      <div className="flex flex-col xs:flex-row justify-center w-full md:gap-16 gap-4 xs:space-y-0 space-y-4">
        {memberProfile.map((profile) => (
          <div
            key={profile.name}
            className="flex flex-col items-center justify-between gap-2 h-auto"
          >
            <div className="flex flex-col items-center gap-3 max-w-36 xs:max-w-24 sm:max-w-44 md:max-w-52">
              <img
                src={profile.imageURL}
                alt={profile.name}
                className="w-36 h-36 xs:w-24 xs:h-24 sm:w-44 sm:h-44 md:w-52 md:h-52 object-cover rounded-full"
              />
              <h1 className="text-center text-sm sx:text- sm:text-xl font-semibold w-full">
                {profile.name}
              </h1>
            </div>
            <div className="text-xs sm:text-lg font-bold text-[#E85541] flex gap-2">
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

      <div className="flex flex-col xs:flex-row justify-center w-full md:gap-16 gap-4 xs:space-y-0 space-y-4">
        {memberProfile2.map((profile) => (
          <div
            key={profile.name}
            className="flex flex-col items-center justify-between gap-2 h-auto"
          >
            <div className="flex flex-col items-center gap-3 max-w-36 xs:max-w-24 sm:max-w-44 md:max-w-52">
              <img
                src={profile.imageURL}
                alt={profile.name}
                className="w-36 h-36 xs:w-24 xs:h-24 sm:w-44 sm:h-44 md:w-52 md:h-52 object-cover rounded-full"
              />
              <h1 className="text-center text-sm sx:text- sm:text-xl font-semibold w-full">
                {profile.name}
              </h1>
            </div>
            <div className="text-xs sm:text-lg font-bold text-[#E85541] flex gap-2">
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

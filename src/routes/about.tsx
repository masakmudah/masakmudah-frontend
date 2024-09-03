import { memberProfile } from "@/constant/member-profile";

export function AboutRoute() {
  return (
    <div className="font-raleway flex flex-col items-center p-8 border-b border-black bg-[#F7FEE7]">
      <h1 className="text-4xl md:text-6xl font-bold md:font-extrabold mb-10 p-4">
        Member Profile
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {memberProfile.map((profile) => (
          <div
            key={profile.name}
            className="flex flex-col items-center p-4 max-w-[300px] h-[400px] flex-shrink-0 bg-transparent"
          >
            <img
              src={profile.imageURL}
              alt={profile.name}
              className="w-full object-cover rounded-full shadow-md shadow-black"
            />
            <div>
              <h1 className="text-2xl font-semibold mt-6 ">{profile.name}</h1>
            </div>
            <div className="text-lg font-bold text-[#E85541] flex gap-2 mt-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#a3b47d] transition-colors duration-300"
              >
                Github
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

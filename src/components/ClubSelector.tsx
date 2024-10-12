import React from 'react';

interface ClubGroup {
  name: string;
  clubs: string[];
}

interface ClubSelectorProps {
  clubGroups: ClubGroup[];
  selectedClubs: string[];
  toggleClub: (club: string) => void;
}

const ClubSelector: React.FC<ClubSelectorProps> = ({ clubGroups, selectedClubs, toggleClub }) => {
  return (
    <div className="space-y-4">
      {clubGroups.map((group) => (
        <div key={group.name} className="bg-gray-100 p-3 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">{group.name}</h3>
          <div className="grid grid-cols-2 gap-2">
            {group.clubs.map(club => (
              <button
                key={club}
                onClick={() => toggleClub(club)}
                className={`py-2 px-3 rounded-full text-sm font-semibold transition duration-300 ease-in-out ${
                  selectedClubs.includes(club)
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-200'
                }`}
              >
                {club}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClubSelector;
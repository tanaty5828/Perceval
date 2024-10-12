import React from 'react';

interface SelectedClubsProps {
  selectedClubs: string[];
}

const SelectedClubs: React.FC<SelectedClubsProps> = ({ selectedClubs }) => {
  return (
    <div className="mt-6 bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-2 text-gray-700">選択されたクラブ</h2>
      {selectedClubs.length > 0 ? (
        <ul className="list-disc list-inside">
          {selectedClubs.map(club => (
            <li key={club} className="text-gray-600">{club}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">クラブが選択されていません</p>
      )}
    </div>
  );
};

export default SelectedClubs;
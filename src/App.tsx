import React, { useState, useEffect, useRef } from 'react';
import { Share2, Camera } from 'lucide-react';
import html2canvas from 'html2canvas';
import ClubSelector from './components/ClubSelector';
import SelectedClubs from './components/SelectedClubs';

const golfClubGroups = [
  {
    name: 'ウッド',
    clubs: ['ドライバー(1W)', 'フェアウェイウッド(3W)', 'フェアウェイウッド(5W)']
  },
  {
    name: 'ユーティリティ',
    clubs: ['ユーティリティ(3UT)', 'ユーティリティ(4UT)', 'ユーティリティ(5UT)']
  },
  {
    name: 'アイアン',
    clubs: ['5番アイアン', '6番アイアン', '7番アイアン', '8番アイアン', '9番アイアン']
  },
  {
    name: 'ウェッジ',
    clubs: ['PW（ピッチングウェッジ）', 'AW（アプローチウェッジ）', 'SW（サンドウェッジ）']
  },
  {
    name: 'パター',
    clubs: ['パター']
  }
];

function App() {
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const selectedClubsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const clubs = urlParams.get('clubs');
    if (clubs) {
      setSelectedClubs(clubs.split(','));
    }
  }, []);

  const toggleClub = (club: string) => {
    setSelectedClubs(prev =>
      prev.includes(club)
        ? prev.filter(c => c !== club)
        : [...prev, club]
    );
  };

  const shareUrl = () => {
    const url = `${window.location.origin}${window.location.pathname}?clubs=${encodeURIComponent(selectedClubs.join(','))}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('URLがクリップボードにコピーされました！');
    });
  };

  const captureScreenshot = () => {
    if (selectedClubsRef.current) {
      html2canvas(selectedClubsRef.current).then(canvas => {
        canvas.toBlob(blob => {
          if (blob) {
            navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]).then(() => {
              alert('スクリーンショットがクリップボードにコピーされました！');
            }).catch(err => {
              console.error('スクリーンショットのコピーに失敗しました:', err);
              alert('スクリーンショットのコピーに失敗しました。');
            });
          }
        });
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">ゴルフクラブセレクター</h1>
        <ClubSelector clubGroups={golfClubGroups} selectedClubs={selectedClubs} toggleClub={toggleClub} />
        <div ref={selectedClubsRef}>
          <SelectedClubs selectedClubs={selectedClubs} />
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={shareUrl}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center justify-center"
          >
            <Share2 className="mr-2" size={20} />
            選択を共有
          </button>
          <button
            onClick={captureScreenshot}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center justify-center"
          >
            <Camera className="mr-2" size={20} />
            スクリーンショット
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
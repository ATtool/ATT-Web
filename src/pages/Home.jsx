import { Link } from 'react-router-dom'

const menuItems = [
  { title: 'Tamil Bible', tamil: 'தமிழ் பைபிள்', path: '/tamil-bible', icon: '📖' },
  { title: 'Songs of Zion', tamil: 'சீயோன் பாடல்கள்', path: '/songs', icon: '🎵' },
  { title: 'Thirumarai Thiruppadalgal', tamil: 'திருமறை திருப்பாடல்கள்', path: '/thirumarai', icon: '🎶' },
  { title: 'Thirumarai Hope', tamil: 'திருமறை நம்பிக்கை', path: '/thirumarai-hope', icon: '🕊️' },
  { title: 'Chittukkuruvi', tamil: 'சிட்டுக்குருவி', path: '/chittukkuruvi', icon: '🐦' },
  { title: 'Daily Devotion', tamil: 'தினசரி தியானம்', path: '/devotion', icon: '🙏' },
  { title: 'Tamil Sermons', tamil: 'தமிழ் செர்மன்கள்', path: '/sermons', icon: '🎙️' },
  { title: 'Bible Commentary', tamil: 'பைபிள் வர்ணனை', path: '/commentary', icon: '📝' },
  { title: 'Tamil EGW Books', tamil: 'தமிழ் EGW புத்தகங்கள்', path: '/egw-books', icon: '📚' },
  { title: 'SDA English Books', tamil: 'SDA ஆங்கில புத்தகங்கள்', path: '/sda-books', icon: '📕' },
  { title: 'Download Our App', tamil: 'எங்கள் ஆப் பதிவிறக்கம்', path: '/download-app', icon: '📱' },
  { title: 'GDrive Link Generator', tamil: 'லிங்க் ஜெனரேட்டர்', path: '/gdrive', icon: '🔗' },
]

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="bg-blue-900 text-white text-center py-10 px-4">
        <h1 className="text-3xl font-bold text-yellow-400 mb-2">
          Adventist Tamil Tool
        </h1>
        <p className="text-blue-200 text-sm">
          உங்கள் ஆவிக்குரிய வளங்கள் அனைத்தும் ஒரே இடத்தில்
        </p>
        <p className="text-blue-300 text-xs mt-1">
          All your spiritual resources in one place
        </p>
      </div>

      {/* Menu Cards */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg hover:bg-blue-50 transition-all duration-200"
            >
              <span className="text-4xl mb-2">{item.icon}</span>
              <span className="text-blue-900 font-semibold text-sm">{item.title}</span>
              <span className="text-gray-500 text-xs mt-1">{item.tamil}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-400 text-xs py-6">
        © 2025 Adventist Tamil Tool — All Rights Reserved
      </div>

    </div>
  )
}

export default Home
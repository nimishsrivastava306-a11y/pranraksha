import React from 'react';
import { FileText, Globe } from 'lucide-react';

const PublicResources = () => {
  const resources = [
    { icon: '📦', title: 'Pranraksha Module', link: 'https://drive.google.com/file/d/14POCj-uxQW1sXZiwkUxeOndq3w76Je0N/view?usp=drivesdk' },
    { icon: '📊', title: 'Pitch Deck', link: 'https://drive.google.com/file/d/1AEFn-4PCxP_uaAZWY8bcRH3pcwsdAMFt/view?usp=drivesdk' },
    { icon: '📽️', title: 'Pranraksha PPT', link: 'https://drive.google.com/file/d/14PkhW6JX3ar-5WSQEQsu-aOFuRctvz0i/view?usp=drivesdk' },
    { icon: '🎥', title: 'Video Explanation', link: 'https://drive.google.com/file/d/1BfEIQUY_e75ck3aQ3KBtCwk3cC2blI-s/view?usp=sharing' },
    { icon: '🇮🇳', title: 'Hindi Explanation', link: 'https://drive.google.com/file/d/1xgwrJptVfYAHhZlcYGDCho3coKZQ4ofu/view?usp=drivesdk' },
    { icon: '🇬🇧', title: 'English Pitch Video', link: 'https://drive.google.com/file/d/1xcrynIUIky-4RUwZFSxxFhtyD2PWmqRT/view?usp=drivesdk' },
  ];

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-3">
          🌐 Public Resources
        </h2>
        <p className="text-gray-400 text-lg">Free access to our public materials and documents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border border-gray-700 hover:border-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30"
          >
            <div className="text-5xl mb-4">{resource.icon}</div>
            <div className="flex items-start space-x-2">
              <Globe className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
              <h3 className="text-white font-semibold text-lg group-hover:text-orange-400 transition-colors">
                {resource.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PublicResources;

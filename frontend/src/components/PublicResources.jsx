import React from 'react';
import { FileText, Globe } from 'lucide-react';

const PublicResources = () => {
  const resources = [
    { icon: '📢', title: 'Marketing Presentation', link: 'https://drive.google.com/file/d/1pMnE9zTxO9eZK7sVy7cH8vQxj5TfD7Yw/view?usp=drive_link' },
    { icon: '📘', title: 'Product Catalog', link: 'https://drive.google.com/file/d/1kR5bXkQsD4fN2pYzL1hE9wXxQ6vTcZ8m/view?usp=drive_link' },
    { icon: '🎯', title: 'Company Overview', link: 'https://drive.google.com/file/d/1nY8wP3vR7qF6xZ5mJ9kL2tC4bH1sN0oQ/view?usp=drive_link' },
    { icon: '📞', title: 'Contact Information', link: 'https://drive.google.com/file/d/1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1u/view?usp=drive_link' },
    { icon: '🎓', title: 'Training Materials', link: 'https://drive.google.com/file/d/1vW2xY3zA4bC5dE6fG7hI8jK9lM0nO1p/view?usp=drive_link' },
    { icon: '📊', title: 'Industry Reports', link: 'https://drive.google.com/file/d/1qR2sT3uV4wX5yZ6aB7cD8eF9gH0iJ1k/view?usp=drive_link' },
    { icon: '💡', title: 'Innovation Insights', link: 'https://drive.google.com/file/d/1lM2nO3pQ4rS5tU6vW7xY8zA9bC0dE1f/view?usp=drive_link' },
    { icon: '🌟', title: 'Success Stories', link: 'https://drive.google.com/file/d/1gH2iJ3kL4mN5oP6qR7sT8uV9wX0yZ1a/view?usp=drive_link' },
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

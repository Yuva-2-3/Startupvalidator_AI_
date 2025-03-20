import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Brain, Lightbulb, Zap } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About StartupValidator.AI</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're on a mission to help entrepreneurs make data-driven decisions and increase their chances of success.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="text-gray-700 mb-4">
                StartupValidator.AI was born from a simple observation: too many startups fail because they build products that nobody wants or needs.
              </p>
              <p className="text-gray-700 mb-4">
                After witnessing countless brilliant minds pour their hearts, souls, and savings into ideas that never gained traction, decided there had to be a better way.
              </p>
              <p className="text-gray-700 mb-4">
                By combining cutting-edge AI technology with proven business validation methodologies, we've created a platform that helps entrepreneurs test their ideas before investing significant time and resources.
              </p>
              <p className="text-gray-700">
                Our mission is simple: reduce the failure rate of startups by ensuring founders build solutions that solve real problems for real customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Approach</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full">
                    <Brain size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">AI-Powered Analysis</h3>
              </div>
              <p className="text-gray-600">
                We leverage advanced AI models to analyze market trends, competition, and customer needs, providing insights that would take weeks to gather manually.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full">
                    <Lightbulb size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">Data-Driven Insights</h3>
              </div>
              <p className="text-gray-600">
                Our platform provides objective, data-backed insights rather than subjective opinions, helping you make informed decisions about your startup.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full">
                    <Zap size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">Rapid Validation</h3>
              </div>
              <p className="text-gray-600">
                Get comprehensive validation results in minutes, not weeks, allowing you to iterate quickly and find product-market fit faster.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full">
                    <Rocket size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold">Actionable Recommendations</h3>
              </div>
              <p className="text-gray-600">
                Beyond just analysis, we provide concrete next steps and recommendations to improve your startup's chances of success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Validate Your Idea?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
            Join thousands of entrepreneurs who have used our platform to validate their startup ideas and increase their chances of success.
          </p>
          <Link
            to="/validate"
            className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-8 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-colors shadow-lg"
          >
            Validate Your Idea Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, BarChart3, TrendingUp, Target, Users, DollarSign } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Turn Your Startup Idea Into Reality
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Validate your business concept with AI-powered market analysis, competition insights, and investor potential.
          </p>
          <Link
            to="/validate"
            className="inline-block bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
          >
            Validate Your Idea Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                <Rocket size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Describe Your Idea</h3>
              <p className="text-gray-600">
                Tell us about your startup concept, target audience, and business model.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                <BarChart3 size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI analyzes market trends, competition, and funding patterns.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Insights</h3>
              <p className="text-gray-600">
                Receive a comprehensive report with actionable insights and recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Use StartupValidator.AI?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full">
                  <Target size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Data-Driven Decisions</h3>
                <p className="text-gray-600">
                  Make informed decisions based on real market data and AI analysis rather than gut feelings.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full">
                  <Users size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Understand Your Market</h3>
                <p className="text-gray-600">
                  Gain deep insights into your target audience, competition, and market opportunities.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full">
                  <DollarSign size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Attract Investors</h3>
                <p className="text-gray-600">
                  Understand what investors look for and how to position your startup for funding success.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full">
                  <BarChart3 size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Comprehensive Analysis</h3>
                <p className="text-gray-600">
                  Get a complete SWOT analysis and marketing plan tailored to your specific business idea.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Validate Your Startup Idea?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't waste time and resources on unvalidated ideas. Get data-driven insights today.
          </p>
          <Link
            to="/validate"
            className="inline-block bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
          >
            Start Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
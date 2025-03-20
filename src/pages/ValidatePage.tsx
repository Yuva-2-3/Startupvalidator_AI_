import React from 'react';
import StartupForm from '../components/StartupForm';

const ValidatePage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Validate Your Startup Idea</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fill out the form below to get a comprehensive analysis of your startup idea, including market potential, competition analysis, SWOT analysis, and a marketing plan.
            </p>
          </div>
          
          <StartupForm />
        </div>
      </div>
    </div>
  );
};

export default ValidatePage;
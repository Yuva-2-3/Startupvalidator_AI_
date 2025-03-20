import React, { useState } from 'react';
import { validateStartupIdea, generateSwotAnalysis, generateMarketingPlan } from '../services/geminiService';
import { StartupIdea, ValidationResult, SwotAnalysis, MarketingPlan } from '../types';
import { Loader2 } from 'lucide-react';
import { generatePdf } from '../utils/pdfGenerator'; // Import the utility function

const StartupForm: React.FC = () => {
  const [startupIdea, setStartupIdea] = useState<StartupIdea>({
    name: '',
    description: '',
    industry: '',
    targetAudience: '',
    businessModel: ''
  });

  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [swotAnalysis, setSwotAnalysis] = useState<SwotAnalysis | null>(null);
  const [marketingPlan, setMarketingPlan] = useState<MarketingPlan | null>(null);
  const [activeTab, setActiveTab] = useState('validation');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStartupIdea(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate all required fields
      const requiredFields = ['name', 'description', 'industry', 'targetAudience', 'businessModel'];
      const missingFields = requiredFields.filter(field => !startupIdea[field as keyof StartupIdea]);
      
      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      }

      // Run all analyses in parallel
      const [validationData, swotData, marketingData] = await Promise.all([
        validateStartupIdea(
          startupIdea.name,
          startupIdea.description,
          startupIdea.industry,
          startupIdea.targetAudience,
          startupIdea.businessModel
        ),
        generateSwotAnalysis(
          startupIdea.name,
          startupIdea.description,
          startupIdea.industry,
          startupIdea.targetAudience,
          startupIdea.businessModel
        ),
        generateMarketingPlan(
          startupIdea.name,
          startupIdea.description,
          startupIdea.industry,
          startupIdea.targetAudience,
          startupIdea.businessModel
        )
      ]);

      setValidationResult(validationData);
      setSwotAnalysis(swotData);
      setMarketingPlan(marketingData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const industries = [
    "Select an industry",
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "E-commerce",
    "Food & Beverage",
    "Transportation",
    "Real Estate",
    "Entertainment",
    "Manufacturing",
    "Energy",
    "Agriculture",
    "Fashion",
    "Travel & Tourism",
    "Other"
  ];

  const businessModels = [
    "Select a business model",
    "SaaS (Software as a Service)",
    "Subscription",
    "Marketplace",
    "E-commerce",
    "Freemium",
    "Advertising",
    "Franchise",
    "Direct Sales",
    "Consulting",
    "Manufacturing",
    "Licensing",
    "Affiliate Marketing",
    "Dropshipping",
    "Other"
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Validate Your Startup Idea</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Startup Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={startupIdea.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., EcoDelivery"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={startupIdea.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Describe your startup idea in detail..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                  Industry*
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={startupIdea.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {industries.map((industry, index) => (
                    <option key={index} value={index === 0 ? '' : industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="businessModel" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Model*
                </label>
                <select
                  id="businessModel"
                  name="businessModel"
                  value={startupIdea.businessModel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {businessModels.map((model, index) => (
                    <option key={index} value={index === 0 ? '' : model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-1">
                Target Audience*
              </label>
              <input
                type="text"
                id="targetAudience"
                name="targetAudience"
                value={startupIdea.targetAudience}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Small business owners aged 30-50"
              />
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-md font-medium hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-70 flex justify-center items-center"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  'Validate My Startup Idea'
                )}
              </button>
            </div>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}
          </form>
        </div>
        
        {(validationResult || swotAnalysis || marketingPlan) && (
          <div className="border-t border-gray-200">
            <div className="bg-gray-50 px-4 py-3 flex overflow-x-visible">
              <button
                onClick={() => setActiveTab('validation')}
                className={`px-4 py-2 rounded-md mr-2 ${
                  activeTab === 'validation'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Validation Results
              </button>
              <button
                onClick={() => setActiveTab('swot')}
                className={`px-4 py-2 rounded-md mr-2 ${
                  activeTab === 'swot'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                SWOT Analysis
              </button>
              <button
                onClick={() => setActiveTab('marketing')}
                className={`px-4 py-2 rounded-md ${
                  activeTab === 'marketing'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Marketing Plan
              </button>
              {/* Add Download Report Button */}
              <button
                onClick={() => {
                  console.log('Download Report button clicked');
                  generatePdf(activeTab, `Startup_Report_${new Date().toLocaleDateString()}`);
                }}
                className="ml-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Download Report
              </button>
            </div>
            
            <div className="p-6 md:p-8">
              {activeTab === 'validation' && validationResult && (
                <div id="validation">
                  {/* Validation Results Content */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Feasibility Score</h3>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                            {validationResult.feasibilityScore}/100
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                        <div
                          style={{ width: `${validationResult.feasibilityScore}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Market Analysis</h3>
                      <p className="text-gray-700">{validationResult.marketAnalysis}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Competition Analysis</h3>
                      <p className="text-gray-700">{validationResult.competitionAnalysis}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Funding Potential</h3>
                      <p className="text-gray-700">{validationResult.fundingPotential}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Investor Interest</h3>
                      <p className="text-gray-700">{validationResult.investorInterest}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'swot' && swotAnalysis && (
                <div id="swot">
                  {/* SWOT Analysis Content */}
                  <h3 className="text-xl font-bold text-gray-800 mb-6">SWOT Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <h4 className="text-lg font-semibold text-green-700 mb-2">Strengths</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {swotAnalysis.strengths.map((strength, index) => (
                          <li key={index} className="text-gray-700">{strength}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                      <h4 className="text-lg font-semibold text-red-700 mb-2">Weaknesses</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {swotAnalysis.weaknesses.map((weakness, index) => (
                          <li key={index} className="text-gray-700">{weakness}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="text-lg font-semibold text-blue-700 mb-2">Opportunities</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {swotAnalysis.opportunities.map((opportunity, index) => (
                          <li key={index} className="text-gray-700">{opportunity}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                      <h4 className="text-lg font-semibold text-yellow-700 mb-2">Threats</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {swotAnalysis.threats.map((threat, index) => (
                          <li key={index} className="text-gray-700">{threat}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'marketing' && marketingPlan && (
                <div id="marketing">
                  {/* Marketing Plan Content */}
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Marketing Plan</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Target Audience</h4>
                      <p className="text-gray-700">{marketingPlan.targetAudience}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Value Proposition</h4>
                      <p className="text-gray-700">{marketingPlan.valueProposition}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Marketing Channels</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {marketingPlan.channels.map((channel, index) => (
                            <li key={index} className="text-gray-700">{channel}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Marketing Strategies</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {marketingPlan.strategies.map((strategy, index) => (
                            <li key={index} className="text-gray-700">{strategy}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Key Metrics</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {marketingPlan.metrics.map((metric, index) => (
                            <li key={index} className="text-gray-700">{metric}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Budget Recommendation</h4>
                        <p className="text-gray-700">{marketingPlan.budget}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartupForm;
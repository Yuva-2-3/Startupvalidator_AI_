import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDid2JSNZbtfS8sBHCpunJQ7k4H02Wb06A";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-002" });

export const validateStartupIdea = async (
  name: string,
  description: string,
  industry: string,
  targetAudience: string,
  businessModel: string
) => {
  try {
    const prompt = `
      Act as an expert startup validator and venture capitalist. Analyze this startup idea:
      
      Name: ${name}
      Description: ${description}
      Industry: ${industry}
      Target Audience: ${targetAudience}
      Business Model: ${businessModel}
      
      Provide a comprehensive analysis with the following:
      1. Feasibility score (0-100)
      2. Market analysis (current trends, market size, growth potential)
      3. Competition analysis (existing players, barriers to entry)
      4. Funding potential (investment likelihood)
      5. Investor interest (what would attract investors)
      
      Format your response as JSON with the following structure:
      {
        "feasibilityScore": number,
        "marketAnalysis": "string",
        "competitionAnalysis": "string",
        "fundingPotential": "string",
        "investorInterest": "string"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Raw API Response:", text); 
    
    // Extract JSON safely
    const jsonMatch = text.match(/\{[\s\S]*\}/);
if (jsonMatch) {
  let jsonString = jsonMatch[0]
    .replace(/\n/g, " ") // Remove newlines
    .replace(/\t/g, " ") // Remove tabs
    .replace(/\r/g, " ") // Remove carriage returns
    .replace(/\\\"/g, '"') // Fix escaped double quotes
    .replace(/\\n/g, " ") // Fix escaped new lines
    .replace(/\\/g, ""); // Remove unnecessary backslashes

  return JSON.parse(jsonString);
}


    throw new Error("❌ Failed to extract valid JSON from the API response.");
  } catch (error) {
    console.error("🚨 Error validating startup idea:", error);
    throw error;
  }
};
export const generateSwotAnalysis = async (
  name: string,
  description: string,
  industry: string,
  targetAudience: string,
  businessModel: string
) => {
  try {
    const prompt = `
      Act as a business analyst. Create a detailed SWOT analysis for this startup idea:
      
      Name: ${name}
      Description: ${description}
      Industry: ${industry}
      Target Audience: ${targetAudience}
      Business Model: ${businessModel}
      
      Format your response as JSON with the following structure:
      {
        "strengths": ["string", "string", ...],
        "weaknesses": ["string", "string", ...],
        "opportunities": ["string", "string", ...],
        "threats": ["string", "string", ...]
      }
      
      Provide at least 3 points for each category.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract the JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error("Failed to parse response from Gemini API");
  } catch (error) {
    console.error("Error generating SWOT analysis:", error);
    throw error;
  }
};

export const generateMarketingPlan = async (
  name: string,
  description: string,
  industry: string,
  targetAudience: string,
  businessModel: string
) => {
  try {
    const prompt = `
      Act as a marketing expert. Create a comprehensive marketing plan for this startup idea:
      
      Name: ${name}
      Description: ${description}
      Industry: ${industry}
      Target Audience: ${targetAudience}
      Business Model: ${businessModel}
      
      Format your response as JSON with the following structure:
      {
        "targetAudience": "string",
        "valueProposition": "string",
        "channels": ["string", "string", ...],
        "strategies": ["string", "string", ...],
        "metrics": ["string", "string", ...],
        "budget": "string"
      }
      
      Provide at least 3 marketing channels, 3 strategies, and 3 key metrics to track.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract the JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error("Failed to parse response from Gemini API");
  } catch (error) {
    console.error("Error generating marketing plan:", error);
    throw error;
  }
};
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// Trip generation route with REAL Gemini API
router.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('🤖 Calling REAL Gemini API for:', prompt);

    // Use the CORRECT model that we found: gemini-2.0-flash
    const travelPlan = await callRealGeminiAPI(prompt);
    
    res.json({
      success: true,
      travelPlan: travelPlan,
      userPrompt: prompt
    });

  } catch (error) {
    console.error('❌ Real API failed:', error.message);
    
    // Fallback to smart mock
    const mockResponse = generateSmartMockResponse(req.body.prompt);
    res.json({
      success: true,
      travelPlan: mockResponse,
      userPrompt: req.body.prompt,
      note: "Using smart mock due to API issue"
    });
  }
});

// REAL Gemini API call with CORRECT model
async function callRealGeminiAPI(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  // Use the CORRECT model that we found in the diagnostic
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [{
      parts: [{
        text: `Create a STRUCTURED travel plan for: ${prompt}

Format it in CLEAN SECTIONS without excessive emojis:

DESTINATION OVERVIEW
[Brief destination description]

ITINERARY
Day 1: [Activity description]
Day 2: [Activity description]
Day 3: [Activity description]

BUDGET BREAKDOWN
Accommodation: ₹[amount]
Food: ₹[amount]
Activities: ₹[amount]
Transport: ₹[amount]
Total: ₹[total]

ACCOMMODATION
• [Hotel 1] - ₹[price]
• [Hotel 2] - ₹[price]

ACTIVITIES
• [Activity 1]
• [Activity 2]
• [Activity 3]

TRAVEL TIPS
• [Tip 1]
• [Tip 2]
• [Tip 3]

Keep it clean, professional, and well-structured.`
      }]
    }],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`API error: ${response.status} - ${errorData.error.message}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

// Keep the smart mock as backup (optional - you can remove it later)
function generateSmartMockResponse(prompt) {
  // ... (keep the same smart mock code from before)
  return "Smart mock response - Real AI should work now!";
}

module.exports = router;
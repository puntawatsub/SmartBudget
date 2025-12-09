const model = require("../config/gemini");

async function wastefulCategoryQuery(
  transactionTitle,
  transactionAmount,
  transactionCategoryName,
  transactionDate
) {
  const prompt = `
    You are a professional financial coach. Based on the user's transaction data, select a **category** for this spending based on the provided data in **JSON format**.

    ### Schema Requirements:
    The JSON response should have the following structure:

    {
      "category": "selected category", # Category can only be one of the following (case sensitive): "Luxury", "Lifestyle", "Self-Development", "Necessity", and "Fixed". In which fixed means that the costs are fixed, predictable, and cannot be changed easily for example rent.
      "analysis": "selected analysis", # Based on categories (case sensitive), it can only be: "None", "Duplicates", or "Inefficients"
    }

    ### User Input:
    **Title: ${transactionTitle}**
    **Amount: ${transactionAmount}**
    **Category: ${transactionCategoryName}**
    **Transaction: ${transactionDate.toString()}**

    ### Instructions:
    - Keep each field concise (1-3 sentences max).
    - Do not include extra fields outside of the schema.
    - Return only valid JSON.
  `;

  try {
    const result = await model(prompt);

    if (process.env.DEBUG_GEMINI === "true") {
      console.log("🔍 Raw Gemini response:", result);
    }

    return result.text;
  } catch (err) {
    console.error("Error in wastefulCategoryService:", err);
    throw new Error("Failed to generate category");
  }
}

module.exports = { wastefulCategoryQuery };

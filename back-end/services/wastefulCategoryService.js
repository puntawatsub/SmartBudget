const model = require("../config/gemini");
const Settings = require("../models/settingModel");

async function wastefulCategoryQuery(
  transactionTitle,
  transactionAmount,
  transactionCategoryName,
  transactionDate,
  currency,
  allTransactions
) {
  console.log(allTransactions);
  const prompt = `
    You are a professional financial coach. Based on the user's transaction data, select a **category** for this spending based on the provided data in **JSON format**.

    ### Schema Requirements:
    The JSON response should have the following structure:

    {
      "category": "selected category", # Category can only be one of the following (case sensitive): "Luxury", "Lifestyle", "Self-Development", "Necessity", and "Fixed". In which fixed means that the costs are fixed, predictable, and cannot be changed easily for example rent.
      "analysis": "selected analysis", # Based on categories (case sensitive), it can only be: "None", "Duplicates", or "Inefficients". Use "Duplicates" if the transaction seems to be a duplicate of another transaction (e.g., same merchant, amount, and date). Use "Inefficients" if the transaction appears to be an inefficient spending (e.g., luxury items, non-essential services). Use "None" if neither condition applies. Also take into account for example duplicates, where the user might be regularly spending on the same item but it is necessary for them. For example they might eat apples everyday.
    }

    ### User Input:
    **Title: ${transactionTitle}**
    **Amount: ${transactionAmount} in currency ${currency}**
    **Category: ${transactionCategoryName}**
    **Transaction: ${transactionDate.toString()}**

    ### Previous Transactions (excluding the latest one, if items already appear here once, the user has already spent on it once before current spending):
    ${JSON.stringify(allTransactions)}

    ### Instructions:
    - Keep each field concise (1-3 sentences max).
    - Do not include extra fields outside of the schema.
    - Return only valid JSON.
  `;

  console.log(prompt);

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

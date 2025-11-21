const {
  wastefulCategoryQuery,
} = require("../services/wastefulCategoryService");
const { normalizeCategory } = require("../utils/normalizedCategory");

async function generateText(req, res) {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const rawResponse = await wastefulCategoryQuery(title);

    // Try to extract JSON from markdown fences
    console.log(typeof rawResponse);
    const jsonMatch = rawResponse.match(/```json\s*([\s\S]*?)\s*```/);
    const jsonString = jsonMatch ? jsonMatch[1] : rawResponse;
    if (process.env.DEBUG_GEMINI === "true") {
      console.log(jsonString);
    }

    let parsedCategory;
    try {
      parsedCategory = JSON.parse(jsonString);
    } catch (err) {
      return res.status(500).json({ error: "Error parsing JSON response." });
    }

    const normalizedCategory = normalizeCategory(parsedCategory);
    res.json(normalizedCategory);
  } catch (err) {
    console.error("Error in wastefulCategoryController:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

module.exports = generateText;

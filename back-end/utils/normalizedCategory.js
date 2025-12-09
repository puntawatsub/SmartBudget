function normalizeCategory(category) {
  let spendingCategory = category;

  // If the plan is still a JSON string, try parsing it
  if (typeof spendingCategory === "string") {
    try {
      spendingCategory = JSON.parse(spendingCategory);
    } catch (err) {
      console.error("❌ Failed to parse spending category JSON:", err);
      return { category: "", analysis: "" };
    }
  }

  // Ensure the simplified schema with safe defaults
  return {
    category: spendingCategory.category || "No category provided",
    analysis: spendingCategory.analysis || "No analysis provided",
  };
}

module.exports = { normalizeCategory };

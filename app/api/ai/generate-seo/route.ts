import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, category } = body

    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: "Title and description are required" },
        { status: 400 }
      )
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Google AI API key not configured" },
        { status: 500 }
      )
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `You are an SEO expert for an e-commerce store selling custom ${category || "products"}.

Product Title: ${title}
Product Description: ${description}

Generate SEO-optimized content in JSON format with these exact fields:
1. seoTitle: An engaging, SEO-friendly title (max 60 characters) that includes primary keywords
2. seoDescription: A compelling meta description (max 160 characters) that encourages clicks
3. keywords: An array of 8-12 relevant SEO keywords and phrases

Important:
- Focus on search intent and user benefits
- Include product type, features, and use cases in keywords
- Make the seoTitle and seoDescription compelling for clicks
- Return ONLY valid JSON, no markdown, no explanation

Example format:
{
  "seoTitle": "Custom Wedding Magazine - Personalized Wedding Planner",
  "seoDescription": "Create your dream wedding magazine with custom colors, designs & personal touches. Perfect keepsake for your special day.",
  "keywords": ["custom wedding magazine", "personalized wedding planner", "wedding memory book", "custom wedding keepsake", "personalized bridal magazine", "wedding planning journal", "custom wedding gift", "personalized wedding memories"]
}`

    const result = await model.generateContent(prompt)
    const responseText = result.response.text()

    // Parse the AI response - handle both JSON and markdown-wrapped JSON
    let seoData
    try {
      // Remove markdown code blocks if present
      const jsonText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()
      seoData = JSON.parse(jsonText)
    } catch (parseError) {
      console.error("Failed to parse AI response:", responseText)
      return NextResponse.json(
        { success: false, error: "Failed to parse AI response. Please try again." },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        seoTitle: seoData.seoTitle || "",
        seoDescription: seoData.seoDescription || "",
        keywords: Array.isArray(seoData.keywords) ? seoData.keywords : [],
      },
    })
  } catch (error: any) {
    console.error("AI SEO Generation Error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate SEO content" },
      { status: 500 }
    )
  }
}

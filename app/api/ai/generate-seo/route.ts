import { NextRequest, NextResponse } from "next/server"

// Simple SEO generation function as fallback
function generateBasicSEO(title: string, description: string, category: string) {
  const categoryKeywords: Record<string, string[]> = {
    magazines: ["custom magazine", "personalized magazine", "magazine printing", "photo magazine"],
    journals: ["custom journal", "personalized journal", "writing journal", "diary"],
    scrapbooks: ["custom scrapbook", "memory book", "photo album", "keepsake book"],
    tools: ["craft supplies", "scrapbooking tools", "craft materials", "DIY tools"],
  }

  const baseKeywords = categoryKeywords[category as keyof typeof categoryKeywords] || []
  const titleWords = title.toLowerCase().split(' ').filter(w => w.length > 3)
  const descWords = description.toLowerCase().split(' ').slice(0, 20).filter(w => w.length > 4)

  const seoTitle = `${title} - Custom ${category.slice(0, -1)} | MyJourmals`.slice(0, 60)
  const seoDescription = description.slice(0, 157) + '...'
  const keywords = [
    ...baseKeywords,
    `custom ${title.toLowerCase()}`,
    `personalized ${title.toLowerCase()}`,
    ...titleWords.slice(0, 3),
    ...descWords.slice(0, 3),
  ].slice(0, 10)

  return { seoTitle, seoDescription, keywords }
}

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

    const apiKey = process.env.DIGITALOCEAN_AI_API_KEY
    
    // Try AI generation if API key is available
    if (apiKey) {
      try {
        const prompt = `Generate SEO content in JSON format for:
Title: ${title}
Description: ${description}
Category: ${category}

Return only JSON with: seoTitle (max 60 chars), seoDescription (max 160 chars), keywords (array of 8-10 keywords)`

        const response = await fetch(
          "https://api.sambanova.ai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: "Meta-Llama-3.1-8B-Instruct",
              messages: [
                {
                  role: "system",
                  content: "You are an SEO expert. Always respond with valid JSON only.",
                },
                {
                  role: "user",
                  content: prompt,
                },
              ],
              temperature: 0.7,
              max_tokens: 500,
            }),
          }
        )

        if (response.ok) {
          const result = await response.json()
          const responseText = result.choices?.[0]?.message?.content || ""

          if (responseText) {
            try {
              const jsonText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()
              const seoData = JSON.parse(jsonText)

              return NextResponse.json({
                success: true,
                data: {
                  seoTitle: seoData.seoTitle || "",
                  seoDescription: seoData.seoDescription || "",
                  keywords: Array.isArray(seoData.keywords) ? seoData.keywords : [],
                },
              })
            } catch (parseError) {
              console.log("AI response parse failed, using fallback")
            }
          }
        }
      } catch (aiError) {
        console.log("AI generation failed, using fallback:", aiError)
      }
    }

    // Fallback to basic SEO generation
    const seoData = generateBasicSEO(title, description, category)
    
    return NextResponse.json({
      success: true,
      data: seoData,
    })
  } catch (error: any) {
    console.error("SEO Generation Error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate SEO content" },
      { status: 500 }
    )
  }
}

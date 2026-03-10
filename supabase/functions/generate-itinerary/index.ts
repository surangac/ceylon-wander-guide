import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { startLocation, endLocation, numDays, dailyDistanceKm, destinations, travelStyle } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const prompt = `Plan a ${numDays}-day Sri Lanka travel itinerary.
Starting point: ${startLocation}
End point: ${endLocation}
Max daily travel distance: ${dailyDistanceKm} km
Preferred destinations to include (if possible): ${destinations?.length ? destinations.join(", ") : "any"}
Travel style preference: ${travelStyle}

Create a realistic, geographically logical route. Consider actual driving distances in Sri Lanka. Include must-see attractions, local experiences, and practical travel advice.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content:
              "You are a Sri Lanka travel expert. Generate detailed, accurate day-by-day itineraries based on real geography and distances. Always respond using the provided tool.",
          },
          { role: "user", content: prompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "return_itinerary",
              description: "Return the structured day-by-day itinerary",
              parameters: {
                type: "object",
                properties: {
                  itinerary: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        day: { type: "number" },
                        title: { type: "string" },
                        locations: { type: "array", items: { type: "string" } },
                        description: { type: "string" },
                        distance_km: { type: "number" },
                        highlights: { type: "array", items: { type: "string" } },
                      },
                      required: ["day", "title", "locations", "description", "distance_km", "highlights"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["itinerary"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "return_itinerary" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited — please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      console.error("No tool call in response:", JSON.stringify(data));
      return new Response(JSON.stringify({ error: "Failed to generate itinerary" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const itineraryData = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(itineraryData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-itinerary error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

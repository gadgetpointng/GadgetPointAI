import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    const {
      imageUrl,
      roomType,
      style,
      refinement = "",
      referenceImage = null,
    } = body;

    const prompt = `
Transform this ${roomType} into a beautiful ${style} design.

CRITICAL REQUIREMENTS:
- Keep the EXACT same room dimensions and spatial layout
- Maintain the EXACT window position and size
- Preserve the original architectural structure and proportions
- Keep the same camera angle and perspective
- DO NOT expand or extend the visible space
- Only change interior decoration, furniture, and color scheme
- Ensure the generated image has the EXACT same aspect ratio as the input

Room type: ${roomType}
Design style: ${style}
Additional requirements: ${refinement}
`;

    console.log(`Generating room: ${roomType} in ${style} style`);

    const response = await fetch("https://api.onspace.ai/v1/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("ONSPACE_API_KEY")}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        modalities: ["image", "text"],
        image: imageUrl,
        prompt,
        image_config: {
          aspect_ratio: "16:9",
        },
        reference_image: referenceImage,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OnSpace AI error:", errText);
      throw new Error(`OnSpace AI: ${errText}`);
    }

    const data = await response.json();
    console.log("Generation complete");

    return new Response(
      JSON.stringify({
        image: data.output?.image_base64,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("generate-room error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});

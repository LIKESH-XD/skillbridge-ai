import os
import json
import google.generativeai as genai
from dotenv import load_dotenv
from prompts import SYSTEM_PROMPT

# Load environment variables from the .env file
load_dotenv()

# Read the Gemini API key
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is missing in the .env file")

# Configure Gemini
genai.configure(api_key=api_key)

# Create the AI model
model = genai.GenerativeModel(
    model_name="gemini-3.6-flash",
    system_instruction=SYSTEM_PROMPT
)


def generate_career_plan(profile: dict):
    """
    Generate a personalized career plan using Gemini AI.
    """

    user_prompt = f"""
Analyze this user's career profile:

Name: {profile.get("name", "")}
Education: {profile.get("education", "")}
Career Goal: {profile.get("goal", "")}
Experience: {profile.get("experience", "")}
Interests: {profile.get("interests", "")}

Generate a personalized career plan based on this profile.
"""

    response = model.generate_content(
        user_prompt,
        generation_config={
            "temperature": 0.4,
            "response_mime_type": "application/json"
        }
    )

    try:
        return json.loads(response.text)
    except json.JSONDecodeError:
        return {
            "error": "The AI returned an invalid response",
            "raw_response": response.text
        }
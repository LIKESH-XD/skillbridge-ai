from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from agent import generate_career_plan


app = FastAPI(
    title="SkillBridge AI Backend",
    description="AI-powered career planning agent",
    version="1.0.0"
)


# Allow the React frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UserProfile(BaseModel):
    name: str = ""
    education: str = ""
    goal: str
    experience: str = ""
    interests: str = ""


@app.get("/")
def home():
    return {
        "message": "SkillBridge AI backend is running"
    }


@app.post("/api/generate-plan")
def generate_plan(profile: UserProfile):
    result = generate_career_plan(profile.model_dump())

    return {
        "success": True,
        "profile": profile.model_dump(),
        "agent_result": result
    }
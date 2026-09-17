import { generateCareerPlan } from "./api";
import React, { useMemo, useState } from "react";
import "./App.css";

const goalTemplates = {
  civil: {
    title: "Civil Services Preparation",
    subtitle:
      "Build a structured preparation plan for UPSC, APPSC, SSC and other civil service examinations.",
    skills: [
      "Indian Polity",
      "Indian History",
      "Geography",
      "Economics",
      "Current Affairs",
      "General Science",
      "Answer Writing",
      "Logical Reasoning",
    ],
    roadmap: [
      {
        title: "Understand the Examination",
        description:
          "Learn the exam pattern, syllabus, eligibility, stages and marking scheme.",
        duration: "1 Week",
      },
      {
        title: "Build Foundation",
        description:
          "Study NCERT-level History, Geography, Polity, Economics and Science.",
        duration: "4 Weeks",
      },
      {
        title: "Read Standard Books",
        description:
          "Follow reliable books and prepare subject-wise notes.",
        duration: "6 Weeks",
      },
      {
        title: "Current Affairs",
        description:
          "Read newspapers and monthly current affairs magazines regularly.",
        duration: "Ongoing",
      },
      {
        title: "Practice Questions",
        description:
          "Solve previous-year questions, mock tests and topic-wise quizzes.",
        duration: "4 Weeks",
      },
      {
        title: "Revision and Mock Tests",
        description:
          "Revise important topics and attempt full-length mock examinations.",
        duration: "4 Weeks",
      },
    ],
    projects: [
      "Create a daily current affairs notebook",
      "Prepare subject-wise revision charts",
      "Solve previous-year question papers",
      "Create weekly mock-test reports",
    ],
    opportunities: [
      "UPSC Civil Services Examination",
      "APPSC Group 1 Examination",
      "APPSC Group 2 Examination",
      "SSC CGL Examination",
    ],
    assistantSuggestions: [
      "Give me a civil services study plan",
      "Explain Indian Polity basics",
      "How should I prepare current affairs?",
      "Give me a daily timetable",
    ],
  },

  software: {
    title: "Software Development",
    subtitle:
      "Build programming skills, practical projects and job-ready development knowledge.",
    skills: [
      "Programming Fundamentals",
      "Data Structures",
      "Algorithms",
      "HTML and CSS",
      "JavaScript",
      "Git and GitHub",
      "Database Basics",
      "Problem Solving",
    ],
    roadmap: [
      {
        title: "Learn Programming Basics",
        description:
          "Choose Python, Java or C++ and learn variables, loops, functions and conditions.",
        duration: "3 Weeks",
      },
      {
        title: "Practice Problem Solving",
        description:
          "Solve beginner programming problems and improve logical thinking.",
        duration: "4 Weeks",
      },
      {
        title: "Learn Web Development",
        description:
          "Study HTML, CSS, JavaScript and create responsive web pages.",
        duration: "6 Weeks",
      },
      {
        title: "Learn Git and GitHub",
        description:
          "Upload your projects and understand version control.",
        duration: "1 Week",
      },
      {
        title: "Build Real Projects",
        description:
          "Create useful applications and publish them online.",
        duration: "6 Weeks",
      },
      {
        title: "Prepare for Jobs",
        description:
          "Improve your resume, portfolio, communication and interview skills.",
        duration: "Ongoing",
      },
    ],
    projects: [
      "Personal portfolio website",
      "To-do list application",
      "Student management system",
      "Weather application",
    ],
    opportunities: [
      "Frontend Developer Intern",
      "Backend Developer Intern",
      "Full Stack Developer Intern",
      "Open-source Contributor",
    ],
    assistantSuggestions: [
      "Give me a software development roadmap",
      "What programming language should I learn?",
      "Suggest beginner coding projects",
      "How can I prepare for software interviews?",
    ],
  },

  data: {
    title: "Data Science and AI",
    subtitle:
      "Learn Python, data analysis, machine learning and artificial intelligence through projects.",
    skills: [
      "Python",
      "NumPy",
      "Pandas",
      "Statistics",
      "Data Visualization",
      "Machine Learning",
      "SQL",
      "Problem Solving",
    ],
    roadmap: [
      {
        title: "Learn Python",
        description:
          "Study Python syntax, functions, lists, dictionaries, files and object-oriented basics.",
        duration: "4 Weeks",
      },
      {
        title: "Learn Mathematics",
        description:
          "Understand basic statistics, probability, linear algebra and calculus.",
        duration: "4 Weeks",
      },
      {
        title: "Practice Data Analysis",
        description:
          "Use NumPy, Pandas and Matplotlib to analyze datasets.",
        duration: "5 Weeks",
      },
      {
        title: "Learn SQL",
        description:
          "Practice queries, joins, grouping, filtering and database concepts.",
        duration: "3 Weeks",
      },
      {
        title: "Learn Machine Learning",
        description:
          "Study regression, classification, clustering and model evaluation.",
        duration: "8 Weeks",
      },
      {
        title: "Build AI Projects",
        description:
          "Create machine learning projects and publish them on GitHub.",
        duration: "6 Weeks",
      },
    ],
    projects: [
      "Student marks analysis",
      "House price prediction",
      "Spam message classifier",
      "Movie recommendation system",
    ],
    opportunities: [
      "Data Analyst Intern",
      "Machine Learning Intern",
      "AI Research Intern",
      "Python Developer Intern",
    ],
    assistantSuggestions: [
      "Give me a data science roadmap",
      "Explain machine learning simply",
      "Suggest Python projects",
      "How do I start with Kaggle?",
    ],
  },

  design: {
    title: "UI/UX and Graphic Design",
    subtitle:
      "Develop design thinking, visual communication and portfolio-building skills.",
    skills: [
      "Design Principles",
      "Color Theory",
      "Typography",
      "Wireframing",
      "User Research",
      "Figma",
      "Prototyping",
      "Portfolio Building",
    ],
    roadmap: [
      {
        title: "Learn Design Basics",
        description:
          "Understand color, spacing, typography, alignment and visual hierarchy.",
        duration: "2 Weeks",
      },
      {
        title: "Learn Figma",
        description:
          "Practice frames, components, auto-layout and interactive prototypes.",
        duration: "3 Weeks",
      },
      {
        title: "Study User Experience",
        description:
          "Learn user research, user journeys, wireframes and usability testing.",
        duration: "4 Weeks",
      },
      {
        title: "Redesign Existing Apps",
        description:
          "Analyze and improve the design of commonly used applications.",
        duration: "3 Weeks",
      },
      {
        title: "Build a Portfolio",
        description:
          "Create case studies explaining your design decisions.",
        duration: "4 Weeks",
      },
      {
        title: "Apply for Opportunities",
        description:
          "Prepare your portfolio and apply for internships or freelance work.",
        duration: "Ongoing",
      },
    ],
    projects: [
      "Mobile banking app redesign",
      "College website design",
      "Food delivery app prototype",
      "Personal design portfolio",
    ],
    opportunities: [
      "UI/UX Design Intern",
      "Graphic Design Intern",
      "Product Design Intern",
      "Freelance Designer",
    ],
    assistantSuggestions: [
      "Give me a UI/UX roadmap",
      "Explain Figma basics",
      "Suggest design portfolio projects",
      "How do I create a design case study?",
    ],
  },

  business: {
    title: "Business and Entrepreneurship",
    subtitle:
      "Learn business fundamentals, marketing, finance and startup execution.",
    skills: [
      "Business Communication",
      "Market Research",
      "Marketing",
      "Financial Basics",
      "Leadership",
      "Sales",
      "Product Management",
      "Entrepreneurship",
    ],
    roadmap: [
      {
        title: "Understand Business Basics",
        description:
          "Learn business models, customers, products, revenue and expenses.",
        duration: "2 Weeks",
      },
      {
        title: "Learn Market Research",
        description:
          "Understand customer needs, competitors and market opportunities.",
        duration: "3 Weeks",
      },
      {
        title: "Study Marketing",
        description:
          "Learn branding, social media marketing, content and customer acquisition.",
        duration: "4 Weeks",
      },
      {
        title: "Learn Financial Basics",
        description:
          "Understand budgeting, profit, loss, pricing and cash flow.",
        duration: "3 Weeks",
      },
      {
        title: "Create a Business Idea",
        description:
          "Identify a problem and design a solution for a target audience.",
        duration: "4 Weeks",
      },
      {
        title: "Build and Test",
        description:
          "Create a basic product, collect feedback and improve it.",
        duration: "Ongoing",
      },
    ],
    projects: [
      "Create a startup business plan",
      "Conduct a customer survey",
      "Build a marketing campaign",
      "Prepare a product pitch deck",
    ],
    opportunities: [
      "Business Development Intern",
      "Marketing Intern",
      "Product Management Intern",
      "Startup Internship",
    ],
    assistantSuggestions: [
      "Give me an entrepreneurship roadmap",
      "How do I find a business idea?",
      "Explain market research",
      "Help me create a business plan",
    ],
  },

  general: {
    title: "Personal Career Development",
    subtitle:
      "Build useful skills, explore opportunities and create a personalized growth plan.",
    skills: [
      "Communication",
      "Problem Solving",
      "Time Management",
      "Technical Skills",
      "Teamwork",
      "Critical Thinking",
      "Leadership",
      "Resume Building",
    ],
    roadmap: [
      {
        title: "Understand Your Goal",
        description:
          "Define your target career and identify the skills required.",
        duration: "1 Week",
      },
      {
        title: "Build Core Skills",
        description:
          "Learn the fundamental skills related to your selected career.",
        duration: "4 Weeks",
      },
      {
        title: "Practice Regularly",
        description:
          "Complete exercises, assignments and small practical tasks.",
        duration: "4 Weeks",
      },
      {
        title: "Build Projects",
        description:
          "Create projects that demonstrate your knowledge and abilities.",
        duration: "6 Weeks",
      },
      {
        title: "Create Your Portfolio",
        description:
          "Prepare a resume, portfolio and professional online profile.",
        duration: "2 Weeks",
      },
      {
        title: "Explore Opportunities",
        description:
          "Apply for internships, competitions, courses and entry-level roles.",
        duration: "Ongoing",
      },
    ],
    projects: [
      "Create a personal portfolio",
      "Complete a career-related mini project",
      "Prepare a professional resume",
      "Join a relevant online competition",
    ],
    opportunities: [
      "Skill-building Courses",
      "Internship Opportunities",
      "Hackathons",
      "Online Certifications",
    ],
    assistantSuggestions: [
      "Create a roadmap for my goal",
      "What skills should I learn first?",
      "Suggest projects for my career",
      "How can I build my resume?",
    ],
  },
};

function detectGoalType(goal = "") {
  const value = goal.toLowerCase();

  if (
    value.includes("civil") ||
    value.includes("upsc") ||
    value.includes("appsc") ||
    value.includes("ias") ||
    value.includes("ips") ||
    value.includes("group 1") ||
    value.includes("group 2") ||
    value.includes("ssc") ||
    value.includes("government exam") ||
    value.includes("competitive exam")
  ) {
    return "civil";
  }

  if (
    value.includes("software") ||
    value.includes("developer") ||
    value.includes("program") ||
    value.includes("web") ||
    value.includes("frontend") ||
    value.includes("backend") ||
    value.includes("full stack") ||
    value.includes("coding")
  ) {
    return "software";
  }

  if (
    value.includes("data") ||
    value.includes("machine learning") ||
    value.includes("artificial intelligence") ||
    value.includes(" ai") ||
    value.includes("analytics")
  ) {
    return "data";
  }

  if (
    value.includes("design") ||
    value.includes("ui") ||
    value.includes("ux") ||
    value.includes("graphic")
  ) {
    return "design";
  }

  if (
    value.includes("business") ||
    value.includes("entrepreneur") ||
    value.includes("startup") ||
    value.includes("marketing") ||
    value.includes("management")
  ) {
    return "business";
  }

  return "general";
}

function App() {
  const [activePage, setActivePage] = useState("home");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    goal: "",
    education: "",
    experience: "",
    interests: "",
  });
  const [assistantInput, setAssistantInput] = useState("");
  const [messages, setMessages] = useState([]);

  const goalType = detectGoalType(profile?.goal || "");
  const template = goalTemplates[goalType];

  const progress = useMemo(() => {
    if (!profile) return 0;

    let completed = 0;

    if (profile.name) completed += 20;
    if (profile.goal) completed += 30;
    if (profile.education) completed += 15;
    if (profile.experience) completed += 15;
    if (profile.interests) completed += 20;

    return completed;
  }, [profile]);

  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleCreateProfile(event) {
  event.preventDefault();

  if (!form.name.trim() || !form.goal.trim()) {
    alert("Please enter your name and career goal.");
    return;
  }

  const newProfile = {
    ...form,
    name: form.name.trim(),
    goal: form.goal.trim(),
  };

  try {
    const result = await generateCareerPlan(newProfile);

    console.log("AI Backend Response:", result);

    setProfile(newProfile);

    setMessages([
      {
        sender: "ai",
        text: `Hi ${newProfile.name}! Your personalized AI career plan for ${newProfile.goal} has been generated successfully.`,
      },
    ]);

    setShowProfileModal(false);
    setActivePage("dashboard");
  } catch (error) {
    console.error("AI Backend Error:", error);

    setProfile(newProfile);

    setMessages([
      {
        sender: "ai",
        text: `Hi ${newProfile.name}! Your frontend roadmap for ${newProfile.goal} is ready. Start by following the first step in your roadmap.`,
      },
    ]);

    setShowProfileModal(false);
    setActivePage("dashboard");

    alert(
      "AI backend could not be reached. The demo roadmap is shown instead. Make sure FastAPI is running."
    );
  }
}

  function openApp() {
    if (profile) {
      setActivePage("dashboard");
    } else {
      setShowProfileModal(true);
    }
  }

  function sendAssistantMessage(customText) {
    const text = (customText || assistantInput).trim();

    if (!text) return;

    const userMessage = {
      sender: "user",
      text,
    };

    const lowerText = text.toLowerCase();
    let reply = "";

    if (
      lowerText.includes("roadmap") ||
      lowerText.includes("plan") ||
      lowerText.includes("start")
    ) {
      reply = `For ${profile?.goal || "your career goal"}, start with "${template.roadmap[0].title}". Then follow the roadmap step by step. Focus on consistency and practical learning.`;
    } else if (
      lowerText.includes("skill") ||
      lowerText.includes("learn")
    ) {
      reply = `The important skills for your goal are: ${template.skills
        .slice(0, 5)
        .join(", ")}. Start with one skill and practice it regularly.`;
    } else if (
      lowerText.includes("project") ||
      lowerText.includes("portfolio")
    ) {
      reply = `You can start with these projects: ${template.projects.join(
        ", "
      )}. Choose one project and complete it before starting another.`;
    } else if (
      lowerText.includes("job") ||
      lowerText.includes("intern") ||
      lowerText.includes("opportunity")
    ) {
      reply = `Some relevant opportunities are: ${template.opportunities.join(
        ", "
      )}. Build skills and projects before applying.`;
    } else if (
      lowerText.includes("time") ||
      lowerText.includes("daily") ||
      lowerText.includes("timetable")
    ) {
      reply =
        "Try this daily routine: 1 hour learning, 1 hour practice, 30 minutes revision and 15 minutes tracking your progress.";
    } else {
      reply = `Your selected goal is "${profile?.goal}". I recommend focusing first on ${template.skills
        .slice(0, 3)
        .join(", ")}. You can ask me for a roadmap, skills, projects, timetable or opportunities.`;
    }

    setMessages((previous) => [
      ...previous,
      userMessage,
      {
        sender: "ai",
        text: reply,
      },
    ]);
    setAssistantInput("");
  }

  function renderHome() {
    return (
      <main className="landing-page">
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              <span>✦</span>
              AI-Powered Career Growth
            </div>

            <h1>
              Your Career.
              <br />
              <span>Your Bridge.</span>
              <br />
              Your Future.
            </h1>

            <p>
              SkillBridge AI transforms your career dreams into a clear,
              personalized roadmap with skills, projects and opportunities.
            </p>

            <div className="hero-buttons">
              <button className="primary-btn large-btn" onClick={openApp}>
                Get Started
                <span>→</span>
              </button>

              <button
                className="secondary-btn large-btn"
                onClick={() => {
                  if (!profile) {
                    setShowProfileModal(true);
                  } else {
                    setActivePage("explore");
                  }
                }}
              >
                Explore Careers
              </button>
            </div>

            <div className="hero-trust">
              <div className="trust-avatars">
                <span>👨🏻‍💻</span>
                <span>👩🏻‍🎓</span>
                <span>🧑🏻‍🚀</span>
                <span>👨🏻‍🔬</span>
              </div>
              <p>
                Helping learners turn ambition
                <br />
                into action.
              </p>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-glow"></div>

            <div className="floating-card card-top">
              <span className="mini-icon purple">✦</span>
              <div>
                <strong>Personalized</strong>
                <small>Career Roadmaps</small>
              </div>
            </div>

            <div className="dashboard-preview">
              <div className="preview-header">
                <div className="preview-brand">
                  <div className="brand-symbol">✦</div>
                  <strong>SkillBridge</strong>
                </div>
                <div className="preview-avatar">L</div>
              </div>

              <div className="preview-body">
                <p className="preview-small">GOOD MORNING, EXPLORER</p>
                <h3>Your journey starts here.</h3>

                <div className="preview-progress">
                  <div>
                    <span>Career Progress</span>
                    <strong>68%</strong>
                  </div>
                  <div className="preview-progress-bar">
                    <span></span>
                  </div>
                </div>

                <div className="preview-cards">
                  <div className="preview-small-card">
                    <span>◈</span>
                    <strong>Skills</strong>
                    <small>12 tracked</small>
                  </div>
                  <div className="preview-small-card">
                    <span>◉</span>
                    <strong>Projects</strong>
                    <small>4 completed</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="floating-card card-bottom">
              <span className="mini-icon green">✓</span>
              <div>
                <strong>Next Milestone</strong>
                <small>Build your first project</small>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="section-heading">
            <p className="eyebrow">EVERYTHING YOU NEED</p>
            <h2>One platform. Endless possibilities.</h2>
            <p>
              From your first idea to your dream career, SkillBridge gives you
              the tools to move forward.
            </p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon purple-bg">✦</div>
              <h3>AI Career Assistant</h3>
              <p>
                Get personalized guidance, answers and recommendations based
                on your career goal.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon blue-bg">⌁</div>
              <h3>Smart Roadmaps</h3>
              <p>
                Follow a structured step-by-step plan designed around your
                interests and ambitions.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon pink-bg">▣</div>
              <h3>Skills and Projects</h3>
              <p>
                Track important skills and build real projects that make your
                profile stronger.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  function renderSidebar() {
    const navItems = [
      { id: "dashboard", label: "Dashboard", icon: "⌂" },
      { id: "skills", label: "Skill Map", icon: "✦" },
      { id: "explore", label: "Explore", icon: "◈" },
      { id: "roadmap", label: "My Roadmap", icon: "⌁" },
      { id: "assistant", label: "AI Assistant", icon: "✧" },
    ];

    return (
      <aside className="sidebar">
        <div className="sidebar-brand" onClick={() => setActivePage("home")}>
          <div className="brand-symbol">✦</div>
          <span>SkillBridge</span>
        </div>

        <div className="sidebar-label">WORKSPACE</div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${
                activePage === item.id ? "active" : ""
              }`}
              onClick={() => setActivePage(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            className="profile-mini"
            onClick={() => setActivePage("profile")}
          >
            <div className="profile-avatar">
              {profile?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <strong>{profile?.name || "Your Profile"}</strong>
              <small>{profile?.goal || "Set your career goal"}</small>
            </div>
            <span>⋮</span>
          </button>
        </div>
      </aside>
    );
  }

  function renderTopbar() {
    return (
      <header className="topbar">
        <div className="mobile-brand" onClick={() => setActivePage("dashboard")}>
          <div className="brand-symbol">✦</div>
          <strong>SkillBridge</strong>
        </div>

        <div className="topbar-right">
          <button
            className="topbar-icon"
            onClick={() => setActivePage("assistant")}
            title="AI Assistant"
          >
            ✧
          </button>
          <button
            className="topbar-user"
            onClick={() => setActivePage("profile")}
          >
            {profile?.name?.charAt(0).toUpperCase() || "U"}
          </button>
        </div>
      </header>
    );
  }

  function renderDashboard() {
    return (
      <>
        <div className="page-heading">
          <div>
            <p className="eyebrow">YOUR WORKSPACE</p>
            <h1>
              Good morning, {profile?.name?.split(" ")[0] || "Explorer"}.
              <span>✦</span>
            </h1>
            <p>Let&apos;s make progress toward your career goals.</p>
          </div>
          <button className="primary-btn" onClick={() => setActivePage("roadmap")}>
            View Roadmap →
          </button>
        </div>

        <section className="dashboard-grid">
          <div className="welcome-card">
            <div>
              <p className="card-eyebrow">YOUR CAREER GOAL</p>
              <h2>{profile?.goal || "Choose your career goal"}</h2>
              <p>
                {template.subtitle}
              </p>
              <button
                className="light-btn"
                onClick={() => setActivePage("roadmap")}
              >
                Continue Journey →
              </button>
            </div>
            <div className="welcome-illustration">🚀</div>
          </div>

          <div className="progress-card">
            <div className="card-title-row">
              <div>
                <p className="card-eyebrow">PROFILE COMPLETION</p>
                <h3>Keep building your profile</h3>
              </div>
              <span className="card-dots">•••</span>
            </div>

            <div className="progress-content">
              <div
                className="progress-ring"
                style={{ "--progress": `${progress}%` }}
              >
                <div>
                  <strong>{progress}%</strong>
                  <span>Complete</span>
                </div>
              </div>

              <div className="progress-info">
                <p>
                  Complete your profile to get more personalized
                  recommendations.
                </p>
                <button
                  className="text-btn"
                  onClick={() => setActivePage("profile")}
                >
                  Complete Profile →
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-title-row">
            <div>
              <p className="eyebrow">YOUR DEVELOPMENT</p>
              <h2>Focus areas</h2>
            </div>
            <button
              className="text-btn"
              onClick={() => setActivePage("skills")}
            >
              View Skill Map →
            </button>
          </div>

          <div className="focus-grid">
            {template.skills.slice(0, 4).map((skill, index) => (
              <div className="focus-card" key={skill}>
                <div className={`focus-icon focus-${index + 1}`}>
                  {["✦", "◈", "⌁", "◎"][index]}
                </div>
                <div className="focus-card-content">
                  <div className="focus-title-row">
                    <h3>{skill}</h3>
                    <span>{index < 2 ? "In Progress" : "To Start"}</span>
                  </div>
                  <div className="small-progress">
                    <span style={{ width: `${70 - index * 12}%` }}></span>
                  </div>
                  <p>{index < 2 ? "Continue learning" : "Start this skill"}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-title-row">
            <div>
              <p className="eyebrow">RECOMMENDED FOR YOU</p>
              <h2>Next steps</h2>
            </div>
          </div>

          <div className="recommendation-grid">
            <div className="recommendation-card">
              <div className="recommendation-icon purple-bg">⌁</div>
              <div>
                <p className="card-eyebrow">ROADMAP</p>
                <h3>{template.roadmap[0].title}</h3>
                <p>{template.roadmap[0].description}</p>
                <button
                  className="text-btn"
                  onClick={() => setActivePage("roadmap")}
                >
                  Start now →
                </button>
              </div>
            </div>

            <div className="recommendation-card">
              <div className="recommendation-icon blue-bg">✧</div>
              <div>
                <p className="card-eyebrow">AI ASSISTANT</p>
                <h3>Get personalized guidance</h3>
                <p>Ask questions and receive suggestions for your journey.</p>
                <button
                  className="text-btn"
                  onClick={() => setActivePage("assistant")}
                >
                  Ask AI →
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  function renderSkills() {
    return (
      <>
        <div className="page-heading">
          <div>
            <p className="eyebrow">YOUR DEVELOPMENT</p>
            <h1>Skill Map</h1>
            <p>Track the skills needed for {profile?.goal}.</p>
          </div>
        </div>

        <div className="skills-summary">
          <div className="summary-card">
            <span className="summary-icon purple-bg">✦</span>
            <div>
              <strong>{template.skills.length}</strong>
              <span>Total Skills</span>
            </div>
          </div>
          <div className="summary-card">
            <span className="summary-icon blue-bg">◈</span>
            <div>
              <strong>{Math.ceil(template.skills.length / 3)}</strong>
              <span>In Progress</span>
            </div>
          </div>
          <div className="summary-card">
            <span className="summary-icon green-bg">✓</span>
            <div>
              <strong>0</strong>
              <span>Completed</span>
            </div>
          </div>
        </div>

        <div className="skills-list-card">
          <div className="section-title-row">
            <div>
              <p className="eyebrow">PERSONALIZED SKILLS</p>
              <h2>Skills to develop</h2>
            </div>
          </div>

          <div className="skills-list">
            {template.skills.map((skill, index) => (
              <div className="skill-row" key={skill}>
                <div className="skill-number">{String(index + 1).padStart(2, "0")}</div>
                <div className="skill-main">
                  <div className="skill-name-row">
                    <h3>{skill}</h3>
                    <span className={index < 2 ? "status-progress" : "status-start"}>
                      {index < 2 ? "In Progress" : "To Start"}
                    </span>
                  </div>
                  <div className="small-progress">
                    <span style={{ width: `${index < 2 ? 55 : 0}%` }}></span>
                  </div>
                </div>
                <span className="skill-arrow">→</span>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  function renderRoadmap() {
    return (
      <>
        <div className="page-heading">
          <div>
            <p className="eyebrow">YOUR CAREER PLAN</p>
            <h1>My Roadmap</h1>
            <p>{template.title}</p>
          </div>
          <button className="primary-btn" onClick={() => setActivePage("assistant")}>
            Ask AI Assistant ✧
          </button>
        </div>

        <div className="roadmap-layout">
          <div className="roadmap-main">
            <div className="roadmap-intro-card">
              <div className="roadmap-intro-icon">✦</div>
              <div>
                <p className="card-eyebrow">PERSONALIZED FOR YOU</p>
                <h2>{template.title}</h2>
                <p>{template.subtitle}</p>
              </div>
            </div>

            <div className="timeline">
              {template.roadmap.map((step, index) => (
                <div className="timeline-item" key={step.title}>
                  <div className="timeline-marker">
                    {index === 0 ? "✓" : index + 1}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-top">
                      <div>
                        <p className="timeline-step">STEP {index + 1}</p>
                        <h3>{step.title}</h3>
                      </div>
                      <span className="duration-badge">{step.duration}</span>
                    </div>
                    <p>{step.description}</p>
                    <button
                      className="outline-small-btn"
                      onClick={() => setActivePage("assistant")}
                    >
                      Get Guidance →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="roadmap-side-card">
            <p className="card-eyebrow">PROJECT IDEAS</p>
            <h3>Build while you learn</h3>
            <p>Practical projects can make your learning more effective.</p>

            <div className="project-ideas">
              {template.projects.map((project, index) => (
                <div className="project-idea" key={project}>
                  <span>{index + 1}</span>
                  <p>{project}</p>
                </div>
              ))}
            </div>

            <button
              className="primary-btn full-btn"
              onClick={() => setActivePage("explore")}
            >
              Explore Opportunities
            </button>
          </aside>
        </div>
      </>
    );
  }

  function renderExplore() {
    return (
      <>
        <div className="page-heading">
          <div>
            <p className="eyebrow">DISCOVER YOUR NEXT STEP</p>
            <h1>Explore</h1>
            <p>Find opportunities connected to your career goal.</p>
          </div>
        </div>

        <div className="explore-banner">
          <div>
            <p className="card-eyebrow">RECOMMENDED FOR</p>
            <h2>{profile?.goal}</h2>
            <p>
              Explore learning paths, internships, examinations and practical
              growth opportunities.
            </p>
          </div>
          <div className="explore-banner-icon">🌱</div>
        </div>

        <div className="section-title-row explore-title">
          <div>
            <p className="eyebrow">OPPORTUNITIES</p>
            <h2>Recommended for you</h2>
          </div>
        </div>

        <div className="opportunity-grid">
          {template.opportunities.map((opportunity, index) => (
            <div className="opportunity-card" key={opportunity}>
              <div className={`opportunity-icon opportunity-${index + 1}`}>
                {["◈", "✦", "⌁", "◎"][index]}
              </div>
              <p className="card-eyebrow">
                {index % 2 === 0 ? "LEARNING" : "CAREER"}
              </p>
              <h3>{opportunity}</h3>
              <p>
                Explore this path and understand the skills, preparation and
                requirements involved.
              </p>
              <button
                className="text-btn"
                onClick={() => setActivePage("assistant")}
              >
                Learn more →
              </button>
            </div>
          ))}
        </div>

        <div className="empty-state">
          <div className="empty-icon">✦</div>
          <h3>More opportunities are coming</h3>
          <p>
            Continue improving your skills and check this section regularly
            for more recommendations.
          </p>
        </div>
      </>
    );
  }

  function renderProfile() {
    return (
      <>
        <div className="page-heading">
          <div>
            <p className="eyebrow">YOUR INFORMATION</p>
            <h1>My Profile</h1>
            <p>Manage your career information and preferences.</p>
          </div>
          <button
            className="primary-btn"
            onClick={() => setShowProfileModal(true)}
          >
            Edit Profile
          </button>
        </div>

        <div className="profile-layout">
          <div className="profile-card-large">
            <div className="large-profile-avatar">
              {profile?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <h2>{profile?.name || "Your Name"}</h2>
            <p>{profile?.goal || "Your Career Goal"}</p>
            <div className="profile-divider"></div>
            <div className="profile-detail">
              <span>Education</span>
              <strong>{profile?.education || "Not added"}</strong>
            </div>
            <div className="profile-detail">
              <span>Experience</span>
              <strong>{profile?.experience || "Not added"}</strong>
            </div>
            <div className="profile-detail">
              <span>Interests</span>
              <strong>{profile?.interests || "Not added"}</strong>
            </div>
          </div>

          <div className="profile-info-card">
            <p className="eyebrow">PROFILE OVERVIEW</p>
            <h2>Your career direction</h2>
            <p>
              Your SkillBridge plan is currently focused on:
            </p>
            <div className="goal-highlight">
              <span>✦</span>
              <strong>{profile?.goal}</strong>
            </div>

            <div className="profile-progress-box">
              <div>
                <span>Profile completion</span>
                <strong>{progress}%</strong>
              </div>
              <div className="small-progress">
                <span style={{ width: `${progress}%` }}></span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  function renderAssistant() {
    return (
      <>
        <div className="page-heading">
          <div>
            <p className="eyebrow">PERSONALIZED GUIDANCE</p>
            <h1>AI Assistant</h1>
            <p>Ask questions about your career journey.</p>
          </div>
        </div>

        <div className="assistant-layout">
          <div className="assistant-main">
            <div className="assistant-header">
              <div className="assistant-avatar">✧</div>
              <div>
                <h2>SkillBridge AI</h2>
                <p>
                  Your career companion for {profile?.goal || "career planning"}
                </p>
              </div>
              <span className="online-status">
                <i></i> Online
              </span>
            </div>

            <div className="chat-window">
              {messages.length === 0 && (
                <div className="chat-welcome">
                  <div className="chat-welcome-icon">✦</div>
                  <h2>How can I help you today?</h2>
                  <p>
                    Ask me about your roadmap, skills, projects, study plan or
                    career opportunities.
                  </p>
                </div>
              )}

              {messages.map((message, index) => (
                <div
                  className={`message-row ${
                    message.sender === "user" ? "user-row" : "ai-row"
                  }`}
                  key={index}
                >
                  {message.sender === "ai" && (
                    <div className="message-avatar">✧</div>
                  )}
                  <div className={`message ${message.sender}`}>
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="assistant-input-area">
              <input
                type="text"
                placeholder="Ask anything about your career..."
                value={assistantInput}
                onChange={(event) => setAssistantInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    sendAssistantMessage();
                  }
                }}
              />
              <button
                className="send-btn"
                onClick={() => sendAssistantMessage()}
              >
                ↑
              </button>
            </div>
          </div>

          <aside className="assistant-suggestions">
            <p className="card-eyebrow">SUGGESTED QUESTIONS</p>
            <h3>Try asking</h3>

            <div className="suggestion-list">
              {template.assistantSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  className="suggestion-btn"
                  onClick={() => sendAssistantMessage(suggestion)}
                >
                  <span>✦</span>
                  {suggestion}
                  <strong>→</strong>
                </button>
              ))}
            </div>

            <div className="assistant-note">
              <span>ⓘ</span>
              <p>
                This is a frontend demo assistant. Connect an AI API or backend
                later for live AI-generated responses.
              </p>
            </div>
          </aside>
        </div>
      </>
    );
  }

  function renderAppPage() {
    let pageContent;

    switch (activePage) {
      case "skills":
        pageContent = renderSkills();
        break;
      case "explore":
        pageContent = renderExplore();
        break;
      case "roadmap":
        pageContent = renderRoadmap();
        break;
      case "profile":
        pageContent = renderProfile();
        break;
      case "assistant":
        pageContent = renderAssistant();
        break;
      case "dashboard":
      default:
        pageContent = renderDashboard();
    }

    return (
      <div className="app-shell">
        {renderSidebar()}
        <div className="main-area">
          {renderTopbar()}
          <main className="app-content">{pageContent}</main>
        </div>
      </div>
    );
  }

  return (
    <>
      {activePage === "home" && !profile ? renderHome() : renderAppPage()}

      {showProfileModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowProfileModal(false)}
        >
          <div
            className="profile-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowProfileModal(false)}
            >
              ×
            </button>

            <div className="modal-icon">✦</div>
            <p className="eyebrow">LET&apos;S GET STARTED</p>
            <h2>Create your career profile</h2>
            <p className="modal-subtitle">
              Tell us about yourself. We&apos;ll personalize your SkillBridge
              experience.
            </p>

            <form onSubmit={handleCreateProfile}>
              <label>
                Your Name *
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                />
              </label>

              <label>
                Career Goal *
                <input
                  type="text"
                  name="goal"
                  placeholder="Example: UPSC, Software Developer, Data Scientist..."
                  value={form.goal}
                  onChange={handleFormChange}
                  required
                />
              </label>

              <label>
                Education
                <input
                  type="text"
                  name="education"
                  placeholder="Example: B.Tech CSE 2nd Year"
                  value={form.education}
                  onChange={handleFormChange}
                />
              </label>

              <label>
                Experience Level
                <select
                  name="experience"
                  value={form.experience}
                  onChange={handleFormChange}
                >
                  <option value="">Select experience level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </label>

              <label>
                Interests
                <input
                  type="text"
                  name="interests"
                  placeholder="Example: Coding, Reading, AI, Design..."
                  value={form.interests}
                  onChange={handleFormChange}
                />
              </label>

              <button className="primary-btn full-btn" type="submit">
                Create My Roadmap →
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
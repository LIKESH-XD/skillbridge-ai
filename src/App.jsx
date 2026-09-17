import { useMemo, useState } from "react";
import "./App.css";

const careerData = {
  "AI/ML Engineer": {
    description:
      "Design intelligent systems using machine learning, deep learning and AI technologies.",
    skills: ["Python", "Machine Learning", "Deep Learning", "SQL", "Cloud"],
    gaps: ["Deep Learning", "SQL", "Model Deployment", "Cloud Computing"],
    roadmap: [
      "Strengthen Python and NumPy fundamentals",
      "Learn supervised and unsupervised learning",
      "Build a machine learning prediction project",
      "Learn neural networks and deep learning",
      "Practice SQL and data preprocessing",
      "Deploy an ML model using a cloud platform",
    ],
  },
  "Full Stack Developer": {
    description:
      "Build complete web applications using frontend, backend and databases.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    gaps: ["Backend Development", "Databases", "Authentication", "Deployment"],
    roadmap: [
      "Master HTML, CSS and responsive design",
      "Learn modern JavaScript",
      "Build projects using React",
      "Learn Node.js and Express",
      "Practice SQL and MongoDB",
      "Deploy a complete full-stack application",
    ],
  },
  "Data Scientist": {
    description:
      "Extract useful insights from data using statistics, programming and machine learning.",
    skills: ["Python", "Statistics", "Pandas", "Visualization", "SQL"],
    gaps: ["Statistics", "Advanced SQL", "Data Visualization", "Machine Learning"],
    roadmap: [
      "Learn Python for data analysis",
      "Practice NumPy and Pandas",
      "Study statistics and probability",
      "Create visualizations using Matplotlib",
      "Learn SQL for data analysis",
      "Build an end-to-end data science project",
    ],
  },
  "Cybersecurity Analyst": {
    description:
      "Protect systems, networks and data from cyber threats and vulnerabilities.",
    skills: ["Networking", "Linux", "Python", "Security Basics", "Problem Solving"],
    gaps: ["Ethical Hacking", "Network Security", "SIEM Tools", "Incident Response"],
    roadmap: [
      "Learn computer networks",
      "Practice Linux commands",
      "Understand common cyber attacks",
      "Learn ethical hacking fundamentals",
      "Explore SIEM and security monitoring",
      "Complete a cybersecurity lab project",
    ],
  },
};

const projects = [
  {
    title: "AI Resume Skill Analyzer",
    category: "Artificial Intelligence",
    level: "Intermediate",
    description:
      "Build a system that extracts skills from resumes and compares them with job requirements.",
    tags: ["Python", "NLP", "Machine Learning"],
  },
  {
    title: "Student Performance Predictor",
    category: "Machine Learning",
    level: "Beginner",
    description:
      "Predict student performance using attendance, study hours and previous marks.",
    tags: ["Python", "Pandas", "Scikit-learn"],
  },
  {
    title: "Career Roadmap Dashboard",
    category: "Web Development",
    level: "Intermediate",
    description:
      "Create a personalized dashboard that tracks skills, projects and learning progress.",
    tags: ["React", "JavaScript", "CSS"],
  },
  {
    title: "Smart Chatbot Assistant",
    category: "AI Application",
    level: "Intermediate",
    description:
      "Create a chatbot that answers questions and recommends learning resources.",
    tags: ["Python", "API", "NLP"],
  },
];

const opportunities = [
  {
    title: "AI/ML Internship",
    company: "Tech Innovation Labs",
    type: "Internship",
    mode: "Remote",
    tag: "AI/ML",
  },
  {
    title: "Student AI Hackathon",
    company: "Innovation Community",
    type: "Hackathon",
    mode: "Online",
    tag: "Build",
  },
  {
    title: "Junior Data Analyst Program",
    company: "DataWorks",
    type: "Learning Program",
    mode: "Hybrid",
    tag: "Data",
  },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [selectedCareer, setSelectedCareer] = useState("AI/ML Engineer");
  const [skills, setSkills] = useState("Python, C, basic Machine Learning");
  const [name, setName] = useState("Likesh");
  const [analysisDone, setAnalysisDone] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [resumeName, setResumeName] = useState("");
  const [assistantInput, setAssistantInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am your AI Career Assistant. Ask me what you should learn, build or improve next.",
    },
  ]);
  const [mobileMenu, setMobileMenu] = useState(false);

  const career = careerData[selectedCareer];

  const progress = useMemo(() => {
    return Math.round(
      (completedTasks.length / career.roadmap.length) * 100
    );
  }, [completedTasks, career.roadmap.length]);

  const toggleTask = (index) => {
    setCompletedTasks((previous) => {
      if (previous.includes(index)) {
        return previous.filter((item) => item !== index);
      }

      return [...previous, index];
    });
  };

  const analyzeSkills = () => {
    setAnalysisDone(true);
    setActivePage("AI Skill Analysis");
  };

  const changeCareer = (event) => {
    setSelectedCareer(event.target.value);
    setCompletedTasks([]);
    setAnalysisDone(false);
  };

  const sendAssistantMessage = () => {
    const question = assistantInput.trim();

    if (!question) return;

    const lowerQuestion = question.toLowerCase();

    let response =
      "Based on your target career, start with one practical project and improve the skills mentioned in your roadmap.";

    if (
      lowerQuestion.includes("next") ||
      lowerQuestion.includes("learn")
    ) {
      response = `Your next priority should be ${career.gaps[0]}. After that, build a project using ${career.skills[0]} and document it on GitHub.`;
    } else if (
      lowerQuestion.includes("project") ||
      lowerQuestion.includes("build")
    ) {
      response = `I recommend building a ${projects[0].title}. It will help you practice ${projects[0].tags.join(
        ", "
      )}.`;
    } else if (
      lowerQuestion.includes("resume") ||
      lowerQuestion.includes("job")
    ) {
      response =
        "Improve your resume by adding measurable project outcomes, technical skills, GitHub links and a short career summary.";
    } else if (
      lowerQuestion.includes("roadmap") ||
      lowerQuestion.includes("plan")
    ) {
      response = `Your roadmap contains ${career.roadmap.length} steps. Focus on completing one step at a time and update your progress regularly.`;
    }

    setMessages((previous) => [
      ...previous,
      { sender: "user", text: question },
      { sender: "ai", text: response },
    ]);

    setAssistantInput("");
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setResumeName(file.name);
    }
  };

  const navigation = [
    { name: "Dashboard", icon: "⌂" },
    { name: "AI Skill Analysis", icon: "✦" },
    { name: "Career Explorer", icon: "◈" },
    { name: "My Roadmap", icon: "✓" },
    { name: "Recommended Projects", icon: "▣" },
    { name: "Opportunity Hub", icon: "↗" },
    { name: "Resume Analyzer", icon: "▤" },
    { name: "Progress Tracker", icon: "◔" },
    { name: "AI Career Assistant", icon: "◉" },
    { name: "Profile / Settings", icon: "⚙" },
  ];

  const renderPage = () => {
    switch (activePage) {
      case "AI Skill Analysis":
        return (
          <SkillAnalysis
            skills={skills}
            setSkills={setSkills}
            selectedCareer={selectedCareer}
            career={career}
            analysisDone={analysisDone}
            analyzeSkills={analyzeSkills}
          />
        );

      case "Career Explorer":
        return (
          <CareerExplorer
            selectedCareer={selectedCareer}
            changeCareer={changeCareer}
            career={career}
          />
        );

      case "My Roadmap":
        return (
          <Roadmap
            career={career}
            completedTasks={completedTasks}
            toggleTask={toggleTask}
            progress={progress}
          />
        );

      case "Recommended Projects":
        return <Projects />;

      case "Opportunity Hub":
        return <Opportunities />;

      case "Resume Analyzer":
        return (
          <ResumeAnalyzer
            resumeName={resumeName}
            handleResumeUpload={handleResumeUpload}
          />
        );

      case "Progress Tracker":
        return (
          <ProgressTracker
            career={career}
            progress={progress}
            completedTasks={completedTasks}
          />
        );

      case "AI Career Assistant":
        return (
          <Assistant
            messages={messages}
            assistantInput={assistantInput}
            setAssistantInput={setAssistantInput}
            sendAssistantMessage={sendAssistantMessage}
          />
        );

      case "Profile / Settings":
        return (
          <Profile
            name={name}
            setName={setName}
            selectedCareer={selectedCareer}
            progress={progress}
          />
        );

      case "Dashboard":
      default:
        return (
          <Dashboard
            name={name}
            selectedCareer={selectedCareer}
            career={career}
            progress={progress}
            completedTasks={completedTasks}
            setActivePage={setActivePage}
            analysisDone={analysisDone}
          />
        );
    }
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-symbol">✦</div>
          <div>
            <h2>SkillBridge<span>AI</span></h2>
            <p>CAREER INTELLIGENCE</p>
          </div>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        <nav className="sidebar-nav">
          {navigation.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => {
                setActivePage(item.name);
                setMobileMenu(false);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="ai-status">
            <span className="online-dot"></span>
            <div>
              <strong>AI Engine Online</strong>
              <small>Ready to assist you</small>
            </div>
          </div>

          <div className="mini-profile">
            <div className="avatar">L</div>
            <div>
              <strong>{name}</strong>
              <small>Student Account</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            ☰
          </button>

          <div>
            <p className="breadcrumb">WORKSPACE / {activePage.toUpperCase()}</p>
            <h1>{activePage}</h1>
          </div>

          <div className="topbar-right">
            <div className="notification">♢</div>
            <div className="top-avatar">{name.charAt(0).toUpperCase()}</div>
          </div>
        </header>

        <div className="page-container">{renderPage()}</div>
      </main>
    </div>
  );
}

function Dashboard({
  name,
  selectedCareer,
  career,
  progress,
  completedTasks,
  setActivePage,
  analysisDone,
}) {
  return (
    <>
      <section className="welcome-section">
        <div>
          <p className="eyebrow">YOUR PERSONAL CAREER COMMAND CENTER</p>
          <h2>
            Welcome back, {name} <span>✦</span>
          </h2>
          <p className="muted">
            Turn your current skills into your next career opportunity.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setActivePage("AI Skill Analysis")}
        >
          {analysisDone ? "Update Analysis ↗" : "Start AI Analysis ↗"}
        </button>
      </section>

      <div className="stats-grid">
        <StatCard
          icon="✦"
          label="Career Match"
          value="78%"
          note="Based on your profile"
        />
        <StatCard
          icon="◔"
          label="Roadmap Progress"
          value={`${progress}%`}
          note={`${completedTasks.length} tasks completed`}
        />
        <StatCard
          icon="▣"
          label="Recommended Projects"
          value="04"
          note="Matched to your goals"
        />
        <StatCard
          icon="↗"
          label="Opportunities"
          value="12"
          note="Explore new possibilities"
        />
      </div>

      <div className="dashboard-grid">
        <section className="panel career-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-label">CURRENT CAREER TARGET</p>
              <h3>{selectedCareer}</h3>
            </div>
            <span className="live-badge">
              <span></span> ACTIVE
            </span>
          </div>

          <p className="muted">{career.description}</p>

          <div className="match-area">
            <div className="match-circle">
              <strong>78</strong>
              <span>% MATCH</span>
            </div>

            <div className="match-details">
              <p>Skill alignment</p>
              <div className="large-progress">
                <div style={{ width: "78%" }}></div>
              </div>
              <small>Good foundation. Keep building practical experience.</small>
            </div>
          </div>

          <div className="tag-list">
            {career.skills.map((skill) => (
              <span key={skill}>{skill} ✓</span>
            ))}
          </div>

          <button
            className="text-button"
            onClick={() => setActivePage("Career Explorer")}
          >
            Explore career details →
          </button>
        </section>

        <section className="panel action-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-label">AI RECOMMENDATION</p>
              <h3>Your next best actions</h3>
            </div>
            <span className="sparkle">✦</span>
          </div>

          <ActionItem
            number="01"
            title={`Learn ${career.gaps[0]}`}
            description="Close your most important current skill gap."
            onClick={() => setActivePage("My Roadmap")}
          />
          <ActionItem
            number="02"
            title="Build a practical project"
            description="Convert your knowledge into portfolio evidence."
            onClick={() => setActivePage("Recommended Projects")}
          />
          <ActionItem
            number="03"
            title="Explore opportunities"
            description="Find internships, hackathons and programs."
            onClick={() => setActivePage("Opportunity Hub")}
          />
        </section>
      </div>

      <section className="panel roadmap-preview">
        <div className="panel-heading">
          <div>
            <p className="panel-label">PERSONALIZED LEARNING PLAN</p>
            <h3>Your roadmap at a glance</h3>
          </div>
          <button
            className="outline-button"
            onClick={() => setActivePage("My Roadmap")}
          >
            View Full Roadmap →
          </button>
        </div>

        <div className="roadmap-line">
          {career.roadmap.slice(0, 4).map((item, index) => (
            <div className="roadmap-node" key={item}>
              <div
                className={`node-circle ${
                  completedTasks.includes(index) ? "completed" : ""
                }`}
              >
                {completedTasks.includes(index) ? "✓" : index + 1}
              </div>
              <strong>{item}</strong>
              <small>Phase {index + 1}</small>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function StatCard({ icon, label, value, note }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <small>{note}</small>
      </div>
    </div>
  );
}

function ActionItem({ number, title, description, onClick }) {
  return (
    <button className="action-item" onClick={onClick}>
      <span className="action-number">{number}</span>
      <span className="action-content">
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
      <span className="action-arrow">→</span>
    </button>
  );
}

function SkillAnalysis({
  skills,
  setSkills,
  selectedCareer,
  career,
  analysisDone,
  analyzeSkills,
}) {
  return (
    <div className="content-stack">
      <section className="page-intro">
        <div>
          <p className="eyebrow">INTELLIGENT PROFILE ASSESSMENT</p>
          <h2>Understand your skill gaps.</h2>
          <p className="muted">
            Our AI compares your current skills with the requirements of your
            target career.
          </p>
        </div>
        <div className="intro-icon">✦</div>
      </section>

      <section className="analysis-layout">
        <div className="panel form-panel">
          <p className="panel-label">YOUR CURRENT PROFILE</p>

          <label>Target Career</label>
          <div className="readonly-input">{selectedCareer}</div>

          <label>Current Skills</label>
          <textarea
            value={skills}
            onChange={(event) => setSkills(event.target.value)}
            placeholder="Example: Python, C, HTML, basic ML"
          />

          <button className="primary-button full-button" onClick={analyzeSkills}>
            Analyze My Skills ✦
          </button>
        </div>

        <div className="panel analysis-result">
          <div className="panel-heading">
            <div>
              <p className="panel-label">AI ANALYSIS RESULT</p>
              <h3>{analysisDone ? "Your skill intelligence" : "Ready to analyze"}</h3>
            </div>
            <span className="result-icon">✦</span>
          </div>

          {!analysisDone ? (
            <div className="empty-state">
              <div>⌁</div>
              <h3>Start your analysis</h3>
              <p>
                Enter your skills and click the analysis button to discover
                your career gaps.
              </p>
            </div>
          ) : (
            <>
              <div className="analysis-score">
                <div>
                  <span>CAREER ALIGNMENT</span>
                  <strong>78%</strong>
                </div>
                <div className="score-bar">
                  <div style={{ width: "78%" }}></div>
                </div>
              </div>

              <h4>Detected skill gaps</h4>

              <div className="gap-list">
                {career.gaps.map((gap, index) => (
                  <div className="gap-item" key={gap}>
                    <span>{index + 1}</span>
                    <div>
                      <strong>{gap}</strong>
                      <small>
                        Recommended for your {selectedCareer} journey
                      </small>
                    </div>
                    <b>+ Learn</b>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function CareerExplorer({ selectedCareer, changeCareer, career }) {
  return (
    <div className="content-stack">
      <section className="page-intro">
        <div>
          <p className="eyebrow">EXPLORE YOUR FUTURE</p>
          <h2>Choose a career direction.</h2>
          <p className="muted">
            Select a target role to generate a career-specific learning plan.
          </p>
        </div>
      </section>

      <section className="career-explorer-grid">
        {Object.keys(careerData).map((careerName) => (
          <button
            key={careerName}
            className={`career-option ${
              selectedCareer === careerName ? "selected" : ""
            }`}
            onClick={() =>
              changeCareer({ target: { value: careerName } })
            }
          >
            <div className="career-option-icon">
              {careerName === "AI/ML Engineer"
                ? "✦"
                : careerName === "Full Stack Developer"
                ? "</>"
                : careerName === "Data Scientist"
                ? "◈"
                : "⌁"}
            </div>
            <h3>{careerName}</h3>
            <p>{careerData[careerName].description}</p>
            <span>Explore roadmap →</span>
          </button>
        ))}
      </section>

      <section className="panel selected-career-panel">
        <p className="panel-label">SELECTED CAREER</p>
        <h3>{selectedCareer}</h3>
        <p className="muted">{career.description}</p>

        <div className="tag-list">
          {career.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>
    </div>
  );
}

function Roadmap({ career, completedTasks, toggleTask, progress }) {
  return (
    <div className="content-stack">
      <section className="page-intro">
        <div>
          <p className="eyebrow">YOUR PERSONALIZED PLAN</p>
          <h2>Build your career step by step.</h2>
          <p className="muted">
            Complete tasks to update your progress automatically.
          </p>
        </div>
        <div className="roadmap-progress">
          <strong>{progress}%</strong>
          <span>Completed</span>
        </div>
      </section>

      <section className="panel roadmap-panel">
        <div className="roadmap-header">
          <div>
            <p className="panel-label">TARGET ROLE</p>
            <h3>{career === undefined ? "" : "Career Roadmap"}</h3>
          </div>
          <div className="small-progress">
            <div>
              <span>Overall Progress</span>
              <strong>{progress}%</strong>
            </div>
            <div className="large-progress">
              <div style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        <div className="timeline">
          {career.roadmap.map((task, index) => (
            <div
              className={`timeline-item ${
                completedTasks.includes(index) ? "done" : ""
              }`}
              key={task}
            >
              <button
                className="checkbox"
                onClick={() => toggleTask(index)}
              >
                {completedTasks.includes(index) ? "✓" : ""}
              </button>

              <div className="timeline-content">
                <span>PHASE {String(index + 1).padStart(2, "0")}</span>
                <h3>{task}</h3>
                <p>
                  Complete this milestone to move closer to your target career.
                </p>
              </div>

              <span className="task-status">
                {completedTasks.includes(index) ? "COMPLETED" : "UP NEXT"}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Projects() {
  return (
    <div className="content-stack">
      <section className="page-intro">
        <div>
          <p className="eyebrow">BUILD YOUR PORTFOLIO</p>
          <h2>Projects that prove your skills.</h2>
          <p className="muted">
            Practical projects selected to help you gain real experience.
          </p>
        </div>
      </section>

      <div className="cards-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.title}>
            <div className="project-top">
              <span className="category-badge">{project.category}</span>
              <span className="level-badge">{project.level}</span>
            </div>
            <div className="project-icon">▣</div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tag-list">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <button className="text-button">View Project Plan →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Opportunities() {
  return (
    <div className="content-stack">
      <section className="page-intro">
        <div>
          <p className="eyebrow">TURN LEARNING INTO ACTION</p>
          <h2>Explore opportunities.</h2>
          <p className="muted">
            Discover sample opportunities connected to your career goals.
          </p>
        </div>
      </section>

      <div className="opportunity-list">
        {opportunities.map((opportunity) => (
          <div className="opportunity-card" key={opportunity.title}>
            <div className="opportunity-logo">✦</div>
            <div className="opportunity-info">
              <span>{opportunity.tag}</span>
              <h3>{opportunity.title}</h3>
              <p>
                {opportunity.company} · {opportunity.mode}
              </p>
            </div>
            <div className="opportunity-type">{opportunity.type}</div>
            <button className="outline-button">View Details ↗</button>
          </div>
        ))}
      </div>

      <div className="notice-box">
        <span>ⓘ</span>
        <p>
          These are prototype opportunity cards for demonstration. A production
          version can connect to verified internship, job and hackathon APIs.
        </p>
      </div>
    </div>
  );
}

function ResumeAnalyzer({ resumeName, handleResumeUpload }) {
  return (
    <div className="content-stack">
      <section className="page-intro">
        <div>
          <p className="eyebrow">RESUME INTELLIGENCE</p>
          <h2>Make your resume stronger.</h2>
          <p className="muted">
            Upload your resume to demonstrate AI-powered resume analysis.
          </p>
        </div>
      </section>

      <section className="panel resume-panel">
        <div className="upload-area">
          <div className="upload-icon">↑</div>
          <h3>Upload your resume</h3>
          <p>PDF, DOC or DOCX files supported</p>

          <label className="upload-button">
            Choose Resume
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
            />
          </label>

          {resumeName && (
            <div className="uploaded-file">
              <span>▤</span>
              <div>
                <strong>{resumeName}</strong>
                <small>Uploaded successfully</small>
              </div>
              <span className="success-check">✓</span>
            </div>
          )}
        </div>

        <div className="resume-features">
          <div>
            <span>✦</span>
            <strong>Skill extraction</strong>
            <p>Identify technical and soft skills from your resume.</p>
          </div>
          <div>
            <span>◈</span>
            <strong>Gap detection</strong>
            <p>Compare your resume with your target career.</p>
          </div>
          <div>
            <span>✓</span>
            <strong>Improvement tips</strong>
            <p>Receive suggestions to improve your resume quality.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProgressTracker({ career, progress, completedTasks }) {
  return (
    <div className="content-stack">
      <section className="page-intro">
        <div>
          <p className="eyebrow">MEASURE YOUR GROWTH</p>
          <h2>Your progress tracker.</h2>
          <p className="muted">
            Track your learning journey and stay consistent.
          </p>
        </div>
      </section>

      <div className="progress-overview">
        <div className="panel big-progress-card">
          <p className="panel-label">TOTAL ROADMAP PROGRESS</p>
          <div className="big-progress-number">{progress}%</div>
          <div className="large-progress">
            <div style={{ width: `${progress}%` }}></div>
          </div>
          <p className="muted">
            {completedTasks.length} of {career.roadmap.length} milestones
            completed.
          </p>
        </div>

        <div className="panel streak-card">
          <p className="panel-label">LEARNING STREAK</p>
          <strong>07</strong>
          <span>days</span>
          <p className="muted">Keep learning consistently.</p>
        </div>

        <div className="panel streak-card">
          <p className="panel-label">SKILLS IN PROGRESS</p>
          <strong>04</strong>
          <span>skills</span>
          <p className="muted">Focus areas identified by AI.</p>
        </div>
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="panel-label">MILESTONE ACTIVITY</p>
            <h3>Recent learning activity</h3>
          </div>
        </div>

        <div className="activity-list">
          {career.roadmap.slice(0, 4).map((task, index) => (
            <div className="activity-item" key={task}>
              <span className={completedTasks.includes(index) ? "activity-done" : ""}>
                {completedTasks.includes(index) ? "✓" : "○"}
              </span>
              <div>
                <strong>{task}</strong>
                <small>
                  {completedTasks.includes(index)
                    ? "Milestone completed"
                    : "Waiting to be completed"}
                </small>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Assistant({
  messages,
  assistantInput,
  setAssistantInput,
  sendAssistantMessage,
}) {
  return (
    <div className="content-stack">
      <section className="page-intro">
        <div>
          <p className="eyebrow">YOUR PERSONAL AI GUIDE</p>
          <h2>Ask your career assistant.</h2>
          <p className="muted">
            Get guidance about skills, projects, resumes and career planning.
          </p>
        </div>
        <div className="assistant-status">
          <span></span> AI ONLINE
        </div>
      </section>

      <section className="panel assistant-panel">
        <div className="assistant-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender === "user" ? "user-message" : "ai-message"
              }`}
            >
              <div className="message-avatar">
                {message.sender === "user" ? "L" : "✦"}
              </div>
              <div>
                <small>{message.sender === "user" ? "YOU" : "SKILLBRIDGE AI"}</small>
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="suggestion-row">
          <button
            onClick={() =>
              setAssistantInput("What should I learn next?")
            }
          >
            What should I learn next?
          </button>
          <button
            onClick={() =>
              setAssistantInput("Suggest a project for me")
            }
          >
            Suggest a project
          </button>
          <button
            onClick={() =>
              setAssistantInput("How can I improve my resume?")
            }
          >
            Improve my resume
          </button>
        </div>

        <div className="assistant-input">
          <input
            value={assistantInput}
            onChange={(event) => setAssistantInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") sendAssistantMessage();
            }}
            placeholder="Ask anything about your career..."
          />
          <button onClick={sendAssistantMessage}>Send ↗</button>
        </div>
      </section>
    </div>
  );
}

function Profile({ name, setName, selectedCareer, progress }) {
  return (
    <div className="content-stack">
      <section className="page-intro">
        <div>
          <p className="eyebrow">YOUR ACCOUNT</p>
          <h2>Profile and settings.</h2>
          <p className="muted">
            Manage your personal career preferences.
          </p>
        </div>
      </section>

      <section className="panel profile-panel">
        <div className="profile-large-avatar">{name.charAt(0).toUpperCase()}</div>

        <div className="profile-form">
          <label>Your Name</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <label>Target Career</label>
          <div className="readonly-input">{selectedCareer}</div>

          <label>Current Progress</label>
          <div className="readonly-input">{progress}% roadmap completed</div>

          <button className="primary-button">Save Profile ✓</button>
        </div>
      </section>
    </div>
  );
}

export default App;
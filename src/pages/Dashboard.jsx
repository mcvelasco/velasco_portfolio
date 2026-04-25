import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import profileImage from "../assets/profile.jpg";
import "../styles/dashboard.css";

const fallbackProfile = {
  full_name: "Ma. Theresa Velasco",
  title: "IT Professional | Web Developer",
  location: "Buluan, Maguindanao",
  email: "theresa.velasco@example.com",
  phone: "+63 936 4455 594",
  description:
    "I build modern, responsive portfolio websites and connect them to live Supabase data for real-time updates.",
  services: [
    "Website Design & Development",
    "UI/UX Design",
    "Mobile App Prototype",
    "IT Support & Solutions",
  ],
  avatar_url:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80",
  education: [
    {
      title: "Bachelor of Science in Information Technology",
      body: "Cotabato State University · 2024",
    },
    {
      title: "Senior High School — STEM",
      body: "Cotabato City National High School · 2020",
    },
  ],
  experience: [
    {
      title: "Frontend Developer Intern",
      body: "Created portfolio UI components and connected live data to Supabase.",
    },
    {
      title: "IT Support Analyst",
      body: "Provided hardware and software support for internal users.",
    },
  ],
};

const fallbackSkills = [
  { name: "HTML / CSS", category: "Hard Skill" },
  { name: "JavaScript / React", category: "Hard Skill" },
  { name: "UI / UX Design", category: "Hard Skill" },
  { name: "Problem Solving", category: "Soft Skill" },
  { name: "Communication", category: "Soft Skill" },
  { name: "Time Management", category: "Soft Skill" },
];

const fallbackSamples = [
  {
    title: "Responsive Portfolio Website",
    category: "Website",
    description: "A modern personal portfolio built with React and Supabase.",
    image_url:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    link: "https://example.com/portfolio",
  },
  {
    title: "Mobile App Prototype",
    category: "Mobile App",
    description: "A clickable mobile app prototype created with Figma and React.",
    image_url:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    link: "https://www.figma.com/file/example",
  },
  {
    title: "IT Support Case Study",
    category: "IT Maintenance",
    description: "Documented support operations for a local business client.",
    image_url:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    link: "https://example.com/case-study",
  },
];

export default function Dashboard() {
  const [profile, setProfile] = useState(fallbackProfile);
  const [skills, setSkills] = useState(fallbackSkills);
  const [workSamples, setWorkSamples] = useState(fallbackSamples);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPortfolio() {
      setLoading(true);
      try {
        const { data: profileData, error: profileError } = await supabase
          .from("portfolio_profile")
          .select("*")
          .single();

        const { data: skillsData, error: skillsError } = await supabase
          .from("portfolio_skills")
          .select("*")
          .order("sort", { ascending: true });

        const { data: workData, error: workError } = await supabase
          .from("portfolio_work_samples")
          .select("*")
          .order("sort", { ascending: true });

        if (profileError && profileError.code !== "PGRST116") {
          console.warn("Supabase portfolio_profile query error:", profileError.message);
        }

        if (skillsError && skillsError.code !== "PGRST116") {
          console.warn("Supabase portfolio_skills query error:", skillsError.message);
        }

        if (workError && workError.code !== "PGRST116") {
          console.warn("Supabase portfolio_work_samples query error:", workError.message);
        }

        if (profileData) {
          setProfile({ ...fallbackProfile, ...profileData });
        }

        if (skillsData && skillsData.length) {
          setSkills(
            skillsData.map((item) => ({
              name: item.name || item.skill || item.title,
              category: item.category || item.type || "Skill",
            }))
          );
        }

        if (workData && workData.length) {
          setWorkSamples(
            workData.map((item) => ({
              title: item.title || item.name,
              category: item.category || item.type || "Portfolio",
              description: item.description || item.summary || "Live project sample.",
              image_url: item.image_url || item.image || fallbackSamples[0].image_url,
              link: item.link || item.url || "#",
            }))
          );
        }
      } catch (fetchError) {
        console.error(fetchError);
        setError("Unable to load Supabase portfolio data.");
      }
      setLoading(false);
    }

    loadPortfolio();
  }, []);

  return (
    <div className="portfolio-page">
      <header className="portfolio-header">
        <div className="brand-block">
          <span>TERE VELASCO</span>
          <strong>BLACKCAT</strong>
        </div>
        <nav className="portfolio-nav">
          <a href="#home">Home</a>
          <a href="#about">AboutMe</a>
          <a href="#skills">Skills</a>
          <a href="#work">Work Sample</a>
        </nav>
      </header>

      <section className="hero-section" id="home">
        <div className="hero-copy">
          <span className="hero-label">Ma. Theresa Velasco</span>
          <h1>IT Professional & Web Developer</h1>
          <p>
            I design clean, responsive portfolio websites and connect them directly to
            Supabase so your data stays live, polished, and easy to manage.
          </p>
          <div className="hero-contact-grid">
            <div>
              <strong>Email</strong>
              <p>{profile.email}</p>
            </div>
            <div>
              <strong>Location</strong>
              <p>{profile.location}</p>
            </div>
          </div>
          <div className="hero-buttons">
            <a className="btn-primary" href="#work">
              View Work Sample
            </a>
            <a className="btn-secondary" href="#about">
              About Me
            </a>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-card">
            <div className="hero-card-header">
              <div>
                <p className="section-title">About Me</p>
                <h2>{profile.title}</h2>
              </div>
              <span className="brand-tag">BLACKCAT</span>
            </div>
            <div
              className="hero-avatar"
              style={{ backgroundImage: `url(${profileImage})` }}
            />
            <div className="hero-card-body">
              <p>{profile.description}</p>
              <div className="contact-list">
                <div>
                  <strong>Phone</strong>
                  <p>{profile.phone}</p>
                </div>
                <div>
                  <strong>Services</strong>
                  <ul>
                    {profile.services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-grid about-grid" id="about">
        <div className="glass-card about-panel">
          <h3>Education</h3>
          <p>Academic background and professional credentials stored in Supabase.</p>
          <ul>
            {profile.education.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.body}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-card about-panel">
          <h3>Work Experience</h3>
          <p>Recent experience and project highlights pulled from Supabase.</p>
          <ul>
            {profile.experience.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-grid skills-grid" id="skills">
        <div className="glass-card skills-panel">
          <h3>Hard Skills</h3>
          <p>Certified tools and development skills used to build polished websites.</p>
          <div className="skill-list">
            {skills
              .filter((skill) => skill.category.toLowerCase().includes("hard"))
              .map((skill) => (
                <span key={skill.name} className="skill-pill">
                  {skill.name}
                </span>
              ))}
          </div>
        </div>
        <div className="glass-card skills-panel">
          <h3>Soft Skills</h3>
          <p>Collaboration and communication skills that shape every project.</p>
          <div className="skill-list">
            {skills
              .filter((skill) => skill.category.toLowerCase().includes("soft"))
              .map((skill) => (
                <span key={skill.name} className="skill-pill soft">
                  {skill.name}
                </span>
              ))}
          </div>
        </div>
      </section>

      <section className="work-samples" id="work">
        <div className="section-header">
          <div>
            <p className="section-title">Work Sample</p>
            <h2>Selected projects powered by Supabase data.</h2>
          </div>
          <span className="results-label">Live data</span>
        </div>

        {loading ? (
          <div className="status-message">Loading portfolio content...</div>
        ) : error ? (
          <div className="status-message error">{error}</div>
        ) : null}

        <div className="work-grid">
          {workSamples.map((item) => (
            <a
              key={item.title}
              className="work-card"
              href={item.link}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className="work-image"
                style={{ backgroundImage: `url(${item.image_url})` }}
              />
              <div className="work-content">
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

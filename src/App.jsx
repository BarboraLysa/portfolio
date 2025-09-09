import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Spline from "@splinetool/react-spline";

import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function Layout({ children }) {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const navRefs = useRef([]);

  useEffect(() => {
    const index = navItems.findIndex((item) => item.path === location.pathname);
    setActiveIndex(index === -1 ? 0 : index);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-zinc-900 text-gray-100 flex flex-col items-center">
      {/* Navbar */}
      <nav className="mt-6 mb-10 px-8 py-3 bg-black rounded-full shadow-lg flex space-x-6 relative">
        {/* Red Bubble */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-8 bg-red-600 rounded-full transition-all duration-300"
          style={{
            width: navRefs.current[activeIndex]?.offsetWidth + "px",
            left: navRefs.current[activeIndex]?.offsetLeft + "px",
          }}
        />

        {navItems.map((item, i) => (
          <NavLink
            key={item.name}
            to={item.path}
            ref={(el) => (navRefs.current[i] = el)}
            className="relative px-3 py-1 rounded-full text-gray-300 hover:text-white hover:font-bold z-10 transition-colors"
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Content */}
      <main className="w-full max-w-5xl px-6">{children}</main>
    </div>
  );
}



function Home() {
  const homeSections = [
    {
      title: "About",
      content: "Hi, I’m Barbora, a software developer and electronics enthusiast based in Brno, Czech Republic. I love solving problems, turning ideas into real products, and that little rush when code finally works. When I’m not programming, you’ll find me making music—playing guitar, piano, ukulele, or singing—or gaming. I’m also a proud mom to my little rat Lilo and my partner’s dog, Jarvis. I’m passionate about projects that combine creativity and technology, and I’m always excited to learn, explore, and build something new.",
    },
    {
      
      content: (
        <div className="w-full h-[300px]">
          <Spline scene="https://prod.spline.design/H5OhV1hPttKA5E2k/scene.splinecode" />
        </div>
      ),
    },
    {
      title: "Education",
      content: <EducationBox />,
    },
    {
      title: "Skills",
      content: <SkillsBox />,
    },
  ];

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Barbora Lysá</h2>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-8 w-full max-w-5xl px-6 justify-items-center">
        {homeSections.map((section, i) => (
          <div
            key={i}
            className="bg-black rounded-2xl shadow-lg p-8 flex flex-col items-start min-h-[18rem] hover:scale-105 transition w-full"
          >
            {section.title && (
              <span className="bg-red-600 text-white px-4 py-1 rounded-full mb-4 inline-block">
                {section.title}
              </span>
            )}
            <div className="text-gray-300 text-left w-full">{section.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}



function EducationBox() {
  const educationList = [
    { school: "Brno University of Technology", major: "Telecomunication and Information Technology", year: "2021 - 2025" },
    { school: "Secondary Technical School of Electrical Engineering, Karola Adlera 5", major: "Industrial Informatics", year: "2017 - 2021" },
  ];

  return (
    <div className="w-full">
      {educationList.map((edu, i) => (
        <div key={i} className="border-b border-gray-700 pb-2 last:border-none text-left text-gray-300">
          <p className="font-semibold">{edu.school}</p>
          <p className="text-sm">{edu.major}</p>
          <p className="text-sm">{edu.year}</p>
        </div>
      ))}
    </div>
  );
}

function SkillsBox() {
  const skills = {
    Languages: ["C", "Java", "Python", "VHDL", "JavaScript", "HTML", "CSS", "Dart"],
    "Frameworks & Libraries": ["Flask", "Node.js", "React", "Tailwind CSS", "Flutter"],
    "Tools & Environments": ["Arduino IDE", "Micro-Cap", "Eagle", "SolidWorks", "AutoCAD", ],
    "Operating Systems": ["Windows", "Linux"],
    Other: ["Microsoft Office Suite", "MySQL", "JSON", "XML", "Git"],
  };

  return (
    <div className="w-full">
      {Object.entries(skills).map(([category, list], i) => (
        <div key={i} className="border-b border-gray-700 pb-3 last:border-none text-left text-gray-300">
          <p className="font-semibold text-lg">{category}</p>
          <p className="text-sm">{list.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}


// Projects page
function Projects() {
  const projects = [
    { name: "Binging Journey", desc: "Android app built with Flutter for tracking movies, TV shows, and anime. It integrates OMDb and Jikan APIs for searching content, supports Wishlist and Watched lists with a 0–5 star rating system, prevents duplicates, and features organized collapsible sections.", link: "https://github.com/BarboraLysa/Binging-Journey" },
    { name: "Bachelor’s Thesis", desc: "A Python, Flask, HTML/CSS, Arduino, and SolidWorks-based project for controlling a universal IoT locker box with an electronic lock. The system uses an ESP-WROOM-32 module connected via Wi-Fi (HTTP/TCP) to a web server for remote management. Users can request access to lockers, receive one-time PIN codes, and unlock compartments via a 4x4 keypad with OLED feedback. Admins manage requests through a web interface hosted on Render. Mechanical, electronic, and software design are fully integrated for secure, automated distribution of small commodities.", link: "https://github.com/BarboraLysa/BP" },
    { name: "Movie Manager", desc: "Java-based project designed to provide a command line iterface to manage a collection of movies. Users can add, edit, delete and search movies based on actor name or title. SQL database is used for saving and loading.", link: "https://github.com/BarboraLysa/PC2T-Project" },
    { name: "This Website", desc: "JavaScript-based project built with React, Tailwind CSS, and Node.js. Multi-page layout with React Router, responsive grid-based cards for projects, skills, and education, interactive 3D avatar via Spline, and animated navbar with active indicator. Designed as a portfolio website demonstrating front-end development and responsive design", link: "https://github.com/BarboraLysa/portfolio" },
  ];

   return (
    <div className="flex flex-col items-center gap-10">
      <h2 className="text-4xl font-bold mb-4 text-center">Projects</h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-8 w-full max-w-5xl px-6 justify-items-center">
        {projects.map((p, i) => (
          <div
            key={i}
            className="bg-black rounded-2xl shadow-lg p-6 hover:scale-105 transition flex flex-col min-h-[20rem] w-full"
          >
            <h3 className="text-xl font-bold mb-2">{p.name}</h3>
            <p className="text-gray-400 mb-4 flex-1">{p.desc}</p>
            <a
              href={p.link}
              target="_blank"
              className="text-red-600 hover:underline mt-auto"
            >
              View on GitHub →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

function Contact() {
  const contacts = [
    { icon: <FaLinkedin size={36} />, link: "www.linkedin.com/in/barboralysa" },
    { icon: <FaGithub size={36} />, link: "https://github.com/BarboraLysa" },
    { icon: <FaEnvelope size={36} />, link: "mailto:blys2508@gmail.com" },
  ];

  return (
    <div className="flex flex-col items-center gap-10">
      <h2 className="text-4xl font-bold mb-4 text-center">Contact</h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-10 w-full max-w-4xl px-6">
        {contacts.map((contact, i) => (
          <a
  key={i}
  href={contact.link}
  target="_blank"
  className="bg-black aspect-square flex items-center justify-center rounded-2xl shadow-lg hover:scale-105 transition w-full"
>
  {contact.icon}
</a>

        ))}
      </div>
    </div>
  );
}


// App
export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

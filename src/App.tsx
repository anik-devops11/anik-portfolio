import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Cloud, 
  Container, 
  GitBranch, 
  Monitor,
  Server,
  Settings,
  Terminal,
  Database,
  Menu,
  X,
  FileDown,
  User,
  MessageSquare,
  ChevronDown,
  Send
} from 'lucide-react';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  let mouseTimeout: NodeJS.Timeout;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMouseMoving(true);
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => setIsMouseMoving(false), 150);
    };

    const handleMouseLeave = () => {
      setIsMouseMoving(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      clearTimeout(mouseTimeout);
    };
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
      cursorRef.current.style.opacity = isMouseMoving ? '1' : '0';
    }
  }, [mousePosition, isMouseMoving]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const skills = [
    { name: 'AWS', icon: <Cloud className="w-8 h-8" />, level: 90 },
    { name: 'Kubernetes', icon: <Container className="w-8 h-8" />, level: 85 },
    { name: 'Docker', icon: <Container className="w-8 h-8" />, level: 95 },
    { name: 'CI/CD', icon: <GitBranch className="w-8 h-8" />, level: 88 },
    { name: 'Monitoring', icon: <Monitor className="w-8 h-8" />, level: 82 },
    { name: 'Infrastructure', icon: <Server className="w-8 h-8" />, level: 87 }
  ];

  const projects = [
    {
      title: 'Enterprise Kubernetes Cluster',
      description: 'Designed and implemented a highly available Kubernetes cluster on AWS EKS, supporting 100+ microservices with automated scaling and monitoring.',
      tech: ['AWS EKS', 'Terraform', 'Prometheus', 'Grafana']
    },
    {
      title: 'CI/CD Pipeline Automation',
      description: 'Built a comprehensive CI/CD pipeline using Jenkins and GitHub Actions, reducing deployment time by 70% and improving code quality through automated testing.',
      tech: ['Jenkins', 'GitHub Actions', 'Docker', 'SonarQube']
    },
    {
      title: 'Cloud Cost Optimization',
      description: 'Implemented AWS cost optimization strategies resulting in 40% reduction in cloud infrastructure costs while maintaining performance.',
      tech: ['AWS', 'Terraform', 'CloudWatch', 'Cost Explorer']
    }
  ];

  return (
    <div className="bg-[#2a2d3a] text-gray-300 min-h-screen relative">
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className="fixed w-8 h-8 bg-yellow-400/20 rounded-full pointer-events-none z-50 transition-opacity duration-300"
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
      />

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 rounded-b-lg ${
        isScrolled 
          ? 'bg-gradient-to-r from-[#2a2d3a]/90 via-[#34353a]/90 to-[#2a2d3a]/90 backdrop-blur-sm shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-xl font-semibold text-cyan-400">
                Anik Dash <span className="text-gray-400">|</span> <span className="text-sm font-normal">DevOps Engineer</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="nav-link">Home</button>
              <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
              <button onClick={() => scrollToSection('skills')} className="nav-link">Skills</button>
              <button onClick={() => scrollToSection('projects')} className="nav-link">Projects</button>
              <button onClick={() => scrollToSection('certifications')} className="nav-link">Certifications</button>
              <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
            </div>

            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-4">
              <a 
                href="https://github.com/anik-devops11"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/anik-das12/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="/resume.pdf"
                download
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 text-cyan-400 hover:bg-cyan-400/20 transition-colors"
              >
                <FileDown className="w-4 h-4" />
                <span>Resume</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-cyan-400 transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('home')} className="mobile-nav-link">Home</button>
              <button onClick={() => scrollToSection('about')} className="mobile-nav-link">About</button>
              <button onClick={() => scrollToSection('skills')} className="mobile-nav-link">Skills</button>
              <button onClick={() => scrollToSection('projects')} className="mobile-nav-link">Projects</button>
              <button onClick={() => scrollToSection('certifications')} className="mobile-nav-link">Certifications</button>
              <button onClick={() => scrollToSection('contact')} className="mobile-nav-link">Contact</button>
              
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-700">
                <a 
                  href="https://github.com/anik-devops11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/anik-das12/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="/resume.pdf"
                  download
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 text-cyan-400 hover:bg-cyan-400/20 transition-colors"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Resume</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a2d3a] to-[#1a1d2a] z-0">
          {/* Animated particles */}
          <div className="particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="particle" />
            ))}
          </div>
        </div>
        <div className="container mx-auto px-4 z-10">
          <div className="flex flex-col items-center text-center">
            {/* Profile Image */}
            <div className="mb-8 relative">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-cyan-400/20 relative z-10">
                <img
                  src="/DP.png"
                  alt="Anik Das"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 w-48 h-48 rounded-full border-2 border-cyan-400/20 animate-spin-slow" />
              <div className="absolute inset-0 w-48 h-48 rounded-full border-2 border-cyan-400/10 animate-spin-slower" />
            </div>

            {/* Name and Title */}
            <div className="animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-1000">
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                <span className="text-cyan-400">Anik</span>{' '}
                <span className="text-white">Dash</span>
              </h1>
              <h2 className="text-2xl md:text-4xl mb-8 text-gray-300">DevOps Engineer & Cloud Architect</h2>
              <p className="text-xl max-w-2xl mx-auto text-gray-400">
                Transforming development workflows and infrastructure management through automation and cloud-native solutions.
              </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 animate-bounce">
              <ChevronDown className="w-8 h-8 text-cyan-400/50" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-[#34353a]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-cyan-400">About Me</h2>
          <div className="animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-1000">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg mb-6">
                Aspiring DevOps Engineer with a passion for cloud technologies and automation. Currently enhancing my skills in AWS, Linux, GitHub, Kubernetes, and Jenkins to build a solid foundation in DevOps practices. My goal is to secure a role in the DevOps field where I can leverage my knowledge and passion for continuous improvement. I am always looking for opportunities to learn and grow in the field of DevOps.
              </p>
              <p className="text-lg mb-8">
                I'm passionate about implementing Infrastructure as Code, maintaining high availability systems, 
                and creating robust monitoring solutions that ensure optimal performance and reliability.
              </p>
              <div className="flex justify-center space-x-6">
                <a href="https://github.com/anik-devops11" target="_blank" rel="noopener noreferrer" className="social-link">
                  <Github className="w-8 h-8" />
                </a>
                <a href="https://www.linkedin.com/in/anik-das12/" target="_blank" rel="noopener noreferrer" className="social-link">
                  <Linkedin className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-[#34353a]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-cyan-400 hover:scale-105 transition-transform duration-300 inline-block">
            Senior DevOps Engineer
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-1000"
              >
                <div className="bg-[#2a2d3a] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#2f3241] group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    <span className="text-xl font-semibold text-cyan-400 group-hover:text-cyan-300">{skill.name}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4 overflow-hidden">
                    <div 
                      className="bg-cyan-400 h-2.5 rounded-full group-hover:bg-cyan-300 transition-all duration-500 ease-out"
                      style={{ width: `${skill.level}%`, transform: 'translateX(-100%)', animation: 'slideRight 1s forwards' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-[#34353a]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-cyan-400 hover:scale-105 transition-transform duration-300 inline-block">
            Featured Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-1000"
              >
                <div className="bg-[#2a2d3a] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#2f3241] group">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400 group-hover:text-cyan-300">{project.title}</h3>
                  <p className="text-gray-400 mb-4 group-hover:text-gray-300">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-full text-sm group-hover:bg-cyan-400/20 group-hover:text-cyan-300 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-[#34353a]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-cyan-400">Certifications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-1000">
              <div className="bg-[#2a2d3a] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#2f3241]">
                <h3 
                  className="text-xl font-semibold mb-4 text-cyan-400 cursor-pointer"
                  onClick={() => window.open("https://www.credly.com/earner/earned/badge/83248789-17da-42ac-b78c-983f74cefba9", "_blank")}
                >
                  AWS Certified Solutions Architect – Associate
                </h3>
                <p className="text-gray-400 mb-4">Earners of this certification have a comprehensive understanding of AWS services and technologies.</p>
              </div>
            </div>
            <div className="animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-1000">
              <div className="bg-[#2a2d3a] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#2f3241]">
                <h3 
                  className="text-xl font-semibold mb-4 text-cyan-400 cursor-pointer"
                  onClick={() => window.open("https://learn.kodekloud.com/user/certificate/6756b7f6-451a-4bc8-8d7b-d66d59fa429b", "_blank")}
                >
                  GitHub Actions Certification
                </h3>
                <p className="text-gray-400 mb-4">Validates skills in automating workflows using GitHub Actions.</p>
              </div>
            </div>
            <div className="animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-1000">
              <div className="bg-[#2a2d3a] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#2f3241]">
                <h3 
                  className="text-xl font-semibold mb-4 text-cyan-400 cursor-pointer"
                  onClick={() => window.open("https://learn.kodekloud.com/user/certificate/1ac0bcee-e356-49ee-b45b-9497e5ed513f", "_blank")}
                >
                  Docker Certified Associate Exam Course
                </h3>
                <p className="text-gray-400 mb-4">Proves proficiency in using Docker for containerization.</p>
              </div>
            </div>
            <div className="animate-on-scroll opacity-0 transform translate-y-10 transition-all duration-1000">
              <div className="bg-[#2a2d3a] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#2f3241]">
                <h3 
                  className="text-xl font-semibold mb-4 text-cyan-400 cursor-pointer"
                  onClick={() => window.open("https://learn.kodekloud.com/user/certificate/896192db-d874-4e8c-b718-03984b53cf5c", "_blank")}
                >
                  Jenkins For Beginners
                </h3>
                <p className="text-gray-400 mb-4">Demonstrates knowledge of Jenkins for continuous integration and delivery.</p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#34353a]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-cyan-400">Get in Touch</h2>
          <div className="max-w-lg mx-auto">
            <p className="text-center text-gray-400 mb-8">
              Feel free to reach out for collaborations or queries
            </p>
            <form
              action="https://formspree.io/f/xovwjzed"
              method="POST"
              className="space-y-6"
            >
              {/* ✅ Honeypot field to block spam bots */}
              <input type="text" name="_gotcha" style={{ display: 'none' }} />

              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full bg-[#2a2d3a] rounded-lg py-3 px-12 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email"
                  className="w-full bg-[#2a2d3a] rounded-lg py-3 px-12 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                <textarea
                  name="message"
                  required
                  placeholder="Your Message"
                  rows={4}
                  className="w-full bg-[#2a2d3a] rounded-lg py-3 px-12 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center mx-auto gap-2 w-60 bg-cyan-400 hover:bg-cyan-500 text-[#2a2d3a] font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 group"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </form>

          </div>
        </div>
      </section>

      {/* Resume Download Section */}
      <section className="py-12 bg-[#34353a] border-t border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <a 
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-400 text-[#2a2d3a] rounded-lg hover:bg-cyan-500 transition-colors duration-300 font-semibold"
          >
            <FileDown className="w-5 h-5" />
            Download CV
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 bg-[#34353a]">
        <p>© {new Date().getFullYear()} Anik Dash. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
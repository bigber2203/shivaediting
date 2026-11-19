import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Film, Palette, Cpu, Heart } from "lucide-react";
import projectsData from "../../../data/projects.json";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import BeforeAfterSlider from "../../../components/BeforeAfterSlider";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  // Get other projects as related projects
  const relatedProjects = projectsData.filter((p) => p.id !== id).slice(0, 2);

  return (
    <>
      <Navbar />
      
      <main className="bg-bg-matte min-h-screen pt-28 text-white select-none">
        
        {/* Back Button & Title Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-display font-bold tracking-widest text-text-secondary hover:text-accent transition-colors duration-300 uppercase mb-8"
          >
            <ArrowLeft size={14} />
            BACK TO PORTFOLIO
          </Link>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-display tracking-[0.3em] text-accent uppercase font-bold">
              {project.category}
            </span>
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-[5.5rem] leading-[0.95] tracking-tighter uppercase">
              {project.title}
            </h1>
          </div>
        </div>

        {/* Video Player Section */}
        <div className="w-full bg-bg-charcoal border-y border-white/5 py-12 md:py-16 mb-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="relative w-full aspect-video bg-black border border-white/10 shadow-2xl overflow-hidden">
              <video
                src={project.videoUrl}
                controls
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Meta Info Grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 pb-16 border-b border-white/5 mb-16">
          
          {/* Quick Specifications */}
          <div className="flex flex-col gap-8 md:col-span-1">
            <div className="flex flex-col gap-4">
              <h3 className="font-display font-bold text-xs tracking-widest text-text-secondary uppercase">
                PROJECT DETAILS
              </h3>
              <div className="flex flex-col gap-3 font-display text-sm tracking-wide text-white">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-text-secondary">CLIENT:</span>
                  <span>{project.client}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-text-secondary">ROLE:</span>
                  <span>{project.role}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-text-secondary">YEAR:</span>
                  <span>{project.year}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5 text-accent font-bold">
                  <span className="text-text-secondary">DURATION:</span>
                  <span>{project.duration}</span>
                </div>
              </div>
            </div>

            {/* Software Used */}
            <div className="flex flex-col gap-3">
              <h3 className="font-display font-bold text-xs tracking-widest text-text-secondary uppercase">
                SOFTWARE STACK
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.software.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-display font-medium uppercase tracking-wider text-white"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Overview */}
          <div className="flex flex-col gap-6 md:col-span-2">
            <h3 className="font-display font-bold text-xs tracking-widest text-text-secondary uppercase">
              CASE STUDY OVERVIEW
            </h3>
            <p className="font-display text-base sm:text-lg text-text-secondary tracking-wide leading-relaxed">
              {project.overview}
            </p>

            <div className="mt-4 flex flex-col gap-4">
              <h4 className="font-display font-bold text-sm tracking-widest text-white uppercase">
                EDITING PROCESS
              </h4>
              <ul className="flex flex-col gap-4 text-sm text-text-secondary font-display list-disc pl-5 leading-relaxed tracking-wide">
                {project.process.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Before & After Grading Showcase */}
        {project.id === "shiva-showcase" && (
          <div className="mb-24">
            <BeforeAfterSlider />
          </div>
        )}

        {/* Challenges & Solutions Grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 pb-24 border-b border-white/5 mb-24">
          <div className="flex flex-col gap-4 p-8 bg-bg-charcoal border border-white/5">
            <div className="w-10 h-10 bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center rounded-none mb-2">
              <Cpu size={18} />
            </div>
            <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight">
              THE CHALLENGE
            </h3>
            <p className="text-text-secondary text-sm font-display leading-relaxed tracking-wide">
              {project.challenges}
            </p>
          </div>

          <div className="flex flex-col gap-4 p-8 bg-bg-charcoal border border-white/5">
            <div className="w-10 h-10 bg-accent/10 border border-accent/20 text-accent flex items-center justify-center rounded-none mb-2">
              <Palette size={18} />
            </div>
            <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight">
              THE SOLUTION
            </h3>
            <p className="text-text-secondary text-sm font-display leading-relaxed tracking-wide">
              {project.solutions}
            </p>
          </div>
        </div>

        {/* Client Testimonial */}
        {project.feedback && (
          <div className="max-w-4xl mx-auto px-6 mb-32 text-center">
            <div className="inline-flex p-3 bg-white/5 border border-white/10 text-accent rounded-full mb-6">
              <Heart size={20} fill="currentColor" />
            </div>
            <p className="font-display font-medium text-xl sm:text-2xl text-white tracking-wide leading-relaxed italic mb-6">
              &ldquo;{project.feedback.text}&rdquo;
            </p>
            <div className="flex flex-col gap-1">
              <span className="font-display font-bold text-sm uppercase text-white tracking-wider">
                {project.feedback.author}
              </span>
              <span className="font-display text-xs tracking-widest text-accent uppercase font-bold">
                {project.feedback.role} • {project.feedback.company}
              </span>
            </div>
          </div>
        )}

        {/* Related Projects */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-32">
          <h2 className="font-display font-black text-2xl uppercase tracking-tighter text-white mb-12 border-b border-white/5 pb-4">
            RELATED PROJECTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {relatedProjects.map((rel) => (
              <Link
                key={rel.id}
                href={`/projects/${rel.id}`}
                className="group flex flex-col gap-4"
              >
                <div className="relative aspect-[16/9] w-full bg-bg-charcoal border border-white/5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent flex flex-col justify-end p-6 group-hover:from-white/10 transition-colors duration-300">
                    <span className="text-[10px] tracking-[0.2em] font-display text-accent font-bold uppercase mb-1">
                      {rel.client}
                    </span>
                    <h4 className="font-display font-bold text-lg text-white uppercase tracking-tight group-hover:text-accent transition-colors duration-300">
                      {rel.title}
                    </h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}

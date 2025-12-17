import { useState } from "react";
import svgPaths from "./imports/svg-2tsxp86msm";
import clsx from "clsx";
import imgFinalSealLogo1 from "figma:asset/a76eb5a0f18de2c3b9c2ac1e18fa0165affdd477.png";
import { imgGroup } from "./imports/svg-poktt";

// Project data type
type Project = {
  id: string;
  title: string;
  year: string;
  description: string;
  imageSrc: string;
};

// Project data
const projects: Project[] = [
  {
    id: "apple",
    title: "Apple",
    year: "2025",
    description: "Designing new features to drive engagement and user delight.",
    imageSrc: "https://images.unsplash.com/photo-1704225618899-b19b021dc9e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBsZSUyMHRlY2hub2xvZ3klMjBwcm9kdWN0fGVufDF8fHx8MTc2NTk1MDA1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "roblox",
    title: "Roblox",
    year: "2024",
    description: "Reimagining the future of social gameplay and user communication.",
    imageSrc: "https://images.unsplash.com/photo-1599548291260-8a88e3d3b095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2Jsb3glMjBnYW1pbmclMjBtZXRhdmVyc2V8ZW58MXx8fHwxNzY1OTUwMDUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "adobe",
    title: "Adobe",
    year: "2023",
    description: "Product strategy to drive user acquisition on college campuses.",
    imageSrc: "https://images.unsplash.com/photo-1740174459699-487aec1f7bc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZG9iZSUyMGNyZWF0aXZlJTIwZGVzaWdufGVufDF8fHx8MTc2NTg4Njc3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "nasa",
    title: "NASA JPL",
    year: "2023-24",
    description: "Daring (& designing) mighty things at NASA's in-house DesignLab.",
    imageSrc: "https://images.unsplash.com/photo-1614727190538-626592f1df4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXNhJTIwc3BhY2UlMjBleHBsb3JhdGlvbnxlbnwxfHx8fDE3NjU5NTAwNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "polaroid",
    title: "Polaroid Studio",
    year: "2025",
    description: "Designing new features to drive engagement and user delight.",
    imageSrc: "https://images.unsplash.com/photo-1683821291961-e79e6d10a2cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xhcm9pZCUyMGluc3RhbnQlMjBjYW1lcmF8ZW58MXx8fHwxNzY1OTUwMDUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "screentime",
    title: "Screentime Receipt",
    year: "2025",
    description: "Designing new features to drive engagement and user delight.",
    imageSrc: "https://images.unsplash.com/photo-1510166306017-c95b009555db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY3JlZW4lMjB0aW1lJTIwcGhvbmV8ZW58MXx8fHwxNzY1OTUwMDUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "sketchbook",
    title: "Digital Sketchbook",
    year: "2024",
    description: "Designing new features to drive engagement and user delight.",
    imageSrc: "https://images.unsplash.com/photo-1763041316817-36ffaa4d2c15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2tldGNoYm9vayUyMGRyYXdpbmd8ZW58MXx8fHwxNzY1OTUwMDUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "library",
    title: "Personal Library",
    year: "2025",
    description: "Designing new features to drive engagement and user delight.",
    imageSrc: "https://images.unsplash.com/photo-1758279745202-79570ca2896e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb25hbCUyMGxpYnJhcnklMjBib29rc3xlbnwxfHx8fDE3NjU5NTAwNTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

function AppleCoverBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="aspect-[678/367.625] relative rounded-[26px] shrink-0 w-full">
      <img
        alt=""
        className="absolute max-w-none object-cover rounded-[26px] size-full"
        src={children as string}
      />
    </div>
  );
}

function SocialLinksBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Social Links">{children}</g>
      </svg>
    </div>
  );
}

type LinksBackgroundImageAndTextProps = {
  text: string;
};

function LinksBackgroundImageAndText({ text }: LinksBackgroundImageAndTextProps) {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] py-0 relative rounded-[999px] shrink-0">
      <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#9ca3af] text-[16px] text-nowrap tracking-[0.16px]">
        {text}
      </p>
    </div>
  );
}

type TagBackgroundImageAndTextProps = {
  text: string;
  active?: boolean;
};

function TagBackgroundImageAndText({ text, active = false }: TagBackgroundImageAndTextProps) {
  return (
    <button
      className={clsx(
        "content-stretch flex items-center justify-center px-[12px] py-[4px] relative rounded-[999px] shrink-0 cursor-pointer hover:bg-[rgba(107,114,128,0.15)] transition-colors",
        active && "bg-[rgba(107,114,128,0.1)]"
      )}
    >
      <p
        className={clsx(
          "font-['Manrope:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-nowrap tracking-[0.16px]",
          active ? "text-[#4b5563]" : "text-[#9ca3af]"
        )}
      >
        {text}
      </p>
    </button>
  );
}

type FinalSealLogoBackgroundImageProps = {
  additionalClassNames?: string;
};

function FinalSealLogoBackgroundImage({ additionalClassNames = "" }: FinalSealLogoBackgroundImageProps) {
  return (
    <div className={clsx("absolute left-0", additionalClassNames)}>
      <img
        alt=""
        className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
        src={imgFinalSealLogo1}
      />
    </div>
  );
}

type ProjectCardProps = {
  project: Project;
  onClick: () => void;
};

function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <button
      onClick={onClick}
      className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full cursor-pointer group"
    >
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[26px] shrink-0 w-full transition-transform duration-300 group-hover:scale-[1.02]">
        <AppleCoverBackgroundImage>
          {project.imageSrc}
        </AppleCoverBackgroundImage>
      </div>
      <div className="content-stretch flex flex-col font-['Figtree:Medium',sans-serif] font-medium items-start leading-[1.4] px-[13px] py-0 relative shrink-0 text-[16px]">
        <p className="relative shrink-0 text-[#111827] w-full text-left">
          <span>{project.title} </span>
          <span className="text-[#9ca3af]">• {project.year}</span>
        </p>
        <p className="relative shrink-0 text-[#9ca3af] w-full text-left">{project.description}</p>
      </div>
    </button>
  );
}

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-white rounded-[26px] p-[24px] flex flex-col gap-[20px] items-end max-w-[90vw] max-h-[90vh] overflow-auto">
        <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 text-nowrap">
              <p className="font-['Figtree:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[20px] text-black">
                {project.title}
              </p>
              <p className="font-['Figtree:Medium',sans-serif] font-medium leading-[1.4] relative shrink-0 text-[#9ca3af] text-[16px]">
                •
              </p>
              <p className="font-['Figtree:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#9ca3af] text-[20px]">
                {project.year}
              </p>
            </div>
            <button
              onClick={onClose}
              className="content-stretch flex items-center justify-center relative shrink-0 size-[24px] cursor-pointer hover:opacity-70 transition-opacity"
            >
              <div className="overflow-clip relative shrink-0 size-[20px]">
                <div className="absolute inset-1/4">
                  <div className="absolute inset-0" style={{ "--fill-0": "rgba(75, 85, 99, 1)" } as React.CSSProperties}>
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                      <path
                        d="M9.76256 1.17736C10.0791 0.860788 10.0791 0.347859 9.76256 0.031284C9.44599 -0.285291 8.93306 -0.285291 8.61648 0.031284L5 3.64776L1.38352 0.031284C1.06694 -0.285291 0.554014 -0.285291 0.237439 0.031284C-0.0791362 0.347859 -0.0791362 0.860788 0.237439 1.17736L3.85392 4.79384L0.237439 8.41032C-0.0791362 8.7269 -0.0791362 9.23982 0.237439 9.5564C0.554014 9.87297 1.06694 9.87297 1.38352 9.5564L5 5.93992L8.61648 9.5564C8.93306 9.87297 9.44599 9.87297 9.76256 9.5564C10.0791 9.23982 10.0791 8.7269 9.76256 8.41032L6.14608 4.79384L9.76256 1.17736Z"
                        fill="var(--fill-0, #4B5563)"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          </div>
          <p className="font-['Figtree:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#6b7280] text-[16px] w-full">
            {project.description}
          </p>
        </div>
        <div className="relative rounded-[15.637px] shrink-0 w-full max-w-[1097px] aspect-[1097/615.86]">
          <img
            alt=""
            className="absolute max-w-none object-cover size-full rounded-[15.637px]"
            src={project.imageSrc}
          />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="bg-white content-stretch flex flex-col items-center relative size-full min-h-screen">
      {/* Header */}
      <div
        className="content-stretch flex flex-col items-start relative shrink-0 w-full"
        style={{
          backgroundImage:
            "linear-gradient(16.0073deg, rgb(255, 255, 255) 59.622%, rgb(243, 218, 255) 81.196%, rgb(192, 221, 254) 97.554%, rgb(154, 226, 244) 128.88%)",
        }}
      >
        {/* Logo */}
        <div className="relative shrink-0 w-full">
          <div className="size-full">
            <div className="content-stretch flex flex-col items-start p-[32px] max-md:p-[16px] relative w-full">
              <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                <div className="overflow-clip relative shrink-0 size-[44px]">
                  <FinalSealLogoBackgroundImage additionalClassNames="h-[64.883px] top-[-10.44px] w-[45.32px]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Text */}
        <div className="relative shrink-0 w-full">
          <div className="size-full">
            <div className="content-stretch flex flex-col gap-[36px] items-start pb-[16px] pt-[44px] px-[32px] max-md:px-[16px] relative w-full">
              <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
                <p className="font-['Figtree:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#374151] text-[64px] w-full max-md:text-[48px]">
                  michelle liu
                </p>
                <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#6b7280] text-[0px] text-[20px] w-full max-md:text-[18px]">
                  <span className="font-['Figtree:Regular',sans-serif] text-[#9ca3af]">
                    Designing useful products to spark moments of{" "}
                  </span>
                  <span className="font-['Figtree:Regular',sans-serif] text-[#9ca3af]">delight</span>
                  <span className="font-['Figtree:Regular',sans-serif] text-[#9ca3af]">{` & `}</span>
                  <span className="font-['Figtree:Regular',sans-serif] text-[#9ca3af]">human connection.</span>
                  <span className="font-['Figtree:Regular',sans-serif] text-[#9ca3af]">
                    <br aria-hidden="true" />
                    {`Previously at `}
                  </span>
                  <span
                    className="font-['SF_Pro:Regular',sans-serif] text-[#374151]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    
                  </span>
                  <span className="font-['Figtree:Regular',sans-serif] text-[#9ca3af]">{`, `}</span>
                  <span className="font-['Figtree:Regular',sans-serif] text-[#374151]">Roblox</span>
                  <span className="font-['Figtree:Regular',sans-serif] text-[#9ca3af]">{`, & `}</span>
                  <span className="font-['Figtree:Regular',sans-serif] text-[#374151]">NASA</span>
                  <span className="font-['Figtree:Regular',sans-serif] text-[#9ca3af]">.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="content-stretch flex flex-col items-center pb-[16px] pt-0 px-0 relative shrink-0 w-full">
        <div className="relative shrink-0 w-full">
          <div className="size-full">
            <div className="content-stretch flex flex-col gap-[12px] items-start pb-0 pt-[16px] px-[32px] max-md:px-[16px] relative w-full">
              <div className="content-stretch flex gap-[12px] items-start relative shrink-0">
                <TagBackgroundImageAndText text="WORK" active />
                <TagBackgroundImageAndText text="ART" />
                <TagBackgroundImageAndText text="ABOUT" />
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid - Desktop (2 columns) */}
        <div className="hidden md:grid gap-[16px] grid-cols-2 px-[32px] py-[16px] relative shrink-0 max-w-[1440px]">
          {projects.map((project) => (
            <div key={project.id} className="w-[678px] max-w-full">
              <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
            </div>
          ))}
        </div>

        {/* Projects Grid - Mobile (1 column) */}
        <div className="md:hidden flex flex-col gap-[32px] px-[32px] max-md:px-[16px] py-[16px] relative shrink-0 w-full">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative shrink-0 w-full">
        <div className="flex flex-col items-center size-full">
          <div className="content-stretch flex flex-col gap-[60px] items-center px-[32px] max-md:px-[16px] py-[60px] max-md:pb-[60px] max-md:pt-[16px] relative w-full">
            <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
              <div className="bg-[#e5e7eb] h-px shrink-0 w-full" />
              
              {/* Desktop Grid (4 columns) */}
              <div className="hidden md:grid gap-[20px] grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_fit-content(100%))] relative shrink-0 w-full">
                {/* Column 1: Logo */}
                <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[6px] items-start relative shrink-0">
                  <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
                    <div className="overflow-clip relative shrink-0 size-[28px]">
                      <div className="absolute h-[41.289px] left-0 top-[-6.64px] w-[28.84px]">
                        <img
                          alt=""
                          className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                          src={imgFinalSealLogo1}
                        />
                      </div>
                    </div>
                    <p className="font-['Figtree:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#374151] text-[32px] w-[212px]">
                      michelle liu
                    </p>
                  </div>
                  <p className="font-['Figtree:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#9ca3af] text-[16px] text-nowrap">
                    <span>{`Built with Next.js & `}</span>
                    <a
                      className="[text-underline-position:from-font] cursor-pointer decoration-solid underline hover:opacity-70 transition-opacity"
                      href="https://www.rockysmatcha.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      rocky's matcha
                    </a>
                    <span>{` lattes.`}</span>
                  </p>
                </div>
                
                {/* Column 3: Nav Links */}
                <div className="[grid-area:1_/_3] content-stretch flex flex-col gap-[16px] items-start relative shrink-0">
                  <LinksBackgroundImageAndText text="WORK" />
                  <LinksBackgroundImageAndText text="ART" />
                  <LinksBackgroundImageAndText text="ABOUT" />
                </div>
                
                {/* Column 4: Contact + Social */}
                <div className="[grid-area:1_/_4] content-stretch flex flex-col gap-[44px] items-start relative shrink-0">
                  <div className="content-stretch flex flex-col font-['Figtree:Regular',sans-serif] font-normal items-start relative shrink-0 text-[#9ca3af] w-full">
                    <p className="leading-[24px] min-w-full relative shrink-0 text-[16px] w-[min-content]">Let's work together!</p>
                    <p className="leading-[24px] relative shrink-0 text-[0px] text-[16px] text-nowrap">
                      <span>{`michelletheresaliu@gmail.com `}</span>
                      <span className="font-['Figtree:Bold',sans-serif] font-bold">↗</span>
                    </p>
                  </div>
                  <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[326px]">
                    <div className="content-stretch flex gap-[44px] items-start relative shrink-0">
                      <SocialLinksBackgroundImage>
                        <path d={svgPaths.p2c5f2300} fill="var(--fill-0, #6B7280)" id="Vector" />
                      </SocialLinksBackgroundImage>
                      <div className="content-stretch flex items-center justify-center p-[10px] relative shrink-0 size-[24px]">
                        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                          <div
                            className="[grid-area:1_/_1] h-[17.219px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.89px] mask-size-[19px_19px] ml-0 mt-[4.69%] relative w-[19px]"
                            style={{ maskImage: `url('${imgGroup}')` }}
                          >
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 18">
                              <g id="Group">
                                <path d={svgPaths.p16308a80} fill="var(--fill-0, #6B7280)" id="Vector" />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center justify-center p-[10px] relative shrink-0 size-[24px]">
                        <SocialLinksBackgroundImage>
                          <path d={svgPaths.p1e086000} fill="var(--fill-0, #6B7280)" id="Vector" stroke="var(--stroke-0, #6B7280)" />
                        </SocialLinksBackgroundImage>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mobile Layout (Vertical Stack) */}
              <div className="md:hidden content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
                {/* Logo Section */}
                <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0">
                  <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
                    <div className="overflow-clip relative shrink-0 size-[28px]">
                      <div className="absolute h-[41.289px] left-0 top-[-6.64px] w-[28.84px]">
                        <img
                          alt=""
                          className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                          src={imgFinalSealLogo1}
                        />
                      </div>
                    </div>
                    <p className="font-['Figtree:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#374151] text-[32px] w-[212px]">
                      michelle liu
                    </p>
                  </div>
                  <p className="font-['Figtree:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#9ca3af] text-[16px] text-nowrap">
                    <span>{`Built with Next.js & `}</span>
                    <a
                      className="[text-underline-position:from-font] cursor-pointer decoration-solid underline hover:opacity-70 transition-opacity"
                      href="https://www.rockysmatcha.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      rocky's matcha
                    </a>
                    <span>{` lattes.`}</span>
                  </p>
                </div>
                
                {/* Contact + Social + Nav */}
                <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0">
                  <div className="content-stretch flex flex-col gap-[44px] items-start relative shrink-0">
                    <div className="content-stretch flex flex-col font-['Figtree:Regular',sans-serif] font-normal items-start relative shrink-0 text-[#9ca3af] w-[326px]">
                      <p className="leading-[24px] relative shrink-0 text-[16px] w-full">Let's work together!</p>
                      <p className="leading-[24px] relative shrink-0 text-[0px] text-[16px] w-full">
                        <span>{`michelletheresaliu@gmail.com `}</span>
                        <span className="font-['Figtree:Bold',sans-serif] font-bold">↗</span>
                      </p>
                    </div>
                    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[326px]">
                      <div className="content-stretch flex gap-[44px] items-start relative shrink-0">
                        <SocialLinksBackgroundImage>
                          <path d={svgPaths.p2c5f2300} fill="var(--fill-0, #6B7280)" id="Vector" />
                        </SocialLinksBackgroundImage>
                        <div className="content-stretch flex items-center justify-center p-[10px] relative shrink-0 size-[24px]">
                          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                            <div
                              className="[grid-area:1_/_1] h-[17.219px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.89px] mask-size-[19px_19px] ml-0 mt-[4.69%] relative w-[19px]"
                              style={{ maskImage: `url('${imgGroup}')` }}
                            >
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 18">
                                <g id="Group">
                                  <path d={svgPaths.p16308a80} fill="var(--fill-0, #6B7280)" id="Vector" />
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="content-stretch flex items-center justify-center p-[10px] relative shrink-0 size-[24px]">
                          <SocialLinksBackgroundImage>
                            <path d={svgPaths.p1e086000} fill="var(--fill-0, #6B7280)" id="Vector" stroke="var(--stroke-0, #6B7280)" />
                          </SocialLinksBackgroundImage>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[338px]">
                    <LinksBackgroundImageAndText text="WORK" />
                    <LinksBackgroundImageAndText text="ART" />
                    <LinksBackgroundImageAndText text="ABOUT" />
                  </div>
                </div>
              </div>
            </div>
            <p className="font-['Figtree:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#9ca3af] text-[14px] text-nowrap">
              CHANGELOG: 12-16-25
            </p>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}
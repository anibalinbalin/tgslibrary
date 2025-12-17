import svgPaths from "./svg-2tsxp86msm";
import imgFinalSealLogo1 from "figma:asset/a76eb5a0f18de2c3b9c2ac1e18fa0165affdd477.png";
import { imgGroup } from "./svg-poktt";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        {children}
      </svg>
    </div>
  );
}
type LinksTextProps = {
  text: string;
};

function LinksText({ text }: LinksTextProps) {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] py-0 relative rounded-[999px] shrink-0">
      <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#9ca3af] text-[16px] text-nowrap tracking-[0.16px]">{text}</p>
    </div>
  );
}

export default function Footer() {
  return (
    <div className="relative size-full" data-name="Footer">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[60px] items-center px-[32px] py-[60px] relative size-full">
          <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
            <div className="bg-[#e5e7eb] h-px shrink-0 w-full" />
            <div className="gap-[20px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_fit-content(100%))] relative shrink-0 w-full">
              <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[6px] items-start relative shrink-0">
                <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
                  <div className="overflow-clip relative shrink-0 size-[28px]" data-name="Logo">
                    <div className="absolute h-[41.289px] left-0 top-[-6.64px] w-[28.84px]" data-name="Final seal logo 1">
                      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFinalSealLogo1} />
                    </div>
                  </div>
                  <p className="font-['Figtree:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#374151] text-[32px] w-[212px]">michelle liu</p>
                </div>
                <p className="font-['Figtree:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#9ca3af] text-[16px] text-nowrap">
                  <span>{`Built with Next.js & `}</span>
                  <a className="[text-underline-position:from-font] cursor-pointer decoration-solid underline" href="https://www.rockysmatcha.com/">
                    <span className="[text-underline-position:from-font] decoration-solid leading-[28px]" href="https://www.rockysmatcha.com/">
                      rocky’s matcha
                    </span>
                  </a>
                  <span>{` lattes.`}</span>
                </p>
              </div>
              <div className="[grid-area:1_/_4] content-stretch flex flex-col gap-[44px] items-start relative shrink-0">
                <div className="content-stretch flex flex-col font-['Figtree:Regular',sans-serif] font-normal items-start relative shrink-0 text-[#9ca3af] w-full">
                  <p className="leading-[24px] min-w-full relative shrink-0 text-[16px] w-[min-content]">Let’s work together!</p>
                  <p className="leading-[24px] relative shrink-0 text-[0px] text-[16px] text-nowrap">
                    <span>{`michelletheresaliu@gmail.com `}</span>
                    <span className="font-['Figtree:Bold',sans-serif] font-bold">↗</span>
                  </p>
                </div>
                <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[326px]">
                  <div className="content-stretch flex gap-[44px] items-start relative shrink-0" data-name="Social Links">
                    <Wrapper>
                      <g id="Social Links">
                        <path d={svgPaths.p2c5f2300} fill="var(--fill-0, #6B7280)" id="Vector" />
                      </g>
                    </Wrapper>
                    <div className="content-stretch flex items-center justify-center p-[10px] relative shrink-0 size-[24px]" data-name="Social Links">
                      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Clip path group">
                        <div className="[grid-area:1_/_1] h-[17.219px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.89px] mask-size-[19px_19px] ml-0 mt-[4.69%] relative w-[19px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 18">
                            <g id="Group">
                              <path d={svgPaths.p16308a80} fill="var(--fill-0, #6B7280)" id="Vector" />
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center p-[10px] relative shrink-0 size-[24px]" data-name="Social Links">
                      <Wrapper>
                        <g id="mdi:linkedin">
                          <path d={svgPaths.p1e086000} fill="var(--fill-0, #6B7280)" id="Vector" stroke="var(--stroke-0, #6B7280)" />
                        </g>
                      </Wrapper>
                    </div>
                  </div>
                </div>
              </div>
              <div className="[grid-area:1_/_3] content-stretch flex flex-col gap-[16px] items-start relative shrink-0">
                <LinksText text="WORK" />
                <LinksText text="ART" />
                <LinksText text="ABOUT" />
              </div>
            </div>
          </div>
          <p className="font-['Figtree:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#9ca3af] text-[14px] text-nowrap">CHANGELOG: 12-16-25</p>
        </div>
      </div>
    </div>
  );
}
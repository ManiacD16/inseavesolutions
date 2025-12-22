import React from "react";

type ClientLogo = {
  name: string;
  src?: string; // optional (use when you have real logo images)
};

const DEFAULT_LOGOS: ClientLogo[] = [
  { name: "Techgen", src: "https://tecnologia.vamtam.com/wp-content/uploads/elementor/thumbs/ND-ty6SkWNaiYy3I6E9J3lgFJJIeuHzzcdx74aHvaQ-9PFabsPmUhe_uKKqItjbtrcbw-q5jiv2gpjuggzxafx290l4mou15xce7kl05xvdhrsw.png" },
  { name: "Markoe", src: "https://tecnologia.vamtam.com/wp-content/uploads/elementor/thumbs/pngfind.com-registered-logo-png-2230159-q5jiv0l166dwcpd681frg53rn9f6x003wquywtkk5c.png" },
  { name: "Wario Brand", src: "https://tecnologia.vamtam.com/wp-content/uploads/elementor/thumbs/5b7d7d3778a94-q5jivax99cs1wey5jnwnpkhu6i089o55m61b6v588w.png" },
  { name: "DIGIHUB", src: "https://tecnologia.vamtam.com/wp-content/uploads/elementor/thumbs/url-q5jiuzn6zccm13ejdj14vncb1vjtpawdkm7hfjlybk.png" },
  { name: "Axleo", src: "https://tecnologia.vamtam.com/wp-content/uploads/elementor/thumbs/acronis-logo2-q5jiq4t7o5pa1mghqfgizvgkk7hjxlmawkv662t6gw.png" },
  { name: "Axtrem Code", src: "https://tecnologia.vamtam.com/wp-content/uploads/elementor/thumbs/LenovoBP-POS-color-q5jiv5a84ckbyr6cglgwalx2m6s0zhirle4eb7dla8.png" },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-sm font-semibold text-gray-700 backdrop-blur">
      {children}
    </div>
  );
}

function LogoItem({ logo }: { logo: ClientLogo }) {
  // If you don’t have actual logo images yet, this renders a nice text fallback.
  if (!logo.src) {
    return (
      <div className="flex items-center gap-2 opacity-80 ">
        <div className="h-7 w-7 rounded bg-gray-200" />
        <div className="leading-tight">
          <div className="text-sm font-semibold text-gray-700">{logo.name}</div>
          <div className="text-[11px] text-gray-400">Brand</div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={logo.src}
      alt={logo.name}
      className="h-full w-auto opacity-90  hover:opacity-100 hover:grayscale-0 transition"
      draggable={false}
    />
  );
}

export default function ClientLogosSection({
  logos = DEFAULT_LOGOS,
}: {
  logos?: ClientLogo[];
}) {
  return (
    <section className="w-full bg-transparent border-t border-blue-900/50 py-6 sm:py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top pills */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
          <Pill>
            Our Globally <span className="mx-1 text-blue-600">20K+</span> Clients.
          </Pill>
          <Pill>
            Our Happy Clients <span className="mx-1 text-blue-600">90%+</span>
          </Pill>
        </div>

        {/* Logos row */}
        <div className="mt-6 sm:mt-8 md:mt-10">
          {/* Responsive grid on larger screens, horizontal scroll on mobile */}
          <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12 lg:gap-16 place-items-center">
            {logos.map((logo) => (
              <div key={logo.name} className="w-full flex items-center justify-center h-full">
                <LogoItem logo={logo} />
              </div>
            ))}
          </div>

          {/* Mobile horizontal scroll */}
          <div className="sm:hidden flex items-center justify-start gap-8 overflow-x-auto pb-3 scrollbar-hide">
            {logos.map((logo) => (
              <div key={logo.name} className="shrink-0 h-10">
                <LogoItem logo={logo} />
              </div>
            ))}
          </div>

          {/* Indicator dot */}
          <div className="mt-4 sm:mt-6 flex justify-center">
            <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-indigo-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
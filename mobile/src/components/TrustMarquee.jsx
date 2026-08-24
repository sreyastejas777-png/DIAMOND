import { applications } from '../data/applications';

export default function TrustMarquee() {
  const track = [...applications, ...applications];

  return (
    <div className="relative z-20 overflow-hidden border-y border-primary/10 dark:border-white/10 bg-white dark:bg-[#07130f] py-3 sm:py-6 shadow-sm">
      <div className="marquee-track">
        {track.map((item, i) => (
          <div
            key={i}
            className="mx-2 sm:mx-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 dark:bg-white/5 text-[1.3rem] text-secondary dark:text-accent transition-all sm:h-20 sm:w-20 sm:text-4xl sm:rounded-2xl hover:scale-105"
            title={item.title}
          >
            <item.icon />
          </div>
        ))}
      </div>
    </div>
  );
}

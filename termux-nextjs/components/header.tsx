export default function Header() {
  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6 bg-zinc-950/80 border-b border-white/5">
      <div className="flex items-center gap-2 w-1/3">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
      </div>
      <div className="w-1/3 text-center text-base font-semibold text-zinc-400 font-sans tracking-wide">
        Termux
      </div>
      <div className="w-1/3 text-right text-sm font-medium text-zinc-400 font-sans truncate">
        Made By Sameer Poswal
      </div>
    </div>
  )
}
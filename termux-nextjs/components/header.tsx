export default function Header() {
  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6 bg-zinc-950 border-b border-zinc-700">
      <div className="flex items-center gap-2 w-1/3">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
      </div>
      <div className="w-1/3 text-center text-base font-semibold text-zinc-300 font-sans tracking-wide">
        Termux
      </div>
      <div className="w-1/3 text-right text-sm font-medium text-zinc-300 font-sans truncate">
        Made By{" "}
        <a
          href="https://sameerposwal.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          Sameer Poswal
        </a>
      </div>
    </div>
  )
}
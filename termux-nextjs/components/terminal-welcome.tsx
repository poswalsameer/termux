export function TerminalWelcome() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center space-y-8 tracking-tighter">
      {/* ASCII Art Logo with linear gradient */}
      <div className="font-mono text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-purple-500 to-purple-600 select-none drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]">
        <pre className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold leading-[1.15]">
          {`
████████╗███████╗██████╗ ███╗   ███╗██╗   ██╗██╗  ██╗
╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║   ██║╚██╗██╔╝
   ██║   █████╗  ██████╔╝██╔████╔██║██║   ██║ ╚███╔╝ 
   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║   ██║ ██╔██╗ 
   ██║   ███████╗██║  ██║██║ ╚═╝ ██║╚██████╔╝██╔╝ ██╗
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝
`}
        </pre>
      </div>

      {/* Getting Started Tips */}
      <div className="font-mono text-zinc-400 space-y-3 text-sm sm:text-base leading-relaxed w-fit text-left">
        <ol className="list-decimal list-inside space-y-1.5 ml-1">
          <li>Ask questions, brainstorm ideas, or seek advice.</li>
          <li>Provide specific details for the best results.</li>
          <li>Type <span className="text-purple-400 font-medium">&apos;help&apos;</span> for more information.</li>
        </ol>
      </div>
    </div>
  )
}

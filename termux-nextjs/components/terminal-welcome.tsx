export function TerminalWelcome() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center space-y-8 tracking-tighter">
      <div className="font-mono text-accent select-none">
        <pre className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold leading-[1.15] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
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
          <li>Type <span className="text-accent font-medium">&apos;help&apos;</span> for more information.</li>
        </ol>
      </div>
    </div>
  )
}

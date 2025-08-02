
import { OfficialSentinelLogo } from './OfficialSentinelLogo'

export function LoginHeader() {
  return (
    <div className="text-center mb-8 md:mb-12 animate-fade-in px-4">
      <div className="mb-6 md:mb-8">
        <OfficialSentinelLogo 
          size="lg" 
          variant="default" 
          showText={true}
          className="mb-4 md:mb-6"
        />
        <div className="space-y-2 md:space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-100 to-purple-200 bg-clip-text text-transparent mb-2 md:mb-3">
            Welcome Back
          </h1>
          <p className="text-slate-300 text-lg md:text-xl font-medium px-2">
            Access your <span className="text-cyan-400 font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Sentinel 2.0</span> dashboard
          </p>
          <div className="flex items-center justify-center space-x-2 md:space-x-3 mt-4 md:mt-6">
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
            <span className="text-xs md:text-sm text-slate-400 font-semibold">Powered by Advanced AI</span>
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

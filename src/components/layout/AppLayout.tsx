import { Link, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, Mic, BarChart2, Activity } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export default function AppLayout() {
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/' },
        { icon: Mic, label: 'Assessment', path: '/assessment' },
        { icon: BarChart2, label: 'Analytics', path: '/analytics' },
    ];

    return (
        <div className="min-h-screen bg-background text-slate-100 flex overflow-hidden font-sans">
            {/* Sidebar - Desktop */}
            <aside className="hidden md:flex flex-col w-64 border-r border-slate-800 bg-surface/50 backdrop-blur-xl p-6 relative z-10">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                        <Activity className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        NeuroTrack X
                    </span>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                                    isActive
                                        ? "text-white bg-primary/10 border border-primary/20 shadow-[0_0_20px_rgba(14,165,233,0.1)]"
                                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNavAPI"
                                        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <Icon className={cn("w-5 h-5 relative z-10", isActive ? "text-primary" : "text-slate-500 group-hover:text-slate-300")} />
                                <span className="relative z-10 font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-500">
                    <p className="font-semibold text-slate-400 mb-1">Microsoft Azure AI</p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        Running Securely
                    </div>
                </div>
            </aside>

            {/* Mobile Nav - Bottom */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-xl border-t border-slate-800 p-4 z-50 flex justify-around">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <Link key={item.path} to={item.path} className={cn("flex flex-col items-center gap-1", isActive ? "text-primary" : "text-slate-500")}>
                            <Icon className="w-6 h-6" />
                            <span className="text-[10px]">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* Main Content */}
            <main className="flex-1 relative overflow-y-auto scroll-smooth">
                {/* Background Gradients */}
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[120px]" />
                </div>

                <div className="p-6 md:p-10 max-w-7xl mx-auto pb-24 md:pb-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

import { useState, useEffect } from 'react';
import { Mic, Square, Loader2, CheckCircle2, CloudLightning } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

export default function AssessmentFlow() {
    const [status, setStatus] = useState<'idle' | 'recording' | 'processing' | 'completed'>('idle');
    const [duration, setDuration] = useState(0);
    const [processingStep, setProcessingStep] = useState(0);

    // Simulate Recording Timer
    useEffect(() => {
        let interval: any;
        if (status === 'recording') {
            interval = setInterval(() => setDuration(d => d + 1), 1000);
        } else {
            setDuration(0);
        }
        return () => clearInterval(interval);
    }, [status]);

    // Simulate Azure Processing Pipeline
    useEffect(() => {
        if (status === 'processing') {
            const steps = [
                "Uploading to Azure Data Lake...",
                "Azure Speech-to-Text Transcription...",
                "Extracting Linguistic Features (OpenAI)...",
                "Updating Longitudinal Baseline...",
                "Analysis Complete."
            ];

            let step = 0;
            const interval = setInterval(() => {
                setProcessingStep(step);
                step++;
                if (step >= steps.length) {
                    clearInterval(interval);
                    setTimeout(() => setStatus('completed'), 800);
                }
            }, 1500);

            return () => clearInterval(interval);
        }
    }, [status]);

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, '0')}`;
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-surface/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl overflow-hidden relative">
                <AnimatePresence mode="wait">

                    {/* IDLE STATE */}
                    {status === 'idle' && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex flex-col items-center text-center space-y-6"
                        >
                            <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-20" />
                                <Mic className="w-10 h-10 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Start Assessment</h2>
                                <p className="text-slate-400 mt-2 max-w-md">
                                    Please read the prompt aloud clearly. Analysis takes approximately 30 seconds.
                                </p>
                            </div>

                            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 text-left w-full max-w-md">
                                <p className="text-slate-300 font-medium font-serif leading-relaxed">
                                    "The quick brown fox jumps over the lazy dog. I remember the house where I was born, the little window where the sun came peeping in at morn."
                                </p>
                            </div>

                            <button
                                onClick={() => setStatus('recording')}
                                className="px-8 py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] active:scale-95"
                            >
                                Start Recording
                            </button>
                        </motion.div>
                    )}

                    {/* RECORDING STATE */}
                    {status === 'recording' && (
                        <motion.div
                            key="recording"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex flex-col items-center text-center space-y-8"
                        >
                            <div className="text-4xl font-mono font-bold text-white tabular-nums">
                                {formatTime(duration)}
                            </div>

                            {/* Audio WaveViz Simulation */}
                            <div className="flex items-center gap-1 h-24">
                                {[...Array(20)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-2 bg-gradient-to-t from-primary to-purple-500 rounded-full"
                                        animate={{ height: [10, Math.random() * 80 + 10, 10] }}
                                        transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                                    />
                                ))}
                            </div>

                            <p className="text-slate-400 animate-pulse">Listening...</p>

                            <button
                                onClick={() => setStatus('processing')}
                                className="px-8 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold transition-all flex items-center gap-2"
                            >
                                <Square className="w-4 h-4 fill-current" /> Stop Estimation
                            </button>
                        </motion.div>
                    )}

                    {/* PROCESSING STATE */}
                    {status === 'processing' && (
                        <motion.div
                            key="processing"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center space-y-8 py-10"
                        >
                            <div className="relative">
                                <CloudLightning className="w-16 h-16 text-primary animate-pulse" />
                                <motion.div
                                    className="absolute inset-0 border-4 border-primary/30 border-t-primary rounded-full w-full h-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                    style={{ width: '140%', height: '140%', left: '-20%', top: '-20%' }}
                                />
                            </div>

                            <div className="w-full max-w-sm space-y-4">
                                {[
                                    "Uploading to Azure Data Lake...",
                                    "Azure Speech-to-Text Transcription...",
                                    "Extracting Linguistic Features...",
                                    "Updating Longitudinal Baseline...",
                                    "Analysis Complete."
                                ].map((text, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        {i < processingStep ? (
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                        ) : i === processingStep ? (
                                            <Loader2 className="w-5 h-5 text-primary animate-spin" />
                                        ) : (
                                            <div className="w-5 h-5 rounded-full border border-slate-700" />
                                        )}
                                        <span className={cn("text-sm transition-colors", i <= processingStep ? "text-slate-200" : "text-slate-600")}>
                                            {text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* COMPLETED STATE */}
                    {status === 'completed' && (
                        <motion.div
                            key="completed"
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center text-center space-y-6"
                        >
                            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Assessment Complete</h2>
                                <p className="text-slate-400">Your data has been securely processed by Azure.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                                    <p className="text-xs text-slate-500 uppercase">Clarity Score</p>
                                    <p className="text-xl font-bold text-white">98%</p>
                                </div>
                                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                                    <p className="text-xs text-slate-500 uppercase">Risk Delta</p>
                                    <p className="text-xl font-bold text-emerald-400">-0.2%</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setStatus('idle')}
                                className="mt-4 text-primary hover:text-primary/80 font-medium"
                            >
                                Start New Assessment
                            </button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

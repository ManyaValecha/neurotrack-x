import { motion } from 'framer-motion';
import { MOCK_USER } from '../data/mockData';
import CRIGauge from '../components/dashboard/CRIGauge';
import TrendChart from '../components/dashboard/TrendChart';
import RiskRadar from '../components/dashboard/RiskRadar';
import ActivityFeed from '../components/dashboard/ActivityFeed';

export default function Dashboard() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div
                className="flex justify-between items-end"
            >
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {MOCK_USER.name}</h1>
                    <p className="text-slate-400">Monitoring cognitive health since {new Date(MOCK_USER.baselineDate).getFullYear()}</p>
                </div>
                <div className="text-right hidden sm:block">
                    <p className="text-sm text-slate-500">Last Synced with Azure</p>
                    <p className="text-emerald-400 text-sm font-mono">Just now</p>
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Gauge - Left Col */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="md:col-span-3 lg:col-span-3"
                >
                    <CRIGauge score={32} />
                </motion.div>

                {/* Main Chart - Center/Right Col */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="md:col-span-9 lg:col-span-9"
                >
                    <TrendChart />
                </motion.div>

                {/* Bottom Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="md:col-span-6 lg:col-span-6"
                >
                    <RiskRadar />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="md:col-span-6 lg:col-span-6"
                >
                    <ActivityFeed />
                </motion.div>
            </div>
        </div>
    )
}

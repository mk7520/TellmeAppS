import React from 'react';
import { TellmeLogo } from './TellmeLogo';
import { appInfoData } from '../data/mockData';
import { ArrowRight, Globe, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

interface AboutAppViewProps {
  onBack: () => void;
  onOpenSupport: () => void;
}

export const AboutAppView: React.FC<AboutAppViewProps> = ({ onBack, onOpenSupport }) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto">
      {/* Top Header */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0 sticky top-0 z-20 shadow-2xs">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-slate-700 hover:text-blue-600 hover:bg-slate-100 px-2 py-1 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span
            className="font-brand font-bold text-xl text-blue-600"
            style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
          >
            Tellme Info
          </span>
        </button>

        <TellmeLogo size="sm" />
      </div>

      {/* Main Content */}
      <div className="p-6 flex flex-col items-center text-center">
        {/* Big Tellme Logo */}
        <TellmeLogo size="2xl" className="mb-3 shadow-lg shadow-blue-500/10" />

        <h1
          className="font-brand font-bold text-3xl text-blue-600 tracking-wider mb-2"
          style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
        >
          {appInfoData.name}
        </h1>

        <p className="text-xs text-slate-500 max-w-xs leading-relaxed mb-4">
          {appInfoData.description}
        </p>

        {/* 'Visit Website' button */}
        <button
          onClick={() => window.open('https://tellme.app', '_blank')}
          className="px-6 py-2 rounded-xl border border-blue-600 text-blue-600 font-bold text-sm hover:bg-blue-600 hover:text-white transition-all shadow-2xs flex items-center gap-2 cursor-pointer mb-6"
        >
          <span>Visit Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>

        {/* Detailed Application Metadata Table */}
        <div className="w-full max-w-sm bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 text-xs shadow-2xs">
          <div className="flex items-center justify-between p-3 font-semibold">
            <span className="text-slate-500">Packages</span>
            <span className="text-blue-600 font-mono font-bold">{appInfoData.packageId}</span>
          </div>

          <div className="flex items-center justify-between p-3 font-semibold">
            <span className="text-slate-500">V (الإصدار)</span>
            <span className="text-slate-800 font-mono font-bold">{appInfoData.version}</span>
          </div>

          <div className="flex items-center justify-between p-3 font-semibold">
            <span className="text-slate-500">Publish</span>
            <span className="text-slate-800">{appInfoData.publisher}</span>
          </div>

          <div className="flex items-center justify-between p-3 font-semibold">
            <span className="text-slate-500">Developer</span>
            <span className="text-slate-800">{appInfoData.developer}</span>
          </div>

          <div className="flex items-center justify-between p-3 font-semibold">
            <span className="text-slate-500">Management</span>
            <span className="text-blue-600 font-bold">{appInfoData.management}</span>
          </div>

          <div className="flex items-center justify-between p-3 font-semibold">
            <span className="text-slate-500">Date Start</span>
            <span className="text-slate-600 font-mono">{appInfoData.dateStart}</span>
          </div>

          <div className="flex items-center justify-between p-3 font-semibold">
            <span className="text-slate-500">Data Update</span>
            <span className="text-emerald-600 font-mono font-bold">{appInfoData.dateUpdate}</span>
          </div>
        </div>

        {/* Bottom stylized Tellme Logo / Signature */}
        <div className="mt-8 flex flex-col items-center gap-1.5 opacity-90">
          <TellmeLogo size="md" />
          <span
            className="font-brand text-xl text-blue-600 font-bold"
            style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
          >
            Tellme Apps
          </span>
        </div>
      </div>
    </div>
  );
};

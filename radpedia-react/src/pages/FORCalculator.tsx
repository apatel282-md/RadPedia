import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export default function FORCalculator() {
  const [frontalHorn, setFrontalHorn] = useState<string>('');
  const [interparietalDiameter, setInterparietalDiameter] = useState<string>('');
  const [occipitalHorn, setOccipitalHorn] = useState<string>('');

  const result = useMemo(() => {
    const frontal = parseFloat(frontalHorn);
    const interparietal = parseFloat(interparietalDiameter);
    const occipital = parseFloat(occipitalHorn);

    if (isNaN(frontal) || isNaN(interparietal) || isNaN(occipital) || interparietal === 0) {
      return { value: null, error: '' };
    }

    if (frontal <= 0 || interparietal <= 0 || occipital <= 0) {
      return { value: null, error: 'Enter values greater than 0.' };
    }

    const forValue = (frontal + occipital) / (2 * interparietal);
    return { value: forValue.toFixed(2), error: '' };
  }, [frontalHorn, interparietalDiameter, occipitalHorn]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-brand-bg-200 rounded-[2.5rem] shadow-xl border border-white/5 overflow-hidden">
          <div className="px-8 pt-10 pb-6 border-b border-white/5 text-center">
            <h1 className="text-3xl font-display font-extrabold text-white">
              FOR Horn Ratio
            </h1>
            <p className="mt-2 text-brand-text-200 text-sm">
              Fronto-Occipital Horn Ratio calculator for ventricular size assessment.
            </p>
          </div>

          <div className="p-8 space-y-8">
            {/* Inputs */}
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="frontal-diameter"
                  className="block text-sm font-bold text-brand-text-200 mb-2 ml-1"
                >
                  Frontal Horn Diameter (mm)
                </label>
                <Input
                  id="frontal-diameter"
                  type="number"
                  min="0"
                  step="0.01"
                  value={frontalHorn}
                  onChange={(e) => setFrontalHorn(e.target.value)}
                  placeholder="e.g. 12.5"
                  className="text-base py-4"
                />
              </div>
              <div>
                <label
                  htmlFor="interparietal-diameter"
                  className="block text-sm font-bold text-brand-text-200 mb-2 ml-1"
                >
                  Interparietal Diameter (mm)
                </label>
                <Input
                  id="interparietal-diameter"
                  type="number"
                  min="0"
                  step="0.01"
                  value={interparietalDiameter}
                  onChange={(e) => setInterparietalDiameter(e.target.value)}
                  placeholder="e.g. 85.0"
                  className="text-base py-4"
                />
              </div>
              <div>
                <label
                  htmlFor="occipital-diameter"
                  className="block text-sm font-bold text-brand-text-200 mb-2 ml-1"
                >
                  Occipital Horn Diameter (mm)
                </label>
                <Input
                  id="occipital-diameter"
                  type="number"
                  min="0"
                  step="0.01"
                  value={occipitalHorn}
                  onChange={(e) => setOccipitalHorn(e.target.value)}
                  placeholder="e.g. 14.2"
                  className="text-base py-4"
                />
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-brand-bg-100 rounded-3xl p-8 text-center border border-white/5 shadow-inner">
              <span className="block text-brand-primary-300 text-xs font-bold uppercase tracking-widest mb-2">
                Calculated FOR
              </span>
              <span className="text-white text-5xl font-display font-bold">
                {result.value ?? '--'}
              </span>
              {result.error && (
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-brand-primary-300">
                  {result.error}
                </p>
              )}
            </div>

            {/* Reference Table */}
            <div className="bg-brand-bg-300 rounded-3xl p-6 border border-white/5 space-y-4">
              <span className="block text-xs font-bold uppercase tracking-widest text-brand-text-200 mb-2">
                Severity Reference
              </span>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-brand-text-200">
                  <span>Normal</span>
                  <span className="text-white font-bold">&lt; 0.40</span>
                </div>
                <div className="flex justify-between text-sm text-brand-text-200 border-t border-white/5 pt-3">
                  <span>Mild</span>
                  <span className="text-white font-bold">0.40 - 0.49</span>
                </div>
                <div className="flex justify-between text-sm text-brand-text-200 border-t border-white/5 pt-3">
                  <span>Severe</span>
                  <span className="text-white font-bold">&gt; 0.50</span>
                </div>
              </div>
            </div>

            {/* Measurement Guide Image */}
            <div className="pt-8 border-t border-white/5">
              <p className="text-center text-xs font-bold uppercase tracking-widest text-brand-text-200 mb-6">
                Measurement Methodology
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="w-full group relative overflow-hidden rounded-3xl border border-white/5 transition-all hover:border-brand-primary-200">
                    <img
                      src="/images/FOR.png"
                      alt="FOR Guide"
                      className="w-full opacity-60 transition-all duration-300 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-brand-bg-100/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-brand-primary-100 text-white px-4 py-2 rounded-full text-xs font-bold shadow-sm">
                        View Full Image
                      </span>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-2">
                  <img
                    src="/images/FOR.png"
                    alt="FOR Measurement Guide"
                    className="w-full rounded-2xl"
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

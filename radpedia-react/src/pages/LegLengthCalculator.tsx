import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';

interface Measurements {
  right: {
    proximalFemur: number;
    distalFemur: number;
    distalTibia: number;
  };
  left: {
    proximalFemur: number;
    distalFemur: number;
    distalTibia: number;
  };
}

export default function LegLengthCalculator() {
  const [measurements, setMeasurements] = useState<Measurements>({
    right: { proximalFemur: 0, distalFemur: 0, distalTibia: 0 },
    left: { proximalFemur: 0, distalFemur: 0, distalTibia: 0 },
  });

  const handleInputChange = (side: 'right' | 'left', field: keyof Measurements['right'], value: string) => {
    const numValue = parseFloat(value);
    setMeasurements((prev) => ({
      ...prev,
      [side]: {
        ...prev[side],
        [field]: isNaN(numValue) || numValue < 0 ? 0 : numValue,
      },
    }));
  };

  const results = useMemo(() => {
    const { right: r, left: l } = measurements;

    const rightFemur = r.distalFemur - r.proximalFemur;
    const leftFemur = l.distalFemur - l.proximalFemur;
    const rightTibia = r.distalTibia - r.distalFemur;
    const leftTibia = l.distalTibia - l.distalFemur;
    const rightTotal = rightFemur + rightTibia;
    const leftTotal = leftFemur + leftTibia;

    const formatOutput = (length: number) => (length < 0 ? 'ERR' : length.toFixed(1));

    const setDiff = (right: number, left: number) => {
      if (right < 0 || left < 0) return 'N/A';
      return (right - left).toFixed(1);
    };

    return {
      femur: {
        right: formatOutput(rightFemur),
        left: formatOutput(leftFemur),
        diff: setDiff(rightFemur, leftFemur),
      },
      tibia: {
        right: formatOutput(rightTibia),
        left: formatOutput(leftTibia),
        diff: setDiff(rightTibia, leftTibia),
      },
      total: {
        right: formatOutput(rightTotal),
        left: formatOutput(leftTotal),
        diff: setDiff(rightTotal, leftTotal),
      },
    };
  }, [measurements]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-brand-bg-200 rounded-[2.5rem] shadow-xl border border-white/5 overflow-hidden">
          <div className="px-8 pt-10 pb-6 border-b border-white/5 text-center">
            <h1 className="text-3xl font-display font-extrabold text-white">
              Leg Length Calculator
            </h1>
            <p className="mt-2 text-brand-text-200 text-sm">
              Calculate femur, tibia and limb length discrepancy.
            </p>
          </div>

          <div className="p-8 space-y-10">
            {/* Measurement Input */}
            <div className="overflow-hidden rounded-3xl border border-white/5 bg-brand-bg-100 p-6">
              <div className="grid grid-cols-3 gap-6 mb-4 font-bold text-xs uppercase tracking-widest text-brand-text-200">
                <div className="col-span-1 pl-4">Mark</div>
                <div className="text-center">Right</div>
                <div className="text-center">Left</div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-3 items-center gap-4">
                  <div className="text-sm font-semibold text-brand-text-200 pl-4">
                    Proximal Femur
                  </div>
                  <Input
                    type="number"
                    value={measurements.right.proximalFemur || ''}
                    onChange={(e) => handleInputChange('right', 'proximalFemur', e.target.value)}
                    className="text-center"
                    placeholder="0"
                  />
                  <Input
                    type="number"
                    value={measurements.left.proximalFemur || ''}
                    onChange={(e) => handleInputChange('left', 'proximalFemur', e.target.value)}
                    className="text-center"
                    placeholder="0"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <div className="text-sm font-semibold text-brand-text-200 pl-4">
                    Distal Femur
                  </div>
                  <Input
                    type="number"
                    value={measurements.right.distalFemur || ''}
                    onChange={(e) => handleInputChange('right', 'distalFemur', e.target.value)}
                    className="text-center"
                    placeholder="0"
                  />
                  <Input
                    type="number"
                    value={measurements.left.distalFemur || ''}
                    onChange={(e) => handleInputChange('left', 'distalFemur', e.target.value)}
                    className="text-center"
                    placeholder="0"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <div className="text-sm font-semibold text-brand-text-200 pl-4">
                    Distal Tibia
                  </div>
                  <Input
                    type="number"
                    value={measurements.right.distalTibia || ''}
                    onChange={(e) => handleInputChange('right', 'distalTibia', e.target.value)}
                    className="text-center"
                    placeholder="0"
                  />
                  <Input
                    type="number"
                    value={measurements.left.distalTibia || ''}
                    onChange={(e) => handleInputChange('left', 'distalTibia', e.target.value)}
                    className="text-center"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Calculated Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Femur Segment */}
              <div className="bg-brand-bg-100 p-6 rounded-[2rem] border border-white/5 space-y-4">
                <div className="text-xs font-bold uppercase tracking-widest text-brand-primary-200">
                  Femur (mm)
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-text-200">Right</span>
                    <span className="text-white font-bold">{results.femur.right}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-text-200">Left</span>
                    <span className="text-white font-bold">{results.femur.left}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-white/5">
                    <span className="text-brand-text-200">Diff</span>
                    <span className="text-brand-primary-100 font-bold">{results.femur.diff}</span>
                  </div>
                </div>
              </div>

              {/* Tibia Segment */}
              <div className="bg-brand-bg-100 p-6 rounded-[2rem] border border-white/5 space-y-4">
                <div className="text-xs font-bold uppercase tracking-widest text-brand-primary-200">
                  Tibia (mm)
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-text-200">Right</span>
                    <span className="text-white font-bold">{results.tibia.right}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-text-200">Left</span>
                    <span className="text-white font-bold">{results.tibia.left}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-white/5">
                    <span className="text-brand-text-200">Diff</span>
                    <span className="text-brand-primary-100 font-bold">{results.tibia.diff}</span>
                  </div>
                </div>
              </div>

              {/* Total Length */}
              <div className="bg-brand-primary-100 p-6 rounded-[2rem] text-white shadow-xl shadow-brand-primary-100/20 space-y-4">
                <div className="text-xs font-bold uppercase tracking-widest text-brand-primary-300">
                  Total Leg
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-primary-200 font-bold">Right</span>
                    <span className="font-bold">{results.total.right}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-primary-200 font-bold">Left</span>
                    <span className="font-bold">{results.total.left}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-white/20">
                    <span className="text-brand-primary-200 font-bold">Diff</span>
                    <span className="font-extrabold text-[#c6ffe6]">{results.total.diff}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Anatomical Reference Guide */}
            <div className="pt-8 text-center border-t border-white/5">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-text-200 mb-6">
                Anatomical Landmarks Guide
              </p>
              <div className="inline-block relative group bg-white/95 rounded-[2.5rem] p-8 shadow-inner border border-white/10">
                <img
                  src="/images/leglength.png"
                  alt="Leg Length Guide"
                  className="relative w-full max-w-lg transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

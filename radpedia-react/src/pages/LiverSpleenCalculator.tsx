import { useState } from 'react';
import { liverData } from '@/data/liverData';
import { spleenData } from '@/data/spleenData';
import type { OrganMeasurement } from '@/types/calculator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type Organ = 'liver' | 'spleen';
type ReferenceMethod = 'age' | 'height';

export default function LiverSpleenCalculator() {
  const [organ, setOrgan] = useState<Organ>('liver');
  const [referenceMethod, setReferenceMethod] = useState<ReferenceMethod>('age');
  const [selectedValue, setSelectedValue] = useState<string>('');

  const currentData = organ === 'liver' ? liverData : spleenData;
  const currentImage = organ === 'liver' ? '/images/LiverLength.jpeg' : '/images/SpleenLength.jpeg';

  const selectedRow: OrganMeasurement | undefined =
    referenceMethod === 'age'
      ? currentData.find((r) => r.age === selectedValue)
      : currentData.find((r) => r.height === selectedValue);

  const handleOrganChange = (newOrgan: Organ) => {
    setOrgan(newOrgan);
    setSelectedValue('');
  };

  const handleReferenceMethodChange = (method: ReferenceMethod) => {
    setReferenceMethod(method);
    setSelectedValue('');
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="bg-brand-bg-200 rounded-[2.5rem] shadow-xl border border-white/5 overflow-hidden">
          <div className="px-8 pt-10 pb-6 border-b border-white/5">
            <h1 className="text-3xl font-display font-extrabold text-white text-center">
              Liver & Spleen
            </h1>
            <p className="mt-2 text-brand-text-200 text-center text-sm">
              Reference values for pediatric organ length.
            </p>
          </div>

          <div className="p-8 space-y-8">
            {/* Organ Selection */}
            <div>
              <label className="block text-sm font-bold text-brand-text-200 mb-3 ml-1 tracking-wide uppercase text-xs">
                Target Organ
              </label>
              <div className="grid grid-cols-2 gap-3 p-1 bg-brand-bg-100 rounded-2xl">
                <Button
                  variant={organ === 'liver' ? 'default' : 'ghost'}
                  onClick={() => handleOrganChange('liver')}
                  className={
                    organ === 'liver'
                      ? 'bg-brand-bg-300 text-brand-primary-200 shadow-sm border border-white/5'
                      : 'text-brand-text-200 hover:bg-brand-bg-300 hover:text-white'
                  }
                >
                  Liver (R. Lobe)
                </Button>
                <Button
                  variant={organ === 'spleen' ? 'default' : 'ghost'}
                  onClick={() => handleOrganChange('spleen')}
                  className={
                    organ === 'spleen'
                      ? 'bg-brand-bg-300 text-brand-primary-200 shadow-sm border border-white/5'
                      : 'text-brand-text-200 hover:bg-brand-bg-300 hover:text-white'
                  }
                >
                  Spleen
                </Button>
              </div>
            </div>

            {/* Reference Type Selection */}
            <div>
              <label className="block text-sm font-bold text-brand-text-200 mb-3 ml-1 tracking-wide uppercase text-xs">
                Reference Method
              </label>
              <div className="grid grid-cols-2 gap-3 p-1 bg-brand-bg-100 rounded-2xl">
                <Button
                  variant={referenceMethod === 'age' ? 'default' : 'ghost'}
                  onClick={() => handleReferenceMethodChange('age')}
                  className={
                    referenceMethod === 'age'
                      ? 'bg-brand-bg-300 text-brand-primary-200 shadow-sm border border-white/5'
                      : 'text-brand-text-200 hover:bg-brand-bg-300 hover:text-white'
                  }
                >
                  By Age
                </Button>
                <Button
                  variant={referenceMethod === 'height' ? 'default' : 'ghost'}
                  onClick={() => handleReferenceMethodChange('height')}
                  className={
                    referenceMethod === 'height'
                      ? 'bg-brand-bg-300 text-brand-primary-200 shadow-sm border border-white/5'
                      : 'text-brand-text-200 hover:bg-brand-bg-300 hover:text-white'
                  }
                >
                  By Height
                </Button>
              </div>
            </div>

            {/* Dropdown Selection */}
            <div className="space-y-6">
              {referenceMethod === 'age' ? (
                <div>
                  <label
                    htmlFor="age-select"
                    className="block text-sm font-bold text-brand-text-200 mb-2 ml-1"
                  >
                    Select Age Range
                  </label>
                  <Select value={selectedValue} onValueChange={setSelectedValue}>
                    <SelectTrigger className="w-full py-4 text-base">
                      <SelectValue placeholder="-- Select Age Range --" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentData.map((item) => (
                        <SelectItem key={item.age} value={item.age}>
                          {item.age} (Height: {item.height} cm)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="height-select"
                    className="block text-sm font-bold text-brand-text-200 mb-2 ml-1"
                  >
                    Select Height (cm)
                  </label>
                  <Select value={selectedValue} onValueChange={setSelectedValue}>
                    <SelectTrigger className="w-full py-4 text-base">
                      <SelectValue placeholder="-- Select Height Range --" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentData.map((item) => (
                        <SelectItem key={item.height} value={item.height}>
                          {item.height} cm ({item.age})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Results */}
            {selectedRow && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-brand-bg-300 rounded-3xl p-6 border border-white/5">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-brand-text-200 font-medium">
                        Mean Measurement
                      </span>
                      <span className="text-white font-bold">{selectedRow.mean} mm</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-t border-white/5 pt-4">
                      <span className="text-brand-text-200 font-medium">
                        Measurement Range
                      </span>
                      <span className="text-white font-bold">
                        {selectedRow.min} - {selectedRow.max} mm
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-t border-white/5 pt-4">
                      <span className="text-brand-text-200 font-medium">
                        5th - 95th Percentile
                      </span>
                      <span className="text-white font-bold">
                        {selectedRow.p5} - {selectedRow.p95} mm
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 bg-brand-primary-100 rounded-2xl p-6 text-center shadow-lg shadow-brand-primary-100/20">
                    <span className="block text-brand-primary-300 text-xs font-bold uppercase tracking-widest mb-2">
                      Suggested Normal Limits
                    </span>
                    <span className="text-white text-3xl font-display font-bold">
                      {selectedRow.lowerNormal} - {selectedRow.upperNormal} mm
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Reference Chart Preview */}
            <div className="pt-8 border-t border-white/5 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-text-200 mb-6">
                Reference Chart Preview
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="group relative overflow-hidden rounded-3xl border border-white/5 bg-brand-bg-300 transition-all hover:border-brand-primary-200 w-full">
                    <img
                      src={currentImage}
                      alt="Reference Chart"
                      className="w-full opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-brand-bg-100/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-brand-primary-100 text-white px-4 py-2 rounded-full text-xs font-bold shadow-sm">
                        View Full Chart
                      </span>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-2">
                  <img
                    src={currentImage}
                    alt="Full size reference"
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

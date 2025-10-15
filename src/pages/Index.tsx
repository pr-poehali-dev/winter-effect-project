import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface Snowflake {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
}

const Index = () => {
  const [intensity, setIntensity] = useState([70]);
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const count = Math.floor(intensity[0] * 1.5);
    const flakes: Snowflake[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 3 + 3,
      delay: Math.random() * 5,
      drift: Math.random() * 30 - 15,
    }));
    setSnowflakes(flakes);
  }, [intensity]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/files/8dc93f8b-1a2f-48b1-948a-f8dd1c93d46d.jpg')`,
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-blue-950/30" />

      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/60 via-white/30 to-transparent pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute text-white opacity-80"
            style={{
              left: `${flake.x}%`,
              fontSize: `${flake.size}px`,
              animation: `fall ${flake.duration}s linear infinite`,
              animationDelay: `${flake.delay}s`,
              '--drift': `${flake.drift}px`,
            } as React.CSSProperties}
          >
            ❄
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-6 pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <Icon name="Snowflake" className="text-blue-600" size={28} />
            <h2 className="text-xl font-semibold text-gray-800">Интенсивность снега</h2>
          </div>
          
          <div className="space-y-3">
            <Slider
              value={intensity}
              onValueChange={setIntensity}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Легкий снег</span>
              <span className="font-medium text-blue-700">{intensity[0]}%</span>
              <span>Метель</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(var(--drift));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
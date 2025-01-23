import { ISeries } from '@/all-types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { FaX } from 'react-icons/fa6';

interface ISetListProps {
  series: ISeries;
  close: () => void;
}

function SetList({ series, close }: ISetListProps) {
  return (
    <div>
      <header
        key={series.id}
        className="relative mb-8 flex h-24 cursor-pointer items-center overflow-hidden rounded-lg border-2 border-orange-400 p-4 hover:border-sky-300"
      >
        {/* Background Image */}
        <img
          src={series.image_url}
          alt=""
          className="absolute inset-0 z-0 h-full w-full translate-x-[40%] transform object-cover opacity-30"
        />

        {/* Gradient Overlay */}
        <div className="z-5 absolute inset-0 bg-gradient-to-r from-slate-950 to-transparent"></div>

        {/* Text */}
        <div className="relative z-10 flex items-center justify-between gap-4">
          <FaX className="text-3xl" onClick={() => close()} />
          <div>
            <h2 className="text-2xl font-bold">{series.name}</h2>
            <p className="text-gray-400">{series.release_date}</p>
          </div>
        </div>
      </header>
      <div className="flex flex-col gap-2">
        {series.sets.map((set) => (
          <Link
            href={route('set.show', set.id)}
            key={set.id}
            className="relative flex h-24 cursor-pointer items-center overflow-hidden rounded-lg border-2 border-sky-800 p-4 hover:border-sky-300"
          >
            {/* Background Image */}
            <img
              src={set.logo_url}
              alt=""
              className="absolute inset-0 z-0 h-full w-full translate-x-[40%] transform object-cover opacity-30"
            />

            {/* Gradient Overlay */}
            <div className="z-5 absolute inset-0 bg-gradient-to-r from-slate-950 to-transparent"></div>

            {/* Text */}
            <div className="relative z-10 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">{set.name}</h2>
                <p className="text-gray-400">{set.release_date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Sets({ series }: PageProps<{ series: ISeries[] }>) {
  const [selectedSeries, setSelectedSeries] = useState<ISeries>(null!);

  return (
    <AuthenticatedLayout header={<h2 className="">Series/Sets</h2>}>
      <Head title="Series" />

      <div className="flex flex-col gap-4">
        {selectedSeries ? (
          <SetList
            close={() => setSelectedSeries(null!)}
            series={selectedSeries}
          />
        ) : null}
        {!selectedSeries
          ? series
              .sort(
                (a, b) =>
                  Date.parse(b.release_date) - Date.parse(a.release_date),
              )
              .map((currentSeries) => {
                return (
                  <div
                    key={currentSeries.id}
                    onClick={() => setSelectedSeries(currentSeries)}
                    className="relative flex h-24 cursor-pointer items-center overflow-hidden rounded-lg border-2 border-sky-800 p-4 hover:border-sky-300"
                  >
                    {/* Background Image */}
                    <img
                      src={currentSeries.image_url}
                      alt=""
                      className="absolute inset-0 z-0 h-full w-full translate-x-[40%] transform object-cover opacity-30"
                    />

                    {/* Gradient Overlay */}
                    <div className="z-5 absolute inset-0 bg-gradient-to-r from-slate-950 to-transparent"></div>

                    {/* Text */}
                    <h2 className="relative z-10 text-3xl font-bold text-white">
                      {currentSeries.name}
                    </h2>
                  </div>
                );
              })
          : null}
      </div>
    </AuthenticatedLayout>
  );
}

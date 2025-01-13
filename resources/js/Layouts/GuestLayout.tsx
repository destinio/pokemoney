import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="m-auto max-w-screen-md text-white">
      <div className="">{children}</div>
    </div>
  );
}

import { UserRoundX, UserRoundCheck } from 'lucide-react';
import clsx from 'clsx';

export default function UserStatus({ status }: { status: boolean }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': !status,
          'bg-green-500 text-white': status,
        },
      )}
    >
      {!status ? (
        <>
          Inactive
          <UserRoundX className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status ? (
        <>
          Active
          <UserRoundCheck className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}

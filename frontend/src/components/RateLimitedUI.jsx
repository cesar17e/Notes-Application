import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="surface-card px-5 py-6 sm:px-6 sm:py-7">
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <div className="flex-shrink-0 rounded-2xl bg-primary/15 p-4">
          <ZapIcon className="size-9 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white sm:text-xl">Rate Limit Reached</h3>
          <p className="mt-2 text-sm leading-6 text-base-content/80 sm:text-base">
            You've made too many requests in a short period. Please wait a moment before trying again.
          </p>
          <p className="mt-1 text-sm text-base-content/60">
            The app should recover automatically after a brief pause.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;

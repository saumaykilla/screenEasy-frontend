import { cn } from "@/lib/utils";

export interface ISVGProps
  extends React.SVGProps<
    SVGSVGElement
  > {
  className?: string;
  message?: string; // New optional message prop
  displayMessage?: boolean;
}

const Loading = ({
  className,
  message = " Loading....",
  displayMessage = true,
}: ISVGProps) => {
  return (
    <div
      id="main-loading"
      className={cn(
        className,
        "fixed inset-0 bg-white z-50 flex items-center justify-center"
      )}
    >
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full spinner mx-auto mb-6"></div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          ScreenEasy
        </h2>
        {displayMessage && (
          <p className="text-gray-600">
            {
              message
            }
          </p>
        )}
      </div>
    </div>
  );
};

export default Loading;

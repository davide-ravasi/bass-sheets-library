import { XIcon } from "lucide-react";

interface SheetImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

export function SheetImageZoom({ src, alt, className }: SheetImageZoomProps) {
  return (
    <>
      <button
        type="button"
        command="show-modal"
        commandfor="sheet-zoom"
        className="block w-full cursor-zoom-in text-left"
        aria-label={`Zoom ${alt}`}
      >
        <img
          src={src}
          alt={alt}
          className={
            className ??
            "h-auto w-full rounded-lg border border-border bg-muted"
          }
        />
      </button>

      <dialog
        id="sheet-zoom"
        className="fixed inset-0 m-auto max-h-[90vh] max-w-[90vw] border-0 bg-transparent p-0 open:flex open:items-center open:justify-center backdrop:bg-black/80"
      >
        <div className="relative max-h-[90vh] max-w-[90vw]">
          <button
            type="button"
            command="close"
            commandfor="sheet-zoom"
            className="absolute top-2 right-2 z-10 rounded-md border border-border bg-background/90 px-2 py-1 text-sm text-foreground cursor-pointer"
            aria-label="Close zoom"
          >
            <XIcon className="w-4 h-4" />
          </button>
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      </dialog>
    </>
  );
}

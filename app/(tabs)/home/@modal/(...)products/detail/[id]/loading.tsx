import { PhotoIcon } from "@heroicons/react/24/solid";

export default function Loading() {
  return (
    <div className="absolute w-full h-full z-50 flex justify-center items-center bg-black bg-opacity-60 left-0 top-0">
      <div className="max-w-screen-sm flex justify-center w-full bg-neutral-900 rounded-md p-5">
        <div className="animate-pulse w-full p-5 flex flex-col gap-5">
          <div className="w-full aspect-square border-neutral-700 border-4 rounded-md border-dashed flex justify-center items-center text-neutral-700">
            <PhotoIcon className="h-28" />
          </div>
          <div className="flex gap-2 items-center">
            <div className="size-14 rounded-full bg-neutral-700" />
            <div className="flex flex-col gap-1">
              <div className="h-5 w-40 bg-neutral-700 rounded-md" />
              <div className="h-5 w-20 bg-neutral-700 rounded-md" />
            </div>
          </div>
          <div className="h-5 w-full bg-neutral-700 rounded-md" />
        </div>
      </div>
    </div>
  )
}
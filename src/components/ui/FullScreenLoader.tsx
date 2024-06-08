import { Loader2 } from "lucide-react"

export default function FullScreenLoader() {
  return (
    <div className="flex h-screen items-center justify-center w-full">
      <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
        <Loader2 className="animate-spin h-7 w-7 mr-1"/>

        <div className="font-bold text-4xl">Loading ...</div>
      </div>
    </div>
  );
}

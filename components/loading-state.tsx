export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-full border-8 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-8 border-t-transparent border-gray-700 rounded-full animate-spin"></div>
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-xl font-semibold mb-2">Generating Your Certificate</h3>
        <p className="text-gray-500 max-w-md">
          We're analyzing your prompt and creating a beautiful certificate based on your specifications...
        </p>
      </div>
    </div>
  )
}

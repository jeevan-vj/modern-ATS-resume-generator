export function Steps() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container px-4">
        <h2 className="text-center text-3xl font-bold">3 Simple Steps</h2>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="relative flex items-start space-x-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              1
            </div>
            <div>
              <h3 className="text-lg font-semibold">Add a resume pdf</h3>
              <p className="mt-1 text-sm text-gray-600">or create from scratch</p>
            </div>
          </div>
          <div className="relative flex items-start space-x-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              2
            </div>
            <div>
              <h3 className="text-lg font-semibold">Preview design</h3>
              <p className="mt-1 text-sm text-gray-600">and make edits</p>
            </div>
          </div>
          <div className="relative flex items-start space-x-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              3
            </div>
            <div>
              <h3 className="text-lg font-semibold">Download new resume</h3>
              <p className="mt-1 text-sm text-gray-600">and apply with confidence</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


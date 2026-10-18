
import { useState } from "react";
import CreatePost from "./pages/CreatePost";
import Feed from "./pages/Feed";

function App() {
  var [refresh, setRefresh] = useState(0);

  // Nayi post upload hone par Feed refresh karna
  function handlePostCreated() {
    setRefresh(function (previous) {
      return previous + 1;
    });
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">

      {/* Header */}
      {/* <header className="bg-slate-900 px-6 py-6 text-white shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              ImageSpace
            </h1>

            <p className="mt-1 text-sm text-slate-300">
              Share your moments with images
            </p>
          </div>

         
        </div>
      </header> */}

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-5 py-10">

        <CreatePost onPostCreated={handlePostCreated} />

        <Feed refresh={refresh} />

      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white px-5 py-6 text-center text-sm text-slate-500">
        ImageSpace — Image Upload Practice
      </footer>

    </div>
  );
}

export default App;

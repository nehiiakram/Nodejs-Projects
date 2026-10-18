
import { useState } from "react";
import axios from "axios";

function CreatePost({ onPostCreated }) {
  var [image, setImage] = useState(null);
  var [desc, setDesc] = useState("");
  var [message, setMessage] = useState("");
  var [loading, setLoading] = useState(false);

  // Image aur description upload karna
  async function handleSubmit(e) {
    e.preventDefault();

    if (!image) {
      setMessage("Please select an image first!");
      return;
    }

    var formData = new FormData();
    formData.append("image", image);
    formData.append("desc", desc);

    try {
      setLoading(true);
      setMessage("");

      await axios.post(
        "http://localhost:3000/posts",
        formData
      );

      setMessage("Post uploaded successfully!");

      setImage(null);
      setDesc("");
      e.target.reset();

      // Upload ke baad Feed ko refresh karna
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      console.log("Upload Error:", error);
      setMessage("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-md sm:p-8">
      <h2 className="text-2xl font-bold text-slate-800">
        Create a Post
      </h2>

      <p className="mb-6 mt-2 text-sm text-slate-500">
        Upload an image and write its description.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Choose Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-slate-200 file:px-3 file:py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Description
          </label>

          <input
            type="text"
            placeholder="Write something about your image..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>

        {message && (
          <p className="rounded-lg bg-slate-100 p-3 text-center text-sm font-medium text-slate-700">
            {message}
          </p>
        )}
      </form>
    </section>
  );
}

export default CreatePost;

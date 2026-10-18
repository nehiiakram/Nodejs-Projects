
import { useState, useEffect } from "react";
import axios from "axios";

function Feed({ refresh }) {
  var [posts, setPosts] = useState([]);
  var [loading, setLoading] = useState(true);

  // Backend se posts fetch karna
  async function fetchPosts() {
    try {
      var res = await axios.get("http://localhost:3000/posts");
      setPosts(res.data.post);
    } catch (error) {
      console.log("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }

  // Page load aur nayi post upload hone par posts lana
  useEffect(function () {
    fetchPosts();
  }, [refresh]);

  return (
    <section className="mt-14">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            My Feed
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your uploaded images and descriptions
          </p>
        </div>

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          {posts.length} Posts
        </span>
      </div>

      {loading ? (
        <p className="py-8 text-center text-slate-500">
          Loading posts...
        </p>
      ) : posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
          No posts yet. Upload your first image!
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(function (post) {
            return (
              <article
                key={post._id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="overflow-hidden bg-slate-200">
                  <img
                    src={post.image}
                    alt={post.desc}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <p className="break-words font-medium text-slate-700">
                    {post.desc}
                  </p>

                  <p className="mt-3 text-xs text-slate-400">
                    Uploaded to ImageSpace
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Feed;

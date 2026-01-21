// api/blogs.js
export default async function handler(req, res) {
  const HASHNODE_USERNAME = "niraj1709"; // your Hashnode username
  const API_URL = "https://gql.hashnode.com/";

  const query = `
    query {
      user(username: "${HASHNODE_USERNAME}") {
        publication {
          posts(page: 0) {
            title
            brief
            slug
            coverImage
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    const posts = result.data.user.publication.posts.map((post) => ({
      title: post.title,
      brief: post.brief,
      slug: post.slug,
      coverImage: post.coverImage,
    }));

    res.status(200).json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch blogs", details: err.message });
  }
}

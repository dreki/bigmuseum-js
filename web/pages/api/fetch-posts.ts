/**
 * Fetch posts from /r/museum and put them into the database, avoiding duplicates.
 */

export default async function fetchPosts(req, res) {
  if (req.method !== 'GET') {
    res.status(405).end('Method not allowed')
    return
  }
  // Return a 200
  res.status(200).end()
}

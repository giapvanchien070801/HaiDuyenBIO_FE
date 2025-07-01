async function getData() {
  const res = await fetch("https://dummyjson.com/comments")
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default async function Comment() {
  const data = await getData()

  return (
    <div className="comments mt-16">
      <p className="text-2xl font-medium">{data.total} bình luận</p>
      <ul>
        {data.comments.map(e => (
          <li key={e.id} className="background-input-comment p-4 my-4" style={{ backgroundColor: "#F4F6F9" }}>
            <p className="comment-content-color text-xl font-bold">{e.user.username}</p>
            <p className="comment-username-color">{e.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

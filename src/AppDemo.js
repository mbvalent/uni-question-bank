import React, { useEffect, useState } from "react";

const AppDemo = () => {
  const [resourceType, setResourceType] = useState("Posts");

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
      .then((response) => response.json())
      .then((json) => console.log(json));
  }, [resourceType]);

  //   https://jsonplaceholder.typicode.com/posts
  return (
    <div>
      <div>
        <button onClick={() => setResourceType("posts")}>Posts</button>
        <button onClick={() => setResourceType("Users")}>Users</button>
        <button onClick={() => setResourceType("Comments")}>Comments</button>
      </div>
      <h1>{resourceType}</h1>
    </div>
  );
};

export default AppDemo;

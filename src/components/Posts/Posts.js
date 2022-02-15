import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "./Posts.css";
import axios from "axios";

function Posts() {
  const [title, setTitle] = useState(" ");
  const [postBody, setPostBody] = useState(" ");
  const [newTitle, setNewTitle] = useState(" ");
  const [newPostBody, setNewPostBody] = useState(" ");
  const [postList, setPostList] = useState([]);

  const createPost = () => {
    axios
      .post("http://localhost:3001/category/posts/create", {
        title: title,
        postBody: postBody,
      })
      .then(() => {
        setPostList([
          ...postList,
          {
            title: title,
            postBody: postBody,
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showPosts = () => {
    axios.get("http://localhost:3001/category/posts/show").then((res) => {
      setPostList(res.data);
    });
  };

  const editPost = (id) => {
    axios
      .put("http://localhost:3001/category/posts/edit", {
        title: newTitle,
        postBody: newPostBody,
        id: id,
      })
      .then((res) => {
        setPostList.map((val) => {
          return val.id === id
            ? {
                id: val.id,
                title: newTitle,
                postBody: newPostBody,
              }
            : val;
        });
      });
  };
  return (
    <div>
      <div className="create_post">
        <h1>Create Post</h1>
        <label></label>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          style={{ width: "200px" }}
          placeholder="Title"
        />
        <textarea
          type="text"
          onChange={(e) => {
            setPostBody(e.target.value);
          }}
          style={{ width: "500px", height: "300px" }}
          placeholder="Start writing here...!"
        ></textarea>
        <button onClick={createPost}>Create Post</button>
        <button onClick={showPosts}>Show Posts</button>
      </div>

      <div className="posts">
        {postList.map((post) => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.postBody}</Card.Text>
                <Button variant="primary">Edit</Button>
                <Button variant="danger">Delete</Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Posts;

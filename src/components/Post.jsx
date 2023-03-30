import React, { useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "./Post.css";

function Post({ post }) {
  const [comments, setComments] = useState(post.comments);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.count);

  const handleLike = () => {
    setLiked(!liked);
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
  };
  const handleCommentSubmit = (commentText) => {
    const newComment = {
      id: comments.length + 1,
      comment: commentText,
      user: {
        username: "currentUser",
        //Replace "current_user" with the username of the user posting the comment when integrating backend.
      },
    };
    setComments([...comments, newComment]);
  };
  return (
    <div id="post" className="card mb-4">
      {post && (
        <>
          <div className="card-header d-flex align-items-center">
            <img
              id="profile_post"
              src={post.user.profile_picture}
              alt="Profile"
            />
            <span className="ms-3">{post.user.username}</span>
          </div>
          <img
            className="card-img-top"
            id="post_pic"
            src={post.image}
            alt="Post"
          />
          <div className="card-body">
            <button type="button"
            className={`btn btn-light btn-sm mb-2 ${liked ? "text-danger" : ""}`}
            onClick={handleLike}
            >
              <i className={`bi bi-heart${liked ? "-fill" : ""}`}></i>
              <span>{liked ? "Liked" : "Like"}</span>
            </button>
            <div className="card-text">
              <strong>{post.user.username}</strong>:{post.caption}
            </div>
            <div>
              {post.likes?.recentLiker?.username && (
                <span>
                  {post.likes.recentLiker.username} and {likeCount - 1}{" "}
                  others liked this
                </span>
              )}
            </div>
            <div>
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
          <CommentForm onCommentSubmit={handleCommentSubmit} />
        </>
      )}
    </div>
  );
}

export default Post;
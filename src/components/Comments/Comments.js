import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";
import { getCommentsByReviewId } from "../../utils/api";

import "./Comments.css";
import axios from "axios";

export default function Comments() {
  const [comments, setComments] = useState([]);

  const params = useParams();
  const { review_id } = params;

  useEffect(() => {
    getCommentsByReviewId(review_id).then((response) => {
      const { comments } = response.data;
      setComments(comments);
    });
  }, [review_id]);

  return (
    <section>
      <AddComment review_id={review_id} setComments={setComments} />
      {comments.map((comment, index) => {
        if(!comment.body) return null;
        return (
          <div className="comments__card" key={`comment${index}`}>
            <h4>{comment.author}</h4>
            <p>{dateFormat(comment.created_at, "dS mmmm yyyy")}</p>
            <p>{comment.body}</p>
            <p>Votes: {comment.votes}</p>
          </div>
        );
      })}
    </section>
  );
}

export function AddComment(props) {
  const { setComments, review_id } = props;
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  async function submitComment(event) {
    event.preventDefault();
    const [commentField] = event.target;
    const comment = commentField.value;

    setErrors([]);
    setSuccess(false);

    if (comment.length <= 3) {
      setErrors((curr) => {
        return [...curr, "Name must be longer than 3 characters"];
      });
    } else {
      //success!
      const newComment = {
        review_id,
        body: comment,
        created_at: new Date(),
        author: "jessjelly",
        votes: 0,
      };
      //change locally
      setComments((currComments) => {
        return [newComment, ...currComments];
      });
      // clear inputs
      commentField.value = "";
      //send an axios post
      axios
        .post(
          `https://ncgames.herokuapp.com/api/reviews/${review_id}/comments`,
          { body: comment, username: "jessjelly" }
        )
        .then((response) => {
          if (response.status === 201) setSuccess(true);
        })
        .catch((err) => {
          setErrors((curr) => {
            return [...curr, "Server error, comment could not be posted"];
          });
        });
    }
  }

  return (
    <form className="comments__form" onSubmit={submitComment}>
      <h3>Add your own comment...</h3>
      {success && <div className="alert alert-success">Comment Created!</div>}
      {errors.map((errorMessage, index) => {
        return (
          <div key={"error" + index} className="alert alert-danger">
            {errorMessage}
          </div>
        );
      })}
      <label htmlFor="userComment" style={{ marginTop: "20px" }}>
        Logged in as jessjelly
      </label>
      <textarea
        name="userComment"
        id="userComment"
        className="comments__textarea input-group-append"
        rows="3"
        placeholder="What did you think about this review..."
        onChange={() => {
          setErrors([]);
          setSuccess(false);
        }}
      ></textarea>
      <button className="btn btn-primary right">Submit Comment</button>
    </form>
  );
}

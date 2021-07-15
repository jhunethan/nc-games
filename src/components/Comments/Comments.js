import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";
import { getCommentsByReviewId } from "../../utils/api";

import "./Comments.css";
import axios from "axios";
import { useVotes } from "../../Hooks/Hooks";

export default function Comments(props) {
  const { user } = props;
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
      <AddComment user={user} review_id={review_id} setComments={setComments} />
      {comments.map((comment, index) => {
        return <SingleComment key={`comment${index}`} comment={comment} />;
      })}
    </section>
  );
}

function SingleComment(props) {
  const { votes, setVotes, addVote } = useVotes(0);
  const { comment } = props;

  useEffect(() => {
    setVotes(comment.votes);
  }, [comment, setVotes]);

  return (
    <div className="comments__card">
      <h4>{comment.author}</h4>
      <p>{dateFormat(comment.created_at, "dS mmmm yyyy")}</p>
      <p>{comment.body}</p>
      <button
        className="btn btn-secondary"
        onClick={(event) =>
          addVote({ event, id: comment.comment_id, database: "comments" })
        }
      >
        ⬆ {votes} Votes
      </button>
    </div>
  );
}

export function AddComment(props) {
  const { setComments, review_id, user } = props;
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
      
      // clear inputs
      commentField.value = "";
      //send an axios post
      axios
        .post(
          `https://ncgames.herokuapp.com/api/reviews/${review_id}/comments`,
          { body: comment, username: user.username }
        )
        .then((response) => {
          if (response.status === 201) setSuccess(true);
          const {comment} = response.data
          //change locally
          setComments((currComments) => {
            return [comment, ...currComments];
          });
        })
        .catch((err) => {
          setErrors((curr) => {
            return [...curr, "Server error, comment could not be posted"];
          });
        });
    }
  }

  if (!user) return <p>Not logged in</p>;

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
        Logged in as {user.username}
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

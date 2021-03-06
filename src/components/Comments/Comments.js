import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
    let componentMounted = true;
    const fetchData = async () => {
      const response = await getCommentsByReviewId(review_id);
      const { comments } = response.data;
      if (componentMounted) {
        setComments(comments);
      }
    };
    fetchData();
    return () => {
      componentMounted = false;
    };
  }, [review_id]);

  function sortByDateProperty(array) {
    return array.slice().sort((a, b) => {
      if (b.comment_id > a.comment_id) return 1;
      return -1;
    });
  }

  return (
    <section>
      <AddComment user={user} review_id={review_id} setComments={setComments} />
      {!comments.length && (
        <div className="spinner-border relative-center" role="status"></div>
      )}
      {sortByDateProperty(comments).map((comment, index) => {
        return (
          <SingleComment
            key={`comment${index}`}
            comment={comment}
            setComments={setComments}
          />
        );
      })}
    </section>
  );
}

function SingleComment(props) {
  const { comment, setComments } = props;
  const { votes, setVotes, addVote } = useVotes(0);

  useEffect(() => {
    setVotes(comment.votes);
  });

  const incrementVote = (event) => {
    addVote({ event, id: comment.comment_id, database: "comments" });
    setComments((currComments) => {
      return currComments.map((currComment) => {
        if (currComment.comment_id === comment.comment_id) {
          return {
            ...currComment,
            votes: currComment.votes + 1,
            hasBeenVoted: true,
          };
        }
        return currComment;
      });
    });
  };

  return (
    <div className="comments__card">
      <h4>{comment.author}</h4>
      <p>{dateFormat(comment.created_at, "dS mmmm yyyy")}</p>
      <p>{comment.body}</p>
      {comment.hasBeenVoted ? (
        <button className="btn btn-outline-success" disabled>
          ??? {votes} Votes
        </button>
      ) : (
        <button className="btn btn-secondary" onClick={incrementVote}>
          ??? {votes} Votes
        </button>
      )}
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
        return [...curr, "Comment must be longer than 3 characters"];
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
          const { comment } = response.data;
          //change locally
          setComments((currComments) => {
            return [...currComments, comment];
          });
        })
        .catch((err) => {
          setErrors((curr) => {
            return [...curr, "Server error, comment could not be posted"];
          });
        });
    }
  }

  if (!user)
    return (
      <div>
        <h2>You must be logged in to comment</h2>
        <Link to="/login" className="btn btn-primary">
          Login here
        </Link>
      </div>
    );

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

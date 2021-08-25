import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
const CommentList = () => {
  const postId = useParams().id;
  const commentFetch = useFetch("http://localhost/comment");
  const commentError = commentFetch.error;
  const commentLoading = commentFetch.loading;
  const commentList =
    !commentFetch.loading &&
    commentFetch.imageList.filter((elem) => elem.postId === postId);
  const peopleFetch = useFetch("http://localhost/user");
  const peopleError = peopleFetch.error;
  const peopleLoading = peopleFetch.loading;
  const peopleList = peopleFetch.imageList;
  console.log(
    commentList,
    peopleList,
    commentError,
    peopleError,
    peopleLoading,
    commentLoading
  );

  return (
    <div>
      {commentLoading && <div>Loading.....</div>}
      {!commentLoading && (
        <div>
          {commentList.map((elem) => (
            <div>
              <h3>
                {!peopleLoading &&
                  peopleList &&
                  peopleList.find((people) => people._id === elem.userId)
                    .username}
              </h3>
              <p>{elem.commentBody}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;
/* [fetch(commentURL),fetch(users)
 */

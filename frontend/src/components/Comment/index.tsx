import { AxiosRequestConfig } from 'axios';
import CommentDetails from 'components/CommentDetails';
import { useCallback, useEffect, useState } from 'react';
import { Review } from 'types/review';
import { BASE_URL, requestBackend } from 'utils/requests';
import './styles.css';

type Props = {
  movieId: string;
  postFlag: boolean;
};

const Comment = ({ movieId, postFlag }: Props) => {
  const [review, setReview] = useState<Review[]>();
  const getReviews = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: BASE_URL + '/movies/' + movieId + '/reviews',
      withCredentials: true,
    };
    requestBackend(params).then((response) => {
      setReview(response.data);
    });
  }, [movieId]);

  useEffect(() => {
    getReviews();
  }, [getReviews, postFlag]);

  return (
    <div className="container base-card comment-card">
      {review?.map((item) => (
        <div key={item.id}>
          <CommentDetails name={item.user.name} text={item.text} />
        </div>
      ))}
    </div>
  );
};

export default Comment;

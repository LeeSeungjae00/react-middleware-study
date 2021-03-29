import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPost, clearPost, goToHome } from '../modules/posts';
import Post from '../components/Post';

function PostContainer({ postId }) {
  const { data, loading, error } = useSelector(state => state.posts.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(postId));
    return () => {
      dispatch(clearPost());
    };
  }, [postId, dispatch]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return (
    <>
      <button onClick = {()=> {dispatch(goToHome())}}>홈으로...</button>
      <Post post={data} />
    </>
  );
  
  
}

export default PostContainer;
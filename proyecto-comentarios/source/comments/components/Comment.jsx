import React, { PropTypes } from 'react';

function Comment(props) {
  return (
    <article id={`comment-${props.id}`}>
      <div>
        By: <a href={`mailto:${props.email}`}> {props.name}</a>
      </div>

      <p>
        {props.body}
      </p>
    </article>
  );
}

Comment.defaultProps = {
  id: 0,
  email: null,
  name: null,
  body: null,
};

Comment.propTypes = {
  id: PropTypes.number,
  email: PropTypes.string,
  name: PropTypes.string,
  body: PropTypes.string,
};

export default Comment;

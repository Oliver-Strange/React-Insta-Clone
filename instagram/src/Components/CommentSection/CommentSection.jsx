import React from "react";

import PropTypes from "prop-types";


import styled from "styled-components";

class CommentSection extends React.Component {
  state = {
    comments: [],
    userComment: ""
  };

  componentDidMount() {
    this.setState({
      comments: this.props.comments
    });
  }

  addNewComment = event => {
    event.preventDefault();
    this.setState({
      comments: [
        ...this.state.comments,
        { username: localStorage.getItem("user"), text: this.state.userComment }
      ]
    });
  };

  handleChanges = event => {
    event.preventDefault();
    this.setState({
      userComment: event.target.value
    });
    console.log(this.state.userComment);
  };

  render() {
    console.log(this.state.comments);
    return (
      <CommentsStyled>
        {this.state.comments.map((post, index) => (
          <div key={index} className="individualComments">
            <strong className="username">{post.username}</strong>
            <p className="commentText">{post.text}</p>
          </div>
        ))}

        <FormStyled onSubmit={this.addNewComment}>
          <textarea
            rows='1'
            type="text"
            placeholder="comment"
            value={this.state.userComment}
            onChange={this.handleChanges}
          />
          <button onClick={this.addNewComment}>Post</button>
        </FormStyled>
      </CommentsStyled>
    );
  }
}

CommentSection.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number
    })
  )
};

const CommentsStyled = styled.div`
  display: flex;
  flex-flow: column;

  .individualComments {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .commentText {
    margin-left: 5px;
    display: flex;
    flex-flow: row wrap;
  }

  .username {
    font-size: .8rem;
    margin: 10px;
  }
`;

const FormStyled = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;

  textarea {
    width: 60%;
    max-width: 80%;
    margin-bottom: 3px;
    border-style: none;
    border-bottom: 1px solid black;
    text-align: justify;
  }

  button {
    width: 20%;
    border-radius: 6px;
    margin: 5px;
    padding: 1px;
    border: none;

    &:hover {
      background-color: darkgrey;
      color: white;
    }
  }
`;

export default CommentSection;

import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Post from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';

import api from '../../api';

import styles from './Page.css';

import actions from '../../actions';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  async componentDidMount() {
    this.initialFecth();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  async initialFecth() {
    const posts = await api.posts.getList(this.props.page);

    this.props.dispatch(
        actions.setPost(posts),
    );

    this.setState({
      loading: false,
    });
  }

  handleScroll() {
    if (this.state.loading) return null;

    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.body.clientHeight;

    if (!(scrolled + viewportHeight + 300 >= fullHeight)) {
      return null;
    }

    return this.setState({ loading: true }, async () => {
      try {
        const posts = await api.posts.getList(this.props.page);

        this.props.dispatch(
            actions.setPost(posts),
        );

        this.setState({
          loading: false,
        });
      } catch (error) {
        console.error(error);
        this.setState({ loading: false });
      }
    });
  }
  render() {
    return (
      <section name="Home" className={styles.section}>
        <h1>
          <FormattedMessage id="title.home" />
        </h1>
        <section className={styles.list}>
          {this.state.loading && (
            <Loading />
          )}
          {this.props.posts
            .map(post => <Post key={post.id} {...post} />)}
        </section>
      </section>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func,
  posts: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number,
};

function mapStateToProps(state) {
  return {
    posts: state.posts.entities,
    page: state.posts.page,
  };
}

/*
function mapDispatchToProps(dispatch, props) {
  return {
    dispatch,
  };
}*/

export default connect(mapStateToProps)(Home);

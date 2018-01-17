import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPostsIfNeeded } from "../actions"
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class App extends Component {
  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  render() {
    const { selectedSubreddit, posts } = this.props
    return (
      <div>
        <Picker value={selectedSubreddit} options={["reactjs"]}/>
        <p>
          最后更新于{new Date().toLocaleTimeString()}
        </p>
        <Posts posts={posts}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { selectedSubreddit, postsBySubreddit } = state
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[selectedSubreddit] || {isFetching: true,items: []}

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}
export default connect(mapStateToProps)(App)

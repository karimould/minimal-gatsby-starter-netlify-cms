import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

const IndexPage = ( props ) => {
  const { node: data } = props.data.homePageData.edges[0]
  const { edges: posts } = props.data.blogPosts
  return (
    <Layout>
      <Helmet titleTemplate="%s | Blog">
        <title>{`${data.frontmatter.seo_title}`}</title>
        <meta name="description" content={`${data.frontmatter.seo_desc}`} />
      </Helmet>
      <h1>title: {data.frontmatter.title}</h1>
      <p>Content: {data.frontmatter.text}</p>
      <h2>BlogPosts:</h2>
      {posts.map(({node: post}) => (
        <div>
          <h3>Blog Post Title: {post.frontmatter.title}</h3>
          <p>Blog Post Description: {post.frontmatter.description}</p>
          <p>Blog Post Date: {post.frontmatter.date}</p>
          <Link to={post.fields.slug} title="link to blog post">Link to blog post</Link>
        </div>
      ))}
    </Layout>
  )
}

export default IndexPage

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
  posts: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query HomeContent {
    homePageData: allMarkdownRemark(
      filter: { frontmatter: { pageKey: { eq: "page_home" } }}
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            pageKey
            seo_title
            seo_desc
            title
            text
          }
        }
      }
    }
    blogPosts: allMarkdownRemark(
      filter: { frontmatter: { pageKey: { eq: "page_blogpost" } }}
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            description
            date
          }
        }
      }
    }
  }
`
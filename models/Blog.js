module.exports = {
  getBlogObject: (query) => {
    return {
      title: query.blogTitle,
      snippet: query.blogSnippet,
      body: query.blogBody,
      createdAt: Date.now(),
    };
  },
};

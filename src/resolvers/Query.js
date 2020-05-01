const Query = {
  comments(parent, args, { db }, info) {
    return db.comments;
  },
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }
    return db.users.filter(user => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },

  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }
    return db.posts.filter(post => {
      return (
        post.title.toLowerCase().includes(args.query.toLowerCase()) ||
        post.body.toLowerCase().includes(args.query.toLowerCase())
      );
    });
  },

  me() {
    return {
      id: "123098",
      name: "Mike",
      email: "mike@example.com"
    };
  },

  post() {
    return {
      id: "234987",
      title: "My First Post",
      body: "ipsem till you lorem",
      published: false
    };
  }
};

export { Query as default };

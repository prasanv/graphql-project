const graphql = require("graphql");

// console.log(graphql);

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
} = graphql;

const books = [
  { name: "Name of the Winder", genre: "Fantasy", id: "1", authorId: "2" },
  { name: "The Final Guardian", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "The far away Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
  { name: "The Here of the Planet", genre: "Sci-Fi", id: "1", authorId: "3" },
  { name: "The Color of Water", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "The truth in Light", genre: "Sci-Fi", id: "3", authorId: "1" },
];

const authors = [
  { name: "Valmiki", age: 98, id: "1" },
  { name: "Kambar", age: 12, id: "2" },
  { name: "Saykellar", age: 56, id: "3" },
];

const dataFetcher = (array, id) => {
  return array.find((item) => {
    return item.id === id;
  });
};

const dataFilter = (array, id) => {
  return array.filter((item) => {
    return item.authorId === id;
  });
};

const genreFilter = (array, id) => {
  return array.filter((item) => {
    return item.genre === id;
  });
};

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorId: { type: GraphQLID },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // console.log(parent);
        return dataFetcher(authors, parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return dataFilter(books, parent.id);
      },
    },
  }),
});

const MyAppRootQuery = new GraphQLObjectType({
  name: "MyAppRootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // console.log(args);
        return dataFetcher(books, args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return dataFetcher(books, args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parents, args) {
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return authors;
      },
    },
    genre: {
      type: new GraphQLList(BookType),
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return genreFilter(books, args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: MyAppRootQuery,
});

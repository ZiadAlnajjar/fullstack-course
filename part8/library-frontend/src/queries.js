import { gql } from '@apollo/client'

const AUTHOR_DETAILS = gql`
    fragment AuthorDetails on Author {
        name
        born
        bookCount
        id
    }
`

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        published
        author {
            name
        }
        genres
        id
    }
`

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            ...AuthorDetails
        }
    }
    ${AUTHOR_DETAILS}
`
export const ALL_BOOKS = gql`
    query allBooks($author: String, $genre: String) {
        allBooks(author: $author, genre: $genre) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

export const ALL_GENRES = gql`
    query {
        allGenres
    }
`

export const CURRENT_USER = gql`
    query currentUser {
        me {
            username
            favoriteGenre
            id
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

export const ADD_BOOK = gql`
    mutation addBook(
        $title: String!,
        $author: String!,
        $published: Int!,
        $genres: [String!]!
    ) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres) {
                ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $birthYear: Int!) {
        editAuthor(name: $name, setBornTo: $birthYear) {
            ...AuthorDetails
        }
        ${AUTHOR_DETAILS}
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

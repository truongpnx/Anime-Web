# APIs

## Authorization APIs

[POST] `/login` Login to user

-   Payload:
    -   `email: string` **required**
    -   `password: string` **required**

[POST] `/register` Register a new user

-   Payload:
    -   `email: string` **required**
    -   `userName: string,`
    -   `password: string` **required**

[GET] `/oauth/goolge` Login by Google account

[GET] `/oauth/facebook` Login by Facebook account

[DELETE] `/logout` Logut from current user

## User APIs

[GET] `/users` Get all users

-   Query:

    -   `q`: Filter user's email by value.

-   Return:

`[{
    id: string,
    email: string,
    userName: string
}]`

[GET] `/users/:id` Get a user by id

-   Return:

`{
    id: string,
    email: string,
    userName: string
}`

[POST] `/users/:id` Update a user by id

Need authorized user

-   Payload:

`{
    userName: string,
    password: string,
}`

[DELETE] `/users/:id` Delete a user by id

Need authorized user

-   Return:

`{
    id: string,
    email: string,
    userName: string
}`

## Anime APIs

[GET] `/animes` Get all animes

-   Query:
    -   `genre`: Filter animes by genre.
    -   `batch-num`: Batch of animes need to get.
    -   `batch-size`: Return a batch animes with `batch-size` quantity.

[GET] `/animes/counts` Get number of animes

-   Query:

    -   `genre`: Filter animes by genre.

-   Return:
    `count of animes`: `number`

[GET] `/animes/:id` Get an anime by animeId

-   Return:

[GET] `/animes/:id/details` Get details of an anime by animeId

-   Return:

[POST] `/animes/new` Create a new anime

[POST] `/animes/:id` Update an anime by id

[POST] `/animes/:id/details/new` Update details of anime by animeId

[POST] `/animes/:id/details` Update details of anime by animeId

[DELETE] `/animes/:id` Delete an anime by id

[DELETE] `/animes/:id/details` Delete details of an anime

## Episode APIs

[GET] `/animes/:animeId/episodes` Get all episodes of an anime

[GET] `animes/:animeId/episodes/counts` Get number of episodes of an anime

[GET] `/animes/:animeId/episodes/:episodeId` Get an episode of an anime by episodeId

[POST] `animes/:animeId/episodes/new` Create new episode for an anime

[POST] `/animes/:animeId/episodes/:episodeId` Update an episode of an anime by id

[DELETE] `animes/:animeId/episodes/:episodeId`
Delete an episode of an anime by id

## Comment APIs

[GET] `/comments` Get all comments with query

-   Query:
    -   `userId`: comment of User
    -   `animeId`: comment of Anime
    -   `episodeId`: comment of Episode

[GET] `/comments/:commentId` Get a comment by id

[POST] `/comments/new` Create a new comment

Need authorized user

-   Payload:
    -   `userId`: `string` **required**
    -   `animeId`: `string` **required**
    -   `episodeId`: `string`
    -   `content`: `string` **required**

[POST] `/comments/:commentId` Update an comment

Need authorized user

-   Payload:
    -   `content`: `string` **required**

[DELETE] `/comments/:commentId` Delete a comment

Need authorized user

## View History APIs

[GET] `/users/:userId/histories` Get all view histories of User

Need authorized user

-   Query:
    -   `animeId`: Get anime's a list contains view historyies of User
    -   `episodeId`: Get episode's view history

[GET] `/users/:userId/histories/:id` Get view history of User by history Id

Need authorized user

[POST] `/users/:userId/histories/new` Create a new view history

Need authorized user

[POST] `/users/:userId/histories/:id` Update a view history by id

Need authorized user

[DELETE] `/users/:userId/histories/:id` Delete a view history by id

Need authorized user

## Genre APIs

[GET] `/genres` Get all genres.

[POST] `/genres/new` Create new genre

[POST] `/genres/:id` Update genre

[DELETE] `/genres/:id` Delete genre

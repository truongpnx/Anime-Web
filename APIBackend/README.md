# APIs

## Authorization APIs

[POST] `/v1/api/login` Login to user

-   Payload:
    -   `email: string` **required**
    -   `password: string` **required**

[POST] `/v1/api/register` Register a new user

-   Payload:
    -   `email: string` **required**
    -   `userName: string,`
    -   `password: string` **required**

[GET] `/v1/api/goolge` Login by Google account

[GET] `/v1/api/facebook` Login by Facebook account

[DELETE] `/v1/api/logout` Logut from current user

## User APIs

[GET] `/v1/api/users` Get all users

-   Query:

    -   `q`: Filter user's email by value.

-   Return:

`[{
    id: string,
    email: string,
    userName: string
}]`

[GET] `/v1/api/users/:id` Get a user by id

-   Return:

`{
    id: string,
    email: string,
    userName: string
}`

[POST] `/v1/api/users/:id` Update a user by id

Need authorized user

-   Payload:

`{
    userName: string,
    password: string,
}`

[DELETE] `/v1/api/users/:id` Delete a user by id

Need authorized user

-   Return:

`{
    id: string,
    email: string,
    userName: string
}`

## Anime APIs

[GET] `/v1/api/animes` Get all animes

-   Query:
    -   `genre`: Filter animes by genre.
    -   `batch-num`: Batch of animes need to get.
    -   `batch-size`: Return a batch animes with `batch-size` quantity.

[GET] `/v1/api/animes/counts` Get number of animes

-   Query:

    -   `genre`: Filter animes by genre.

-   Return:
    `count of animes`: `number`

[GET] `/v1/api/animes/:id` Get an anime by animeId

-   Return:

[GET] `/v1/api/animes/:id/details` Get details of an anime by animeId

-   Return:

[POST] `/v1/api/animes/new` Create a new anime

[POST] `/v1/api/animes/:id` Update an anime by id

[POST] `/v1/api/animes/:id/details/new` Update details of anime by animeId

[POST] `/v1/api/animes/:id/details` Update details of anime by animeId

[DELETE] `/v1/api/animes/:id` Delete an anime by id

[DELETE] `/v1/api/animes/:id/details` Delete details of an anime

## Episode APIs

[GET] `/v1/api/animes/:animeId/episodes` Get all episodes of an anime

[GET] `/v1/api/animes/:animeId/episodes/counts` Get number of episodes of an anime

[GET] `/v1/api/animes/:animeId/episodes/:episodeId` Get an episode of an anime by episodeId

[POST] `/v1/api/animes/:animeId/episodes/new` Create new episode for an anime

[POST] `/v1/api/animes/:animeId/episodes/:episodeId` Update an episode of an anime by id

[DELETE] `/v1/api/animes/:animeId/episodes/:episodeId`
Delete an episode of an anime by id

## Comment APIs

[GET] `/v1/api/comments` Get all comments with query

-   Query:
    -   `userId`: comment of User
    -   `animeId`: comment of Anime
    -   `episodeId`: comment of Episode

[GET] `/v1/api/comments/:commentId` Get a comment by id

[POST] `/v1/api/comments/new` Create a new comment

Need authorized user

-   Payload:
    -   `userId`: `string` **required**
    -   `animeId`: `string` **required**
    -   `episodeId`: `string`
    -   `content`: `string` **required**

[POST] `/v1/api/comments/:commentId` Update an comment

Need authorized user

-   Payload:
    -   `content`: `string` **required**

[DELETE] `/v1/api/comments/:commentId` Delete a comment

Need authorized user

## View History APIs

[GET] `/v1/api/users/:userId/histories` Get all view histories of User

Need authorized user

-   Query:
    -   `animeId`: Get anime's a list contains view historyies of User
    -   `episodeId`: Get episode's view history

[GET] `/v1/api/users/:userId/histories/:id` Get view history of User by history Id

Need authorized user

[POST] `/v1/api/users/:userId/histories/new` Create a new view history

Need authorized user

[POST] `/v1/api/users/:userId/histories/:id` Update a view history by id

Need authorized user

[DELETE] `/v1/api/users/:userId/histories/:id` Delete a view history by id

Need authorized user

## Genre APIs

Genre data type:

`{
    id: string,
    name: string
}`

[GET] `/v1/api/genres` Get all genres.

[POST] `/v1/api/genres/new` Create new genre

[POST] `/v1/api/genres/:id` Update genre

[DELETE] `/v1/api/genres/:id` Delete genre

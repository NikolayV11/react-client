import React from "react"
import { useGetAllPostsQuery } from "../../app/services/postsApi"
import { CreatePost } from "../../components/create-post"
import { Card } from "../../components/card"

export const Posts = () => {
  // запрос на сервер
  const { data } = useGetAllPostsQuery()
  return (
    <>
      <div className="mb-10 w-full flex">
        <CreatePost />
      </div>
      {data && data.length > 0
        ? data.map(
            ({
              content,
              author,
              id,
              authorId,
              comments,
              likes,
              likedByUser,
              createdAt,
            }) => {
              return (
                <Card
                  key={id}
                  avatarUrl={author.avatarUrl ?? ""}
                  content={content}
                  name={author.name ?? ""}
                  likesCount={likes.length}
                  commentsCount={comments.length}
                  authorId={authorId}
                  id={id}
                  likedByUser={likedByUser}
                  createdAt={createdAt}
                  cardFor="post"
                />
              )
            },
          )
        : null}
    </>
  )
}

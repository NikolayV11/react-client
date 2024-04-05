import React from "react"
import { useParams } from "react-router-dom"
import { useGetPostByIdQuery } from "../../app/services/postsApi"
import { Card } from "../../components/card"
import { GoBack } from "../../components/go-back"

export const CurrentPost = () => {
  // получили параметры строки url
  const params = useParams<{ id: string }>()
  // получаем пост согласного id из url
  const { data } = useGetPostByIdQuery(params?.id ?? "")

  if (!data) {
    return <h2>Поста не существует</h2>
  }
  console.log(data)
  const {
    id,
    content,
    authorId,
    author,
    comments,
    likedByUser,
    createdAt,
    likes,
  } = data
  return (
    <>
      <GoBack />
      <Card
        cardFor="current-post"
        avatarUrl={author.avatarUrl ?? ""}
        content={content}
        name={author.name ?? ""}
        likesCount={likes.length}
        commentsCount={comments.length}
        authorId={authorId}
        id={id}
        likedByUser={likedByUser}
        createdAt={createdAt}
      />
    </>
  )
}

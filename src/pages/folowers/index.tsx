import React from "react"
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from "react-redux"
import { selectCurrent } from "../../features/user/userSlice"
import { Link } from "react-router-dom"
import { Card, CardBody } from "@nextui-org/react"
import { User } from "../../components/user"

export const Followers = () => {
  const currentUser = useSelector(selectCurrent)

  if (!currentUser) {
    return null
  }
  return currentUser.followers.length > 0 ? (
    <div className="flex gap-5 flex-col">
      {currentUser.followers.map(user => {
        return (
          <Link to={`/user/${user.follower.id}`} key={user.follower.id}>
            <Card>
              <CardBody>
                <User
                  name={user.follower.name ?? ""}
                  avatarUrl={user.follower.avatarUrl ?? ""}
                  description={user.follower.email ?? ""}
                />
              </CardBody>
            </Card>
          </Link>
        )
      })}
    </div>
  ) : (
    <h1>У вас нет подписчиков</h1>
  )
}

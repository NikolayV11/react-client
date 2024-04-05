import { Card, CardBody } from "@nextui-org/react"
import React from "react"
import { User } from "../../components/user"
import { Link } from "react-router-dom"
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from "react-redux"
import { selectCurrent } from "../../features/user/userSlice"

export const Following = () => {
  const currentUser = useSelector(selectCurrent)

  if (!currentUser) {
    return null
  }
  return currentUser.following.length > 0 ? (
    <div className="flex gap-5 flex-col">
      {currentUser.following.map(user => {
        return (
          <Link to={`/user/${user.following.id}`} key={user.following.id}>
            <Card>
              <CardBody>
                <User
                  name={user.following.name ?? ""}
                  avatarUrl={user.following.avatarUrl ?? ""}
                  description={user.following.email ?? ""}
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
